import { useState, useMemo, useEffect, useCallback } from "react";
import debouce from "lodash.debounce";

export default function Searchbar({bankList, sortCategory, setBankList, searchClassName, inputClass}) {
  const [searchTerm, setSearchTerm] = useState("");


  const handleChange = useCallback((event) => {
    if(event.target.value!=="") setSearchTerm(event.target.value);
    else setSearchTerm("");
  },[]);
  
useEffect(() => {
  const bank=bankList?.filter((bank) => bank[sortCategory.slug].toString().toUpperCase().includes(searchTerm.toUpperCase()));
  setBankList(bank);
}, [bankList, searchTerm, setBankList, sortCategory.slug])

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, [handleChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className={searchClassName}>
      <input className={inputClass} placeholder="Search Banks" onChange={debouncedResults} />
    </div>
  );
}
