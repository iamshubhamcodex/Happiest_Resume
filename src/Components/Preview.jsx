import { useContext } from "react";
import { Context } from "../Context/State";
import AllTemplate from "./AllTemplates";
import PreviewModal from "./PreviewModal";

export default function Preview({
  setPreviewModalShow,
  previewModalShow,
  previewLoading,
}) {
  let { userDetails, mobileView } = useContext(Context);
  return (
    <>
      <div
        className="previewContainer"
        style={
          mobileView
            ? { display: "none", background: "#cfdee5" }
            : { background: "#cfdee5" }
        }
      >
        <div className="viewResume" onClick={() => setPreviewModalShow(true)}>
          <span
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
              transformOrigin: "50% 40%",
              rotate: "-45deg",
            }}
          >
            <i className="fa-solid fa-chevron-left" />
            <i className="fa-solid fa-chevron-right" />
          </span>
        </div>
        <div className="preview">
          <AllTemplate val={userDetails.templateId} />
        </div>
        <div className="actionBtns">
          <button className="download">
            <i className="fa-solid fa-arrow-down"></i> Download
          </button>
        </div>
      </div>

      <PreviewModal
        show={previewModalShow}
        loading={previewLoading}
        close={() => setPreviewModalShow(false)}
      />
    </>
  );
}
