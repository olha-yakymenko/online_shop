// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css'
// const AdminNavbar = () => {
//   return (
//     <nav className="nav-logo">
//         <h1>Panel Administratora</h1>
//       <ul className="nav-menu">
//         <li>
//           <Link to="/admin">
//             Stan sklepu
//           </Link>
//         </li>
//         <li >
//           <Link to="/admin/report" >
//             Generowanie raportu
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };
// export default AdminNavbar;


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../../Context/UserContext';

const AdminNavbar = () => {
  const { logoutUser } = useContext(UserContext); // Pobieranie funkcji wylogowania z kontekstu

  return (
    <nav className="nav-logo">
      <h1>Panel Administratora</h1>
      <ul className="nav-menu">
        <li>
          <Link to="/admin">Stan sklepu</Link>
        </li>
        <li>
          <Link to="/admin/report">Generowanie raportu</Link>
        </li>
        <li>
          <button onClick={logoutUser} className="logout-button">Wyloguj</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
