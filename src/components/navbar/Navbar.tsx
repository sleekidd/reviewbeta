import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="navbar w-nav">
      <div className="container nav">
        <a href="/">
          <img
            alt="Reviewbeta"
            src="/static/movieapp/img/reviewbeta-logo.png"
            className="w-40 h-10"
          />
        </a>
        <div className="nav_desktop-links-wrapper">
          <a href="https://support.pollen.co" className="text-white">
            Deals
          </a>
          <a href="#" className="primary-nav_link-block">
            <div className="text-white">Events</div>
          </a>
          <a href="#" className="primary-nav_link-block">
            <div className="text-white">Login</div>
          </a>
          <a href="#" className="primary-nav_link-block">
            <div className="text-white">Sign up</div>
          </a>
        </div>
        <div className="hamburger-menu-wrapper">
          <a href="#" className="primary-nav_link-block">
            <div className="account-icon"></div>
          </a>
          <div className="menu-button w-nav-button">
            <div className="burger-icon w-icon-nav-menu"></div>
            <div className="burger is--us">
              <div className="burger-line-wrapper">
                <div className="burger-line is--white is--top"></div>
                <div className="burger-line is--white is--baseline"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav role="navigation" className="nav-menu w-nav-menu">
        <div className="nav-menu-wrapper">
          <div className="m-us-navigation-wrapper is--mobile-bottom-padding">
            <div className="m-us-navigation-collection-list-wrapper">
              <div className="m-us-navigation-collection-list">
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://support.pollen.co" className="mobile-nav-link">Support</a></div>
                </div>
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://next.pollen.co/login" className="mobile-nav-link">Log in</a></div>
                </div>
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://next.pollen.co/signup" className="mobile-nav-link">Sign up</a></div>
                </div>
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://pollen.co/covid" className="mobile-nav-link">Covid-19</a></div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-us-navigation-wrapper">
            <div className="m-us-navigation-collection-list-wrapper">
              <div className="m-us-navigation-collection-list">
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://pollen.co/experiences/all" className="mobile-nav-link is--subnav-link">All experiences</a></div>
                </div>
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://pollen.co/experiences/beach-breaks" className="mobile-nav-link is--subnav-link">Beach breaks</a></div>
                </div>
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://pollen.co/experiences/city-breaks" className="mobile-nav-link is--subnav-link">City breaks</a></div>
                </div>
                <div className="m-us-navigation-collection-item">
                  <div className="burger-wrapper"><a href="https://pollen.co/experiences/festivals" className="mobile-nav-link is--subnav-link">Festivals</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
