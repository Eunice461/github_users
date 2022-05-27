const { StatusCodes } = require('http-status-codes')
const Token = require('../../models/Token')
const TokenPrice = require('../../models/TokenPrice')

async function httpAddTokenPrice(req, res){
    try {
        const user = req.user.userId
        const price = await TokenPrice.create(req.body)
        
    if(!price){
      return res.status(StatusCodes.BAD_REQUEST).json({error: 'Price already exist'})
    }

    return res.status(StatusCodes.CREATED).json(price)

    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpGetTokenPrice(req, res){
    try {
        const price = await TokenPrice.find({})
        return res.status(StatusCodes.OK).json(price)
    } catch (error) {
        
    }
}

async function httpEditTokenPrice(req, res){
    try {
        
        const price = await TokenPrice.findById(req.params.id);
        if(!price){
            return res.status(401).json({error: "No Price with this Id found"});
            };
                    const updatedPrice = await TokenPrice.findByIdAndUpdate(req.params.id, {
                        
                        $set: req.body
                    }, {new: true, runValidators: true});

                         
                   return res.status(200).json(updatedPrice);
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpDeleteTokenPrice(req, res){
    try {
  const priceId = req.params.id
    const price= await TokenPrice.findById(req.params.id)
    if (!price) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No price with id : ${priceId}`})
    }
    // Add rights for admins and moderators as well (TODO)
     await price.remove()

     res.status(StatusCodes.OK).json({ message: 'Success! price have been deleted.' })
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}


module.exports = {
    httpAddTokenPrice,
    httpEditTokenPrice,
    httpGetTokenPrice,
    httpDeleteTokenPrice
}