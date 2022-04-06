const Cart = require("../../models/Cart");

async function httpCreateCart(req, res){
    const newCart = new Cart(req.body);
	try {
		const savedCart = await newCart.save();
		return res.status(201).json(savedCart);
	} catch (err) {
		return res.status(500).json(err);
	}
}

async function httpEditCart(req, res){
    try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.cartId,
			{
				$set: req.body,
			},
			{ new: true }
		);
		return res.status(200).json(updatedCart);
	} catch (err) {
		return res.status(500).json(err);
	}
}

async function httpDeleteCart(req, res){
    try {
		await Cart.findByIdAndDelete(req.params.cartId);
		return res.status(200).json("Cart has been deleted...");
	} catch (err) {
		return res.status(500).json(err);
	}
}
async function httpGetSingleCart(req, res){
    try {
		const cart = await Cart.findOne({ _id: req.params.userId });
		if(!cart){
			return res.status(404).json('User not Found')
		}
		return res.status(200).json(cart);
	} catch (err) {
		return res.status(500).json(err);
	}
}

async function httpGetAllCart(req, res){
    try {
		const id = req.user.userId
		const carts = await Cart.find({userId: id});
		return res.status(200).json({count: carts.length, carts});
	} catch (err) {
		return res.status(500).json('no cart');
	}
}

module.exports ={
    httpCreateCart,
    httpEditCart,
    httpDeleteCart,
    httpGetSingleCart,
    httpGetAllCart
}