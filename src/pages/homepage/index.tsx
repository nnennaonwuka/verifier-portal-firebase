import React, { useEffect, useState } from 'react';
import DashboardLayout from 'src/layout/dashboard';
// import Logo from 'src/assets/images/svg/logo.svg';
// import UserTab from 'src/components/dashboard/user-tab';
import Tabview from 'src/components/tabview';
import ReceivingTab from 'src/components/homepage/receiving';
import ScalingTab from 'src/components/homepage/scaling';
import { useNavigate, useParams } from 'react-router-dom';
// import GroupTab from '../../components/dashboard/group-tab';

function HomePage() {
  const { tab } = useParams(); // Read the tab parameter from the URL
  const navigate = useNavigate(); // Get the navigate function from React Router

  const [activeTab, setActiveTab] = useState(tab || 'receiver'); // Default to 'receiving' if tab is not in the URL

  // Update the URL when the activeTab changes
  useEffect(() => {
    navigate(`/pending-transaction/${activeTab}`);
  }, [activeTab, navigate,tab]);

  const EmptyTab = () => {
    return <div></div>;
  };

  const tabs = [
    {
      title: 'Receiver',
      route: 'receiver',
      Content: EmptyTab,
    },
    {
      title: 'Scaler',
      route: 'scaler',
      Content: EmptyTab,
    },
  ];

  return (
    <DashboardLayout>
      <div className=' flex-col w-full bg-[#F7F8F4] '>
        <div className='flex flex-col mt-[80px]'>
          <div className='flex items-center'>
            <span className='text-[24px] font-bold ml-3 font-feather'>
              {' '}
              Pending Transactions
            </span>
          </div>
          <div>
            <div className='mt-3'>
              {/* Assuming Tabview component sets the active tab using setActiveTab */}
              <Tabview
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            {activeTab === 'receiver' ? (
              <ReceivingTab />
            ) : activeTab === 'scaler' ? (
              <ScalingTab />
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HomePage;
