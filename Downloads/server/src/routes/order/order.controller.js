const Order = require('../../models/Order');
const { StatusCodes } = require('http-status-codes');
const { getPagination } = require('../../services/query');
const User = require('../../models/User');
const Replica = require('../../models/Replica');
const mongoose = require("mongoose");
const Easypost = require("@easypost/api");
const ReplicaPrice = require('../../models/ReplicaPrice');
const OriginalToken = require('../../models/OriginalToken');

const conn = mongoose.connection;

async function httpAddOrder(req, res) {
try {
	const session = await conn.startSession();

await session.withTransaction(async () => {

	const user = await User.findById(req.user.userId);

      	if(!user){
          return res.status(404).json('No user found')
      }
	  const id = req.body.tokenId || req.body.replicaId

		const replica = await Replica.findById(id)

		const token = await OriginalToken.findById(id)


		if(!replica && !token) {
			return res.status(StatusCodes.BAD_REQUEST).json('Replica nor Token was not found!')
		}

		if(replica){
			if(replica.user.toString() !== user._id.toString()){
				return res.status(StatusCodes.BAD_REQUEST).json({error: `you can only oder your design `})
			}
		}

		if(token){
			if(token.user.toString() !== user._id.toString()){
				return res.status(StatusCodes.BAD_REQUEST).json({error: `you can only oder your design `})
			}
		}

		const replicaPrice = await ReplicaPrice.find({})
          const getPrice = replicaPrice.map((p) => {
            return p.price
          })
          const price = getPrice[0]

		const easyPostApiKey = process.env.EASYPOST_API_KEY;

		const easyApi = new Easypost(easyPostApiKey);
  
		const shippingAddress = req.body.shippingAddress || user.shippingAddress
  
		const easyResponse = await easyApi.Address.createAndVerify(shippingAddress);
  
		const confirmshippingId = easyResponse.id;
  
		if (!shippingAddress) {
		  return res.status(StatusCodes.BAD_REQUEST).json("pls provide address");
		}

		let newOrder = {}

		if(replica){
				newOrder = new Order({
					 date: Date.now(), 
					 user: user._id, 
					 replicaId: replica._id,
					 tokenId: null,
					 price: price,
					 quantity: req.body.quantity,
					 status: 'pending',
					 totalPrice: price * req.body.quantity,
					 shippingPrice: req.body.shippingPrice,
					 trackingNumber: req.body.trackingNumber,
					 confirmshippingId,
					 shippingAddress,
					 })
	}
	if(token){
			newOrder = new Order({
				 date: Date.now(), 
				 user: user._id, 
				 replicaId: null,
				 tokenId: token._id,
				 price: price,
				 quantity: req.body.quantity,
				 status: 'pending',
				 totalPrice: price * req.body.quantity,
				 shippingPrice: req.body.shippingPrice,
				 trackingNumber: req.body.trackingNumber,
				 confirmshippingId,
				 shippingAddress,
				 })
			}
			 //push the new order to order list on the user array
			 user.orders.push(newOrder)
			 user.shippingAddress = newOrder.shippingAddress
			 await user.save()
			 if(newOrder.quantity === 0){
				 return res.status(StatusCodes.BAD_REQUEST).json('you can proceed with 0 quatity')
			 }
			 const createdOrder = await newOrder.save({ session });
		 return res.status(StatusCodes.CREATED).send(createdOrder)
	});

session.endSession();

} catch (err) {
    if (err.status == 422) {
      return res.status(422).send(err.detail);
    } else {
		console.log(err);
		return res.status(500).json({ error: "Server Error" + err });
	}
}
}

async function httpGetAllUserOrder(req, res){
	const { skip, limit} = getPagination(req.query)
	try {
		const user = await User.findById(req.user.userId);
      	if(!user){
          return res.status(404).json('No user found')
      }
	  const order = await Order.find({user: user._id})
	  .populate('replicaId', 'DesignUrl nftName')
  .populate('tokenId', 'DesignUrl nftName')
	.sort({createAt: -1})
    .skip(skip)
    .limit(limit)

	return res.status(StatusCodes.OK).json(order)

} catch (err) {
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
  const order = await Order.findById(req.params.id)
  .populate('replicaId', 'DesignUrl nftName')
  .populate('tokenId', 'DesignUrl nftName')

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
    const order = await Order.findById(req.params.id);
         if(!order){
            return res.status(401).json("No orderwith this Id found");
            };
                if(order.user.toString() == user._id.toString()){
                    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {   
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
	  const filteredStatus = req.body.status

    if(user){
		var status = {}
		if(filteredStatus){
			status.status = filteredStatus
		}
	const order = await Order.find(status)
	.populate('replicaId', 'DesignUrl nftName shiteColor logoColor size')
	.populate('tokenId', 'DesignUrl nftName shiteColor logoColor size')
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
		const order = await Order.find({status:'pending'})
		.populate('replicaId', 'DesignUrl nftName shiteColor logoColor size')
		.populate('tokenId', 'DesignUrl nftName shiteColor logoColor size')
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
   		return res.status(StatusCodes.OK).json({count:order.length})
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
			_id: null,
			totalAmount: { $sum: "$totalPrice" },
			count: { $sum: 1 }

		  }
	  }
	]
	)

 return res.status(200).json(income[0])

} catch (err) {
	return res.status(500).json({ error: "Server Error" + err });
	}
}

async function httpSendMessage(req, res){
	try {
		const user = await User.findById(req.user.userId)
		if(!user){
		  return res.status(StatusCodes.NOT_FOUND).json('no user found')
		}

		const order = await Order.find({user: user.id})
		console.log(order);

	} catch (error) {
		return res.status(500).json({ error: "Server Error" + err });
	}
}

module.exports = {
	httpAddOrder,
  	httpGetSingleOrder,
  	htppGetAllOrders,
  	httpEditOrder,
  	htppGetAllNewOrders,
  	httpGetIncome,
	  httpGetAllUserOrder,
	  httpSendMessage
};
