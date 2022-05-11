import React from 'react'
import TabularList from './TabularList';
import { FavouriteBanksContext } from '../App'

export default function FavouriteBanks({setBankDetail}) {
  const {favouriteBanksList} = React.useContext(FavouriteBanksContext);
  return (
    <div>
      <h1>My Favourites</h1>
      <TabularList bankList={favouriteBanksList} setBankDetail={setBankDetail} msg="Favourites List Empty"/>
    </div>
  ) 
}
