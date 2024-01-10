import React, { createContext, useRef } from 'react';

export const LinkContext = createContext();

export const LinkContextProvider = ({ children }) => {
  const addLink = useRef(false);
  const removeLink = useRef(false);
  const removeShape = useRef(false);

  addLink.current = false;
  removeLink.current = false;
  removeShape.current = false;

  const updateContext = (item) => {
    console.log(item)
    var status = true;
    if (item === "addLink" && status) {
      addLink.current = !addLink.current;
      status = false;
      console.log(addLink)
      removeLink.current = false;
      removeShape.current = false;
    } else if (item === "removeLink" && status) {
      removeLink.current = !removeLink.current;
      status = false;
      addLink.current = false;
      removeShape.current = false;
    } else if (item === "removeShape" && status) {
      removeShape.current = !removeShape.current;
      status = false;
      addLink.current = false;
      removeLink.current = false;
    }

    console.log(addLink, removeLink, removeShape)
  };

  return (
    <LinkContext.Provider value={ { addLink, removeLink, removeShape, updateContext } }>
      { children }
    </LinkContext.Provider>
  );
};
