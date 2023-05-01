import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useContext, useRef, useState } from "react";
import { Context } from "../Context/State";
import CustomModel from "./CustomModel";

export default function Resume({ previewModalShow, setPreviewModalShow }) {
  let editable = useRef();
  let {
    dataList,
    userDetails,
    handleChange,
    sectionDetails,
    addMore,
    deleteDetails,
    createSection,
    deleteCustom,
    resetForm,
    mobileView,
    currentSection,
    setCurrentSection,
  } = useContext(Context);
  const [title, setTitle] = useState("Enter a title");
  const [customModalShow, setCustomModalShow] = useState(false);
  const objective = useRef();
  const lastSkill = useRef();
  const lastedu = useRef();
  const lastexp = useRef();

  const setHeight = () => {
    let textarea = objective.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const Component = (k, details, i) => {
    let component;
    switch (k.id) {
      case "basics":
        component = (
          <>
            <div className="row">
              <div className="col">
                <label htmlFor="name">Full Name</label>
                <input
                  value={details.name}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div className="col">
                <label htmlFor="email">Email Address</label>
                <input
                  value={details.email}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="title">Job Title</label>
                <input
                  value={details.title}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="title"
                  placeholder="Job Designation"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  value={details.mobile}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="mobile"
                  minLength={10}
                  maxLength={10}
                  placeholder="10 digit Mobile Number"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="address">Address</label>
                <input
                  value={details.address}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="address"
                  placeholder="Enter Permanent Address"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="city">City</label>
                <input
                  value={details.city}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="city"
                  placeholder="Enter City"
                  required
                />
              </div>

              <div className="col">
                <label htmlFor="state">State</label>
                <input
                  value={details.state}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="state"
                  placeholder="Enter State"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="country">Country</label>
                <input
                  value={details.country}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="country"
                  placeholder="Enter Country"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="pin">PIN Code</label>
                <input
                  value={details.pin}
                  onChange={(e) =>
                    handleChange("basics", e.target.id, e.target.value, i)
                  }
                  type="text"
                  id="pin"
                  placeholder="Enter 6digit PIN Code"
                  required
                />
              </div>
            </div>
          </>
        );
        break;
      case "objective":
        component = (
          <>
            <div className="row">
              <div className="col">
                <textarea
                  ref={objective}
                  rows={4}
                  onChange={(e) => {
                    setHeight();
                    handleChange("objective", "", e.target.value, i);
                  }}
                  value={details.objective}
                  placeholder="Write your professional Summary"
                />
              </div>
            </div>
          </>
        );
        break;
      case "skills":
        component = (
          <>
            {details.skills.map((k, si) => {
              return (
                <div className="row" key={si}>
                  <div className="col">
                    <input
                      {...(si === details.skills.length - 1 && {
                        ref: lastSkill,
                      })}
                      list="skillDrop"
                      required
                      value={k}
                      placeholder="Your Skill"
                      type="text"
                      onChange={(e) =>
                        handleChange("skills", si, e.target.value, i)
                      }
                      id="skill"
                    />
                    <button
                      className="deleteSkill"
                      onClick={() => deleteDetails("skills", i, si)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            <datalist id="skillDrop">
              {dataList.skills.map((k, i) => {
                return <option value={k} key={i}></option>;
              })}
            </datalist>
            {k.addmore && (
              <div className="addMore">
                <button
                  onClick={() => {
                    addMore("skills", i);
                    // lastSkill.current.focus();
                    setTimeout(() => lastSkill.current.focus(), 0);
                  }}
                >
                  <i
                    style={{
                      marginRight: "5px",
                      transform: "rotate(45deg)",
                    }}
                    className="fa-regular fa-circle-xmark"
                  ></i>
                  Add
                </button>
              </div>
            )}
          </>
        );
        break;
      case "experiences":
        component = (
          <>
            {details.experiences.map((k, si) => {
              return (
                <div className="subSection" key={si}>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="exdesignation">Designation</label>
                      <input
                        {...(si === details.experiences.length - 1 && {
                          ref: lastexp,
                        })}
                        list="exDesignation"
                        type="text"
                        placeholder="Designation"
                        id="exdesignation"
                        value={k.exdesignation}
                        onChange={(e) =>
                          handleChange(
                            "experiences",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="excname">Company Name</label>
                      <input
                        list="exCompany"
                        type="text"
                        placeholder="Company Name"
                        id="excname"
                        value={k.excname}
                        onChange={(e) =>
                          handleChange(
                            "experiences",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="exsdate">Starting Month</label>
                      <input
                        type="month"
                        id="exsdate"
                        value={k.exsdate}
                        onChange={(e) =>
                          handleChange(
                            "experiences",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                        placeholder="Starting Month"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="exedate">Ending Month</label>
                      <input
                        type="month"
                        name=""
                        id="excdate"
                        value={k.excdate}
                        onChange={(e) =>
                          handleChange(
                            "experiences",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                        placeholder="Ending Month"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="exdescription">Job Description</label>
                      <textarea
                        list="exDescDrop"
                        type="text"
                        id="exdescription"
                        value={k.exdescription}
                        onChange={(e) =>
                          handleChange(
                            "experiences",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                        placeholder="Job Description"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    className="delete"
                    onClick={() => deleteDetails("experiences", i, si)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              );
            })}
            <datalist id="exDesignation">
              {dataList.exDesignation.map((k, i) => {
                return <option value={k} key={i}></option>;
              })}
            </datalist>
            <datalist id="exCompany">
              {dataList.excname.map((k, i) => {
                return <option value={k} key={i}></option>;
              })}
            </datalist>
            <datalist id="exDescDrop">
              {dataList.exdescription.map((k, i) => {
                return <option value={k} key={i}></option>;
              })}
            </datalist>
            {k.addmore && (
              <div className="addMore">
                <button
                  onClick={() => {
                    addMore("experiences", i);
                    setTimeout(() => lastexp.current.focus(), 0);
                  }}
                >
                  <i
                    style={{
                      transform: "rotate(45deg)",
                      marginRight: "5px",
                    }}
                    className="fa-regular fa-circle-xmark"
                  ></i>
                  Add
                </button>
              </div>
            )}
          </>
        );
        break;
      case "educations":
        component = (
          <>
            {details.educations.map((k, si) => {
              return (
                <div className="subSection" key={si}>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="ediname">Institute Name</label>
                      <input
                        {...(si === details.educations.length - 1 && {
                          ref: lastedu,
                        })}
                        list="educationScholol"
                        type="text"
                        id="ediname"
                        value={k.ediname}
                        onChange={(e) =>
                          handleChange(
                            "educations",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                        placeholder="Institute Name"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="edcname">Course Name</label>
                      <input
                        list="edcDrop"
                        type="text"
                        required
                        placeholder="Course Name"
                        id="edcname"
                        value={k.edcname}
                        onChange={(e) =>
                          handleChange(
                            "educations",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                      />
                    </div>{" "}
                    <div className="col">
                      <label htmlFor="edcdate">Completion Year</label>
                      <input
                        type="month"
                        required
                        placeholder="Completion Year"
                        id="edcdate"
                        value={k.edcdate}
                        onChange={(e) =>
                          handleChange(
                            "educations",
                            e.target.id,
                            e.target.value,
                            i,
                            si
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="delete"
                    onClick={() => deleteDetails("educations", i, si)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              );
            })}
            <datalist id="edcDrop">
              {dataList.educationLevel.map((k, i) => {
                return <option value={k} key={i}></option>;
              })}
            </datalist>
            <datalist id="educationScholol">
              {dataList.educationSchool.map((k, i) => {
                return <option value={k} key={i}></option>;
              })}
            </datalist>
            {k.addmore && (
              <div className="addMore">
                <button
                  onClick={() => {
                    addMore("educations", i);
                    setTimeout(() => lastedu.current.focus(), 0);
                  }}
                >
                  <i
                    style={{
                      transform: "rotate(45deg)",
                      marginRight: "5px",
                    }}
                    className="fa-regular fa-circle-xmark"
                  ></i>
                  Add
                </button>
              </div>
            )}
          </>
        );
        break;
      default:
        component = (
          <>
            <div className="subSection" style={{ border: "none" }}>
              <ReactQuill
                theme="snow"
                value={details.value}
                onChange={(e) => {
                  handleChange("custom", "", e, i);
                }}
              />
              <span
                style={{ marginTop: "10px" }}
                className="delete"
                onClick={() => deleteCustom(k.title, i)}
              >
                <i className="bi bi-trash3"></i>
              </span>
            </div>
          </>
        );
    }
    return component;
  };

  return (
    <div className="resumeForm d-flex flex-column">
      <h2 style={{ textAlign: "center" }}>
        <span
          ref={editable}
          suppressContentEditableWarning
          contentEditable="false"
          id="editable"
          onClick={() => editable.current.focus()}
          onFocus={() => {
            title === "Enter a title" ? setTitle("") : "";
          }}
          onBlur={() => {
            editable.current.contentEditable = false;
            editable.current.innerText !== ""
              ? setTitle(editable.current.innerText)
              : setTitle("Enter a title");
          }}
        >
          {title}
        </span>
        {title === "Enter a title" ? "" : " Resume"}
        <span
          className="edit"
          onClick={() => {
            editable.current.contentEditable = true;
            editable.current.focus();
          }}
        >
          EDIT
        </span>
      </h2>
      <div className="sectionContainer">
        {sectionDetails.map((k, i) => {
          let details = userDetails.details[i];

          let component = Component(k, details, i);

          if (i === currentSection)
            return (
              <div className="section" id={k.id} key={k.id}>
                <h3>{k.title}</h3>
                <div className="details">{component}</div>
              </div>
            );
        })}
      </div>
      <div className="navigationBtns">
        <button
          className="focus"
          onClick={() => setCurrentSection((i) => (i !== 0 ? i - 1 : i))}
        >
          <i className="bi bi-caret-left" style={{ marginRight: "7px" }}></i>
          Previous
        </button>
        <button
          className="focus"
          onClick={() =>
            setCurrentSection((i) =>
              i !== sectionDetails.length - 1 ? i + 1 : i
            )
          }
        >
          Next
          <i className="bi bi-caret-right" style={{ marginLeft: "7px" }}></i>
        </button>
      </div>
      <div className="actionBtns">
        <button className="actionBtn" onClick={() => setCustomModalShow(true)}>
          <i className="fa-regular fa-plus"></i>
          Add Section
        </button>
        <button className="actionBtn" onClick={resetForm}>
          <i className="fa-solid fa-rotate-right"></i>
          Reset
        </button>
        <button
          className="actionBtn"
          // onClick={() => saveDetails()}
        >
          <i className="fa-regular fa-floppy-disk"></i>
          Save
        </button>
        {mobileView && (
          <button
            className="actionBtn"
            onClick={() => setPreviewModalShow(true)}
          >
            <i className="fa-regular fa-eye"></i>
            View
          </button>
        )}
      </div>
      <CustomModel
        show={customModalShow}
        close={() => setCustomModalShow(false)}
        sectionDetails={sectionDetails}
        createSection={createSection}
      />
    </div>
  );
}
