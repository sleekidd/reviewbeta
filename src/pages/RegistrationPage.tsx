import React, { useEffect }  from "react";
import RegistrationForm from "../components/forms/RegistrationForm";
// import Header from "../elements/Header";
import { isAuthenticated } from "../elements/auth";
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/'); // Redirect to dashboard if user is authenticated
    }
  }, [navigate]);
  
  return (
    <div>
      {/* <Header /> */}
        <RegistrationForm />
      </div>
  );
};

export default RegistrationPage;
