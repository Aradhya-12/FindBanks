import React, { useState, useCallback } from 'react'

export default function Dropdown({selectedItem, setSelectedItem, ...props}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  }, [setSelectedItem])

  return (
    <div className='filter'>
      <div
        className='filter__text-box box-shadow pointer' 
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <span>{selectedItem?.name}</span>
      </div>
      {isDropdownOpen ? (
        <div className='filter__dropdown box-shadow'>
          {props?.dropdownList?.map((item, index) => (
            <div className='pointer filter__dropdown-item' key ={item?.id || index} onClick={() => handleItemClick(item)}>
              {item?.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
