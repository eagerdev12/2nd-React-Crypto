import React, { useEffect, useState } from "react";
import "../css/Trade.css";
import cryptoApi  from "../API/api";

const Trade: React.FC = () => {

  const [ctlRender, setCtlRender] = useState<number>(0);
  const [crypto, setCrypto] = useState(0);
  const [fiat, setFiat] = useState(0);
  const [assetList, setAssetList] = useState<any[]>([]);
  const [cryptoSelect, setCryptoSelect] = useState<string>("");
  const [USCDSelect, setUSDCSelect] = useState<string>("USDC");
  const [cryptoPrice, setCryptoPrice] = useState<number>(1);


// This function use for getting the assest name and price for trading.
  useEffect(() => {
    cryptoApi.getTradeData()
      .then((res) => {
        res.data.data.splice(0, 0, { name: "Select" });
        setAssetList(res.data.data);
      })
      .catch((err) => err);
  }, [ctlRender]);

//Use for Select the crypto assest and Swipe the data
  const cryptoSelectCoin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (cryptoSelect === "USDC") {
      const noOfCoin = fiat / cryptoPrice;
      setCrypto(Math.round(noOfCoin));
    } else {
      setCryptoSelect(event.target.value);
      let priceOfCrypto = 1;
      // eslint-disable-next-line array-callback-return
      assetList.filter((price) => {
        if (event.target.value === price.name) {
          priceOfCrypto = price.metrics.market_data.price_usd;
        }
      });
      const rate = crypto * priceOfCrypto;
      setFiat(Number(rate.toFixed(4)));
      setCryptoPrice(priceOfCrypto);
    }
  };

  //Its show the number of Assets and USDC price after swipe.
  const cryptoNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
   if(!(isNaN(Number(event.target.value)))) {
    if (cryptoSelect !== "USDC") {
      setCrypto(Number(event.target.value));
      const rate = Number(event.target.value) * cryptoPrice;
      setFiat(Number(rate.toFixed(4)));
    } else {
      setCrypto(Number(event.target.value));
      const noOfCoin = Number(event.target.value) / cryptoPrice;
      setFiat(Number(noOfCoin.toFixed(4)));
    }
   }  
  };

  //Use for Select the USDC and Swipe the data
  const fiatAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!(isNaN(Number(event.target.value)))) { 
    if (USCDSelect === "USDC" ) {
      setFiat(Number(event.target.value));
      const noOfCoin = Number(event.target.value) / cryptoPrice;
      setCrypto(Math.round(noOfCoin));
    } else {
      setFiat(Number(event.target.value));
      const rate = Number(event.target.value) * cryptoPrice;
      setCrypto(Number(rate.toFixed(4)));
    }
  }
  };

  //Its show USDC price and the number of Assets after swipe.
  const fiatSelectAmount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (USCDSelect === "USDC") {
      const noOfCoin = fiat / cryptoPrice;
      setFiat(Math.round(noOfCoin));
    } else {
      setUSDCSelect(event.target.value);
      let priceOfCrypto = 1;
      // eslint-disable-next-line array-callback-return
      assetList.filter((price) => {
        if (event.target.value === price.name) {
          priceOfCrypto = price.metrics.market_data.price_usd;
        }
      });
      const rate = fiat * priceOfCrypto;
      setCrypto(Number(rate.toFixed(4)));
      setCryptoPrice(priceOfCrypto);
    }
  };

  return (
    <div className='tradeContainer'>
      <form autoComplete='off'>
        <div className='cryptoStyle'>
          <div className='crypAmt'>
            <input
              className='tradeTxt1'
              type='text'
              name='cryptoAmt'
              placeholder='Crypto Amount'
              onChange={(e) => cryptoNumber(e)}
              value={crypto}
            />
          </div>
          <div className='cryptoSelectDiv'>
            <select
              className='cryptoSelect'
              value={cryptoSelect}
              onChange={(e) => cryptoSelectCoin(e)}
            >
              {cryptoSelect === "USDC" ? (
                <option>USDC</option>
              ) : (
                assetList.map((coinObj, index) => (
                  <option key={index}>{coinObj.name}</option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className='fiatStyle'>
          <div className='fiatAmt'>
            <input
              className='tradeTxt2'
              type='text'
              name='fiatAmt'
              placeholder='Fiat Amount'
              onChange={(e) => fiatAmount(e)}
              value={fiat}
            />
          </div>
          <div className='fiatSelectDiv'>
            <select
              className='fiatSelect'
              value={USCDSelect}
              onChange={(e) => fiatSelectAmount(e)}
            >
              {USCDSelect === "USDC" ? (
                <option>USDC</option>
              ) : (
                assetList.map((coinObj, index) => (
                  <option key={index}>{coinObj.name}</option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className='swapAmt'>
          <button
            className='swapAmtBtn'
          // Swipe the already selected values.  
            onClick={(e) => {
              e.preventDefault();
              setCtlRender(ctlRender + 1);
              setCrypto(fiat);
              setFiat(crypto);
              setCryptoSelect(USCDSelect);
              setUSDCSelect(cryptoSelect);
            }}
          >
            {" "}
            Swap Amounts
          </button>
        </div>
      </form>
    </div>
  );
};
export default Trade;
