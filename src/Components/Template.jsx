import FirstTemplate from "../assets/Templates/first.jpg";
import SecondTemplate from "../assets/Templates/second.jpg";
import ThirdTemplate from "../assets/Templates/third.jpg";
import { useContext } from "react";
import { Context } from "../Context/State";

export default function Template() {
  let { goTo, setUserDetails, userDetails } = useContext(Context);

  const Template = ({ propImage, propId }) => {
    return (
      <div className="template">
        <span
          className="select"
          onClick={() => {
            setUserDetails((prev) => {
              return { ...prev, templateId: propId };
            });
            if (userDetails.imgSrc === "" && userDetails.tempImgSrc === "")
              goTo("photo");
            else goTo("build");
          }}
        >
          select
        </span>
        <img src={propImage} alt="Resume Template" />
      </div>
    );
  };

  return (
    <>
     
      <div className="content text-center">
        <div className="container" style={{ width: "80%" }}>
          <h1 className="container-heading">Choose your Template</h1>
          <p className="text-muted">
            Our Templates are <span>Professional</span> and catches the eyes of{" "}
            <span>Recruiter</span>
          </p>
          <div className="templateContainer">
            <Template propImage={FirstTemplate} propId={1} />
            <Template propImage={SecondTemplate} propId={2} />
            <Template propImage={ThirdTemplate} propId={3} />
          </div>
        </div>
      </div>
    </>
  );
}
