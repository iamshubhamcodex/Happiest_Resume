import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Context/State";

export default function Template2({ full }) {
  let { userDetails, sectionDetails } = useContext(Context);
  let { name, email, mobile, address, title, city, state, country } =
    userDetails.details[0];
  const [fresher, setFresher] = useState(false);

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
      <style>{`.template2 .header{padding: 15px 20px}.template2{min-height: 100%}.template2 *{margin: 0;padding: 0}.template2 p, .template2 li{color:#222;margin: 0 ; font-size: 12px}.template2 .details .item{margin: 5px 0; padding: 0 3px;width: 32%; word-break: break-word}.template2  .yellow{border-bottom: 2px solid #ffcb00}.template2 .section .heading{position: relative;padding: 10px 0;}.template2 .section .heading>span{ position: absolute; top:0;left:-20px;width:50px;height:50px;border-radius:50%;background:#ffcb00;z-index: 0}.template2 .section .heading h2{width:max-content;position:relative;color: #363636;}.template2 .section .sectionD .date{width: 25%;margin-right: 15px}.template2 .section .sectionD .degree{flex-grow: 1;}.template2 .section .heading h2::before{content:""; position:absolute; width: 60%; height: 2px; border-radius: 3px; background: #ffcb00; top: 110%;right:-20%;}.template2 .footer{margin:0;position:absolute;bottom:0px;text-align:center;background:yellow;height:max-content;color:#333;border-radius: 0 0 7px 7px}`}</style>

      <div
        style={
          full
            ? { position: "absolute", visibility: "hidden" }
            : { }
        }
        className="bg-white template2"
        id={full ? "contentFrom" : ""}
      >
        <div className="header d-flex yellow">
          <img
            src={
              userDetails.imgSrc !== ""
                ? userDetails.imgSrc
                : userDetails.tempImgSrc
            }
            alt="Your Photo"
            style={{ width: "60px", marginRight: "15px" }}
          />
          <div className="header-side d-flex justify-content-center flex-column">
            <h2 style={{ fontSize: "28px", color: "#363636", margin: "0" }}>
              {name !== ""
                ? name
                : !full
                ? "David Anderson"
                : "Enter Your Name"}
            </h2>
            <p style={{ fontSize: "15px" }}>
              {title !== "" ? title : !full ? "UX Designer" : ""}
            </p>
          </div>
        </div>
        <div className="details d-flex justify-content-between px-3 py-2 flex-wrap yellow">
          <div className="item" style={{ width: "25%" }}>
            <h4>Phone</h4>
            <p></p>
          </div>
          <div className="item" style={{ flex: ".5" }}>
            <h4>Email</h4>
            <p>{email !== "" ? email : "shubhamsighcodex@gmail.com"}</p>
          </div>
          <div className="item" style={{ flex: ".5" }}>
            <h4>Address</h4>
            <p>
              {address !== ""
                ? `${address}${city !== "" ? ", " + city : ""}${
                    state !== "" ? ", " + state : ""
                  }${country !== "" ? ", " + country : ""}`
                : "Near Bhedaghat Jabalpur, MP"}
            </p>
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
                      Architecto tempore neque error accusantium velit aut sunt
                      non, quisquam molestiae odit consectetur nihil. Voluptas
                      corrupti accusamus laborum error repudiandae minus quas!
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto tempore neque error accusantium
                    </p>
                  ) : (
                    <p>Your Professional Summary please</p>
                  );
                break;
              case "Skills":
                sectionContent =
                  sectionUser.skills[0] !== "" ? (
                    <ul style={{ paddingLeft: "20px" }}>
                      {sectionUser.skills.map((k, i) => {
                        if (k !== "") return <li key={i}>{k}</li>;
                      })}
                    </ul>
                  ) : (
                    <ul>
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
                            <div className="d-flex mb-3" key={l}>
                              <div className="date">
                                <p>{k.edcdate}</p>
                              </div>
                              <div className="degree">
                                {k.edcname && (
                                  <h5 style={{ margin: 0 }}>{k.edcname}</h5>
                                )}
                                <p>{k.ediname}</p>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : !full ? (
                      <>
                        <div className="d-flex mb-3">
                          <div className="date">
                            <p>2018-2020</p>
                          </div>
                          <div className="degree">
                            <h5 style={{ margin: 0 }}>12th from CBSE</h5>
                            <p>Sarvodaya Senior Secondary School</p>
                          </div>
                        </div>
                        <div className="d-flex mb-3">
                          <div className="date">
                            <p>2020-2022</p>
                          </div>
                          <div className="degree">
                            <h5 style={{ margin: 0 }}>
                              Bachelor of Technology
                            </h5>
                            <p>Lakshmi Narain College of Technology</p>
                          </div>
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
                    {sectionUser.experiences[0].exdesignation !== "" ? (
                      <>
                        {sectionUser.experiences.map((k, l) => {
                          return (
                            <div className="exp mb-3" key={l}>
                              <div className="d-flex">
                                <div className="degree">
                                  <h5 style={{ margin: "0" }}>
                                    {k.exdesignation}
                                  </h5>
                                  <p>{k.excname}</p>
                                </div>
                                <div className="date">
                                  <p>
                                    {k.exsdate} {k.excdate && "-" + k.excdate}
                                  </p>
                                </div>
                              </div>
                              <p
                                className="text-muted"
                                style={{ marginTop: 7, fontSize: "12px" }}
                              >
                                {k.exdescription}
                              </p>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <div className="exp mb-3">
                          <div className="d-flex">
                            <div className="degree">
                              <h5 style={{ margin: "0" }}>React Developer</h5>
                              <p>WhiteForce Private Limited</p>
                            </div>
                            <div className="date">2022-PRESENT</div>
                          </div>
                          <p
                            className="text-muted"
                            style={{ marginTop: 7, fontSize: "12px" }}
                          >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quisquam quam atque accusantium earum? Fugiat
                            inventore fuga voluptate! Vel debitis dolores ullam
                            dolore placeat, accusamus repellendus, tenetur
                            cupiditate doloremque numquam nam.
                          </p>
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
                break;
            }
            if (k.title === "Experiences") {
              if (!(full && fresher)) {
                return (
                  <div
                    className="px-5 py-3 section"
                    key={i}
                    id={"preview_" + k.title.toLowerCase()}
                  >
                    <div className="heading">
                      <span></span>
                      <h2>{k.title}</h2>
                    </div>
                    <div className="sectionD py-2">{sectionContent}</div>
                  </div>
                );
              }
            } else
              return (
                <div
                  className="px-5 py-2 section"
                  key={i}
                  id={"preview_" + k.title.toLowerCase()}
                >
                  <div className="heading">
                    <span></span>
                    <h2>{k.title}</h2>
                  </div>
                  <div className="sectionD py-2">{sectionContent}</div>
                </div>
              );
          }
        })}
        
      </div>
      {full && (
        <div id={full ? "contentTo" : ""} className="bg-white template2"></div>
      )}
    </>
  );
}
