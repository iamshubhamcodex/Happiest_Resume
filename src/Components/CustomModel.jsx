import { useState } from "react";

export default function CustomModel({
  show,
  close,
  sectionDetails,
  createSection,
}) {
  const [title, setTitle] = useState("");
  const [after, setAfter] = useState(0);

  return (
    <div className={"customModal" + (show ? " show" : "")}>
      <div className="card">
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            setTitle(""), setAfter(0), close();
          }}
        ></i>
        <div className="card-header">
          <h2>Add Section</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <label htmlFor="title">Section Title</label>
              <input
                list="sectionTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="after">Add Section after:</label>
              <select
                id="after"
                value={after}
                onChange={(e) => setAfter(parseInt(e.target.value))}
              >
                <option value={0}> Choose from Below</option>
                {sectionDetails.map((k, i) => {
                  return (
                    <option key={i} value={i + 1}>
                      {k.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                disabled={title === "" || after === 0}
                onClick={() => {
                  createSection(title, after),
                    setTitle(""),
                    setAfter(0),
                    close();
                }}
              >
                Create Section
              </button>
            </div>
          </div>
        </div>
      </div>
      <datalist id="sectionTitle">
        <option value="Courses">Courses</option>
        <option value="Acheivments">Acheivments</option>
        <option value="Certifications">Certifications</option>
      </datalist>
    </div>
  );
}
