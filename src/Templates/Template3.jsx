import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Context/State";

export default function Template3({ full }) {
  let { userDetails, sectionDetails } = useContext(Context);
  let { name, email, mobile, address, title, city, state, country } =
    userDetails.details[0];
  const [fresher, setFresher] = useState(false);
  const url = "https://happiestresume.com/public/resume_yellow/assets/imgs/";
  const images = [
    "about.png",
    "achievements.png",
    "work-experience.png",
    "education.png",
  ];


  const getIndex = (val) => {
    for (let i = 0; i < sectionDetails.length; i++)
      if (sectionDetails[i].title === val) return i;
  };

  useEffect(() => {

    setFresher(
      userDetails.details[getIndex("Experiences")].experiences[0]
        .exdesignation === ""
    );
  }, [userDetails]);

  return (
    <>
      <style>{`.template3 *{font-family:sans-serif;margin:0;padding:0}.template3{min-height: 100%}.template3 .header{height:120px;background:#ffc813;width:100%;gap:25px;}.template3 .header .name h2{font-size:25px;color:black;font-weight:700;text-align:right}.template3 .header .name p{color:#111;font-weight:300;text-align:right;font-size:17px}.template3${
        full ? " .A4" : ".notfull"
      } {background:#222;}.template3 .section .heading{border-radius:3px 3px 0 0;background:black;gap:20px;}.template3 .section .details{background:rgba(255,255,255,0.04);border-radius:0 0 3px 3px;border:1px solid #333;}.template3 .section .details p,.template3 .section .details li{color:#ccc}.template3 .section .details .date{color:#aaa}.template3 .section .details .botom{border-bottom: 1px solid #888}.template3 .section .details .botom:last-of-type{border:none}.template3 footer{position: absd olute;bottom:0;background:#ffc813;width:100%;text-align:center;}`}</style>
      <div
        className="template3 notfull"
        style={
          full
            ? { position: "absolute", visibility: "hidden" }
            : { }
        }
        id={full ? "contentFrom" : ""}
      >
        <div className="header d-flex align-items-center">
          <img
            src={
              userDetails.imgSrc !== ""
                ? userDetails.imgSrc
                : userDetails.tempImgSrc
            }
            alt=""
            style={{ height: "100%" }}
          />
          <div className="name flex-grow-1 px-4">
            <h2>
              {name !== "" ? name : !full ? "Shubham Singh" : "Enter Your Name"}
            </h2>
            <p>{title !== "" ? title : !full ? "React Developer" : ""}</p>
          </div>
        </div>
        {sectionDetails.map((k, i) => {
          if (i !== 0) {
            let sectionUser = userDetails.details[i];
            let sectionContent;
            switch (k.title) {
              case "Objective":
                sectionContent =
                  sectionUser.objective != "" ? (
                    <p>{sectionUser.objective}</p>
                  ) : !full ? (
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deleniti quidem accusamus, quisquam magnam at veritatis
                      hic, amet quod eius quas assumenda iste! Beatae atque
                      aliquam et ipsam, consequuntur ipsa similique!
                    </p>
                  ) : (
                    <p>Your Professional Summary please</p>
                  );
                break;
              case "Skills":
                sectionContent =
                  sectionUser.skills[0] !== "" ? (
                    <ul className="px-3">
                      {sectionUser.skills.map((k, i) => {
                        if (k !== "") return <li key={i}>{k}</li>;
                      })}
                    </ul>
                  ) : (
                    <ul className="px-3">
                      {!full ? (
                        <>
                          <li>Laravel</li>
                          <li>PHP</li>
                          <li>MYSQL</li>
                          <li>HTML CSS</li>
                        </>
                      ) : (
                        <li>Add atleast one Skill</li>
                      )}
                    </ul>
                  );
                break;
              case "Educations":
                sectionContent = (
                  <>
                    {sectionUser.educations[0].ediname !== "" ? (
                      <>
                        {sectionUser.educations.map((k, l) => {
                          return (
                            <>
                              <div
                                key={l}
                                className="top mb-1 d-flex align-items-center justify-content-between"
                              >
                                <h4 className="text-white">{k.edcname}</h4>
                                <p className="date">Completed in {k.edcdate}</p>
                              </div>
                              <div className="botom pb-2 mb-2 px-2">
                                <p>From{k.ediname}</p>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : !full ? (
                      <>
                        <div className="top mb-1 d-flex align-items-center justify-content-between">
                          <h4 className="text-white">12th</h4>
                          <p className="date">Completed in 2021</p>
                        </div>
                        <div className="botom pb-2 mb-2 px-2">
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Autem ipsa numquam eligendi iure quisquam!
                            Minus, dignissimos.
                          </p>
                        </div>{" "}
                        <div className="top mb-1 d-flex align-items-center justify-content-between">
                          <h4 className="text-white">B. Tech.</h4>
                          <p className="date">Completed in Persuing</p>
                        </div>
                        <div className="botom pb-2 mb-2 px-2">
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Autem ipsa numquam eligendi iure quisquam!
                            Minus, dignissimos.
                          </p>
                        </div>
                      </>
                    ) : (
                      <p>Add your maximum Qualification</p>
                    )}
                  </>
                );
                break;
              case "Experiences":
                sectionContent = (
                  <>
                    {" "}
                    {sectionUser.experiences[0].exdesignation !== "" ? (
                      <>
                        {sectionUser.experiences.map((k, l) => {
                          return (
                            <>
                              <div className="top mb-1 d-flex align-items-center justify-content-between">
                                <h4 className="text-white">
                                  {k.exdesignation}
                                </h4>
                                <p className="date">
                                  {k.exsdate}{" "}
                                  <span
                                    style={{ fontVariant: "all-small-caps" }}
                                  >
                                    till
                                  </span>{" "}
                                  {k.excdate}
                                </p>
                              </div>
                              <div className="botom pb-2 mb-2">
                                <div>
                                  <p>
                                    Worked in{" "}
                                    <span
                                      className="text-white"
                                      style={{
                                        display: "inline",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {k.excname}
                                    </span>
                                  </p>
                                  <p className="px-2">{k.exdescription}</p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="top mb-1 d-flex align-items-center justify-content-between">
                          <h4 className="text-white">React Developer</h4>
                          <p className="date">
                            2023-03{" "}
                            <span style={{ fontVariant: "all-small-caps" }}>
                              till
                            </span>{" "}
                            Present
                          </p>
                        </div>
                        <div className="botom pb-2 mb-2">
                          <div>
                            <p>
                              Worked in{" "}
                              <span
                                className="text-white"
                                style={{ display: "inline", fontWeight: 600 }}
                              >
                                WhiteForce Private Limited
                              </span>
                            </p>
                            <p className="px-2">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Exercitationem libero, nostrum veniam in
                              nisi sed eligendi facilis consequunt.
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                );
                break;
              default:
                sectionContent = (
                  <div
                    className="div-description"
                    dangerouslySetInnerHTML={{
                      __html: sectionUser.value,
                    }}
                  ></div>
                );
            }
            if (k.title === "Experiences") {
              if (!(full && fresher)) {
                return (
                  <div className="section py-3 px-4">
                    <div className="heading d-flex">
                      <img
                        style={{ width: 30, borderRadius: "3px 0 0 0" }}
                        src={url + images[i - 1]}
                        alt="Section Heading"
                      />
                      <h2 className="py-1 text-white">{k.title}</h2>
                    </div>
                    <div className="details px-3 py-2">{sectionContent}</div>
                  </div>
                );
              }
            } else
              return (
                <div className="section py-3 px-4">
                  <div className="heading d-flex">
                    <img
                      style={{ width: 30, borderRadius: "3px 0 0 0" }}
                      src={url + images[i - 1]}
                      alt="Section Heading"
                    />
                    <h2 className="py-1 text-white">{k.title}</h2>
                  </div>
                  <div className="details px-3 py-2">{sectionContent}</div>
                </div>
              );
          }
        })}
        <div className="section py-3 px-4">
          <div className="heading d-flex">
            <img
              style={{ width: 30, borderRadius: "3px 0 0 0" }}
              src="https://happiestresume.com/public/resume_yellow/assets/imgs/language.jpg"
            />
            <h2 className="py-1 text-white">Contact</h2>
          </div>
          <div className="details px-3 py-2">
            <div className="list my-2">
              <img
                src="https://happiestresume.com/public/resume_yellow/assets/imgs/phone-call.png"
                alt=""
                style={{ width: 15, filter: "drop-shadow(0 0 2px white)" }}
              />
              <p style={{ marginLeft: 25, display: "inline" }}>
                {mobile !== ""
                  ? "+91 " + mobile.substr(0, 5) + " " + mobile.substr(5)
                  : "+91 96853 48243"}
              </p>
            </div>
            <div className="list my-2">
              <img
                src="https://happiestresume.com/public/resume_yellow/assets/imgs/email.png"
                alt=""
                style={{ width: 15, filter: "drop-shadow(0 0 2px white)" }}
              />
              <p style={{ marginLeft: 25, display: "inline" }}>
                {email !== "" ? email : "shubhamsighcodex@gmail.com"}
              </p>
            </div>
            <div className="list my-2">
              <img
                src="https://happiestresume.com/public/resume_yellow/assets/imgs/location-pin.png"
                alt=""
                style={{ width: 15, filter: "drop-shadow(0 0 2px white)" }}
              />
              <p style={{ marginLeft: 25, display: "inline" }}>
                {address !== ""
                  ? `${address}${city !== "" ? ", " + city : ""}${
                      state !== "" ? ", " + state : ""
                    }${country !== "" ? ", " + country : ""}`
                  : "Near Bhedaghat Jabalpur, MP"}
              </p>
            </div>
          </div>
        </div>
       
      </div>
      {full && <div id={full ? "contentTo" : ""} className="template3"></div>}
    </>
  );
}
