
import Sidebar from './Sidebar';

import Navbar from './Navbar';
import StudentList from '../Student';

const Home = () => {
  return (
    <>
  
      <div className="flex">

      <Sidebar />
        <div className="flex-1">
        
        <Navbar/>
         <StudentList/>
        </div>
      </div>
    </>
  );
};

export default Home;
