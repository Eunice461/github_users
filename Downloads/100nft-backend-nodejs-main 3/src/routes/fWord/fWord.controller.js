const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const client = require('../../redis-connect')

async function httpCreateFWord(req, res){
    const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }

        if(user.role !== 'admin'){
            return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
        };
    const fword = req.body.fword
    if(fword === " "){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'space must not be empty'})
    }
    if(await client.lpos('array1', fword)){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'fword already exist'})
    }
     const fwordAdd = await client.lpush('array1', fword)
     return res.status(StatusCodes.OK).json({message: `${fwordAdd} have been added to list of F words`})
}

async function httpGetAllFWord(req, res){
    const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }

        if(user.role !== 'admin'){
            return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
        };
    const fword = await client.lrange('array1', 0, -1)
    return res.status(StatusCodes.OK).json(fword)
}

async function httpDeleteFword(req, res){
    const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }

        if(user.role !== 'admin'){
            return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
        };
    const fword = await client.lpop('array1')
    return res.status(StatusCodes.OK).json(fword)
}

module.exports = {
    httpCreateFWord,
    httpGetAllFWord,
    httpDeleteFword
}