import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/State";

export default function Template1({ full }) {
  let { userDetails, sectionDetails, resumeRef } = useContext(Context);
  let { name, email, mobile, address, title, city, state, country } =
    userDetails.details[0];
  const [fresher, setFresher] = useState(false);

  useEffect(() => {
    setFresher(userDetails.details[3].experiences[0].exdesignation === "");

    // eslint-disable-next-line
  }, [userDetails]);

  return (
    <div ref={resumeRef} className={"containerp h-100"}>
      <div className="container-fluid bg-white">
        <main
          style={full ? { position: "absolute", visibility: "hidden" } : {}}
          id={full ? "contentFrom" : ""}
        >
          <style>{`.containerp  header{background: rgb(30, 32, 30);color: white;display: flex;align-items:center;}.containerp ul {margin: 0 !important; padding: 0 !important} .container-fluid{padding: 0 !important}`}</style>
          <style>{`section{margin: 15px 10px}h1{font-size: 22px}h2{font-size: 17px}h3 {font-size: 15px}h4{font-size: 13px}.section-content{padding:0 1.25rem;font-size: 10px} .custom h1{font-size: 15px}.custom h2{font-size: 14px}.custom h3{font-size: 13px}.container-fluid{padding: 0 7px}.containerp .A4{background: white;}`}</style>
          <header>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <img
                src={
                  userDetails.imgSrc !== ""
                    ? userDetails.imgSrc
                    : userDetails.tempImgSrc
                }
                alt="Your Photo"
                style={{
                  width: 120,
                  height: 120,
                }}
              />
              <div
                style={{
                  marginLeft: 30,
                  textAlign: "right",
                  padding: "20px 30px",
                }}
              >
                <h1
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontSize: 20,
                    margin: 0,
                  }}
                >
                  {name !== ""
                    ? name
                    : !full
                    ? "Gurmeet Singh"
                    : "Enter Your Name"}
                </h1>
                <p>{title !== "" ? title : !full ? "Designer" : ""}</p>
              </div>
            </div>
          </header>
          {sectionDetails.map((k, i) => {
            if (i !== 0) {
              let sectionUser = userDetails.details[i];
              let sectionContent;
              switch (k.title) {
                case "Objective":
                  sectionContent =
                    sectionUser.objective != "" ? (
                      <pre
                        style={{
                          whiteSpace: "pre-wrap",
                          fontFamily: "inherit",
                        }}
                      >
                        {sectionUser.objective}
                      </pre>
                    ) : !full ? (
                      "A highly motivated and detail-oriented individual with excellent organizational skills and a strong work ethic. Experienced in customer service and communication with a proven track record of delivering results. Seeking a position in a dynamic and challenging environment where my skills can be utilized to their fullest potential."
                    ) : (
                      "Your Professional Summary please"
                    );
                  break;
                case "Skills":
                  sectionContent =
                    sectionUser.skills[0] !== "" ? (
                      <ul>
                        {sectionUser.skills.map((k, i) => {
                          if (k !== "") return <li key={i}>{k}</li>;
                        })}
                      </ul>
                    ) : (
                      <ul>
                        {!full ? (
                          <>
                            <li>
                              Excellent communication skills, both written and
                              verbal
                            </li>
                            <li>
                              Strong problem-solving and analytical skills
                            </li>
                            <li>
                              Proficient in Microsoft Office and Adobe Creative
                              Suite
                            </li>
                            <li>Experienced</li>
                            <li>
                              Excellent communication skills, both written and
                              verbal
                            </li>
                            <li>
                              Strong problem-solving and analytical skills
                            </li>
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
                            if (k.edcname !== "")
                              return (
                                <div className="experience-item" key={l}>
                                  <h4>{k.edcname}</h4>
                                  <p>
                                    {k.edcdate && (
                                      <span>
                                        Completed on <b>{k.edcdate}</b>
                                      </span>
                                    )}{" "}
                                    {k.ediname && (
                                      <span>
                                        from
                                        <b> {k.ediname}</b>
                                      </span>
                                    )}
                                  </p>
                                </div>
                              );
                          })}
                        </>
                      ) : !full ? (
                        <>
                          <div className="experience-item">
                            <h4>12th</h4>
                            <p>
                              Completed at <b>2019</b> from <b>School</b>
                            </p>
                          </div>
                          <div className="experience-item">
                            <h4>B. Tech. CSE</h4>
                            <p>
                              Completed at <b>2023</b> from <b>College</b>
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
                      {sectionUser.experiences[0].exdesignation !== "" ? (
                        <>
                          {sectionUser.experiences.map((k, l) => {
                            return (
                              <div className="experience-item" key={l}>
                                <h4>
                                  {k.exdesignation}, {k.excname}
                                </h4>
                                <p>
                                  <b>
                                    {k.exsdate} - {k.exedate}
                                  </b>{" "}
                                  {k.exdescription}
                                </p>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <div className="experience-item">
                            <h4>
                              Customer Service Representative, ABC Company
                            </h4>
                            <p>
                              <span>June 2018 - Present</span> Responsible for
                              answering customer inquiries via phone, email, and
                              live chat. Handled an average of 50 customer
                              interactions per day, maintaining a 95%
                              satisfaction rating. Collaborated with other
                              departments to resolve complex customer issues and
                              improve overall customer experience.
                            </p>
                          </div>
                          <div className="experience-item">
                            <h4>Sales Associate, XYZ Company</h4>
                            <p>
                              <span>January 2016 - May 2018</span> Generated
                              over $500,000 in sales revenue by providing
                              exceptional customer service and building strong
                              relationships with clients. Trained new sales
                              associates and developed sales strategies to
                              increase revenue and customer satisfaction.
                              Received multiple performance awards for exceeding
                              sales targets.
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
                    <section
                      className="px-1 "
                      key={i}
                      id={"preview_" + k.title.toLowerCase()}
                    >
                      <div className="section-header">
                        <h2>{k.title}</h2>
                      </div>
                      <div className="section-content">{sectionContent}</div>
                    </section>
                  );
                }
              } else
                return (
                  <section
                    className="px-1 "
                    key={i}
                    id={"preview_" + k.title.toLowerCase()}
                  >
                    <div className="section-header">
                      <h2>{k.title}</h2>
                    </div>
                    <div className="section-content">{sectionContent}</div>
                  </section>
                );
            }
          })}
          <section className="px-1 ">
            <div className="section-header">
              <h2>Personal Information</h2>
            </div>
            <div className="section-content">
              <ul>
                <li>
                  <strong>Address:</strong>
                  {address !== ""
                    ? `${address}, ${city}, ${state}, ${country}`
                    : "123 Main Street, Anytown, USA"}
                </li>
                <li>
                  <strong>Phone:</strong>
                  {mobile !== "" ? mobile : "(123) 456 789"}
                </li>
                <li>
                  <strong>Email:</strong>
                  {email !== "" ? email : "john.doe@email.com"}
                </li>
              </ul>
            </div>
          </section>
        </main>
        <main id={full ? "contentTo" : ""}></main>
      </div>
    </div>
  );
}
