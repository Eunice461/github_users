const BidHash = require("../../models/BidHash");
const User = require("../../models/User");

async function httpSendHash(req, res, ) {
    try {
        const user = await User.findById(req.user.userId)

        if (!user) {
            return res.status(404).json("No user found");
          }
      
          const hash = req.body.hash;
      
          if (!hash) {
            return res.status(400).json("pls input hash");
          }
      
          const newHash = new BidHash({
            user: user._id,
            hash: hash,
           userWalletAddress: req.body.userWalletAddress,
           bidId: req.body.bidId
          });
          
    } catch (error) {
        
    }
}
