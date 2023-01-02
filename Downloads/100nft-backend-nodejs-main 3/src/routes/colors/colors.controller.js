const { StatusCodes } = require('http-status-codes');
const Color = require('../../models/Color');
const Propose = require('../../models/Propose');
const User = require('../../models/User');
const { getPagination } = require('../../services/query');

async function httpAddColor(req, res){
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
      if(user.role !== 'admin'){
          return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
      };
        const token = user.tokens
        const findToken = await Propose.find({})

        const newColor = new Color({
          _id: req.body._id,
          user: req.user.userId,
          shiteColor:req.body.shiteColor,
          logoColor: req.body.logoColor,
        });
         const createdColor = await newColor.save();

         await Propose.updateMany({findToken}, {
          $addToSet:{
            colors: newColor
          }
        })

    if(!createdColor){
      return res.status(StatusCodes.BAD_REQUEST).json({error: 'Color already exist'})
    }
      return res.status(StatusCodes.CREATED).json(createdColor)

    } catch (err) {
        return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpGetAllColors(req, res){
  try {
    const { skip, limit} = getPagination(req.query)
    const color = await Color.find({})
    .sort({createdAt: -1})
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
    try{
      const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json('No user found')
        }
        if(user.role !== 'admin'){
            return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
        };
       try{
        const token = user.tokens
        const findToken = await Propose.find({})
        const colorId = req.params.id
        const color = await Color.findById(req.params.id)
           if(!color){
              return res.status(401).json("color not found");
           }
           if(color.user.toString() == user._id.toString()){
                  await Color.findByIdAndDelete({_id: color._id});  
                    
                  await Propose.updateMany({findToken}, {
                    $pull:{
                      colors: colorId
                    }
                  })          
                    return res.status(200).json("color has been deleted");
           }
      }catch(err){
        return res.status(500).json({ error: "Server Error" + err });
      };
    }catch(err){
      return res.status(500).json({ error: "Server Error" + err });
    }
}

async function httpEditColor(req, res){
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
          return res.status(404).json('No user found')
      }
      if(user.role !== 'admin'){
          return res.status(StatusCodes.BAD_REQUEST).json('You are not authorized to perform this action')
      };
        const token = user.tokens
        const findToken = await Propose.find({})

        const color = await Color.findById(req.params.id);
        if(!color){
            return res.status(401).json("No color with this Id found");
            };
                    const updatedColor = await Color.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, {new: true, runValidators: true});

                    await Propose.updateMany({findToken}, {
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