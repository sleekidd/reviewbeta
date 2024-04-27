import React from "react";
import "./HeroSection.css"; // Import CSS file for styling

const HeroSection: React.FC<{
  title: string;
  subtitle: string;
  backgroundImg: string;
}> = ({ title, subtitle, backgroundImg }) => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="hero-content">
        <h4>{subtitle}</h4>
        <h1>{title}</h1>
          <form className="search-form">
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
          </form>
      </div>
    </div>
  );
};

export default HeroSection;
