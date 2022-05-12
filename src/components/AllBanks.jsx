import { useEffect, useState } from 'react';
import {useQuery} from 'react-query';

import { CityFilterList, SortByOptionsList } from '../static/filterData'
import Dropdown from './Dropdown';
import Loader from './Loader';
import Searchbar from './Searchbar';
import TabularList from './TabularList';

export default function AllBanks({setBankDetail}) {
  const [cityVal, setCityVal] = useState(CityFilterList[0]);
  const [sortByVal, setSortByVal] = useState(SortByOptionsList[0]);
  const [bankList, setBankList] = useState([]);

  const fetchCityList = async() => {
    const response = await fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${(cityVal.name).toUpperCase()}`)
    return response.json();
  };

  const {data, status} = useQuery([cityVal], fetchCityList);
  
  useEffect(() =>  setBankList(data), [data]);

  return (
    <>
      {status !== "loading" ? 
        <div>
          <div className='sort-container'>
            <Dropdown selectedItem={cityVal} setSelectedItem={setCityVal} dropdownList={CityFilterList}/>
            <Dropdown selectedItem={sortByVal} setSelectedItem={setSortByVal} dropdownList={SortByOptionsList}/> 
            <Searchbar searchClassName= "search-box" inputClass="search-box__input" sortCategory={sortByVal} bankList={data} setBankList={setBankList}/>
          </div>
          {status==='success' ? <TabularList bankList={bankList} setBankDetail={setBankDetail} /> : <>Something went wrong</>}
        </div>
        : <Loader />
      }
    </>
  )
}
