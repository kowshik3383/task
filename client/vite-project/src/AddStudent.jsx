import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from './StudentSlice';
import { useNavigate, useParams } from 'react-router-dom';

function AddStudent({ closeModal, isModalOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    id ? state.students.items.find((item) => item.id === id) : null
  );

  const [formData, setFormData] = useState({
    name: '',
    cohort: '',
    course: '',
    status: 'ACTIVE',
  });

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateStudent({ id, student: formData }));
    } else {
      dispatch(addStudent(formData));
    }
    navigate('/');
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0  bg-gray-500 bg-opacity-50 transition-all duration-300 ${isModalOpen ? 'block' : 'hidden'}`}
      onClick={closeModal}
    >
      <div
        className={`fixed right-0 top-0 w-96 h-screen bg-white shadow-xl p-6 transition-transform transform ${isModalOpen ? 'translate-x-0' : 'translate-x-full'} duration-300`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Student</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-2"
              placeholder="Enter student name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cohort" className="block text-sm font-medium text-gray-700">
              Cohort
            </label>
            <input
              type="text"
              id="cohort"
              name="cohort"
              value={formData.cohort}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-2"
              placeholder="Enter cohort"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-2"
              placeholder="Enter course name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-2"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="GRADUATED">Graduated</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
