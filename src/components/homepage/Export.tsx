import React, { useState } from 'react';

const Export = ({ onExport }: any) => {
  const [type, setType] = useState('');

  const handleExport = () => {
    // Call the onFilter prop with the selected productType and variety
    onExport();
  };

  return (
    <div className='flex flex-col mt-3 '>
      <h2 className='mt-3'>Export Pending Transactions</h2>
      <div className='flex'>
        <div className='relative inline-block w-[30%]'>
          <div className='w-full bg-transparent border-1 border-[#999999] rounded-2 border-opacity-10 p-2'>
            Excel Workbook (*.xlsx)
          </div>
          
        </div>
        <button
          className='bg-[#58CC02] hover:bg-[#306d01] ml-4 w-[150px] rounded-2 text-white px-2 py-2'
          onClick={onExport}
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default Export;
