const Order = require('../../models/Order');
const Token = require('../../models/Token');
const { StatusCodes } = require('http-status-codes');
const checkPermissions  = require('../../services');
const { getPagination } = require('../../services/query');
const User = require('../../models/User');

async function httpAddOrder(req, res) {
		try {
			const token = await Token.findOne({ _id: req.body.tokenId })
		if(!token) {
			throw new Error('Token was not found!')
		}
		if(token.quantity < 0){
			throw new Error('Token is not available in sufficient quantity!')
		}
		const order = new Order({ date: Date.now(), userId: req.user.userId, tokenId: token, quantity: req.body.quantity, status: 'pending',shippingAddress: req.body.shippingAddress  })
		await order.save();
		return res.status(StatusCodes.CREATED).send(order)
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Server Error" + err });
		}
}



async function httpGetSingleOrder(req, res) {
	try {
		const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: `No order with id : ${orderId}`
    })

  }
  //checkPermissions(req.user);
  return res.status(StatusCodes.OK).json( order );
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Server Error" + err });
	}
};


async function httpUpdateToPaid(req, res){
	try {
		const order = await Order.findById(req.params.id);
		const oderss = order.tokenId
		const token = await Token.findById(oderss)
		await Token.findByIdAndUpdate(token, {$inc: { noOfSales: 1} }, {new: true})

	if (order) {
		order.status = 'paid';

		const updatedOrder = await order.save();
		return res.status(StatusCodes.OK).json(updatedOrder);
	} else {
		return res.status(StatusCodes.NOT_FOUND).json({error: 'Order not found'})
	}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Server Error" + err });
	}
};


async function httpUpdateOrderToDelivered(req, res)  {
	try {
		const order = await Order.findById(req.params.id);

	if (order) {
		order.status = 'delivered';

		const updatedOrder = await order.save();
		return res.status(StatusCodes.OK).json(updatedOrder);
	} else {
		return res.status(StatusCodes.NOT_FOUND).json({error: 'Order not found'});
	}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Server Error" + err });
	}
};

async function httpUpdateOrderToCancelled(req, res){
	try {
		const order = await Order.findById(req.params.id);

	if (order) {
		order.status = 'cancelled';

		const updatedOrder = await order.save();
		res.status(StatusCodes.OK).json(updatedOrder);
	} else {
		return res.status(StatusCodes.NOT_FOUND).json({error: 'Order not found'});
	}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Server Error" + err });
	}
}

async function httpGetMyCurrentOrders(req, res) {
	try {
		const id = req.user.userId
		const orders = await Order.find({ userId: id });
  	return res.status(StatusCodes.OK).json({ orders, count: orders.length });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "Server Error" + err });
	}
};


async function htppGetAllOrders(req, res)  {
	const { skip, limit} = getPagination(req.query)
  try {
	const admin = req.user.userId
    const adminIf = await User.findById({_id: admin})
    console.log(adminIf);
    const isAdmin = adminIf.role === 'admin'

    if(isAdmin){
		const order = await Order.find({})
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
	const numOrder = await Order.find({order}).countDocuments()
  res.status(StatusCodes.OK).json({count: order.length, order, numOrder})
	} else{
		res.status(StatusCodes.UNAUTHORIZED).json('You are not Authorized to access this route')
	}
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }

};

module.exports = {
	httpAddOrder,
  httpGetMyCurrentOrders,
  httpGetSingleOrder,
  httpUpdateOrderToDelivered,
  httpUpdateToPaid,
  htppGetAllOrders,
  httpUpdateOrderToCancelled

};

