import { IoSearch } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import girl from "../assets/girl.svg";
import alert from "../assets/alert.svg";
import inbox from "../assets/in.svg"; 
import message from "../assets/message.svg";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-7 py-4 bg-white space-x-4 md:space-x-8">
    
      <div className="relative flex items-center shadow-md rounded-lg max-w-lg w-full">
        <input
          type="text"
          placeholder="Search your course"
          className="w-full pl-12 py-2 rounded-lg font-semibold bg-red-100 text-gray-500 outline-none"
        />
       
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <IoSearch className="text-xl" />
        </span>
      </div>

      <div className="flex items-center space-x-6">
    
        <GoQuestion className="text-xl text-gray-600 hidden sm:block" />
        
     
        <img src={message} alt="Messages" className="w-6 h-6" />
        
      
        <img src={inbox} alt="Inbox" className="w-6 h-6" />
      
        <img src={alert} alt="Alerts" className="w-6 h-6" />
        

        <div className="flex items-center space-x-2">
          <img src={girl} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-gray-800 hidden md:block">Adeline H. Dancy</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
