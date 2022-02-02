/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { useQuery } from "react-query";
import cryptoApi  from "../API/api";

const Home: React.FC = () => {

  const [more, setMore] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [assetList, setAssetList] = useState<any[]>([]);
  const [filter, setFilter] = useState({ asset: "", price: "" });
  const [cloneAssestList, setCloneAssestList] = useState<any[]>([]);
  const [sortName, setSortName] = useState<boolean | undefined>(true);
  const [sortPrice, setSortPrice] = useState<boolean | undefined>(true);

//Call the API to Get Assest List
  useEffect(() => {
    cryptoApi
      .getListPage(limit)
      .then((res) => {
        setAssetList(res.data.data);
        setCloneAssestList(res.data.data);
        setMore(false);
      })
      .catch((err) => err);
  }, [more, limit]);

  //this function use for filter the table/list. 
  function fetchAssetsList(
    filter: { asset: string; price: string },
    sortName: boolean | undefined,
    sortPrice: boolean | undefined
  ) {
    if (filter.asset !== "" || filter.price !== "") {
      setAssetList(
        cloneAssestList.filter(
          (d) =>
            d.name.toLowerCase().includes(filter.asset.toLowerCase()) &&
            d.metrics.market_data.price_usd.toFixed(2).includes(filter.price)
        )
      );
    } else return setAssetList(cloneAssestList);
  }

  useQuery(["assets", filter, sortName, sortPrice], () =>
    fetchAssetsList(filter, sortName, sortPrice)
  );

  const sortWithName = () => {
    const NameLists = cloneAssestList;
     sortName === true
      ? NameLists.sort((a, b) => a.name.localeCompare(b.name))
      : NameLists.sort((a, b) => b.name.localeCompare(a.name));
    setSortName(!sortName);
    setSortPrice(undefined);
  };

  const sortWithPrice = () => {
    const PriceLists = cloneAssestList;
    sortPrice === true
      ? PriceLists.sort(
          (a, b) =>
            a.metrics.market_data.price_usd - b.metrics.market_data.price_usd
        )
      : PriceLists.sort(
          (a, b) =>
            b.metrics.market_data.price_usd - a.metrics.market_data.price_usd
        );
    setSortPrice(!sortPrice);
    setSortName(undefined);
  };

  return (
    <React.Fragment>
      <div className='homeContainer'>
        <table>
        <tbody>
          <tr>
            <th>Icon</th>
            <th>
              <a onClick={()=>sortWithName}>
                {" "}
                Name &nbsp;
                <i className='fa fa-sort' />{" "}
              </a>
              <input
                type='text'
                placeholder='Asset Name'
                onChange={(e) => {
                  setFilter({ asset: e.target.value, price: filter.price });
                }}
              />
            </th>
            <th>
              <a onClick={()=>sortWithPrice}>
                {" "}
                Price &nbsp;
                <i className='fa fa-sort' />{" "}
              </a>
              <input
                type='text'
                placeholder=' Price'
                onChange={(e) => {
                  setFilter({ asset: filter.asset, price: e.target.value });
                }}
              />
            </th>

            <th>Action</th>
          </tr>
          {assetList.map((obj, k) => {
            return (
              <tr key={k}>
                <td>{obj.symbol}</td>
                <td>{obj.name}</td>
                <td>${obj.metrics.market_data.price_usd.toFixed(2)}</td>
                <td>
                <div className="dropdown">
                <button onClick={()=>  
                  document.getElementById(`myDropdown${k}`)?.classList.toggle('show')} className="dropbtn">
                  Action <i className="fa fa-sort-desc" aria-hidden="true" />
                </button>
                <div id={`myDropdown${k}`} className="dropdown-content" onClick={(e) => {
                   document.getElementById(`myDropdown${k}`)?.classList.contains('show') &&
                   document.getElementById(`myDropdown${k}`)?.classList.remove('show')}} >
                      <a>Buy</a>
                      <a>Sell</a>
                </div>
                </div>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <div className='showMore'>
          <button
            className='showMoreBtn'
            onClick={() => {
              setMore(true);
              setLimit(limit + 10);
            }}
          >
            {" "}
            View More
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
