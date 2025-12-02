import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import Contract from './pages/Contract';
import Students from './pages/Students';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </Router>
  );
}

export default App;