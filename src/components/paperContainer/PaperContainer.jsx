import React, { useContext, useRef } from 'react'
import { createCircle, createEllipse, createRectangle, createRhombus } from '../../commonFunctions/ShapeFunctions';
import { CanvasContext } from '../../contexts/CanvasContext';
import { OptionContext } from '../../contexts/OptionContext';
import { createLink, deleteLink, updateLink } from '../../commonFunctions/genreralFunctions';
import { dia } from 'jointjs';

const PaperContainer = () => {
  // const [showTitle, setShowTitle] = useState(true);
  const createdShapes = useRef([]);
  const totalShapes = useRef(null);
  const linkChangeflag = useRef(false);
  const selectedShape = [];
  let linkArr = [];
  totalShapes.current = 0;
  let createdEntities = [];
  let paper = "";
  const linkInProgress = useRef(null);
  const oldTarget = useRef(null);
  const { paperRef, paperInstance, shapeRef } = useContext(CanvasContext);
  const { addLink, removeLink, resize, removeShape } = useContext(OptionContext);

  const resizeInfo = useRef({
    isResizing: false,
    initialSize: { width: 0, height: 0 },
  });

  const createPaper = () => {
    if (paper === "") {
      // if (showTitle) {
      //   setShowTitle(false);
      // }
      paper = new dia.Paper({
        el: paperRef.current,
        width: 900,
        height: 650,
        model: new dia.Graph(),
      });
      paperInstance.current = paper;

      paperInstance.current.on("element:pointerclick", (cellView) => {
        if (addLink.current) {
          if (selectedShape.length === 0 && !selectedShape.find((shape) => shape === cellView)) {
            selectedShape.push(cellView.model);
          } else if (selectedShape.length === 1 && !selectedShape.find((shape) => shape === cellView)) {
            selectedShape.push(cellView.model);
            createLink(paperInstance, selectedShape, linkArr);
            selectedShape.splice(0, selectedShape.length);
            // addLink.current = false;
          }
        } else if (removeShape.current) {
          cellView.remove();
          let linkId = "";
          linkArr.map((link) => {
            if (link.attributes.source.id === cellView.model.id || link.attributes.target.id === cellView.model.id) {
              linkId = link.id;
              deleteLink(paperInstance, link.id, linkArr);
            }
            return [];
          });
          linkArr = linkArr.filter((link) => link.id !== linkId);
          let entityId = "";
          createdEntities.map((entity) => {
            if (entity.id === cellView.model.id || entity.id === cellView.model.id) {
              entityId = entity.id;
            }
            return [];
          });
          createdEntities = createdEntities.filter((entity) => entity.id !== entityId);
        } else if (resize.current) {
          paperInstance.current.on("element:pointerdown", (cellView, event, x, y) => {
            if (cellView.model && cellView.model.isElement() && resize.current) {
              resizeInfo.current.isResizing = true;
              resizeInfo.current.initialPointerPos = { x: event.clientX, y: event.clientY };
              resizeInfo.current.initialSize = cellView.model.size();
            }
          });

          paperInstance.current.on("element:pointermove", (cellView, event, x, y) => {
            console.log("resize onmove", resizeInfo.current.isResizing);
            if (resizeInfo.current.isResizing) {
              const diffX = event.clientX - resizeInfo.current.initialPointerPos.x;
              const diffY = event.clientY - resizeInfo.current.initialPointerPos.y;

              const newWidth = Math.max(0, resizeInfo.current.initialSize.width + diffX);
              const newHeight = Math.max(0, resizeInfo.current.initialSize.height + diffY);

              cellView.model.resize(newWidth, newHeight);
            }
          });

          paperInstance.current.on("element:pointerup", (cellView) => {
            if (resizeInfo.current.isResizing === true) {
              resizeInfo.current.isResizing = false;
            }
            console.log("resize onup", resizeInfo.current.isResizing);
          });
        }
      });

      paperInstance.current.on("link:pointerdown", (linkView) => {
        if (removeLink.current) {
          linkView.remove();
          deleteLink(paperInstance, linkView.model.id, linkArr);
        }
        linkInProgress.current = linkView.model;
        linkChangeflag.current = true;
        oldTarget.current = linkInProgress.current.attributes.target.id;
      });

      paperInstance.current.on("link:pointerup", (linkView) => {
        if (linkChangeflag.current && removeLink.current === false) {
          updateLink(paperInstance, linkView.model, oldTarget.current);
        }
        linkChangeflag.current = false;
      });

      paperInstance.current.on("link:pointermove", (linkView, event, x, y) => {
        if (linkInProgress.current === linkView.model) {
          linkView.model.target({ x, y });

          createdEntities.map((entity) => {
            let pos = entity.attributes.position;
            let wid = entity.attributes.size;
            if (x <= pos.x + wid.width && y <= pos.y + wid.height && x >= pos.x && y >= pos.y && linkChangeflag.current) {
              linkInProgress.current.remove();
              updateLink(paperInstance, linkView.model, entity.id);
              linkChangeflag.current = false;
            }
            return [];
          });
        }
      });

      paperInstance.current.on("element:pointerdblclick", (cellView) => {
        if (!resize.current) {
          const model = cellView.model;
          const text = prompt("Enter new text:", model.attr("label/text"));
          if (text !== null) {
            model.attr("label/text", text);
            // var width = Math.max(text.length * 7, model.attributes.size.width);
            // model.resize(width, model.attributes.size.height);
          }
        }
      });

      paperInstance.current.on("blank:pointerclick", (event, x, y) => {
        if (shapeRef.current === "rectangle") {
          totalShapes.current = totalShapes.current + 1;
          createRectangle(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        } else if (shapeRef.current === "ellipse") {
          totalShapes.current = totalShapes.current + 1;
          createEllipse(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        } else if (shapeRef.current === "rhombus") {
          totalShapes.current = totalShapes.current + 1;
          createRhombus(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        } else if (shapeRef.current === "circle") {
          totalShapes.current = totalShapes.current + 1;
          createCircle(paperInstance, x, y, totalShapes, createdShapes, createdEntities);
        }
        // shapeRef.current = "";
      });
    }
  };

  // const handleRect = () => {
  //   shapeRef.current = "rectangle";
  //   createPaper();
  // };
  // const handleEllip = () => {
  //   shapeRef.current = "ellipse";
  //   createPaper();
  // };
  // const handleRhom = () => {
  //   shapeRef.current = "rhombus";
  //   createPaper();
  // };
  // const handleCirc = () => {
  //   shapeRef.current = "circle";
  //   createPaper();
  // };
  
  return (
    <div className="paper" ref={ paperRef } />
  )
}

export default PaperContainer