import React, { useState,useEffect } from 'react';
import SearchSVG from 'src/assets/images/usearch.svg';


interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<any> = ({ setSearch,query,setPage,page }) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setPage(1)
    setSearchQuery(newValue);
    setSearch(newValue); 
  };

  

  return (
    <div className='flex w-[60%] border-[1px] border-[#999999] border-opacity-10 bg-[#D8D8D826] bg-opacity-15'>
      <div className='flex p-1 w-full justify-between'>
        <input
          className='flex bg-transparent border-0 focus:outline-none'
          type='text'
          placeholder='Search by Waybill ID, R-ID or others'
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};

export default Search;
