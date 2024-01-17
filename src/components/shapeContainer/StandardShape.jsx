import React, { useContext } from 'react'
import { Image } from 'semantic-ui-react'
import { CanvasContext } from '../../contexts/CanvasContext';

const StandardShape = () => {
  const {shapeRef} = useContext(CanvasContext)
  const handleRect = () => {
    shapeRef.current = "rectangle";
    createPaper();
  };
  const handleEllip = () => {
    shapeRef.current = "ellipse";
    createPaper();
  };
  const handleRhom = () => {
    shapeRef.current = "rhombus";
    createPaper();
  };
  const handleCirc = () => {
    shapeRef.current = "circle";
    createPaper();
  };
  return (
    <div className="standard">
      <Image className="img" onClick={ () => handleRect() } src={ require("../../assets/images/rectangle.png") } />
      <Image className="img" onClick={ () => handleEllip() } src={ require("../../assets/images/ellipse.png") } />
      <Image className="img" onClick={ () => handleRhom() } src={ require("../../assets/images/rhombus.png") } />
      <Image className="img" onClick={ () => handleCirc() } src={ require("../../assets/images/circle.png") } />
    </div>
  )
}

export default StandardShape