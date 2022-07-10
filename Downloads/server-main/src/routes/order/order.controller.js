const Order = require('../../models/Order');
const Token = require('../../models/Token');
const { StatusCodes } = require('http-status-codes');
const checkPermissions  = require('../../services');
const { getPagination } = require('../../services/query');
const User = require('../../models/User');
const Replica = require('../../models/Replica');

async function httpAddOrder(req, res) {
		try {
			const user = await User.findById(req.user.userId);
      	if(!user){
          return res.status(404).json('No user found')
      }
			const replica = await Replica.findOne({ _id: req.body.replicaId })
		if(!replica) {
			throw new Error('Replica was not found!')
		}
		if(replica.quantity < 0){
			throw new Error('Replica is not available in sufficient quantity!')
		}

		if(replica.user.toString() === user._id.toString()){
		const newOrder = new Order({
			 date: Date.now(), 
			 user: user._id, 
			 replicaId: replica, 
			 price: req.body.price,
			 quantity: req.body.quantity,
			 status: 'pending',
			 confirmshippingId: req.body.confirmshippingId,
			 trackingNumber: req.body.trackingNumber,
			 shippingAddress: req.body.shippingAddress || user.shippingAddress,
			 totalprice: req.body.totalprice
			 })

			//push the new order to order list on the user array
			user.orders.push(newOrder)
			user.shippingAddress = newOrder.shippingAddress
			await user.save()
		const createdOrder = await newOrder.save();
		return res.status(StatusCodes.CREATED).send(createdOrder)
		}else{
			return res.status(StatusCodes.BAD_REQUEST).json('you can only place order for your replicas')
		}
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Server Error" + err });
		}
}

async function httpGetSingleOrder(req, res) {
	try {
		const user = await User.findById(req.user.userId);
      	if(!user){
          return res.status(404).json('No user found')
      }
		const orderId = req.params.id
  const order = await Order.findById(req.params.id).populate('replicaId');

  //check if order can be found
  if (!order) {
    return res.status(StatusCodes.NOT_FOUND).json({error: `No order with id : ${orderId}`})
  }
  //checkPermissions(req.user);
  if(order.user.toString() !== user._id.toString()){
	return res.status(StatusCodes.BAD_REQUEST).json(' you can only get your order')
  }
  return res.status(StatusCodes.OK).json( order );
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Server Error" + err });
	}
};

async function httpEditOrder(req, res){
    try {
        const user = await User.findById(req.user.userId);
    if(!user){
         return res.status(404).json("User not found");
    }
    const order = await AdminAddress.findById(req.params.id);
         if(!order){
            return res.status(401).json("No orderwith this Id found");
            };
                if(order.user.toString() == user._id.toString()){
                    const updatedOrder = await AdminAddress.findByIdAndUpdate(req.params.id, {   
                        $set: req.body
                    }, {new: true, runValidators: true});
					return res.status(StatusCodes.OK).json(updatedOrder)
                }else{
					return res.status(StatusCodes.BAD_REQUEST).json('you can only update your order')
				}
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}


async function htppGetAllOrders(req, res)  {
	const { skip, limit} = getPagination(req.query)
  try {
	const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
      if(user.role !== 'admin'){
          return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
      };

    if(user){
		const order = await Order.find({}).populate('replicaId')
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
   		return res.status(StatusCodes.OK).json({count:order.length, order})
	} else{
		return res.status(StatusCodes.UNAUTHORIZED).json('You are not Authorized to access this route')
	}
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }

};

async function htppGetAllNewOrders(req, res)  {
	const { skip, limit} = getPagination(req.query)
  try {
	const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
      if(user.role !== 'admin'){
          return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
      };

    if(user){
		const order = await Order.find({status:'pending'}).populate('replicaId')
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
   		return res.status(StatusCodes.OK).json({count:order.length, order})
	} else{
		return res.status(StatusCodes.UNAUTHORIZED).json('You are not Authorized to access this route')
	}
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }

};

async function httpGetIncome(req, res){
	try{
		const user = await User.findById(req.user.userId)
    if(!user){
      return res.status(StatusCodes.NOT_FOUND).json('no user found')
    }
    if(user.role !== 'admin'){
      return res.status(StatusCodes.UNAUTHORIZED).json('you are not authorized to access this route')
    }
   const income = await Order.aggregate([
	{
		$group:
		  {
			_id: "$price",
			totalAmount: { $sum: "$totalprice" },
		  }
	  }
	]
	)

 return res.status(200).json(income[0])

} catch (err) {
	return res.status(500).json({ error: "Server Error" + err });
	}
}

module.exports = {
	httpAddOrder,
  	httpGetSingleOrder,
  	htppGetAllOrders,
  	httpEditOrder,
  	htppGetAllNewOrders,
  	httpGetIncome
};

