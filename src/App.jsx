


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './NavBar';
import BookList from './BookList';
import BookDetails from './BookDetails';
import Cart from './Cart';
import Checkout from './CheckOut'; // Import Checkout component
// import Login from './Login';
// import Register from './Register';
//mport { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { login } from './authSlice';
const App = () => {
  // const dispatch = useDispatch();
  // const token = localStorage.getItem('userToken');
  // const isLoggedIn = !!token;

  // useEffect(() => {
  //   const email = localStorage.getItem('userEmail');
  //   if (email && token) {
  //     dispatch(login({ email, token }));
  //   }
  // }, [dispatch])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> 
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
