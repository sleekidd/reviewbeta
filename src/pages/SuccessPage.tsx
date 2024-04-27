import React from "react";
import Header from "../elements/Headerrr";

const SuccessPage: React.FC = () => {
  return (
    <div>
      <Header />
      <h2>Registration Successful!</h2>
      <p>
        Thank you for signing up. You can now login and start using our
        services.
      </p>
    </div>
  );
};

export default SuccessPage;
