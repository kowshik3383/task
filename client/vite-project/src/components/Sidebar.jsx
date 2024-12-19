import { useState } from 'react';
import logo from '../assets/logo.svg';
import dashboard from '../assets/dashboard.svg';
import students from '../assets/students.svg';
import chapter from '../assets/chapter.svg';
import help from '../assets/help.svg';
import reports from '../assets/reports.svg';
import settings from '../assets/settings.svg';
import { AiOutlineMenu } from 'react-icons/ai'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section
      className={`${
        isOpen ? 'w-64' : 'w-16'
      } h-screen bg-white shadow-lg transition-all duration-300 ease-in-out`}
>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className={`h-12 w-auto ${!isOpen && 'hidden'}`} />
        </div>
        <button
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu className="text-gray-500 text-3xl" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-1">
        <div className="flex items-center cursor-pointer space-x-4 px-6 py-3 hover:bg-gray-100">
          <img src={dashboard} alt="Dashboard" className="h-5 w-5" />
          {isOpen && <span className="text-gray-500 text-sm font-medium">Dashboard</span>}
        </div>

        <div className="flex cursor-pointer items-center space-x-4 px-6 py-3 bg-gray-100">
          <img src={students} alt="Students" className="h-5 w-5" />
          {isOpen && <span className="text-black text-sm font-bold">Students</span>}
        </div>

        <div className="flex cursor-pointer items-center space-x-4 px-6 py-3 hover:bg-gray-100">
          <img src={chapter} alt="Chapter" className="h-5 w-5" />
          {isOpen && <span className="text-gray-500 text-sm font-medium">Chapter</span>}
        </div>

        <div className="flex cursor-pointer items-center space-x-4 px-6 py-3 hover:bg-gray-100">
          <img src={help} alt="Help" className="h-5 w-5" />
          {isOpen && <span className="text-gray-500 text-sm font-medium">Help</span>}
        </div>

        <div className="flex cursor-pointer items-center space-x-4 px-6 py-3 hover:bg-gray-100">
          <img src={reports} alt="Reports" className="h-5 w-5" />
          {isOpen && <span className="text-gray-500 text-sm font-medium">Reports</span>}
        </div>

        <div className="flex cursor-pointer items-center space-x-4 px-6 py-3 hover:bg-gray-100">
          <img src={settings} alt="Settings" className="h-5 w-5" />
          {isOpen && <span className="text-gray-500 text-sm font-medium">Settings</span>}
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
