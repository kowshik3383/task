import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, deleteStudent } from './StudentSlice';
import AddStudent from './AddStudent'; // import your AddStudent modal
import courses from './assets/courses.svg'; // Importing the SVG as an image
import { BiErrorCircle } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
function StudentList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.students);

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null); // Store student to delete

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = () => {
    if (studentToDelete) {
      dispatch(deleteStudent(studentToDelete));
      setIsDeleteModalOpen(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const formattedTime = date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
  
    return `${formattedDate} ${formattedTime}`;
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  const openDeleteModal = (studentId) => {
    setStudentToDelete(studentId); // Set student id for deletion
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex gap-4 flex-wrap">
          <select className="border border-gray-300 bg-gray-100 text-blue-900 font-semibold  rounded px-4 py-2">
            <option>AY 2024-25</option>
            <option>AY 2023-24</option>
            <option>AY 2022-23</option>
          </select>
          <select className="border border-gray-300 bg-gray-100 text-blue-900 font-semibold rounded px-4 py-2">
            <option>CBSE 9</option>
            <option>CBSE 10</option>
            <option>CBSE 11</option>
          </select>
        </div>
        {/* Button that triggers modal */}
        <button
          onClick={toggleModal}
          className="bg-gray-100 text-blue-900 font-semibold px-4 py-2 rounded hover:bg-blue-600 flex items-center mt-4 sm:mt-0"
        >
          <span className="mr-2">+</span> Add new Student
        </button>
      </div>

      {/* AddStudent Modal with sliding animation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-gray-800 opacity-50 absolute inset-0" onClick={toggleModal}></div>
          <div
            className="bg-white w-96 h-full fixed top-0 right-0 shadow-lg transform transition-transform duration-300"
            style={{ transform: isModalOpen ? 'translateX(0)' : 'translateX(100%)' }}
          >
            <AddStudent closeModal={toggleModal} isModalOpen={isModalOpen} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      onClick={closeDeleteModal}
    ></div>
    
    <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl transform transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BiErrorCircle className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Delete Student</h2>
          </div>
          <button 
            onClick={closeDeleteModal}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this student? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors flex items-center space-x-2"
          >
            <BiErrorCircle className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full sm:w-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Cohort</th>
              <th className="px-4 py-2 text-left">Courses</th>
              <th className="px-4 py-2 text-left">Date Joined</th>
              <th className="px-4 py-2 text-left">Last login</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.cohort}</td>
                <td className="px-4 py-2">
                <div className="flex bg-gray-100 h-12 w-32 items-center gap-3 p-2 rounded-lg">
  <img
    src={courses}
    alt="Course 1"
    className="w-8 h-8 rounded-full"
  />
  <span className="text-sm">{student.course}</span>
</div>

                </td>
                <td className="px-4 py-2">{formatDate(student.dateJoined)}</td>
                <td className="px-4 py-2">{formatDate(student.dateJoined)}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${student.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openDeleteModal(student.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
