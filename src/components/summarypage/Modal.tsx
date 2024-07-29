import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, title, children}: any) => {
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
            <h2 className='text-lg font-regular mb-4 text-center mt-4'>Reason For Edit:</h2> 
              <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Type your reason for edit'
                className='w-full p-2 border rounded-md mb-2'
              />
            
            <div className='flex justify-center mt-[30px] mb-[30px]'>
              
                <button
                  onClick={onClose}
                  className='bg-gray-100 hover:bg-gray-200 border-1 border-green-300 text-green-500 px-4 py-2 rounded-md mr-2'
                >
                  Cancel
                </button>
             
              <button
                onClick={handleSubmit}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
