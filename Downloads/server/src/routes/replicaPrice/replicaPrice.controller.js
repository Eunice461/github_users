const { StatusCodes } = require('http-status-codes')
const ReplicaPrice = require('../../models/ReplicaPrice');
const User = require('../../models/User');
const Replica = require('../../models/Replica');
const Propose = require('../../models/Propose');

async function httpAddReplicaPrice(req, res){
    try {
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }

        if(user.role !== 'admin'){
            return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
        };
        const price = req.body.price 
        const checkDataBase = await ReplicaPrice.find({})

        if(checkDataBase.length >= 1){
            return res.status(500).json({error: 'There is already a price avalable in the database'})
        }

        const checkDublicate = await ReplicaPrice.exists({price: price});

if(checkDublicate){
    return res.status(StatusCodes.BAD_REQUEST).json({error: 'price Already Exist'})
    
}
const addPrice = await ReplicaPrice.create(req.body)
const replica = await Replica.find({})
const token = await Propose.find({})

const updatedReplica = await Replica.updateMany({replica},{                    
    $set: req.body
}, {new: true, runValidators: true});

const updatedToken = await Propose.updateMany({token},{                    
    $set: req.body
}, {new: true, runValidators: true});

return res.status(StatusCodes.CREATED).json(addPrice)
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpGetReplicaPrice(req, res){
    try {
        const price = await ReplicaPrice.find({})
        return res.status(StatusCodes.OK).json(price)
    } catch (error) {
        return res.status(500).json({ error: "Server Error" + err });  
    }
}

async function httpEditReplicaPrice(req, res){
    try { 
        const price = await ReplicaPrice.findById(req.params.id);
        if(!price){
            return res.status(401).json({error: "No Price with this Id found"});
            };
                    const updatedPrice = await ReplicaPrice.findByIdAndUpdate(req.params.id, { 
                        $set: req.body
                    }, {new: true, runValidators: true});

                    const replica = await Replica.find({})
                    const token = await Propose.find({})
            
                    const updatedReplica = await Replica.updateMany({replica},{ 
                        $set: req.body                   
                    }, {new: true, runValidators: true});

                    const updatedToken = await Propose.updateMany({token},{                    
                        $set: req.body
                    }, {new: true, runValidators: true});

    
                         
                   return res.status(200).json(updatedPrice);
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpDeleteReplicaPrice(req, res){
    try {
  const priceId = req.params.id
    const price= await ReplicaPrice.findById(req.params.id)
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
    httpAddReplicaPrice,
    httpEditReplicaPrice,
    httpGetReplicaPrice,
    httpDeleteReplicaPrice
}