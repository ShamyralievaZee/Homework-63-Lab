import { NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/Home/Home.tsx';
import './App.css';
import AboutUs from './containers/AboutUs/AboutUs.tsx';
import Contacts from './containers/Contacts/Contacts.tsx';
import EditPost from './containers/EditPost/EditPost.tsx';
import PostView from './components/PostView/PostView.tsx';
import Add from './containers/Add/Add.tsx';

const App = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg main-nav ">
        <div className="container">
          <NavLink className="navbar-brand logo" to="/">
            <h3>My Blog</h3>
          </NavLink>
          <div>
            <ul className="navbar-nav">

              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/new-post">Add</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About Us</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-post" element={<Add />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
          </Routes>
      </div>
    </div>
  );
};

export default App;
