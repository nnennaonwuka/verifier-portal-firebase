import {useState} from "react"
import { logout } from 'src/redux/user/hooks';


function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        type="button"
        className="text-gray-800 hover:text-gray-600 focus:outline-none mt-4"
      >
        {/* Inverted Triangle SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 inline ${
            isOpen ? 'rotate-180' : ''
          } transition-transform`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button onClick={() => logout()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;