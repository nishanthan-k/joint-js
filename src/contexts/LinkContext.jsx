import React, { createContext, useContext, useRef } from 'react';
import domtoimage from 'dom-to-image'
import { CanvasContext } from './CanvasContext';

export const LinkContext = createContext();

export const LinkContextProvider = ({ children }) => {
  const addLink = useRef(false);
  const removeLink = useRef(false);
  const removeShape = useRef(false);
  const downloadCanvas = useRef(false);
  const { paperRef } = useContext(CanvasContext)

  addLink.current = false;
  removeLink.current = false;
  removeShape.current = false;
  downloadCanvas.current = false;


  const downloadDiagram = () => {
    // console.log('downloading')
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

  const updateContext = (item) => {
    // console.log(item)
    addLink.current = false;
    removeLink.current = false;
    removeShape.current = false;
    downloadCanvas.current = false;

    if (item === "addLink") {
      addLink.current = !addLink.current;
    } else if (item === "removeLink") {
      removeLink.current = !removeLink.current
    } else if (item === "removeShape") {
      removeShape.current = !removeShape.current;
    } else if (item === "downloadCanvas") {
      downloadDiagram();
    }

    // console.log(addLink, removeLink, removeShape, downloadCanvas)
  };

  return (
    <LinkContext.Provider value={ { addLink, removeLink, removeShape, downloadCanvas, updateContext } }>
      { children }
    </LinkContext.Provider>
  );
};
