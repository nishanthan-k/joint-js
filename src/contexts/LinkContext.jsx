import React, { createContext, useContext, useRef } from 'react';
import domtoimage from 'dom-to-image'
import { CanvasContext } from './CanvasContext';

export const LinkContext = createContext();

export const LinkContextProvider = ({ children }) => {
  const addLink = useRef(false);
  const removeLink = useRef(false);
  const resize = useRef(false);
  const removeShape = useRef(false);
  const downloadCanvas = useRef(false);
  const exportJson = useRef(false);
  const { paperRef, paperInstance, shapeRef } = useContext(CanvasContext)

  const downloadDiagram = () => {
    domtoimage
      .toPng(paperRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "diagram.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(function (error) {
        console.log("Unable to download see the reason below")
        console.log("Error converting paper to image:", error);
      });
  };

  const exportToJSON = () => {
    try {
      const jsonData = paperInstance.current.model.toJSON();
      const jsonString = JSON.stringify(jsonData, null, 2);

      const blob = new Blob([jsonString], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'canvas_data.json';

      link.click();
    } catch (err) {
      window.alert("Paper is Empty")
    }
  };

  const updateContext = (item) => {
    console.log(item)
    addLink.current = item === "addLink" ? !addLink.current : false;
    removeLink.current = item === "removeLink" ? !removeLink.current : false;
    resize.current = item === "resize" ? !resize.current : false;
    removeShape.current = item === "removeShape" ? !removeShape.current : false;
    downloadCanvas.current = item === "downloadCanvas" ? !downloadCanvas.current : false;
    exportJson.current = item === "exportToJson" ? !exportJson.current : false;
    shapeRef.current = "";

    if (item === "downloadCanvas") {
      downloadDiagram();
    } else if (item === "exportToJson") {
      exportToJSON();
    } else if (item === "") {
      console.log('none')
    }

    console.log(addLink, removeLink, resize, removeShape, downloadCanvas, exportJson);
  };



  return (
    <LinkContext.Provider value={ { addLink, removeLink, resize, removeShape, downloadCanvas, exportToJSON, updateContext } }>
      { children }
    </LinkContext.Provider>
  );
};
