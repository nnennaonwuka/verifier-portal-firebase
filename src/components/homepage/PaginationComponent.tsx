import React, { useState, useEffect } from 'react';
import { QueryCache } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'src/redux/user/reducer';

const mappingModeType: any = {
  scaling: 'scaler',
  receiving: 'receiver',
  allTransactions: 'all-transactions',
};

const PaginationComponent = ({
  type,
  mode,
  pendingTransaction,
  setPage,
  currentPage,
}: any) => {
  // Use the hook to fetch pending transactions
  const user: any = useSelector(userAuthInfo);
  const totalPages = Math.ceil(pendingTransaction[1] / 10);
  const page = 1; // Set the initial page
  const itemsPerPage = 10; // Set the number of items per page

  // } else
  // {
  // Calculate total pages based on pendingTransaction data
  let currentData: any = [];
  if (pendingTransaction) {
    currentData = pendingTransaction[0];
  }
  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };
  // Define TypeScript types for the processingDate and status
  type ProcessingDate = string; // Modify this type as needed
  type Status = JSX.Element;

  // Helper function to calculate the status
  const calculateStatus = (
    processingDate: ProcessingDate,
    waybillId: string,
    is_approved: number,
    types: string
  ): JSX.Element => {
    const today = new Date();
    const processedDate = new Date(processingDate);
    const daysDifference = Math.ceil(
      (today.getTime() - processedDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Get the navigate function from React Router

    // Determine the route based on the tab

    if (is_approved === 2) {
      return user.role === 'Admin' ? (
        <NavLink
          to={`/pending-transaction/${mappingModeType[types]}/${waybillId}`}
          className='bg-[#FF4B4B] text-white rounded-md py-[12px] px-[18px] hover:bg-[#bf3636] font-semibold cursor-pointer'
        >
          Flagged
        </NavLink>
      ) : (
        <div className=' inline bg-[#FF4B4B] text-white rounded-md py-[12px] px-[18px] font-semibold'>
          Flagged
        </div>
      );
    }

    if (is_approved === 1) {
      return user.role === 'Admin' ? (
        <NavLink
          to={`/pending-transaction/${mappingModeType[types]}/${waybillId}`}
          className=' bg-[#5dff4b] text-black rounded-md py-[12px] px-[11px] hover:bg-[#459b3c] font-semibold cursor-pointer'
        >
          Approved
        </NavLink>
      ) : (
        <div className=' inline bg-[#5dff4b] text-black rounded-md py-[12px] px-[11px] font-semibold'>
          Approved
        </div>
      );
    } else if (daysDifference <= 3) {
      return (
        <NavLink
          to={`/pending-transaction/${mappingModeType[types]}/${waybillId}`}
          className='bg-[#F8DF3F] text-black rounded-md py-[12px] px-[36px] hover:bg-[#60571a] font-semibold cursor-pointer'
        >
          Due
        </NavLink>
      );
    } else {
      return (
        <NavLink
          to={`/pending-transaction/${mappingModeType[types]}/${waybillId}`}
          className='bg-[#FF4B4B] text-white rounded-md py-[12px] px-[18px] hover:bg-[#bf3636] font-semibold cursor-pointer'
        >
          Delayed
        </NavLink>
      );
    }
  };
  const renderTable = () => {
    // Replace this with your table rendering logic
    return (
      <div className='w-full mt-4'>
        <div className='w-[90%] '>
          <table className='w-full border-1'>
            <thead className='font-feather'>
              <tr>
                <th className='py-4 px-4 border-b border-gray-300'>
                  Waybill ID
                </th>
                <th className='py-4 px-4 border-b border-gray-300'>
                  Member R-ID
                </th>
                <th className='py-4 px-4 border-b border-gray-300'>
                  Product Type
                </th>
                <th className='py-4 px-4 border-b border-gray-300'>Variety</th>
                <th className='py-4 px-4 border-b border-gray-300'>
                  Processing Date
                </th>
                <th className='py-4 px-4 border-b border-gray-300'>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((item: any, index: any) => (
                <tr key={index} className='border-b border-gray-300'>
                  <td className='py-3 px-4'>{item.waybillid}</td>
                  <td className='py-3 px-4'>{item.memberrid}</td>
                  <td className='py-3 px-4'>{item.producttype}</td>
                  <td className='py-3 px-4'>{item.variety}</td>
                  <td className='py-3 px-4'>{item.processingdate}</td>
                  <td className='py-3 px-4 font-feather'>
                    {calculateStatus(
                      item.processingdate,
                      item.waybillid,
                      item.is_approved,
                      item.type
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-end mr-6 mt-3 mb-10'>
            <button
              className={`p-2 border-2 rounded-2 border-color-gray-2 ${
                currentPage === 1 ? 'bg-gray-300 text-gray-500' : ''
              }`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div>{renderPageNumbers()}</div>
            <button
              className={`p-2 border-2 rounded-2 border-color-gray-2 ${
                currentPage >= totalPages ? 'bg-gray-300 text-gray-500' : ''
              }`}
              onClick={handleNext}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(pendingTransaction[1] / 10); // Calculate the total number of pages

    // if (totalPages <= 1) {
    //   // Don't render page numbers if there is only one page
    //   return null;
    // }

    const pagesToDisplay = [];
   
    // Add the current page
    pagesToDisplay.push(currentPage);

    if (currentPage > 1) {
      // Add the previous page if not on the first page
      pagesToDisplay.unshift(currentPage - 1);
    }

    if (currentPage < totalPages) {
      // Add the next page if not on the last page
      pagesToDisplay.push(currentPage + 1);
    }

    const pageNumbers = [];
    let prevPage = 0;

    for (const page of pagesToDisplay) {
      
      pageNumbers.push(
        <button
          key={page}
          className={`px-4 py-2 border-2 rounded-2 ml-1 mr-1 border-color-[#59C903]${
            page === currentPage ? ' bg-[#59C903] ' : ''
          }`}
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      );
      prevPage = page;
    }

    return (
      <div className='flex justify-center items-center font-sans'>
        {pageNumbers}
      </div>
    );
  };

  return <div className='w-full '>{renderTable()}</div>;
  // }
};

export default PaginationComponent;
