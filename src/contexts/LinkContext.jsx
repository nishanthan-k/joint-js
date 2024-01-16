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

      // Create a Blob containing the JSON data
      const blob = new Blob([jsonString], { type: 'application/json' });

      // Create a link to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'canvas_data.json';

      // Trigger the download
      link.click();
    } catch (err) {
      window.alert(err)
    }
  };

  const updateContext = (item) => {
    addLink.current = false;
    removeLink.current = false;
    removeShape.current = false;
    downloadCanvas.current = false;
    exportJson.current = false;
    shapeRef.current = "";

    if (item === "addLink") {
      addLink.current = !addLink.current;
    } else if (item === "removeLink") {
      removeLink.current = !removeLink.current
    } else if (item === "removeShape") {
      removeShape.current = !removeShape.current;
    } else if (item === "downloadCanvas") {
      downloadDiagram();
    } else if (item === "exportToJson") {
      exportToJSON();
    }

    // console.log(addLink, removeLink, removeShape, downloadCanvas, exportJson)
  };

  return (
    <LinkContext.Provider value={ { addLink, removeLink, resize, removeShape, downloadCanvas, exportToJSON, updateContext } }>
      { children }
    </LinkContext.Provider>
  );
};
