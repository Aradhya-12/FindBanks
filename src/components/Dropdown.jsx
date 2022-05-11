import React, { useState } from 'react'
import { useCallback } from 'react';

export default function Dropdown({selectedItem, setSelectedItem, ...props}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  }, [setSelectedItem])
  return (
    <div className='filter'>
    <div className='filter__text-box' onClick={() => setDropdownOpen(!isDropdownOpen)}>
      <span>{selectedItem?.name}</span>
    </div>
    {isDropdownOpen ? (
      <div className='filter__dropdown'>
      {props?.dropdownList?.map((item, index) => (
        <div key ={item?.id || index} onClick={() => handleItemClick(item)}>
          {item?.name}
        </div>
      ))}
      </div>
    ) : null}
    </div>
  )
}
