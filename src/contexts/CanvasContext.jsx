import React, { createContext, useRef } from 'react';

export const CanvasContext = createContext();

export const CanvasContextProvider = ({ children }) => {
  const paperInstance = useRef(null);
  const paperRef = useRef(null);
  const shapeRef = useRef(null);

  return (
    <CanvasContext.Provider value={ { paperRef, paperInstance, shapeRef } }>
      { children }
    </CanvasContext.Provider>
  );
};
