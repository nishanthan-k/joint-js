import React, { createContext, useRef } from 'react';

export const CanvasContext = createContext();

export const CanvasContextProvider = ({ children }) => {
  const paperInstance = useRef(null);
  const paperRef = useRef(null);

  // paperInstance.current =
  

  return (
    <CanvasContext.Provider value={ {paperRef, paperInstance } }>
      { children }
    </CanvasContext.Provider>
  );
};
