
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from './authSlice';
import './NavBar.css';

const Navbar = () => {
//   const isAuthenticated = useSelector((state) => !state.auth.isAuthenticated);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Online BookStore</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        
      
        
          <>
          <li><Link to="/cart" className="nav-link">Cart</Link></li>
            {/* <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li> */}
          </>
        
      </ul>
    </nav>
  );
};

export default Navbar;
