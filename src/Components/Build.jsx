import { useCallback, useContext, useEffect, useState } from "react";
import Preview from "./Preview";
import Resume from "./Resume";
import { Context } from "../Context/State";
import ReactDOM from "react-dom";

export default function Build() {
  let { showAlert, userDetails } = useContext(Context);
  const [previewModalShow, setPreviewModalShow] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [pages, setPages] = useState([]);

  const getChildForOnePage1 = (child, height) => {
    let arr = [];
    let tempHeight = 0,
      i = 0;
    while (i < child.length) {
      let styleOFChild = window.getComputedStyle(child[i]);
      let top = parseInt(styleOFChild.marginTop);
      let bottom = parseInt(styleOFChild.marginBottom);

      if (tempHeight + child[i].offsetHeight + top + bottom <= height) {
        arr.push(child[i]);
        tempHeight += child[i].offsetHeight + top + bottom;
        i++;
      } else {
        let pkkk = document.createElement("DIV");
        pkkk.innerHTML = child[i].outerHTML;
        pkkk.children[0].innerHTML = "";

        if (child[i].children.length > 1) {
          let idkkkk = getChildForOnePage1(
            child[i].children,
            height -
              tempHeight -
              parseInt(window.getComputedStyle(child[i]).paddingTop) * 2
          );
          for (let idk of idkkkk) {
            pkkk.children[0].append(idk);
          }
          arr.push(pkkk.children[0]);
        }
        break;
      }
    }
    return arr;
  };
  const appendChildrens = (childrens, height, contentTo) => {
    let onePageChild = getChildForOnePage1(childrens, height);
    let A4 = document.createElement("DIV");
    A4.className = "A4";
    for (let child of onePageChild) A4.append(child);

    contentTo.append(A4);
    setPreviewLoading(false);
  };
  const renderingPreview1 = () => {
    let contentFrom = document.querySelector("#contentFrom");
    let contentTo = document.querySelector("#contentTo");
    let transfer = document.querySelector("#transfer");
    let height = document.getElementById("chooseContent").clientHeight;
    transfer.innerHTML = contentFrom.innerHTML;
    contentTo.innerHTML = "";

    setTimeout(() => {
      while (transfer.children.length > 0)
        appendChildrens(transfer.children, height, contentTo);
    }, 1500);
  };
  

  useEffect(() => {
    if (previewModalShow) {
      setPreviewLoading(true);
      renderingPreview1();
    }
  }, [previewModalShow]);

  return (
    <>
      <div className="content">
        <Resume
          previewModalShow={previewModalShow}
          setPreviewModalShow={setPreviewModalShow}
        />
        <Preview
          previewModalShow={previewModalShow}
          setPreviewModalShow={setPreviewModalShow}
          previewLoading={previewLoading}
        />

      </div>
      {/* </div> */}
    </>
  );
}
