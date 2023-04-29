import Logo from "../assets/img/logo.png";
import User from "../assets/img/img6.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      id="header"
      className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-container navbar-bordered bg-white"
    >
      <div className="navbar-nav-wrap">
        {/* Logo */}
        <Link className="navbar-brand" to="/new_happiest" aria-label="Front">
          <img
            className="navbar-brand-logo"
            src={Logo}
            alt="Logo"
            data-hs-theme-appearance="default"
          />
          <img
            className="navbar-brand-logo"
            src={Logo}
            alt="Logo"
            data-hs-theme-appearance="dark"
          />
          <img
            className="navbar-brand-logo-mini"
            src={Logo}
            alt="Logo"
            data-hs-theme-appearance="default"
          />
          <img
            className="navbar-brand-logo-mini"
            src={Logo}
            alt="Logo"
            data-hs-theme-appearance="dark"
          />
        </Link>
        {/* End Logo */}
        <div className="navbar-nav-wrap-content-start">
          {/* Navbar Vertical Toggle */}
          <button
            type="button"
            className="js-navbar-vertical-aside-toggle-invoker navbar-aside-toggler"
          >
            <i
              className="bi-arrow-bar-left navbar-toggler-short-align"
              data-bs-template='<div class="tooltip d-none d-md-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Collapse"
            />
            <i
              className="bi-arrow-bar-right navbar-toggler-full-align"
              data-bs-template='<div class="tooltip d-none d-md-block" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Expand"
            />
          </button>
          {/* End Navbar Vertical Toggle */}
        </div>
        <div className="navbar-nav-wrap-content-end">
          {/* Navbar */}
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* Account */}
              <div className="dropdown">
                <div
                  onClick={() => setShowProfile((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                  className={
                    "navbar-dropdown-account-wrapper" +
                    (showProfile ? " show" : "")
                  }
                  id="accountNavbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded={showProfile ? "true" : "false"}
                  data-bs-auto-close="outside"
                  data-bs-dropdown-animation
                >
                  <div className="avatar avatar-sm avatar-circle">
                    <img
                      className="avatar-img"
                      src={User}
                      alt="Image Description"
                    />
                    <span className="avatar-status avatar-sm-status avatar-status-success" />
                  </div>
                </div>
                <div
                  className={
                    "dropdown-menu dropdown-menu-end navbar-dropdown-menu navbar-dropdown-menu-borderless navbar-dropdown-account" +
                    (showProfile ? " show" : "")
                  }
                  // aria-labelledby="accountNavbarDropdown"
                  style={{ right: "-15px" }}
                >
                  <div className="dropdown-item-text">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm avatar-circle">
                        <img
                          className="avatar-img"
                          src={User}
                          alt="Image Description"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-0">Mark Williams</h5>
                        <p className="card-text text-body">mark@site.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </div>
              </div>
              {/* End Account */}
            </li>
          </ul>
          {/* End Navbar */}
        </div>
      </div>
    </header>
  );
}
