const SmartContratHash = require("../../models/SmartContratHash");
const User = require("../../models/User");
const axios = require("axios");
const  { getPagination } = require("../../services/query");
const cron = require('node-cron');
const ProposedHash = require("../../models/ProposedHash");
const { httpCreateProposeForReplica } = require("../propose/propose.controller");
const { httpCreateNewToken } = require("../adminToken/adminToken.controller");

async function httpSendHash(req, res, next) {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json("No user found");
    }

    const hash = req.body.hash;

    if (!hash) {
      return res.status(400).json("pls input hash");
    }

    const newHash = new ProposedHash({
      user: user._id,
      hash: hash,
      proposedDetails: req.body.proposedDetails,
    });

    //push post to userPost array to create user-post relationship
    user.hashs.push(newHash);

    const createdHash = await newHash.save();
    await user.save();

    if (!createdHash) {
      return res
        .status(400)
        .json({ error: "Something went wrong, try again soon.." });
    }

    //getting the hash for the api call
    const getHash = createdHash.hash;

    const api = `https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${getHash}&apikey=${process.env.SMARTCONTRACT_API_KEY}`;
    const getTokenIdApi = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionReceipt&txhash=${getHash}&apikey=${process.env.SMARTCONTRACT_API_KEY}`;

    try {
        const response = await axios.get(api);
  
        if (response.status !== 200) {
          console.log("Problem getting api data");
          throw new Error("api call failed");
        }
  
        const hashResponse = response.data.result;
  
        const details = createdHash.proposedDetails;
  
        const hashId = createdHash.hash
        //console.log(hashId, "hashId ")
  
        console.log(hashResponse);
  
        //SET TIMEOUT PART
  
        let harsStatus = hashResponse.status;
        console.log(harsStatus, "harsStatus");
        timer = 15000;
  
        const increase = async () => {
          if (harsStatus == "1") {
  
              const nftId = await axios.get(getTokenIdApi);
              const nftIdResponse = nftId.data.result.logs[0].topics[3]
              const nftIdResponse2 = nftId.data.result.logs[0].topics[3]
              const resultId = parseInt(nftIdResponse, 16);
              const resultIdd = parseInt(nftIdResponse2, 16);
      
              createdHash.paymentStatus = "success";
              details.tokenId = resultId;
              details.hash = hashId
              await createdHash.save();
      
              if (details.tokenOwner === "user") {
                const replicaResponse = await httpCreateProposeForReplica(
                  details,
                  user,
                  resultIdd,
                  req,
                  res,
                );
    
              }
      
              if (details.tokenOwner === "admin") {
                const tokenResponse = await httpCreateNewToken(
                  details,
                  user,
                  resultId,
                  req,
                  res,
                );
      
          }
            return clearTimeout(increase);
          }
          //END HERE
  
          if (harsStatus == "0") {
            createdHash.paymentStatus = "fail";
            await createdHash.save();

            return clearTimeout(increase);

          }
  
          const response = await axios.get(api);
          const hashResponse = response.data.result;
          console.log("call API now", harsStatus);
          harsStatus = hashResponse.status;
          console.log(harsStatus, "harsStatus second");
          //timer+=1000
          console.log('check if it end here')
          setTimeout(increase, timer);
         
        };
        console.log("or if it end here")
        setTimeout(increase, timer);
        
      } catch (err) {
        console.log(err);
      }

      return res.status(200).json(createdHash)
      
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server Error" + err });
    }
  }

// GET ALL USER HASH
async function httpGetUserHash(req, res) {
    const { skip, limit} = getPagination(req.query)
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json("No user found");
    }

    const hash = await ProposedHash.find({ user: user._id })
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit);
    return res.status(200).json(hash);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}

// GET SINGLE HASH
async function httpGetSingleHash(req, res) {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json("No user found");
    }

    const hash = await ProposedHash.findById(req.params.id);

    if (!hash) {
      return res.status(400).json("No hash record found");
    }

    if (user._id.toString() === hash.user.toString()) {
      return res.status(200).json(hash);
    } else {
      return res.status(400).json("you can only get your hash detail");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" + err });
  }
}



module.exports = {
  httpSendHash,
  httpGetUserHash,
  httpGetSingleHash,
};
