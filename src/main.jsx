import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import App from "./App";
import State from "./Context/State";
// import Dashboard from "./Components/Dashboard.jsx";
import Template from "./Components/Template.jsx";
import UploadPhoto from "./Components/UploadPhoto";
import Build from "./Components/Build";

import "./index.css";
import "./App.css";

const Dashboard = lazy(() => import("./Components/Dashboard.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "",
        element: <Link to="happiest_resume/dashboard" >Dashboard</Link>,
      },
      {
        path: "about",
        element: <h1>This is about page</h1>,
      },
      {
        path: "happiest_resume",
        element: (
          <>
            <State>
              <App />
            </State>
          </>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={"Loading Your Editor"}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "template",
            element: <Template />,
          },
          {
            path: "photo",
            element: <UploadPhoto />,
          },
          {
            path: "build",
            element: <Build />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
