import React, { useEffect, useState } from 'react';
import DashboardLayout from 'src/layout/dashboard';
// import Logo from 'src/assets/images/svg/logo.svg';
// import UserTab from 'src/components/dashboard/user-tab';
import Tabview from 'src/components/tabview';
import AllTransactions from 'src/components/homepage/AllTransaction';
import ScalingTab from 'src/components/homepage/scaling';
import { useNavigate, useParams } from 'react-router-dom';
// import GroupTab from '../../components/dashboard/group-tab';

function AllTransaction() {
  return (
    <DashboardLayout>
      <div className=' flex-col bg-[#F7F8F4] '>
        <div className='flex flex-col mt-[80px]'>
          <div className='flex items-center'>
            <span className='text-[24px] font-bold ml-3 font-feather'>
              All Transactions
            </span>
          </div>
          <div>
            <div className='mt-3'>
              <AllTransactions/>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AllTransaction;
