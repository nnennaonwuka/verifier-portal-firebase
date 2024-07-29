import React from 'react';
import { NavLink } from 'react-router-dom';

type SideBarDropdownProps = {
  children: {
    id: number;
    label: string;
    link: string;
    icon: any;
  }[];
  activeItem: boolean;
};

const SidebarDropdown: React.FC<SideBarDropdownProps> = ({ children, activeItem }) => {
  return (
    <div className="mr-10">
      {children.map((child) => (
        <NavLink
          key={child.id}
          end
          to={child.link}
          className={({ isActive }) =>isActive ? 'flex pl-[30px] flex-row bg-[#F8DF3F] font-bold text-[#75748F] h-[40px] items-center '
          :
          'flex flex-row  font-bold text-[#75748F] pl-[30px]  h-[40px] items-center'}
        >
          <img src={child.icon} alt={child.label} className={'pr-[15px]'} />
          <span className='text-inherit text-center'> {child.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarDropdown;