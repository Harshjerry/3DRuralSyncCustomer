import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import ServiceList from "./Pages/ServiceList/ServiceList";
import CustomerDashboard from "./Pages/CustomerDashboard/CustomerDashboard";
import Cart from "./Pages/cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProfilePage from "./Pages/Profile";
import Three from "./Pages/Three";
import Login3D from "./Pages/Login3d";
import Register3D from "./Pages/Register3d";
import SingleService from "./Pages/SingleService/SingleService";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Three/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/customerdb" element={<CustomerDashboard />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/login3d" element={<Login3D />} />
      <Route path="/register3d" element={<Register3D />} />
      <Route path="/singleService/:id/" element={<SingleService />} />
    </Routes>
  );
}

export default App;
