import { Outlet, useLocation } from "react-router-dom";
import { Context } from "./Context/State";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import CustomProgress from "./Components/CustomProgress";

function App() {
  const location = useLocation();
  let { alert, setUserAction } = useContext(Context);
  const [isBuild, setIsBuild] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const actions = {
    dashboard: [
      { url: "dashboard", title: "Dashboard", iconClass: "bi-house-door" },
    ],
    template: [
      { url: "dashboard", title: "Dashboard", iconClass: "bi-house-door" },
      {
        url: "template",
        title: "Template",
        iconClass: "fa-regular fa-envelope",
      },
    ],
    photo: [
      { url: "dashboard", title: "Dashboard", iconClass: "bi-house-door" },
      {
        url: "template",
        title: "Template",
        iconClass: "fa-regular fa-envelope",
      },
      {
        url: "photo",
        title: "Upload Photo",
        iconClass: "fa-regular fa-circle-up ",
      },
    ],
    build: [
      { url: "dashboard", title: "Dashboard", iconClass: "bi-house-door" },
      {
        url: "template",
        title: "Template",
        iconClass: "fa-regular fa-envelope",
      },
      {
        url: "photo",
        title: "Upload Photo",
        iconClass: "fa-regular fa-circle-up ",
      },
      { url: "build", title: "Build Resume", iconClass: "fa-solid fa-gears" },
    ],
  };

  useLayoutEffect(() => {
    // console.clear();
    const current = window.location.href.split("happiest_resume/")[1];
    setCurrentLocation(current);
    setIsBuild(current === "build");
    setUserAction(actions[current]);
  }, [location]);

  return (
    <>
      <div
        className={"container-fluid alertContainer " + (alert.show ? "show" : "")}
        
      >
        <div
          style={{
            maxWidth: "max-content",
            margin: "0 auto",
          }}
          className={"alert alert-" + alert.type}
        >
          {alert.message}
        </div>
      </div>
      <Header />
      <Sidebar />
      <main className="main" id="content" role="main">
        <div
          className={
            "container-fluid flex-grow-1 mainWrapper" +
            (isBuild ? " build" : "")
          }
        >
          <CustomProgress action={actions} current={currentLocation} />
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
