import React, { useState } from 'react';
import Exlamation from '../../assets/images/exclamation.svg';

const Modal = ({ isOpen, onClose, onSubmit, title, children }: any) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='modal-overlay absolute inset-0 bg-gray-800 opacity-50'></div>
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='w-[400px]'>
          <div className='modal-content bg-white rounded-lg shadow-md p-4'>
            <div className='flex justify-center'>
              <img
                width='88px'
                height='88px'
                src={Exlamation}
                alt='exclamation'
              />
            </div>

            <p className='text-xl font-semibold text-center'>{children}</p>
            <span className='text-sm text-center mt-3'>
              You won't be able to revert this
            </span>

            <div className='flex justify-center mt-3'>
              <button
                onClick={onClose}
                className='bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md mr-2'
              >
                No
              </button>

              <button
                onClick={handleSubmit}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
