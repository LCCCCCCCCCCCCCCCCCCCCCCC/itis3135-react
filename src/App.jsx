import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import Contract from './pages/Contract';

function App() {
  const basename = import.meta.env.PROD ? '/itis3135-react' : '';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/contract" element={<Contract />} />
      </Routes>
    </Router>
  );
}

export default App;