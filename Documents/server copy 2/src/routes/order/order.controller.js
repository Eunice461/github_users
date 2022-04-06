const Order = require('../../models/Order');
const Token = require('../../models/Token');
const { StatusCodes } = require('http-status-codes');
const checkPermissions  = require('../../services');
const { getPagination } = require('../../services/query');
const User = require('../../models/User');

const fakeStripeAPI = async ({ amount, currency }) => {
	const client_secret = 'someRandomValue';
	return { client_secret, amount };
  };

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
		res.status(201).send({ order })
		} catch (error) {
			console.log(error);
		}
}



async function httpGetSingleOrder(req, res) {
	try {
		const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `No order with id : ${orderId}`
    })

  }
  //checkPermissions(req.user);
  res.status(StatusCodes.OK).json({ order });
	} catch (error) {
		return res.status(500).json()
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
		res.status(StatusCodes.OK).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
	} catch (error) {
		return res.status(500).json(error)
	}
};


async function httpUpdateOrderToDelivered(req, res)  {
	try {
		const order = await Order.findById(req.params.id);

	if (order) {
		order.status = 'delivered';

		const updatedOrder = await order.save();
		res.status(StatusCodes.OK).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
	} catch (error) {
		return res.status(500).json(error)
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
		res.status(404);
		throw new Error('Order not found');
	}
	} catch (error) {
		return res.status(500).json(error)
	}
}

async function httpGetMyCurrentOrders(req, res) {
	try {
		const id = req.user.userId
		const orders = await Order.find({ userId: id });
  	res.status(StatusCodes.OK).json({ orders, count: orders.length });
	} catch (error) {
		return res.status(500).json()
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
    res.status(503).send({ error: 'Unable to fetch the Order right now!' })
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

