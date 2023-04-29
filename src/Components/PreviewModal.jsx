import { useContext } from "react";
import { Context } from "../Context/State";
import AllTemplate from "./AllTemplates";

export default function PreviewModal({  show, loading, close }) {
  let { userDetails } = useContext(Context);

  return (
    <div className={"previewModalContainer" + (show ? " show" : "")}>
      <div className="card">
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            close();
          }}
        ></i>
        {/* <div className="card-header text-center">Shubham Singh Resume</div> */}
        <div className="card-body" style={{ padding: "5px 0 0 0" }}>
          <div
            className="preview"
            style={
              show && loading ? { overflow: "hidden" } : {}
            }
            id="chooseContent"
          >
            {loading && <div className="loadingPreview">
              <span></span>
              </div>}
            <AllTemplate full={show} val={userDetails.templateId} />
          </div>
        </div>
      </div>
    </div>
  );
}
