import React, { useState } from 'react';

interface FilterProps {
  onFilter: (productType: string, variety: string) => void;
}

type ProductVarietyMapping = Record<string, string[]>;

const Filter: React.FC<any> = ({product,variety, onFilter }) => {
  const [productType, setProductType] = useState('');
  const [varietys, setVariety] = useState('');
  const [isFilterChanged, setIsFilterChanged] = useState(false);

  // Create a mapping of product types to varieties
  const productVarietyMapping: ProductVarietyMapping = {
    Rice: ['Farou44'],
    Maize: ['SM15-F', 'SM15-G', 'SM15-C', 'cash local'],
    'Soya Bean': ['Silver variety', 'Mai Idan Fara'],
  };

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductType = e.target.value;
    setProductType(selectedProductType);
    if (product || variety) {
      setIsFilterChanged(true);
      handleClearFilter()
    }


    
    setProductType(selectedProductType);
    // Automatically select the first variety for the selected product type
  };

  const handleVarietyChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    const varietyType = e.target.value
    setVariety(varietyType)
    if (product || variety) {
      setIsFilterChanged(true);
      onFilter("", "")
    }
  }

  const handleClearFilter = () => {
    onFilter("", ""); // Clear variety
    setProductType("")
    setVariety("")
  };

  const handleFilter = () => {
    
    // Call the onFilter prop with the selected productType and variety
    onFilter(productType, varietys);
  };

  return (
    <div className='flex items-center ml-8 w-[30%]'>
      <div className='relative inline-block w-[40%]'>
        <select
          value={productType}
          onChange={handleProductTypeChange}
          className='appearance-none w-full bg-transparent border-1 rounded-2 border-[#999999] border-opacity-10 p-2'
        >
          <option value='' disabled hidden>
            Product Type
          </option>
          <option value='Rice'>Rice</option>
          <option value='Maize'>Maize</option>
          <option value='Soya Bean'>Soya Bean</option>
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#999999]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>
      <div className='ml-4 relative inline-block w-[38%]'>
        <select
          value={varietys}
          onChange={handleVarietyChange}
          className='appearance-none w-full bg-transparent border-1 border-[#999999] rounded-2 border-opacity-10 p-2'
        >
          <option value='' disabled hidden>
            Variety
          </option>
          {productVarietyMapping[productType] &&
            productVarietyMapping[productType].map((v, index) => (
              <option key={index} value={v}>
                {v}
              </option>
            ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#999999]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>
      {product || variety  ? (
        <button
          className='ml-2 p-3 w-[30%] hover:bg-[#fe5757] rounded-2 text-white bg-[#ff7c7c]'
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>
      ) : (
        <button
          className='ml-2 p-2 w-[30%] hover:bg-[#2b4b7a] rounded-2 text-white bg-[#428BFA]'
          onClick={handleFilter}
        >
          Filter
        </button>
      )}
    </div>
  );
};

export default Filter;
