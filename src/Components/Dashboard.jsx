import { Link } from "react-router-dom";
import { Context } from "../Context/State";
import { useContext, useState } from "react";

export default function Dashboard() {
  let { goTo, setDataList, setUserDetails, resetForm } = useContext(Context);

  const [uploadData, setUploadData] = useState({ label: undefined });

  const updateResume = (details) => {
    resetForm();
    setUserDetails((prev) => {
      let td = prev.details;
      td[0].name = details.Name[0] ? details.Name[0] : "";
      td[0].email = details.Email[0] ? details.Email[0] : "";
      td[0].mobile = details.Phone[0] ? details.Phone[0] : "";
      td[0].address = details.Address[0] ? details.Address[0] : "";
      td[0].title = details.Apply_For[0] ? details.Apply_For[0] : "";
      td[1].objective = details.Career_Objective;
      [0] ? details.Career_Objective : "";
      let tempEdu = [];
      let tempEx = [];
      td[2].skills = details.Skills;
      if (details.Education_Level[0])
        details.Education_Level.map((k) => {
          tempEdu.push({ edcname: k, ediname: "", edcdate: "" });
        });
      if (details.Work_Desgination[0])
        details.Work_Desgination.map((k) => {
          tempEx.push({
            exdesignation: k,
            excname: "",
            exsdate: "",
            excdate: "",
            exdescription: "",
          });
        });

      td[3].experiences = tempEx;
      td[4].educations = tempEdu;

      return { ...prev, details: td };
    });
    setDataList((prev) => {
      let toRet = {
        skills: details.Skills[0] ? [...details.Skills] : [],
        educationLevel: details.Education_Level[0]
          ? [...details.Education_Level]
          : [],
        educationSchool: details.Education_College_School[0]
          ? [...details.Education_College_School]
          : [],
        exDesignation: details.Work_Desgination[0]
          ? [...details.Work_Desgination]
          : [],
        exdescription: details.Work_Exp_summary[0]
          ? [...details.Work_Exp_summary]
          : [],
        excname: details.Work_Organisation[0]
          ? [...details.Work_Organisation]
          : [],
      };
      return { ...prev, ...toRet };
    });
  };
  const handleFile = async (e) => {
    var fileName = "";
    if (e.target.files && e.target.files.length > 0)
      fileName = e.target.value.split("\\").pop();

    if (fileName.length > 15)
      fileName = fileName.substring(0, 12) + "....." + fileName.substr(-7);

    if (fileName) setUploadData({ label: fileName });
    else setUploadData({ label: undefined });

    const bodyContent = new FormData();
    bodyContent.append("resume", e.target.files[0]);

    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch("http://happyhire.co.in/upload/resume/api", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    let details = data.data;
    updateResume(details);
    goTo("template");
  };

  return (
    <>
      <div className="content container-fluid">
        <div className="mb-4">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="page-header-title">Dashboard</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <h6 className="card-subtitle">Resume Viewed</h6>
                <div className="row align-items-center gx-2 mb-1">
                  <div className="col-6">
                    <h2 className="card-title text-inherit">72</h2>
                  </div>
                  <div className="col-6">
                    <div className="chartjs-custom" style={{ height: "3rem" }}>
                      <canvas
                        className="js-chart"
                        data-hs-chartjs-options='{
                        "type": "line",
                        "data": {
                           "labels": ["1 May","2 May","3 May","4 May","5 May","6 May","7 May","8 May","9 May","10 May","11 May","12 May","13 May","14 May","15 May","16 May","17 May","18 May","19 May","20 May","21 May","22 May","23 May","24 May","25 May","26 May","27 May","28 May","29 May","30 May","31 May"],
                           "datasets": [{
                            "data": [21,20,24,20,18,17,15,17,18,30,31,30,30,35,25,35,35,40,60,90,90,90,85,70,75,70,30,30,30,50,72],
                            "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
                            "borderColor": "#377dff",
                            "borderWidth": 2,
                            "pointRadius": 0,
                            "pointHoverRadius": 0
                          }]
                        },
                        "options": {
                           "scales": {
                             "y": {
                               "display": false
                             },
                             "x": {
                               "display": false
                             }
                           },
                          "hover": {
                            "mode": "nearest",
                            "intersect": false
                          },
                          "plugins": {
                            "tooltip": {
                              "postfix": "k",
                              "hasIndicator": true,
                              "intersect": false
                            }
                          }
                        }
                      }'
                      ></canvas>
                    </div>
                  </div>
                </div>
                <span className="badge bg-soft-success text-success">
                  <i className="bi-graph-up" /> 12.5%
                </span>
                <span className="text-body fs-6 ms-1">from 70,104</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <h6 className="card-subtitle">Improvement in Resume</h6>
                <div className="row align-items-center gx-2 mb-1">
                  <div className="col-6">
                    <h2 className="card-title text-inherit">29.4%</h2>
                  </div>
                  <div className="col-6">
                    <div className="chartjs-custom" style={{ height: "3rem" }}>
                      <canvas
                        className="js-chart"
                        data-hs-chartjs-options='{
                        "type": "line",
                        "data": {
                           "labels": ["1 May","2 May","3 May","4 May","5 May","6 May","7 May","8 May","9 May","10 May","11 May","12 May","13 May","14 May","15 May","16 May","17 May","18 May","19 May","20 May","21 May","22 May","23 May","24 May","25 May","26 May","27 May","28 May","29 May","30 May","31 May"],
                           "datasets": [{
                            "data": [21,20,24,20,18,17,15,17,30,30,35,25,18,30,31,35,35,90,90,90,85,100,120,120,120,100,90,75,75,75,90],
                            "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
                            "borderColor": "#377dff",
                            "borderWidth": 2,
                            "pointRadius": 0,
                            "pointHoverRadius": 0
                          }]
                        },
                        "options": {
                           "scales": {
                             "y": {
                               "display": false
                             },
                             "x": {
                               "display": false
                             }
                           },
                          "hover": {
                            "mode": "nearest",
                            "intersect": false
                          },
                          "plugins": {
                            "tooltip": {
                              "postfix": "k",
                              "hasIndicator": true,
                              "intersect": false
                            }
                          }
                        }
                      }'
                      ></canvas>
                    </div>
                  </div>
                </div>
                <span className="badge bg-soft-success text-success">
                  <i className="bi-graph-up" /> 1.7%
                </span>
                <span className="text-body fs-6 ms-1">from 29.1%</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <h6 className="card-subtitle">Jobs Applied</h6>
                <div className="row align-items-center gx-2 mb-1">
                  <div className="col-6">
                    <h2 className="card-title text-inherit">02</h2>
                  </div>
                  <div className="col-6">
                    <div className="chartjs-custom" style={{ height: "3rem" }}>
                      <canvas
                        className="js-chart"
                        data-hs-chartjs-options='{
                        "type": "line",
                        "data": {
                           "labels": ["1 May","2 May","3 May","4 May","5 May","6 May","7 May","8 May","9 May","10 May","11 May","12 May","13 May","14 May","15 May","16 May","17 May","18 May","19 May","20 May","21 May","22 May","23 May","24 May","25 May","26 May","27 May","28 May","29 May","30 May","31 May"],
                           "datasets": [{
                            "data": [25,18,30,31,35,35,60,60,60,75,21,20,24,20,18,17,15,17,30,120,120,120,100,90,75,90,90,90,75,70,60],
                            "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
                            "borderColor": "#377dff",
                            "borderWidth": 2,
                            "pointRadius": 0,
                            "pointHoverRadius": 0
                          }]
                        },
                        "options": {
                           "scales": {
                             "y": {
                               "display": false
                             },
                             "x": {
                               "display": false
                             }
                           },
                          "hover": {
                            "mode": "nearest",
                            "intersect": false
                          },
                          "plugins": {
                            "tooltip": {
                              "postfix": "k",
                              "hasIndicator": true,
                              "intersect": false
                            }
                          }
                        }
                      }'
                      ></canvas>
                    </div>
                  </div>
                </div>
                <span className="badge bg-soft-danger text-danger">
                  <i className="bi-graph-down" /> 4.4%
                </span>
                <span className="text-body fs-6 ms-1">from 61.2%</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5">
            <div className="card card-hover-shadow h-100">
              <div className="card-body">
                <h6 className="card-subtitle">Jobs In Progress</h6>
                <div className="row align-items-center gx-2 mb-1">
                  <div className="col-6">
                    <h2 className="card-title text-inherit">01</h2>
                  </div>
                  <div className="col-6">
                    <div className="chartjs-custom" style={{ height: "3rem" }}>
                      <canvas
                        className="js-chart"
                        data-hs-chartjs-options='{
                        "type": "line",
                        "data": {
                           "labels": ["1 May","2 May","3 May","4 May","5 May","6 May","7 May","8 May","9 May","10 May","11 May","12 May","13 May","14 May","15 May","16 May","17 May","18 May","19 May","20 May","21 May","22 May","23 May","24 May","25 May","26 May","27 May","28 May","29 May","30 May","31 May"],
                           "datasets": [{
                            "data": [21,20,24,15,17,30,30,35,35,35,40,60,12,90,90,85,70,75,43,75,90,22,120,120,90,85,100,92,92,92,92],
                            "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
                            "borderColor": "#377dff",
                            "borderWidth": 2,
                            "pointRadius": 0,
                            "pointHoverRadius": 0
                          }]
                        },
                        "options": {
                           "scales": {
                             "y": {
                               "display": false
                             },
                             "x": {
                               "display": false
                             }
                           },
                          "hover": {
                            "mode": "nearest",
                            "intersect": false
                          },
                          "plugins": {
                            "tooltip": {
                              "postfix": "k",
                              "hasIndicator": true,
                              "intersect": false
                            }
                          }
                        }
                      }'
                      ></canvas>
                    </div>
                  </div>
                </div>
                <span className="badge bg-soft-secondary text-body">0.0%</span>
                <span className="text-body fs-6 ms-1">from 2,913</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 mb-3 mb-lg-5" onClick={resetForm}>
            <div className="card h-100" style={{ overflow: "hidden" }}>
              <div
                onClick={() => goTo("template")}
                id="createCvButton"
                className="createCvButton"
              >
                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_sHWjfqhsHU.json"
                  background="transparent"
                  speed={1}
                  style={{ width: 300, height: 300 }}
                  loop
                  autoPlay
                />
                <span className="CreateNewCVButton__text my-2">
                  Create from Scratch
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mb-3 mb-lg-5" onClick={resetForm}>
            <div className="card h-100" style={{ overflow: "hidden" }}>
              <input
                type="file"
                onChange={handleFile}
                style={{
                  visibility: "hidden",
                  position: "absolute",
                  backgroundColor: "red",
                  width: "100%",
                  height: "100%",
                  zIndex: 5,
                }}
                accept="application/pdf"
                id="uploadResume"
              />
              <label
                htmlFor="uploadResume"
                id="createCvButton"
                className="createCvButton"
              >
                {!uploadData.label && (
                  <lottie-player
                    src="https://assets10.lottiefiles.com/packages/lf20_5mCfG6.json"
                    background="transparent"
                    speed={1}
                    style={{ width: 300, height: 300 }}
                    loop
                    autoPlay
                  />
                )}
                {uploadData.label && (
                  <>
                    <h4>Parsing your Resume</h4>
                    <lottie-player
                      src="https://assets10.lottiefiles.com/packages/lf20_usmfx6bp.json"
                      background="transparent"
                      speed="1"
                      style={{ width: 300, height: 250 }}
                      loop
                      autoplay
                    ></lottie-player>
                  </>
                )}
                <span className="CreateNewCVButton__text my-2 text-center">
                  {!uploadData.label && (
                    <p style={{ margin: "0" }}>
                      Drag and Drop <br />
                      OR <br />
                      Upload Resume
                    </p>
                  )}
                  {uploadData.label && "Choosen File: " + uploadData.label}
                </span>
              </label>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card mb-3 mb-lg-5">
              <div className="card-body">
                <div className="row align-items-md-center gx-md-5">
                  <div className="col-md-auto mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 ms-4">
                        <h5 className="display-4 text-dark mb-0">
                          40% <span style={{ fontSize: 12 }}>Completed</span>
                        </h5>
                        <p>
                          — Your Resume
                          <span className="badge bg-soft-danger text-dark rounded-pill ms-1">
                            is too short
                          </span>
                        </p>
                      </div>
                      <div className="flex-grow-1 ms-4">
                        <lottie-player
                          src="https://assets4.lottiefiles.com/private_files/lf30_LOw4AL.json"
                          background="transparent"
                          speed={1}
                          style={{ width: 100, height: 100 }}
                          loop
                          autoPlay
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 mb-lg-5">
              <div className="card-body">
                <div className="row align-items-md-center gx-md-5">
                  <div className="col-md-auto mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 mr-2">
                        <h5 className="display-6 text-dark mb-0">
                          Analyze your Resume with job <br />
                          you are applying!
                        </h5>
                        <button
                          type="button"
                          className="btn btn-primary mt-3 col-md-12"
                        >
                          Analyze Resume
                        </button>
                      </div>
                      <div className="flex-grow-1 ms-8">
                        <lottie-player
                          src="https://assets3.lottiefiles.com/packages/lf20_hQXKtu.json"
                          background="transparent"
                          speed={1}
                          style={{ width: 100, height: 100 }}
                          loop
                          autoPlay
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
