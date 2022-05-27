const { StatusCodes } = require("http-status-codes")
const Propose = require("../../models/Propose")
const Replica = require('../../models/Replica')
const Token = require("../../models/Token")
const User = require("../../models/User")

async function httpCreatePropose(req, res){
    try {
        const user = req.user.userId
        const userId = await User.findById(req.user.userId)
        const token = userId.tokens
        const getToken = await Token.find({})
        const getReplica = getToken.replicas
        const replica = await Replica.findById(req.params.id)
        if(!replica){
            return res.status(StatusCodes.BAD_REQUEST).json({error: "no replica with that id"})
        }
        if(replica.user.toString() !== userId._id.toString()){
            const propose = await Propose.create(req.body)
            await Token.create(req.body)
            return res.status(StatusCodes.OK).json(propose);

        }else{
            return res.status(StatusCodes.BAD_REQUEST).json({error: "you cant propose your design"})
        }
   
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
    
}

async function httpGetAllPropose(req, res){}

module.exports = {
    httpCreatePropose,
    httpGetAllPropose,
}