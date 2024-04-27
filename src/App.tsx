import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import SuccessPage from "./pages/SuccessPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import CreateCategory from "./components/forms/CreateCategory";
import CreateCast from "./pages/CreateCast";
import CreateDirector from "./pages/CreateDirector";
import CreateGenre from "./pages/CreateGenre";
import CreateService from "./pages/CreateService";
import CreateItem from "./pages/CreateItem";
import Details from "./pages/Details";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/create-cast" element={<CreateCast />} />
          <Route path="/create-director" element={<CreateDirector />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/create-genre" element={<CreateGenre />} />
          <Route path="/create-item" element={<CreateItem />} />
          <Route path="/details" element={<Details />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
