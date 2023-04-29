import { useContext } from "react";
import { Context } from "../Context/State";

export default function CustomProgress({ action, current }) {
  // let { progress } = useContext(Context);
  const currentLocation = Object.keys(action).indexOf(current) - 1;

  return (
    <div
      className={"customProgress" + (current === "dashboard" ? " d-none" : "")}
    >
      <div className="progress-line">
        <span className="current" style={{ "--current": currentLocation }} />
      </div>
      <div className="progress-circles">
        <span
          className={"circle" + (currentLocation === 0 ? " active" : "")}
          style={{ "--i": 0 }}
        />
        <span
          className={"circle" + (currentLocation === 1 ? " active" : "")}
          style={{ "--i": 1 }}
        />
        <span
          className={"circle" + (currentLocation === 2 ? " active" : "")}
          style={{ "--i": 2 }}
        />
      </div>
      <div className="progress-items">
        <p className={currentLocation === 0 ? "active" : ""}>
          <i className="fa-regular fa-envelope" />
          Choose Template
        </p>
        <p className={currentLocation === 1 ? "active" : ""}>
          <i className="fa-regular fa-circle-up" />
          Upload Photo
        </p>
        <p className={currentLocation === 2 ? "active" : ""}>
          <i className="fa-solid fa-gears" />
          Build Resume
        </p>
      </div>
    </div>
  );
}
