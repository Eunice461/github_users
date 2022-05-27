const { StatusCodes } = require('http-status-codes');
const Color = require('../../models/Color');
const Token = require('../../models/Token');
const User = require('../../models/User');
const { getPagination } = require('../../services/query');

async function httpAddColor(req, res){
    try {
        const user = req.user.userId
        const userId = await User.findById(user)
        const token = userId.tokens
        const findToken = await Token.find({})

        const color = await Color.create(req.body)

    if(!color){
      return res.status(StatusCodes.BAD_REQUEST).json({error: 'Color already exist'})
    }

    await Token.updateMany({findToken}, {
        $addToSet:{
          colors: color
        }
      })

      return res.status(StatusCodes.CREATED).json(color)

    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpGetAllColors(req, res){
  try {
    const { skip, limit} = getPagination(req.query)
    const color = await Color.find({})
    .sort({createAt: -1})
    .skip(skip)
    .limit(limit)

    if(!color){
        return res.status(StatusCodes.BAD_REQUEST).json({error: 'No colors Avaliable'})
    }
    // res.status(StatusCodes.OK).json({count: token.length, token})
    return res.status(StatusCodes.OK).json(color)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

async function httpGetSingleColor(req, res){
    try {
        const { id: colorId } = req.params;

        const color = await Color.findOne({ _id: colorId })
  
    if (!color ) {
     return res.status(StatusCodes.NOT_FOUND).json(`No color with id : ${colorId}`);
    }
  
    return res.status(StatusCodes.OK).json(color );
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpRemoveColor(req, res){
    try {
        const user = req.user.userId
        const userId = await User.findById(user)
        const token = userId.tokens
        const findToken = await Token.find({})
        const colorId = req.params.id
  
    const color = await Color.findById(req.params.id)
    if (!color) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No token with id : ${colorId}`})
    }
    // Add rights for admins and moderators as well (TODO)
     await color.remove()

    await Token.updateMany({findToken}, {
        $pull:{
          colors: colorId
        }
      })
     res.status(StatusCodes.OK).json({ message: 'Success! Color removed.' })
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpEditColor(req, res){
    try {
        const user = req.user.userId
        const userId = await User.findById(user)
        const token = userId.tokens
        const findToken = await Token.find({})

        const color = await Color.findById(req.params.id);
        if(!color){
            return res.status(401).json("No color with this Id found");
            };
                    const updatedColor = await Color.findByIdAndUpdate(req.params.id, {
                        
                        $set: req.body
                    }, {new: true, runValidators: true});

                    await Token.updateMany({findToken}, {
                        $addToSet:{
                          colors: updatedColor
                        }
                      })
                         
                   return res.status(200).json(updatedColor);
    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpDeleteAllColor(req, res){
    try {
      const color = await Color.find({})
      const deleteall = await Color.deleteMany(color)
      return res.status(StatusCodes.OK).json({msg: 'successfully delete all Color'})
    } catch (error) {
        return res.status(500).json({ error: "Server Error" + err });
    }
  }

module.exports = 
{
    httpAddColor,
    httpEditColor,
    httpGetAllColors,
    httpRemoveColor,
    httpGetSingleColor
}