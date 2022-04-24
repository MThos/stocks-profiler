import { useState, useEffect } from 'react';
import axios from 'axios';
import { Subtract, NumberConverter } from '../helper.js';

const Details = () => {
  const [profileData, setProfileData] = useState([]);
  const [quoteData, setQuoteData] = useState([]);
  const [keyMetricData, setKeyMetricData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [cashData, setCashData] = useState([]);
  const active = (localStorage.getItem('active')) ? localStorage.getItem('active') : 'AAPL';

  useEffect(() => {
    try {
      const profileOptions = {
        method: 'GET',
        url: 'http://localhost:8000/profile',
        params: { symbol: active }
      };

      const quoteOptions = {
        method: 'GET',
        url: 'http://localhost:8000/quote',
        params: { symbol: active }
      };

      const keyMetricOptions = {
        method: 'GET',
        url: 'http://localhost:8000/keymetrics',
        params: { symbol: active }
      };

      const incomeOptions = {
        method: 'GET',
        url: 'http://localhost:8000/income',
        params: { symbol: active }
      };

      const cashOptions = {
        method: 'GET',
        url: 'http://localhost:8000/cash',
        params: { symbol: active }
      };
  
      axios.request(profileOptions).then((response) => {
        console.log(response.data[0]);
        console.log(response.status);
        setProfileData(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });

      axios.request(quoteOptions).then((response) => {
        console.log(response.data[0]);
        console.log(response.status);
        setQuoteData(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });

      axios.request(keyMetricOptions).then((response) => {
        console.log(response.data[0]);
        console.log(response.status);
        setKeyMetricData(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });

      axios.request(incomeOptions).then((response) => {
        console.log(response.data[0]);
        console.log(response.status);
        setIncomeData(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });

      axios.request(cashOptions).then((response) => {
        console.log(response.data[0]);
        console.log(response.status);
        setCashData(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }, [])

  if (Object.keys(profileData).length > 0 && 
      Object.keys(quoteData).length > 0 && 
      Object.keys(keyMetricData).length > 0 &&
      Object.keys(cashData).length > 0) {
    return(
      <section>
        <div id="details" className="details-flex">
          <div id="details-symbol">{profileData['symbol']}</div>
          <div id="details-name">{profileData['companyName']}</div>      
          <div id="details-money">
            <div>
              <span>PRICE</span>
              <span className="details-green">${NumberConverter(quoteData['price'], 2)}</span>
              <span className="details-money-under">{NumberConverter(quoteData['change'], 2, 2)} ({NumberConverter(quoteData['changesPercentage'], 1, 2)}%)</span>
              <span className="details-money-under">{NumberConverter(quoteData['dayLow'], 2)} &#8212; {NumberConverter(quoteData['dayHigh'], 2)}</span>
            </div>
            <div>
              <span>MARKET CAP</span>
              <span className="details-green">${NumberConverter(quoteData['marketCap'], 2)}</span>
              <span className="details-money-under">{Subtract(quoteData['price'] * quoteData['sharesOutstanding'], quoteData['previousClose'] * quoteData['sharesOutstanding'], 2, 2)}</span>
            </div>
            <div>
              <span>VOLUME</span>
              <span className="details-green">{NumberConverter(quoteData['volume'], 1)}</span>
              <span className="details-money-under">{Subtract(quoteData['volume'], quoteData['avgVolume'], 1, 2)}</span>
              <span className="details-money-under">AVG&#183;{NumberConverter(quoteData['avgVolume'], 1)}</span>
            </div>
          </div>
          <div id="details-middle-flex">
            <div id="details-flex-left">
              <div>
                <span>CIK</span>
                <span className="details-large">{parseInt(profileData['cik'], 10)}</span>
              </div>
              <div>
                <span>COUNTRY</span>
                <span className="details-large">{profileData['country']}</span>
              </div>
              <div>
                <span>CURRENCY</span>
                <span className="details-large">{profileData['currency']}</span>
              </div>
              <div>
                <span>EXCHANGE</span>
                <span className="details-large">{profileData['exchangeShortName']}</span>
              </div>
              <div>
                <span>SHARES</span>
                <span className="details-large">{NumberConverter(quoteData['sharesOutstanding'], 1)}</span>
              </div>
              <div>
                <span>FISCAL END</span>
                <span className="details-large">{keyMetricData['date']}</span>
              </div>
            </div>
            <div id="details-flex-mid">
              <div>
                <span>EPS</span>
                <span className="details-large">{NumberConverter(quoteData['eps'], 2, 1)}</span>
              </div>
              <div>
                <span>REVENUE</span>
                <span className="details-large">{NumberConverter(incomeData['revenue'], 1, 1)}</span>
              </div>
              <div>
                <span>EBITDA</span>
                <span className="details-large">{NumberConverter(incomeData['ebitda'], 2, 1)}</span>
              </div>
              <div>
                <span>NET INCOME</span>
                <span className="details-large">{NumberConverter(cashData['netIncome'], 1, 1)}</span>
              </div>
              <div>
                <span>CASH</span>
                <span className="details-large">{NumberConverter(cashData['cashAtEndOfPeriod'], 1, 1)}</span>
              </div>
              <div>
                <span>PRICE TO SALES</span>
                <span className="details-large">{NumberConverter(keyMetricData['priceToSalesRatio'], 2, 1)}</span>
              </div>
            </div>
            <div id="details-flex-right">
              <div>
                <span>52W HIGH</span>
                <span className="details-large">{NumberConverter(quoteData['yearHigh'], 2)}</span>
              </div>
              <div>
                <span>52W LOW</span>
                <span className="details-large">{NumberConverter(quoteData['yearLow'], 2)}</span>
              </div>
              <div>
                <span>50 MA</span>
                <span className="details-large">{NumberConverter(quoteData['priceAvg50'], 2)}</span>
              </div>
              <div>
                <span>200 MA</span>
                <span className="details-large">{NumberConverter(quoteData['priceAvg200'], 2)}</span>
              </div>
              <div>
                <span>BETA</span>
                <span className="details-large">{NumberConverter(profileData['beta'], 2, 1)}</span>
              </div>
              <div>
                <span>PE</span>
                <span className="details-large">{NumberConverter(keyMetricData['peRatio'], 2, 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    return null;
  }
  
}

export default Details;