import classNames from 'classnames';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';

import { useNavigate } from 'react-router-dom';

interface TabViewProps {
  tabs: {
    title: string;
    route: string; // Add a 'route' property to specify the route for each tab
    Content?: React.FunctionComponent;
  }[];
  activeTab: string;
  setActiveTab: any;
}

function Tabview({ tabs, activeTab, setActiveTab }: TabViewProps) {
  const navigate = useNavigate(); // Get the navigate function from React Router

  return (
    <div className='w-full'>
      <Nav tabs className='w-full flex'>
        {tabs.map((item, index) => (
          <NavItem key={index}>
            <NavLink
              to={`/pending-transaction/${item.route}`} // Use the 'route' property to set the URL
              className={classNames('w-full flex h-[40px] items-end  px-4', {
                '!border-b-[3px] !border-b-primary font-normal text-[#F8DF3F]':
                activeTab === item.route,
              })}
              onClick={() => {
                setActiveTab(item.route)
                // Use navigate to change the URL when a tab is clicked
              }}
            >
              <span className='mb-2 font-feather'> {item.title}</span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab} className='mt-7'>
        {tabs.map(({ title, Content }, index) => (
          <TabPane key={index} tabId={(index + 1).toString()}>
            {Content ? <Content /> : null}
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
}

export default Tabview;
