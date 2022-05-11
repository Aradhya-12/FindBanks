import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar flex-row'>
     <span className='text'> <Link to='/'>All banks</Link> </span>
      <span className='text'><Link to="/favourites">Favourites</Link> </span>
    </div>
  )
}
