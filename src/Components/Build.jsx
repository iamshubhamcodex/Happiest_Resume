import { useContext, useEffect, useState } from "react";
import Preview from "./Preview";
import Resume from "./Resume";
import { Context } from "../Context/State";

export default function Build() {
  let { showAlert } = useContext(Context);
  const [previewModalShow, setPreviewModalShow] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [pages, setPages] = useState([]);

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
  const renderPreview = () => {
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
  };
  const addChildToPage = (index, val, single) => {
    setPages((prev) => {
      if (typeof prev[index] === "undefined") {
        prev[index] = [];
      }
      if (!single) return [val];
      let temparr = [];
      prev.map((k, i) => {
        if (i !== index) {
          temparr.push(k);
        } else temparr.push([...prev[index], val]);
      });
      return temparr;
    });
  };
  const renderingPreview = () => {
    let contentFrom = document.querySelector("#contentFrom");
    let contentTo = document.querySelector("#contentTo");
    let childrens = toArray(contentFrom.children);
    let height = document.getElementById("chooseContent").clientHeight;
    if (contentTo) contentTo.innerHTML = "";
    setPages([]);

    setTimeout(() => {
      idkname(contentFrom, 0, height);
      console.log(pages);
      for (let page of pages) {
        let div = document.createElement("div");
        div.className = "A4";
        for (let p of page) {
          div.innerHTML += p.outerHTML;
        }
        contentTo.append(div);
      }
      setPreviewLoading(false);
    }, 1500);
  };
  const idkname = (parent, current, height, ischild) => {
    let tempHeight = 0;
    let children = parent.children;
    let childLen = children.length;
    let i = 0;

    if (parent.scrollHeight <= height - 70) {
      addChildToPage(current, toArray(parent.children));
      return;
    }
    while (childLen > 0) {
      if (tempHeight + children[i].offsetHeight <= height - 70) {
        tempHeight += children[i].offsetHeight;
        addChildToPage(current, children[i], true);
        i++;
        childLen--;
        continue;
      }
      // idkname() will return an array of children to be fit in a page
      if (children[i].children.length > 0) {
        let j = 0;
        let parent = children[i];
        let childrenj = toArray(parent.children);
        let childLenj = childrenj.length;
        let div = document.createElement("div");
        div.innerHTML = parent.outerHTML; // div.innerhtml = our content
        let toAppend = div.children[0];
        toAppend.innerHTML = "";

        while (childLenj > 0) {
          if (tempHeight + childrenj[j].offsetHeight <= height - 70) {
            tempHeight += childrenj[j].offsetHeight;
            toAppend.innerHTML += childrenj[j].outerHTML;
            j++;
            childLenj--;
          } else {
            childLenj--;
            addChildToPage(current, toAppend, true);
            current++;
            tempHeight = 0;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (previewModalShow) {
      setPreviewLoading(true);
      renderingPreview();
      // renderPreview();
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
