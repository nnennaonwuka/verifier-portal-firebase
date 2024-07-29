import React,{useState,useEffect,useRef} from 'react';
import { useSelector } from 'react-redux';
import { userAuthInfo } from 'src/redux/user/reducer';
import Avater from 'src/assets/images/avater.png';
import AvaterComponent from 'src/components/AvaterComponent';
import SideBar from 'src/components/SideBar';
import Dropdown from 'src/components/Dropdown';



function DashboardLayout({ children, showAvatar = true }: any) {
  const user = useSelector(userAuthInfo);
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLElement | null>(null);;

  useEffect(() => {
    function handleClickOutside(event:any) {
      if (sidebarRef.current && !sidebarRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <React.Fragment>
      {user ? (
        <div className='flex flex-row'>
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} sidebarRef={sidebarRef} />

          <div className='w-full flex flex-col '>
            <div className='flex flex-row bg-[#F8DF3F] p-4 '>
              <div className='flex flex-row justify-center items-center text-bold w-4/5'>
                <p className='text-[24px] font-semibold font-feather'>
                  Verifier Portal
                </p>
              </div>
              <div className='flex flex-end'>
                <AvaterComponent
                  imageUrl={Avater}
                  name={user.username}
                  role={user.role}
                />
               <Dropdown/>
              </div>
            </div>

            {children}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default DashboardLayout;
