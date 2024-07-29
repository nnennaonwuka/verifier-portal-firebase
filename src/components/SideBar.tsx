import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'src/redux/user/reducer';
import BetterLife from 'src/assets/images/BetterLife.png';
import Transaction from 'src/assets/images/transaction.svg';
import allTransactions from 'src/assets/images/allTransactions.svg';
const SideBar = ({setIsOpen,isOpen,sidebarRef}:any) => {
  // const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const user = useSelector(userAuthInfo);

  const sidebarItems = [
    {
      id: 2,
      label: 'All Transactions',
      link: '/all-transactions',
      icon: allTransactions,
    },
    // Add more items as needed
  ];

  if (user && user.role !== 'Admin') {
    // Only include the "Pending transaction" link for non-admin users
    sidebarItems.unshift({
      id: 1,
      label: 'Pending transaction',
      icon: Transaction,
      link: '/pending-transaction',
    });
  }

  const handleItemClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  const handleClickInsideSidebar = (event:any) => {
    // Prevent the click event from propagating up to the document
    event.stopPropagation();
  };

  const isLinkActive = (link: any) => location.pathname.startsWith(link);

  return (
    <div
      ref={sidebarRef}
      onClick={handleClickInsideSidebar}
      className={`bg-white relative flex flex-col ${
        isOpen ? 'w-64' : 'w-16'
      } transition-width duration-300 ease-in-out`}
    >
      <div className='relative flex'>
        <div
          onClick={handleItemClick}
          className={`absolute right-5 top-6 cursor-pointer  p-3 ${
            isOpen ? 'transform rotate-45' : ''
          }`}
        >
          <div
            className={`bar absolute block w-6 h-1 mb-1  bg-gray-700 rounded ${
              isOpen ? 'rotate-[0deg] -translate-y-[0.2rem]' : 'top-2'
            }`}
          ></div>
          <div
            className={`bar absolute block w-6 h-1 mb-1 bg-gray-700 rounded ${
              isOpen ? 'hidden' : 'mt-2 top-2'
            }`}
          ></div>
          <div
            className={`bar absolute  block w-6 h-1 mb-1  bg-gray-700 rounded ${
              isOpen ? '-rotate-[95deg] -translate-y-[0.2rem]' : 'mt-2 top-4'
            }`}
          ></div>
        </div>
      </div>

      <div className={` flex ${isOpen ? ' mt-20 ml-5' : 'hidden'}`}>
        <img src={BetterLife} alt='' />
      </div>
      <div className={`flex flex-col ${isOpen ? '  ml-5 mt-8 ' : 'mt-16'}`}>
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <NavLink
              key={item.id}
              end
              to={item.link}
              className={({ isActive }) =>
                isLinkActive(item.link)
                  ? 'mt-2 flex flex-row bg-[#F8DF3F] font-bold text-[#75748F] h-10 items-center border-l-4 border-l-primary pl-3'
                  : 'mt-2 flex flex-row text-[#75748F] h-10 items-center pl-3'
              }
            >
              <div className={` ${isOpen ? ' pr-2 block' : ''}`}>
                <img src={item.icon} alt={item.label} />
              </div>
              <span className={` ${isOpen ? ' text-inherit block ' : 'hidden'} `}>{item.label}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
