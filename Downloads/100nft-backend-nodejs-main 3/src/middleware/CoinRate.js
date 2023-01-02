const fetch= require('node-fetch');

const getCoinRate = async () => {
try {
  const coin = await fetch('https://rest.coinapi.io/v1/exchangerate/ETH/USD',{
        headers: { "X-CoinAPI-Key": `${process.env.COIN_RANKING_API_KEY}` }
                    }).then((response) => response.json())
                      .then((json) => {
                        console.log(json);
      })
      return coin

    } catch (error) {
        console.log(err);
    }
}

module.exports = {
    getCoinRate
}