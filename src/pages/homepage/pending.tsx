import React, { useEffect, useState } from 'react';
import DashboardLayout from 'src/layout/dashboard';
// import Logo from 'src/assets/images/svg/logo.svg';
// import UserTab from 'src/components/dashboard/user-tab';
// import Tabview from 'src/components/tabview';
// import TopicTab from 'src/components/dashboard/topic-tab';
// import GroupTab from '../../components/dashboard/group-tab';

function PendingTransaction() {
  const [activeTab, setActiveTab] = useState('1');

  const EmptyTab = () => {
    return <div></div>;
  };



  return (
    <DashboardLayout>
      <div className='flex flex-col h-[88vh] bg-[#F7F8F4]'>
        <div className='flex flex-row'>
          <div className='flex items-center'>
            <img src='test' alt='test' width={'150px'} />
            <span className='header-2 ml-3'> Welcome to Pending Transaction</span>
          </div>

          <div>
            <div className='mt-3'>test it out</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PendingTransaction;
