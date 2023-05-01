import { Link } from "react-router-dom";
import FullLogo from "../assets/img/logo.png";
import LessLogo from "../assets/img/tie.png";
import { Context } from "../Context/State";
import { useContext } from "react";

export default function Sidebar() {
  const { userAction, sectionDetails, setCurrentSection } = useContext(Context);

  return (
    <aside className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered bg-white">
      <div className="navbar-vertical-container">
        <div className="navbar-vertical-footer-offset">
          <Link
            className="navbar-brand"
            to="/happiest_resume"
            aria-label="Front"
          >
            <img
              className="navbar-brand-logo"
              src={FullLogo}
              alt="Logo"
              data-hs-theme-appearance="default"
            />
            <img
              className="navbar-brand-logo"
              src={FullLogo}
              alt="Logo"
              data-hs-theme-appearance="dark"
            />
            <img
              className="navbar-brand-logo-mini"
              src={LessLogo}
              alt="Logo"
              style={{ width: "14px" }}
              data-hs-theme-appearance="default"
            />
            <img
              className="navbar-brand-logo-mini"
              src={LessLogo}
              alt="Logo"
              style={{ width: "14px" }}
              data-hs-theme-appearance="dark"
            />
          </Link>
          {/* End Logo */}
          {/* Navbar Vertical Toggle */}
          <button
            type="button"
            className="js-navbar-vertical-aside-toggle-invoker navbar-aside-toggler"
          >
            <i
              className="bi-arrow-bar-left navbar-toggler-short-align"
              data-bs-template='<div className="tooltip d-none d-md-block" role="tooltip"><div className="arrow"></div><div className="tooltip-inner"></div></div>'
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Collapse"
            />
            <i
              className="bi-arrow-bar-right navbar-toggler-full-align"
              data-bs-template='<div className="tooltip d-none d-md-block" role="tooltip"><div className="arrow"></div><div className="tooltip-inner"></div></div>'
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Expand"
            />
          </button>
          <div className="navbar-vertical-content">
            <div
              id="navbarVerticalMenu"
              className="nav nav-pills nav-vertical card-navbar-nav"
            >
              <div className="navbar-nav nav-compact" />
              {userAction?.map((k, i) => {
                return (
                  <div key={i}>
                    {i === 1 && (
                      <div>
                        <span className="dropdown-header mt-4">Pages</span>
                        <small className="bi-three-dots nav-subtitle-replacer" />
                      </div>
                    )}
                    <Link className="nav-link" to={"./" + k.url} role="button">
                      <i className={k.iconClass + " nav-icon"} />
                      <span className="nav-link-title">{k.title}</span>
                    </Link>
                    {i === 3 && (
                      <ul>
                        {sectionDetails.map((k, i) => (
                          <p
                            onClick={() => {
                              setCurrentSection(i);
                              document
                                .getElementById(
                                  "preview_" + k.title.toLowerCase()
                                )
                                ?.scrollIntoView({ block: "center" });
                            }}
                            style={{
                              display: "block",
                              margin: "5px 0",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                            key={k.title}
                          >
                            {k.title}
                          </p>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
