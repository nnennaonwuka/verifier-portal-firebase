import React, { useState } from 'react';
// import fieldMapping from "src/pages/summarypage/index"

const fieldMapping: any = {
  waybillid: 'Waybill Id',
  memberrid: 'MemberRId',
  producttype: 'Product Type',
  variety: 'Variety',
  processingdate: 'Processing Date',
  collectioncenter: 'Collection Center',
  totalbagnumber: 'Total Bag Number',
  totalweightdifference: 'Total Weight Difference',
};

const VerifierModal = ({
  otherData,
  checkerData,
  dataType,
  onSubmit,
  isOpen,
  Flag,
  currentVerifierKey
}: any) => {
  const handleYes = () => {
    onSubmit(checkerData);
  };

  const handleNo = () => {
    onSubmit(otherData);
  };

  const handleFlag = () => {
    Flag();
  };

  return (
    <div className={`fixed inset-0 z-49 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='modal-overlay absolute inset-0 bg-gray-800 opacity-50'></div>
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='w-[400px]'>
          <div className='modal-content bg-white rounded-lg shadow-md p-4'>
            <h2 className='text-xl font-semibold mb-2 text-center mt-2'>
              Which of the data is correct
            </h2>
            <h3 className='text-center text-md text-gray-600 font-bold mb-2'>{fieldMapping[currentVerifierKey]}</h3>
            <div className='flex justify-between mx-3'>
              <div className=''>
                <p className='text-md text-gray-600 font-bold'>
                  {dataType === 'receiver' ? 'Receiver Data' : 'Scaler Data'}
                </p>
                <p className=''>{otherData}</p>
              </div>
              <div>
                <p className='text-md text-gray-600 font-bold'>Checker Data</p>
                <p className=''>{checkerData}</p>
              </div>
            </div>

            <div className='flex justify-center mt-[20px] mb-[10px]'>
              <button
                onClick={handleNo}
                className='bg-gray-100 hover:bg-gray-200 border-1 border-green-300 text-green-500 px-4 py-2 rounded-md mr-2'
              >
                {dataType === 'receiver' ? 'Receiver' : 'Scaler'}
              </button>

              <button
                onClick={handleYes}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
              >
                Checker
              </button>
            </div>
            <div className='flex justify-end text-sm mb-4'>
              <p>
                None are correct{' '}
                <button className='text-red-600 mr-3' onClick={Flag}>
                  Flag{' '}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifierModal;
