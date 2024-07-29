import React, { useState } from 'react';
import Exclamation from '../../assets/images/exclamation.svg';
import BetterLife from '../../assets/images/BetterLife.png';

const MultiModal = ({ isOpen, onSubmit, type }: any) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='modal-overlay absolute inset-0 bg-gray-800 opacity-50'></div>
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='w-[400px]'>
          <div className='modal-content bg-white rounded-lg shadow-md p-4'>
            <div className='flex justify-center'>
              {type === 'reason' ? (
                <div className='flex flex-col items-center'>
                  <img
                    width='88px'
                    height='88px'
                    src={Exclamation}
                    alt='exclamation'
                  />
                  <span className='text-center'>
                    Please type your reason for your edit
                  </span>
                </div>
              ) : (
                <div>
                  {
                  type === "flag" ? (
                    <h2 className='text-lg font-regular mb-4 text-center mt-4'>
                    Transaction Flagged Succesfully
                  </h2>
                  ): (
                    <h2 className='text-lg font-regular mb-4 text-center mt-4'>
                    Transaction Approved Succesfully
                  </h2>
                  )}
                  <div className='flex justify-center'>
                    <img
                      width='88px'
                      height='88px'
                      src={BetterLife}
                      alt='exclamation'
                    />
                  </div>
                </div>
              )}
            </div>
            <div className='flex justify-center mt-[30px] mb-[10px]'>
              <button
                onClick={onSubmit}
                className='bg-gray-100 hover:bg-gray-200 border-1 border-green-300 text-green-500 px-4 py-2 rounded-md mr-2'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiModal;
