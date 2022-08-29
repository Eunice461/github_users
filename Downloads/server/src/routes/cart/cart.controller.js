const { StatusCodes } = require("http-status-codes");
const AdminToken = require("../../models/AdminToken");
const Cart = require("../../models/Cart");
const Propose = require("../../models/Propose");
const Replica = require("../../models/Replica");
const ReplicaPrice = require("../../models/ReplicaPrice");
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
	  //Get Price Frome ReplicaPrice Model
	  const replicaPrice = await ReplicaPrice.find({})
          const getPrice = replicaPrice.map((p) => {
            return p.price
          })
          const price = getPrice[0]

	const { tokenId, color, size, quantity, replicaImage, logoDisplayUrl  } = req.body;
	const token = await Propose.findById(tokenId) || await AdminToken.findById(tokenId)
	if(!token){
		return res.status(404).json('token id not found')
	}

	 const nftId = token.tokenId
	 const nftName = token.nftName
	 const DesignUrl = token.DesignUrl
	 const description = token.description
	 const isOriginal = token.isOriginal
	 const coinRate = token.coinRate

	// 1) Get Cart for logged user
	let cart = await Cart.findOne({ user: user})

	if (!cart) {
	  // create cart for logged user with token
	  cart = await Cart.create({
		user: user._id,
		cartItems: [{ token: token._id, replicaImage, logoDisplayUrl, color, size, price: price, quantity, nftId: nftId, nftName: nftName,  DesignUrl: DesignUrl, description: description, isOriginal:isOriginal, coinRate: coinRate }]
	  });
	} else {
	  // product exist in cart, update product quantity
	  const tokenIndex = cart.cartItems.findIndex(
		(item) => item.token.toString() === token._id.toString() && item.color === color && item.size === size && item.replicaImage === replicaImage && item.logoDisplayUrl === logoDisplayUrl
	  );
  
	  if (tokenIndex > -1) {
		const cartItem = cart.cartItems[tokenIndex];
		cartItem.quantity += req.body.quantity;
  
		cart.cartItems[tokenIndex] = cartItem;
	  } else {
		// product not exist in cart,  push product to cartItems array
		cart.cartItems.push({ token: token._id, replicaImage, logoDisplayUrl, color, size, price: price, nftId: nftId, nftName: nftName,  DesignUrl: DesignUrl, description: description, isOriginal:isOriginal, coinRate: coinRate });
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
	const cart = await Cart.findOne({ user: user })

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
		 const cart = await Cart.findOne({ user: user })
		 
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

	  const cart = await Cart.findOne({ user: user })

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