import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Profile1 from "./pages/Profile1/Profile1";
import Users from "./pages/Users/Users";
import Courses from "./pages/Courses/Courses";
import CourseRegister from "./pages/CourseRegister/CourseRegister";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound/NotFound";
import Review from "./pages/Review/Review";
import MyCourses from "./pages/MyCourses/MyCourses";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Notifications from "./pages/Notifications/Notifications";
import Certificates from "./pages/Certificates/Certificates";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

import "./App.css";

function AppLayout() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/profile",
    "/profile1",
    "/cart",
    "/my-courses",
    "/course-details",
    "/certificates",
    "/notifications",
    "/admin-profile",
    "/users",
  ];

  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/profile1" element={<Profile1 />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin-profile" element={<AdminProfile />} />

        <Route path="/users" element={<Users />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/course-register" element={<CourseRegister />} />

        <Route path="/review" element={<Review />} />

        <Route path="/my-courses" element={<MyCourses />} />

        <Route
          path="/course-details/:courseName"
          element={<CourseDetails />}
        />

        <Route path="/certificates" element={<Certificates />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;