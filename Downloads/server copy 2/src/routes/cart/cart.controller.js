const { StatusCodes } = require("http-status-codes");
const Cart = require("../../models/Cart");
const Replica = require("../../models/Replica");
const Token = require("../../models/Token");


const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};

// @desc    Add product to  cart
async function httpCreateCart(req, res){
  try {
	const user = req.user.userId
	const { tokenId, color, size, quantity } = req.body;
	const token = await Token.findById(tokenId)
	 const nftId = token.tokenId
	//  const getReplica = token.replicas
	//  const replica = await Replica.find({})

	// 1) Get Cart for logged user
	let cart = await Cart.findOne({ user: req.user.userId });
  
	if (!cart) {
	  // create cart for logged user with token
	  cart = await Cart.create({
		user: req.user.userId,
		cartItems: [{ token: tokenId, color, size, quantity, nftId: nftId, price }]
	  });
	} else {
	  // product exist in cart, update product quantity
	  const tokenIndex = cart.cartItems.findIndex(
		(item) => item.token.toString() === tokenId && item.color === color && item.size === size
	  );
  
	  if (tokenIndex > -1) {
		const cartItem = cart.cartItems[tokenIndex];
		cartItem.quantity += 1;
  
		cart.cartItems[tokenIndex] = cartItem;
	  } else {
		// product not exist in cart,  push product to cartItems array
		cart.cartItems.push({ token: tokenId, color, size, price: replica.price });
	  }
	};
  
	// Calculate total cart price
	calcTotalCartPrice(cart);
	await cart.save();
  
	return res.status(StatusCodes.OK).json(cart);
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }
};

// @desc    Get logged user cart
async function httpGetLoggedUserCart(req, res, next){
 try {
	const cart = await Cart.findOne({ user: req.user.userId });

	if (!cart) {
	  return res.status(StatusCodes.OK).json([]);
	}
  
	return res.status(StatusCodes.OK).json(cart);
 } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
 }
};

// @desc    Remove specific cart item
async function httpRemoveSpecificCartItem(req, res, next){
  try {
	const cart = await Cart.findOneAndUpdate(
		{ user: req.user.userId },
		{
		  $pull: { cartItems: { _id: req.params.itemId } },
		},
		{ new: true }
	  );
	
	  calcTotalCartPrice(cart);
	  cart.save();
	
	  return res.status(StatusCodes.OK).json( cart);
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }
};

// @desc    clear logged user cart
async function httpClearCart(req, res, next){
  try {
	await Cart.findOneAndDelete({ user: req.user.userId });
	return res.status(StatusCodes.OK).json({message: "Cart has been removed..."});
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }
};

// @desc    Update specific cart item quantity

async function httpUpdateCartItemQuantity(req, res, next){
  try {
	const { quantity } = req.body;

	const cart = await Cart.findOne({ user: req.user.userId });
	if (!cart) {
	  return res.status(StatusCodes.BAD_REQUEST).json(`there is no cart for user ${req.user.userId}`);
	}
  
	const itemIndex = cart.cartItems.findIndex(
	  (item) => item._id.toString() === req.params.itemId
	);
	if (itemIndex > -1) {
	  const cartItem = cart.cartItems[itemIndex];
	  cartItem.quantity = quantity;
	  cart.cartItems[itemIndex] = cartItem;
	} else {
	  return res.status(StatusCodes.BAD_REQUEST).json(`there is no item for this id :${req.params.itemId}`, 404)
	  ;
	}
  
	calcTotalCartPrice(cart);
  
	await cart.save();
  
	return res.status(StatusCodes.OK).json(cart);
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }
}

module.exports ={
    httpCreateCart,
	httpRemoveSpecificCartItem,
	httpClearCart,
	httpGetLoggedUserCart,
	httpUpdateCartItemQuantity
}