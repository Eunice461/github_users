const Auction = require("../models/Auction");
const cron = require('node-cron');
const fetch= require('node-fetch');
const axios = require('axios')
const Propose = require("../models/Propose");
const AdminToken = require("../models/AdminToken");

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"


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
                        return console.log('Update carried out for Auction current time');
                    }
                    
                });
            
            }catch(err){
                console.log(err);
            };
        return console.log('Nothing to update for Auction');
    });
   
};

const autoUpdateBid = async () =>{
    cron.schedule('* * * * *', async ()=>{
         
        auctionToUpate = await Auction.find({}); 
            try{
                 auctionToUpate.map(async (single)  =>{
                    
                    if(single.expiryDate === null && single.isClose === true && single.highestBider === null){
                        await Auction.deleteMany({_id: single._id})
                        return console.log('Update carried out for Auction Deletion');
                    }
                    
                });
            
            }catch(err){
                console.log(err);
            };
        return console.log('Nothing to update for Bid');
    });
   
};


const autoUpdateCommission = async () =>{
    cron.schedule('* * * * *', async ()=>{
         
        commissionToUpate = await Propose.find({isPromotionClose: false}); 
            try{
                 commissionToUpate.map(async (single)  =>{
                        await Propose.updateMany({_id: single._id}, { $currentDate: {currentDate: true}}, {new: true});
                         console.log('Current date updated For Commission')
                    
                    if(single.expiryDate <= single.currentDate && single.isPromotionClose === false){
                        await Propose.updateMany({_id: single._id}, {
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
        return console.log('Nothing to update for commission');
    });
   
};

const autogetCoinRate = async () => {
    cron.schedule('* * * * *', async ()=>{
       
        const coin = await Propose.find({})
        const adminCoin = await AdminToken.find({})
    try {
        
        const response = await axios.get(COINGECKO_API_URL)

        if(response.status !== 200){
            console.log('Problem downloading coinRate data');
            throw new Error('coinRate data download failed')
        }

        const launchDocs = Object.values(response.data)[0].usd

              coin.map(async (single)  =>{
                await Propose.updateMany(
                    { _id: single._id },{ 
                        coinRate: launchDocs,
                    }, {new: true});
            })

            adminCoin.map(async (single)  =>{
                await AdminToken.updateMany(
                    { _id: single._id },{ 
                        coinRate: launchDocs,
                    }, {new: true});
            })

        } catch (error) {
            console.log(err);
        }
        return console.log('Nothing to update for updating coinRate');
    })
  }




autoUpdateDatabase();
autoUpdateCommission();
autoUpdateBid()
autogetCoinRate()