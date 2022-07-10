const { StatusCodes } = require("http-status-codes");
const Cart = require("../../models/Cart");
const Replica = require("../../models/Replica");
const Token = require("../../models/Token");
const User = require("../../models/User");


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
	const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
	const { tokenId, color, size, quantity, replicaImage  } = req.body;
	const token = await Token.findById(tokenId)
	 const nftId = token.tokenId
	 const DesignUrl = token.DesignUrl
	 const description = token.description
	//  const getReplica = token.replicas
	//  const replica = await Replica.find({})

	// 1) Get Cart for logged user
	let cart = await Cart.findOne({ user: user}).populate({
		path: 'cartItems',
		populate: {
			path: 'token',
			select: ' _id nftName description DesignUrl'
		},
	});
  
	if (!cart) {
	  // create cart for logged user with token
	  cart = await Cart.create({
		user: user._id,
		cartItems: [{ token: tokenId, replicaImage, color, size, quantity, nftId: nftId,  DesignUrl: DesignUrl, description: description }]
	  });
	} else {
	  // product exist in cart, update product quantity
	  const tokenIndex = cart.cartItems.findIndex(
		(item) => item.token.toString() === tokenId && item.color === color && item.size === size && item.replicaImage === replicaImage
	  );
  
	  if (tokenIndex > -1) {
		const cartItem = cart.cartItems[tokenIndex];
		cartItem.quantity += 1;
  
		cart.cartItems[tokenIndex] = cartItem;
	  } else {
		  const replica = await Replica.find({})
		// product not exist in cart,  push product to cartItems array
		cart.cartItems.push({ token: tokenId, replicaImage, color, size, price: replica.price, nftId: nftId,  DesignUrl: DesignUrl, description: description });
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
	const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
	const cart = await Cart.findOne({ user: user }).populate({
		path: 'cartItems',
		populate: {
			path: 'token',
			select: ' _id nftName description DesignUrl'
		},
	})

	if (!cart) {
	  return res.status(StatusCodes.OK).json([]);
	}
  
	return res.status(StatusCodes.OK).json(cart);
 } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
 }
};

async function httpSingleUserCart(req, res, next){
	try {
	   const user = await User.findById(req.user.userId);
		 if(!user){
			 return res.status(404).json('No user found')
		 }
		 const cart = await Cart.findOne({ user: user }).populate({
			path: 'cartItems',
			populate: {
				path: 'token',
				populate: {
					path: 'colors',
				},
			},
		 })
		 if (!cart) {
		   return res.status(StatusCodes.BAD_REQUEST).json(`there is no cart for user ${user._id}`);
		 }
	   
		 const itemIndex = cart.cartItems.findIndex(
		   (item) => item._id.toString() === req.params.itemId
		 );
		 if (itemIndex > -1) {
		   const cartItem = cart.cartItems[itemIndex]
		//    cartItem.quantity = quantity;
		   cart.cartItems[itemIndex] = cartItem
		   return res.status(StatusCodes.OK).json(cartItem)
		 } else {
		   return res.status(StatusCodes.BAD_REQUEST).json(`there is no item for this id :${req.params.itemId}`)
		   ;
		 }
	} catch (err) {
	   return res.status(500).json({ error: "Server Error" + err });
	}
   };
   
// @desc    Remove specific cart item
async function httpRemoveSpecificCartItem(req, res, next){
  try {
	const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
	const cart = await Cart.findOneAndUpdate(
		{ user: user },
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
	const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
	await Cart.findOneAndDelete({ user: user });
	return res.status(StatusCodes.OK).json({message: "Cart has been removed..."});
  } catch (err) {
	console.log(err);
	return res.status(500).json({ error: "Server Error" + err });
  }
};

// @desc    Update specific cart item quantity

async function httpUpdateCartItemQuantity(req, res, next){
  try {
	const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
	const { quantity } = req.body;

	const cart = await Cart.findOne({ user: user });
	if (!cart) {
	  return res.status(StatusCodes.BAD_REQUEST).json(`there is no cart for user ${user._id}`);
	}
  
	const itemIndex = cart.cartItems.findIndex(
	  (item) => item._id.toString() === req.params.itemId
	);
	if (itemIndex > -1) {
	  const cartItem = cart.cartItems[itemIndex];
	  cartItem.quantity = quantity;
	  cart.cartItems[itemIndex] = cartItem;
	} else {
	  return res.status(StatusCodes.BAD_REQUEST).json(`there is no item for this id :${req.params.itemId}`)
	  ;
	}
	calcTotalCartPrice(cart);
	await cart.save();
	return res.status(StatusCodes.OK).json(cart);
  } catch (err) {
	return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpEditCart(req, res){
	try {
		const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
	  const {color, size, quantity, replicaImage} = req.body

	  const cart = await Cart.findOne({ user: user }).populate({
		path: 'cartItems',
		populate: {
			path: 'token',
			select: ' _id nftName description DesignUrl'
		},
	});
		if (!cart) {
	  		return res.status(StatusCodes.BAD_REQUEST).json(`there is no cart for user ${user._id}`);
	}
		const itemIndex = cart.cartItems.findIndex(
			(item) => item._id.toString() === req.params.itemId
	  );
	  if (itemIndex > -1) {
		const cartItem = cart.cartItems[itemIndex];
		cartItem.quantity = quantity;
		cartItem.size = size;
		cartItem.color = color;
		cartItem.replicaImage = replicaImage;
		cart.cartItems[itemIndex] = cartItem;
	  } else {
		return res.status(StatusCodes.BAD_REQUEST).json(`there is no item for this id :${req.params.id}`)
		;
	  }
	  calcTotalCartPrice(cart);
	  await cart.save();
	  return res.status(StatusCodes.OK).json(cart);
	} catch (err) {
		return res.status(500).json({ error: "Server Error" + err });
	}
}

module.exports ={
    httpCreateCart,
	httpRemoveSpecificCartItem,
	httpClearCart,
	httpGetLoggedUserCart,
	httpUpdateCartItemQuantity,
	httpEditCart,
	httpSingleUserCart
}