const Auction = require("../models/Auction");
const cron = require('node-cron');
const Token = require("../models/Token");

const autoUpdateDatabase = async () =>{
    cron.schedule('* * * * *', async ()=>{
         
        auctionToUpate = await Auction.find({isClose: false}); 
            try{
                 auctionToUpate.map(async (single)  =>{
                        await Auction.updateMany({_id: single._id}, { $currentDate: {currentDate: true}}, {new: true});
                         console.log('Current date updated for Auction')
                    
                    if(single.expiryDate <= single.currentDate && single.isClose === false){
                        await Auction.updateMany({_id: single._id}, {
                            isClose: true,
                            expiryDate: null
                        }, {new: true});
                        return console.log('Update carried out for Auction');
                    }
                    
                });
            
            }catch(err){
                console.log(err);
            };
        return console.log('Nothing to update');
    });
   
};

const autoUpdateCommission = async () =>{
    cron.schedule('* * * * *', async ()=>{
         
        commissionToUpate = await Token.find({isPromotionClose: false}); 
            try{
                 commissionToUpate.map(async (single)  =>{
                        await Token.updateMany({_id: single._id}, { $currentDate: {currentDate: true}}, {new: true});
                         console.log('Current date updated For Commission')
                    
                    if(single.expiryDate <= single.currentDate && single.isPromotionClose === false){
                        await Token.updateMany({_id: single._id}, {
                            isPromotionClose: true,
                            commission: "20%",
                            expiryDate: null
                        }, {new: true});
                        return console.log('Update carried out For Commission');
                    }
                    
                });
            
            }catch(err){
                console.log(err);
            };
        return console.log('Nothing to update');
    });
   
};

// const autoUpdateTokenPrice = async () =>{
//     cron.schedule('* * * * *', async ()=>{
         
//         tokenPriceToUpate = await TokenPrice.find({isClose: false}); 
//             try{
//                 tokenPriceToUpate.map(async (single)  =>{
//                     await TokenPrice.updateMany({_id: single._id}, { $currentDate: {currentDate: true}}, {new: true});
//                     console.log('Current date updated For Token Price')
                    
//                     if(single.expiryDate <= single.currentDate && single.isClose === false){
//                         await TokenPrice.updateMany({_id: single._id}, {
//                             isClose: true,
//                             expiryDate: null
//                         }, {new: true});
//                         return console.log('Update carried out for Token Price');
//                     }
                    
//                 });
            
//             }catch(err){
//                 console.log(err);
//             };
//         return console.log('Nothing to update');
//     });
   
// };




autoUpdateDatabase();
autoUpdateCommission();
//autoUpdateTokenPrice()