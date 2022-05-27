const Auction = require("../models/Auction");
const cron = require('node-cron');

const autoUpdateDatabase = async () =>{
    cron.schedule('* * * * *', async ()=>{
         
        auctionToUpate = await Auction.find({isClose: false}); 
            try{
                 auctionToUpate.map(async (single)  =>{
                        await Auction.updateMany({_id: single._id}, { $currentDate: {currentDate: true}}, {new: true});
                         console.log('Current date updated')
                    
                    if(single.expiryDate <= single.currentDate && single.isClose === false){
                        await Auction.updateMany({_id: single._id}, {
                            isClose: true,
                            expiryDate: null
                        }, {new: true});
                        return console.log('Update carried out');
                    }
                    
                });
            
            }catch(err){
                console.log(err);
            };
        return console.log('Nothing to update');
    });
   
};

autoUpdateDatabase();