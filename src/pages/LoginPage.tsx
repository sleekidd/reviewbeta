import React, { useEffect } from "react";
import LoginForm from "../components/forms/LoginForm";
// import Header from "../elements/Header";
import { isAuthenticated } from "../elements/auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profile"); // Redirect to profile if user is authenticated
    }
  }, [navigate]);

  return (
    <div>
      {/* <Header /> */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
