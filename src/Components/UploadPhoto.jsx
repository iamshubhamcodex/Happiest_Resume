import { useContext, useRef, useState } from "react";
import { Context } from "../Context/State";

import ReactCrop from "react-image-crop";
import { canvasPreview } from "./Cropper/canvasPreview";
import { useDebounceEffect } from "./Cropper/useDebounceEffect";
import { imgPreview } from "./Cropper/imgPreview";

import "react-image-crop/dist/ReactCrop.css";

export default function UploadPhoto() {
  let { setUserDetails, goTo } = useContext(Context);
  const [picData, setPicData] = useState({ label: undefined, src: "" });
  const [croppedImgSrc, setCroppedImgSrc] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(1 / 1);
  const [completedCrop, setCompletedCrop] = useState();
  const [skipped, setSkipped] = useState(false);
  const col = {
    small: "col-xl-4 col-md-6 col-sm-8 col-xs-12",
    large: "col-xl-8 col-md-12 col-sm-12 col-xs-12",
  };

  const setImg = (val) => {
    setUserDetails((prev) => {
      let src = val === "male" ? "/male.jpg" : "/female.jpg";
      return { ...prev, imgSrc: "", tempImgSrc: src };
    });
    goTo("build");
  };
  const handleFile = (e) => {
    var fileName = "";
    if (e.target.files && e.target.files.length > 0) {
      fileName = e.target.value.split("\\").pop();
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      setPicData((prev) => {
        return { ...prev, src: reader.result?.toString() || "" };
      });
    }

    if (fileName.length > 20)
      fileName = fileName.substring(0, 17) + "....." + fileName.substr(-7);

    if (fileName) setPicData({ label: fileName });
    else setPicData({ label: undefined });
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
        imgPreview(imgRef.current, completedCrop).then((res) => {
          setCroppedImgSrc(res);
        });
      }
    },
    100,
    [completedCrop]
  );
  return (
    <>
      {/* <div className="container-fluid flex-grow-1 mainWrapper"> */}
      {/* <div className="customProgress">
          <div className="progress-line">
            <span className="current" style={{ "--current": 1 }} />
          </div>
          <div className="progress-circles">
            <span className="circle" style={{ "--i": 0 }} />
            <span className="circle active" style={{ "--i": 1 }} />
            <span className="circle" style={{ "--i": 2 }} />
          </div>
          <div className="progress-items">
            <p>
              <i className="fa-regular fa-envelope" />
              Choose Template
            </p>
            <p className="active">
              <i className="fa-regular fa-circle-up" />
              Upload Photo
            </p>
            <p>
              <i className="fa-solid fa-gears" />
              Build Resume
            </p>
          </div>
        </div> */}
      <div className="content text-center">
        <div className="container">
          <h1 className="container-heading">
            {skipped ? "Choose" : "Upload "} Photo
          </h1>
          <p className="text-muted">
            Adding your <span>Photo</span> in your Resume increases the
            <span>attractiveness</span> of your Resume.
          </p>
          <div className="photoUpload uploaded my-5 row justify-content-center">
            {!skipped && (
              <div
                className={
                  "d-flex justify-content-between py-4 rounded-4 " +
                  (!!imgSrc ? col.large : col.small)
                }
              >
                <div className="uploadCard px-4">
                  <h2>Choose professional Photo of you</h2>
                  <label htmlFor="upload">
                    {picData.label ? picData.label : "Browse your Device"}
                  </label>
                  <input
                    onChange={handleFile}
                    id="upload"
                    className="input-file"
                    type="file"
                    accept="image/*"
                  />
                  <lottie-player
                    src="https://assets7.lottiefiles.com/temp/lf20_xYfV1x.json"
                    background="transparent"
                    speed={1}
                    classname="lottie"
                    loop
                    autoPlay
                  />
                  <p
                    onClick={() => {
                      setSkipped(true);
                    }}
                    className="text-muted skip"
                  >
                    Don't have Photo, skip for now
                  </p>
                </div>
                {!!imgSrc && (
                  <div className="cropper">
                    <h2>Image Cropper</h2>
                    <ReactCrop
                      maxWidth={150}
                      maxHeight={150}
                      crop={crop}
                      onChange={(percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={1 / 1}
                    >
                      <img
                        ref={imgRef}
                        className="imgCrop"
                        alt="Crop me"
                        src={imgSrc}
                      />
                    </ReactCrop>
                    {!!completedCrop && (
                      <>
                        <div className="imgPreview">
                          <canvas
                            ref={previewCanvasRef}
                            style={{
                              display: "none",
                              border: "1px solid black",
                              borderRadius: "3px",
                              padding: "7px 5px",
                              objectFit: "contain",
                              width: completedCrop.width,
                              height: completedCrop.height,
                            }}
                          />
                          <img
                            src={croppedImgSrc}
                            alt=""
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                          />
                        </div>
                        <button
                          className="photoUploadButton"
                          onClick={() => {
                            setUserDetails((prev) => {
                              return { ...prev, imgSrc: croppedImgSrc };
                            });
                            goTo("build");
                          }}
                        >
                          Continue
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
            {skipped && (
              <div
                className={
                  "d-flex justify-content-between py-4 rounded-4 " +
                  (!!imgSrc || skipped ? col.large : col.small)
                }
              >
                <div className="uploadCard gender px-4">
                  <h2>Choose your Gender</h2>
                  <div className="gender" style={{ display: "flex" }}>
                    <div
                      htmlFor="male"
                      className="lott"
                      onClick={() => setImg("male")}
                    >
                      <lottie-player
                        src="https://assets2.lottiefiles.com/packages/lf20_gslpxfoi.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                        style={{
                          cursor: "pointer",
                        }}
                        className="lottie"
                      ></lottie-player>
                    </div>
                    <div className="lott" onClick={() => setImg("female")}>
                      <lottie-player
                        src="https://assets6.lottiefiles.com/packages/lf20_pt810qkq.json"
                        background="transparent"
                        style={{
                          cursor: "pointer",
                        }}
                        className="lottie"
                        speed="1"
                        loop
                        autoplay
                      ></lottie-player>
                    </div>
                  </div>
                  <p
                    onClick={() => setSkipped(false)}
                    className="text-muted skip"
                  >
                    Want to upload.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
