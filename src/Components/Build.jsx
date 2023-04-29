import { useContext, useEffect, useState } from "react";
import Preview from "./Preview";
import Resume from "./Resume";
import { Context } from "../Context/State";

export default function Build() {
  let { showAlert } = useContext(Context);
  const [previewModalShow, setPreviewModalShow] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const getChildForOnePage = (childrens) => {
    let content = document.getElementById("chooseContent");
    let contentHeight = content.clientHeight;
    let height = 0;
    let childCount = 0;
    let removed = [];

    while (height < contentHeight - 200 && childCount < childrens.length) {
      height += childrens[childCount].offsetHeight;
      removed.push(childrens[childCount]);
      childCount++;
    }
    return removed;
  };
  const toArray = (nodeArray) => {
    let arr = [];
    if (nodeArray)
      for (let i = 0; i < nodeArray.length; i++) arr.push(nodeArray[i]);
    return arr;
  };
  useEffect(() => {
    if (previewModalShow) {
      setPreviewLoading(true);
      // console.clear();
      let pages = [];
      let contentFrom = document.querySelector("#contentFrom");
      let contentTo = document.querySelector("#contentTo");
      let childrens = toArray(contentFrom?.children);
      if (contentTo) contentTo.innerHTML = "";

      setTimeout(() => {
        try {
          while (childrens.length > 0) {
            let toAppendChildrens = getChildForOnePage(childrens);

            let tempDiv = document.createElement("div");
            tempDiv.className = "A4";
            for (let child of toAppendChildrens) {
              let childDiv = document.createElement(child.tagName);
              if (child.className) childDiv.className = child.className;
              childDiv.innerHTML = child.innerHTML;
              tempDiv.append(childDiv);
            }
            contentTo.append(tempDiv);
            pages++;
            childrens = childrens.slice(toAppendChildrens.length);
          }
        } catch (error) {
          showAlert({
            show: true,
            message: error.message,
            type: "danger",
          });
        } finally {
          setPreviewLoading(false);
        }
      }, 1500);
    }
  }, [previewModalShow]);

  return (
    <>
      {/* <div className="container-fluid flex-grow-1 mainWrapper build"> */}
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
