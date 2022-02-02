import axios from "axios";

const url = "https://data.messari.io/api/v2/assets";

const cryptoApi = {
  getListPage: (noOfRec: any) => {
    return axios.get(
      `${url}?fields=id,name,slug,symbol,metrics/market_data/price_usd&limit=${noOfRec}`
    );
  },

  getTradeData: () => {
    return axios.get(`${url}?fields=name,metrics/market_data/price_usd`);
  },
};

export default cryptoApi;
