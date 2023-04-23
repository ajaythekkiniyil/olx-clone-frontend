import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';

function App() {
  return (
    <>
      <Navbar />
      {/* slider list*/}
      <Products title="Based on your last search" bgColor="#ebeeef" isSlider={true}/>
      {/* all Products list*/}
      <Products title="Fresh recommendations" bgColor="#fff"/>
      <Footer/>
    </>
  );
}

export default App;
