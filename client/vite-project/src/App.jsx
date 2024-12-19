
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './Student';
import AddStudent from './AddStudent';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/s" element={<Student />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<AddStudent />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
