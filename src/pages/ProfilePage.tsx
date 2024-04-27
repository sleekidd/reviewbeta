import React, { useEffect } from "react";
import Header from "../elements/Headerrr";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    };

    checkLoggedIn();
  }, [navigate]);

  return (
    <div>
      <Header />
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
