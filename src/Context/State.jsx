import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const State = ({ children }) => {
  // *****************************VARIABLES *****************************
  const userStructure = {
    templateId: 0,
    imgSrc: "",
    tempImgSrc: "",
    details: [
      {
        name: "",
        email: "",
        mobile: "",
        title: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pin: "",
      },
      { objective: "" },
      { skills: [""] },
      {
        experiences: [
          {
            exdesignation: "",
            excname: "",
            exsdate: "",
            excdate: "",
            exdescription: "",
          },
        ],
      },
      { educations: [{ edcname: "", ediname: "", edcdate: "" }] },
    ],
  };
  const sectionStructure = [
    { title: "Basic Details", id: "basics" },
    { title: "Objective", id: "objective" },
    { title: "Skills", id: "skills", addmore: true, max: 7 },
    { title: "Experiences", id: "experiences", addmore: true, max: 10 },
    { title: "Educations", id: "educations", addmore: true, max: 5 },
  ];
  let [dataList, setDataList] = useState({
    skills: [],
    educationLevel: [],
    educationSchool: [],
    exDesignation: [],
    excname: [],
    exdescription: [],
  });
  const [mobileView, setMobileView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preveiwResume, setPreveiwResume] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  let resumeRef = useRef();
  let [setUD, setSetUD] = useState(false);
  const [setSD, setSetSD] = useState(false);
  let [userDetails, setUserDetails] = useState(userStructure);
  let [sectionDetails, setSectionDetails] = useState(sectionStructure);
  const [userAction, setUserAction] = useState(["dashboard"]);
  const [progress, setProgress] = useState({ current: 0 });
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [lastAlert, setLastAlert] = useState();

  // ****************************FUNCTIONS ****************************
  const createSection = (title, id) => {
    setSectionDetails((prev) => {
      prev.splice(id, 0, { title: title, id: title.toLowerCase() });
      return prev;
    });
    setUserDetails((prev) => {
      let tempDetails = prev.details;
      tempDetails.splice(id, 0, { title: title, value: "" });
      return { ...prev, details: tempDetails };
    });
    setCurrentSection(id);
    showAlert({
      show: true,
      message: "Addedd Section " + title,
      type: "success",
    });
  };
  const deleteCustom = (idk, i) => {
    setSectionDetails((prev) => {
      let tempDetails = [];

      prev.map((k, ai) => {
        if (ai !== i) tempDetails.push(k);
      });

      return tempDetails;
    });
    setUserDetails((prev) => {
      let tempDetails = [];

      prev.details.map((k, ai) => {
        if (ai !== i) tempDetails.push(k);
      });

      return { ...prev, details: tempDetails };
    });

    showAlert({
      show: true,
      message:
        "Deleted Section " + idk.substr(0, 1).toUpperCase() + idk.substr(1),
      type: "danger",
    });
  };
  const resetForm = (condition = true) => {
    setUserDetails((prev) => {
      return { ...prev, details: userStructure.details };
    });
    setSectionDetails(sectionStructure);
    window.localStorage.removeItem("userDetails");
    window.localStorage.removeItem("sectionDetails");
    if (condition)
      showAlert({
        show: true,
        message: "Reset all Form Details",
        type: "success",
      });
  };

  const handleChange = (selector, id, val, i, ai) => {
    switch (selector) {
      case "basics":
        setUserDetails((prev) => {
          let tempDetails = [];
          let tarr = {};
          tarr[id] = val;
          prev.details.map((k, ti) => {
            if (i === ti) {
              tempDetails.push({ ...k, ...tarr });
            } else tempDetails.push(k);
          });

          return { ...prev, details: tempDetails };
        });
        break;
      case "objective":
        setUserDetails((prev) => {
          let tempDetails = [];
          prev.details.map((k, ti) => {
            if (i === ti) {
              tempDetails.push({ objective: val });
            } else tempDetails.push(k);
          });
          return { ...prev, details: tempDetails };
        });
        break;
      case "skills":
        setUserDetails((prev) => {
          let tempDetails = [];
          let tarr = [];
          prev.details.map((k, ti) => {
            if (i === ti) {
              k.skills.map((ak, j) => {
                if (j === id) tarr.push(val);
                else tarr.push(ak);
              });
              tempDetails.push({ skills: tarr });
            } else tempDetails.push(k);
          });
          return { ...prev, details: tempDetails };
        });

        break;
      case "educations":
        setUserDetails((prev) => {
          let tempDetails = [];
          let tarr = [];
          let tempObj = prev.details[i].educations[ai];
          tempObj[id] = val;
          prev.details.map((k, ti) => {
            if (i === ti) {
              k.educations.map((ak, j) => {
                if (j === ai) tarr.push({ ...tempObj });
                else tarr.push(ak);
              });
              tempDetails.push({ educations: tarr });
            } else tempDetails.push(k);
          });
          return { ...prev, details: tempDetails };
        });
        break;
      case "experiences":
        setUserDetails((prev) => {
          let tempDetails = [];
          let tarr = [];
          let tempObj = prev.details[i].experiences[ai];
          tempObj[id] = val;
          prev.details.map((k, ti) => {
            if (i === ti) {
              k.experiences.map((ak, j) => {
                if (j === ai) tarr.push({ ...tempObj });
                else tarr.push(ak);
              });
              tempDetails.push({ experiences: tarr });
            } else tempDetails.push(k);
          });
          return { ...prev, details: tempDetails };
        });
        break;
      default:
        setUserDetails((prev) => {
          let tempDetails = [];
          prev.details.map((k, ti) => {
            if (i === ti) {
              tempDetails.push({ ...prev.details[i], value: val });
            } else tempDetails.push(k);
          });
          return { ...prev, details: tempDetails };
          return prev;
        });
        break;
    }
  };
  const addMore = (selector, i) => {
    let defaultValue = {
      skills: "",
      experiences: {
        exdesignation: "",
        excname: "",
        exsdate: "",
        excdate: "",
        exdescription: "",
      },
      educations: { edcname: "", ediname: "", edcdate: "" },
    };
    setUserDetails((prev) => {
      let tempObj = {};
      tempObj[selector] = [
        ...prev.details[i][selector],
        defaultValue[selector],
      ];
      let pds = prev.details[i][selector];
      let tempDetails = [];
      let empty = true;
      switch (selector) {
        case "skills":
          empty = pds[pds.length - 1] === "";
          break;
        case "educations":
          empty = pds[pds.length - 1].edcname === "";
          break;
        case "experiences":
          empty = pds[pds.length - 1].excname === "";
          break;
      }
      if (pds.length !== sectionDetails[i].max) {
        if (!empty) {
          // setUserDetails((prev) => {
          prev.details.map((k, ti) => {
            if (i === ti) {
              tempDetails.push(tempObj);
            } else tempDetails.push(k);
          });
          showAlert({
            show: true,
            message:
              "Added extra " +
              selector.substr(0, 1).toUpperCase() +
              selector.substr(1),
            type: "success",
          });
          return { ...prev, details: tempDetails };
          // });
        } else
          showAlert({
            show: true,
            message: "Please fill the Last Detail to create more",
            type: "danger",
          });
      } else
        showAlert({
          show: true,
          message:
            "You can fill up to maximum of " +
            sectionDetails[i].max +
            " details",
          type: "danger",
        });
      return prev;
    });
  };
  const deleteDetails = (selector, id, deli) => {
    setUserDetails((prev) => {
      let tempArr = [];
      let tarr = [];
      let tempObj = {};
      if (prev.details[id][selector].length !== 1) {
        prev.details.map((k, i) => {
          if (id === i) {
            prev.details[id][selector].map((k, j) => {
              if (deli !== j) tarr.push(k);
            });
            tempObj[selector] = tarr;
            tempArr.push(tempObj);
          } else {
            tempArr.push(k);
          }
        });
        showAlert({
          show: true,
          message:
            "Deleted " +
            selector.substr(0, 1).toUpperCase() +
            selector.substr(1),
          type: "danger",
        });
        return { ...prev, details: tempArr };
      } else {
        showAlert({
          show: true,
          message: "Can not delete last entry.",
          type: "danger",
        });
        return prev;
      }
    });
  };
  const goTo = (val) => {
    navigate(val);
  };
  const showAlert = (obj) => {
    setAlert(obj);
    // if (lastAlert) {
    //   clearTimeout(lastAlert);
    // }
    setLastAlert((prev) => {
      if (prev) clearTimeout(prev);
      return null;
    });
    let temp = setTimeout(() => {
      setAlert({ show: false, message: obj.message, type: obj.type });
    }, 4000);
    setLastAlert(temp);
  };
  useEffect(() => {
    let tempUserDetails = window.localStorage.getItem("userDetails");
    let tempSectionDetails = window.localStorage.getItem("sectionDetails");
    if (tempUserDetails && !setUD) {
      setUserDetails(JSON.parse(tempUserDetails));
      setSetUD(true);
    } else {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
    if (tempSectionDetails && !setSD) {
      setSectionDetails(JSON.parse(tempSectionDetails));
      setSetSD(true);
    } else {
      localStorage.setItem("sectionDetails", JSON.stringify(sectionDetails));
    }
  }, [userDetails, sectionDetails]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 960) {
        setMobileView(true);
        showAlert({
          show: true,
          message: "Please open in Desktop to see live Preview",
          type: "primary",
        });
      } else {
        setMobileView(false);
        showAlert({
          show: false,
          message: "",
          type: "",
        });
      }
    });
    if (window.innerWidth <= 960) {
      setMobileView(true);
      showAlert({
        show: true,
        message: "Please open in Desktop to see live Preview",
        type: "primary",
      });
    } else {
      setMobileView(false);
      showAlert({
        show: false,
        message: "",
        type: "",
      });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        mobileView,
        userDetails,
        setUserDetails,
        handleChange,
        goTo,
        sectionDetails,
        addMore,
        deleteDetails,
        dataList,
        setDataList,
        resetForm,
        loading,
        setLoading,
        createSection,
        preveiwResume,
        setPreveiwResume,
        alert,
        resumeRef,
        deleteCustom,
        userAction,
        setUserAction,
        progress,
        setProgress,
        currentSection,
        setCurrentSection,
        showAlert,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context };
export default State;
