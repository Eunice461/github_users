const { StatusCodes } = require("http-status-codes");
const Auction = require("../../models/Auction");
const Token = require("../../models/Token");
const User = require("../../models/User");
const { getPagination } = require("../../services/query");


//Creating new auction 
async function httpCreateNewAuction(req, res){
  try {
    req.body.user = req.user.userId;
  const user = req.user.userId
  const token = req.body.tokenId
  const auction = await Auction.create(req.body)//we tried to save the auction created
      
        await User.findOneAndUpdate({_id : user}, {
          $addToSet:{
            auctions: auction
          }
        })
        await Token.findOneAndUpdate({_id : token}, {
          $addToSet:{
           auctions: auction
          }
        })
        res.status(201).json({auction});
  } catch (error) {
    console.log(error);
  }
    }

async function httpGetAllAuction(req, res){
  const { skip, limit} = getPagination(req.query)
  try {
    const id = req.user.userId
    const auction = await Auction.find({user: id})
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)
    const numAuction = await Auction.find({auction}).countDocuments()
  res.status(StatusCodes.OK).json({count: auction.length, auction, numAuction})
  } catch (err) {
    res.status(503).send({ error: 'Unable to fetch the auction right now!' })
  }
}

async function httpSingleGetAuction(req, res){
  try {
    const {
      user: { userId },
      params: { id: auctionId },
    } = req
  
    const auction = await Auction.findById({
      _id: auctionId,
      user: userId,
    })
    if(!auction) {
      return res.status(StatusCodes.BAD_REQUEST).json({
          error: `No auction with id ${auctionId}`,
      })
    }
    res.status(StatusCodes.OK).json({ auction })
  } catch (error) {
    console.log(error);
  }
  }

async function httpDeleteAuction(req, res){
    try {
      const {
        user: { userId },
        params: { id: auctionId },
      } = req
    
      const auction = req.params.id
      const currentAuction = await Auction.findOne({auction})

      const deleteAuction = await Auction.findByIdAndRemove({
        _id: auctionId,
        user: userId,
      })

      const removeFromToken = currentAuction.tokenId
      const removeFromUser = currentAuction.user

      await User.findOneAndUpdate({_id : removeFromUser}, {
        $pull:{
          auctions: auction
        }
      })

      await Token.findOneAndUpdate({_id : removeFromToken}, {
        $pull:{
         auctions: auction
        }
      })
      if (!deleteAuction) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: `No auction with id ${auctionId}`,
        })
      }
      res.status(StatusCodes.OK).json('Auction successfully deleted')
    } catch (error) {
      console.log(error);
    }
}


//transfer of ownership from the seller to the buyer
async function httpUpdateAuction(req, res){
  const auction = req.params.auctionId;
    const price = req.body.price

    try{
        if(!price || price === null){
            return res.status(200).json('You must provide price');
        }
         const currentAuction = await Auction.findOne({auction});
        if(price === currentAuction.price){
             const sellerTokenId = currentAuction.tokenId;
                const token = await Token.findOne({sellerTokenId});
                 const changeTokenOwnership = await Token.findOneAndUpdate({token}, {
                     $set: req.body
                    }, {new: true, runValidators: true});

                        const updateAuctionStatus = await Auction.findOneAndUpdate({auction}, {
                            status: 'paid'
                        }, {new: true, runValidators: true})

                        //const removeToken = sellerTokenId
                        const userToken = currentAuction.user
                        
                        // to remove the sold token from the token array in user Model
                        await User.findOneAndUpdate({_id : userToken}, {
                          $pull:{
                            tokens: sellerTokenId
                          }
                        })

                        // to add the token to the buyer token array in user model
                        const addToken = changeTokenOwnership.user
                        await User.findOneAndUpdate({_id : addToken}, {
                          $addToSet:{
                            tokens: sellerTokenId
                          }
                        })

        return res.status(200).json({changeTokenOwnership, updateAuctionStatus});

        }else if(price < currentAuction.price){
             return res.status(404).json('Buying price is lower than auction price')   
        }else{
             return res.status(404).json('Buying price must be equal to selling price')   
        }
        
    }catch(err){
        console.log(err)

    }
}
module.exports = {
    httpCreateNewAuction,
    httpSingleGetAuction,
    httpGetAllAuction,
    httpDeleteAuction,
    httpUpdateAuction
}