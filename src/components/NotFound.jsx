import React from 'react'

import NoFoundResult from '../images/Not_found.svg';
import SadFace from '../images/sad_emoji.svg';

export default function NotFound({ msg }) {
  return (
    <div className='flex-col flex-c'>
      <div className='flex-row flex-c'>
        <img src = {NoFoundResult} alt='No Result Found' width={70} height={70}/>
        <h1>{msg}</h1>
      </div>
      <img src = {SadFace} alt='No Result Found' width={100} height={100}/>
    </div>
  )
}
