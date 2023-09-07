import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import AddPost from './components/AddPost/AddPost';
import EditProfile from './components/EditProfile/EditProfile';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  const userLoggedIn = localStorage.getItem('userLoggedIn')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Navbar />
              {/* slider list*/}
              <Products title="Based on your last search" bgColor="#ebeeef" isSlider={true} />
              {/* all Products list*/}
              <Products title="Fresh recommendations" bgColor="#fff" />
            </>
          } />
        </Routes>
        <Routes>
          <Route path='/sell' element={userLoggedIn ? <AddPost /> :< Navigate to='/' />} />
        </Routes>
        <Routes>
          <Route path='/edit-profile' element={<EditProfile />} />
        </Routes>
        <Routes>
          <Route path='/product-details' element={<><Navbar /><ProductDetails /></>} />
        </Routes>
      </BrowserRouter >
      <Footer />
      <ToastContainer />

    </>
  );
}

export default App;
