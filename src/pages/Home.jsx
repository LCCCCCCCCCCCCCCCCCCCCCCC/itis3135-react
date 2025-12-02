import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <main>
        <h2>Home</h2>
        <p>This is all the content for my ITIS 3135 class.</p>
        <p>Welcome to my course homepage where you can find information about my web development projects and assignments.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;