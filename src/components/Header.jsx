import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>ITIS3135 | Cai Li's | Learning Crab</h1>
      <p>Learning Crab Web Development</p>
      
      <nav>
        <Link to="/">Home</Link>
        <Link to="/introduction">Introduction</Link>
        <Link to="/contract">Contract</Link>
      </nav>
    </header>
  );
}

export default Header;