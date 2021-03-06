import React, { useContext, useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

import { FavouriteBanksContext } from '../App'
import { TableHeadingList } from '../static/filterData';
import LikedIcon from '../images/liked.svg';
import LikeIcon from '../images/like.svg';
import NotFound from './NotFound';


export default function TabularList({bankList, setBankDetail, msg = "No Result found"}) {
  const {favouriteBanksList, setFavouriteBanksList} = useContext(FavouriteBanksContext);
  const [perPageCount, setPerPageCount] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [rangeBankList, setRangedBankList] = useState([]);

  useEffect(() => {
    setTotalCount(bankList?.length)
    setRangedBankList(bankList?.slice(0,  perPageCount))
    setPageCount(Math.ceil(totalCount/perPageCount))
  }, [bankList, perPageCount, totalCount])

  const handlePerPageCount = useCallback((event) => {
    if(event.target.value)  {
      setPerPageCount(parseInt(event.target.value));
      setPageCount(Math.ceil(totalCount/perPageCount))
    }
    else setPerPageCount(1)
  }, [perPageCount, totalCount])

  const handlePageClick = useCallback((data) => {
    const list = bankList.slice(data?.selected * perPageCount, perPageCount + data?.selected * perPageCount);
    setRangedBankList(list);
  }, [bankList, perPageCount])

  const checkIsFavourite = useCallback((bank) => {
   const check =  favouriteBanksList?.some((favourite) => JSON.stringify(favourite)===JSON.stringify(bank));
   return check;
  }, [favouriteBanksList])

  const handleAddFavourite=useCallback((bank) => {
    const check = checkIsFavourite(bank);
    let updatedFavouriteList;
    if(check) updatedFavouriteList= favouriteBanksList.filter((favourite) => JSON.stringify(favourite)!==JSON.stringify(bank));
    else updatedFavouriteList = [...favouriteBanksList, bank];
    setFavouriteBanksList(updatedFavouriteList);
  },[checkIsFavourite, favouriteBanksList, setFavouriteBanksList]);

   return (
     <>
     {bankList?.length!==0 ? 
     <>
        <div className='bank-table'>
          <table className='bank-table__container box-shadow'>
            <thead>
              <tr>
                {TableHeadingList.map((item) => (<th>{item}</th>))}
              </tr>
            </thead>
            <tbody>
              {rangeBankList?.map((bank)=> {
                const IsLiked = checkIsFavourite(bank);
                return(
                <tr onClick={() => setBankDetail(bank)}>
                  <td><button className='navigate-btn'><Link to={`/FindBanks/all-banks/${bank?.ifsc}`}>Click me</Link></button></td>
                  <td>{bank.bank_name}</td>
                  <td>{bank.ifsc}</td>
                  <td>{bank.branch}</td>
                  <td>{bank.bank_id}</td>
                  <td>{bank.address}</td>
                  <td className='pointer' onClick={() => handleAddFavourite(bank)}><img src={IsLiked ? LikedIcon : LikeIcon} alt="like" width={20} height={20} /></td>
                </tr>
              )})
              }
            </tbody>
          </table>
        </div>
        <fieldset className='page-input'>
          <legend>per page</legend>
          <input 
            value={perPageCount}
            type="number"
            min={1}
            className='search-box__input box-shadow'
            onChange = {handlePerPageCount} 
          />
        </fieldset>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination flex-row flex-c"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </>
    : <NotFound msg={msg}/>}
    </>
  )
}
