const  { getPagination } = require("../../services/query");
const AdminToken = require("../../models/AdminToken");
const Propose = require("../../models/Propose");

async function httpSearchToken(req, res, next){
    const {skip, limit} = getPagination(req.query)
    try{
         
      key = req.body.nftName;
      if(key){
          const adminToken = await AdminToken.find({nftName: {$regex: key.toString(), "$options": "i"}})
          const proposedToken = await Propose.find({nftName: {$regex: key.toString(), "$options": "i"}})
          return res.status(200).json({adminToken, proposedToken})
      }
      if(key == ""){
           return res.status(404).json("provide your search key words")
      }
      
  }catch(err){
     console.log(err);
     return res.status(404).json("Not found")
  }
  
    }

 module.exports = {httpSearchToken}