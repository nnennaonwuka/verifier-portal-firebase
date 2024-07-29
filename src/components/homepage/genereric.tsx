import React, { useState, useEffect } from 'react';
import Search from './SearchComponent';
import Filter from './Filter';
import PaginationComponent from './PaginationComponent';
import Export from './Export';
import {
  useCustomQuery,
} from 'src/redux/pending-transactions/hooks';
import { useSearch, useFilter } from 'src/redux/searchAndFilter/hook';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

type ModeType = 'scaler' | 'receiver' | 'admin' ;

export const mappingModeType: any= {
  scaling: 'scaler',
  receiving: 'receiver',
  allTransactions: 'all-transactions'
};

const mappingProductType: any = {
  'Soya Bean': 'soya_bean',
  Rice: 'rice',
  Maize: 'maize',
};

interface GenericProps {
  mode: ModeType;
  type : string;
}

const Generic: React.FC<GenericProps> = ({ mode,type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new window.URLSearchParams(search);
  const searchParam = queryParams.get('search') || '';
  const [query, setQuery] = useState<string>(searchParam);
  const [productType, setProductType] = useState<any>('');
  const [variety, setVariety] = useState<any>(undefined);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  const { data, isLoading: pendingTransactionLoading } = useCustomQuery(
    type,
    mode,
    debouncedQuery,
    productType,
    variety,
    currentPage
  );

  useEffect(() => {
    // Create a timer to update debouncedQuery after a delay (e.g., 300 milliseconds)
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Adjust the delay time as needed
    // Clean up the timer if the query changes before the delay is reached
    return () => clearTimeout(timer);
  }, [query]);

  
  const HandleSearch = (querys: any) => {
    // Implement your search logic here based on the query.
    setQuery(querys);
  };

  const HandleFilter = (product: any, varietys?: any) => {
    setProductType(mappingProductType[product]);
   
    setVariety(varietys);
   
  };

  const handleExport = () => {
    // Implement your search logic here based on the query.
    const BASE_URL = process.env.REACT_APP_BACKEND_API;
    let url = ''
    if (type === "pending-transactions"){
      url = `${BASE_URL}/pending-transactions/${mode}/export`;
    }else{
      url = `${BASE_URL}/all-transactions/export`;
    }
    
    const queryParams: any = {};

    // Check if the query state is not empty and add it to the queryParams object
    if (query) {
      queryParams.search = query;
    }

    // Check if the productType state is not empty and add it to the queryParams object
    if (productType) {
      queryParams.product = productType;
    }

    // Check if the variety state is not undefined and add it to the queryParams object
    if (variety !== undefined) {
      queryParams.variety = variety;
    }

    // Convert the queryParams object into a query string
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');

    if (queryString) {
      url += `?${queryString}`;
    }
    console.log(url,"url i am sending to")
    window.location.href = url;
  };

  return (
    <div className='ml-3 flex flex-col w-full'>
      <div className='flex w-full'>
        {/* Search and Filter components */}
        <Search query={query} setSearch={setQuery} page={currentPage} setPage={setCurrentPage} />
        <Filter product={productType} variety={variety} onFilter={HandleFilter}/>
      </div>
      <Export onExport={handleExport} />
      <div className='w-full mt-2'>
        {/* Pagination Component */}
        {pendingTransactionLoading ? (
          <div className='w-full mt-2'>
            {/* Pagination Component */}
            Loading
          </div>
        ) : !data ? (
          <div> No Data</div>
        ) : (
          <PaginationComponent
            mode={mode}
            pendingTransaction={data}
            setPage={setCurrentPage}
            currentPage={currentPage}
            type={type}
          />
        )}
      </div>
    </div>
  );
  // Add a message for no data

  // Render the appropriate components based on the mode
};

export default Generic;
