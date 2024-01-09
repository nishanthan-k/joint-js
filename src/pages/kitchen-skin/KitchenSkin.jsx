import { dia } from "jointjs";
import React, { useEffect, useRef } from "react";
import { Grid, GridColumn, Image } from "semantic-ui-react";
import { createCircle, createEllipse, createRectangle, createRhombus } from "../../commonFunctions/ShapeFunctions";
import "./KitchenSkin.scss";

const KitchenSkin = () => {
  const paperRef = useRef(null);
  const paperInstance = useRef(null);
  const rectRef = useRef([100, 100, 150, 150]);
  const ellipRef = useRef([425, 10, 150, 100]);
  const circRef = useRef([250, 10, 100, 100]);
  const rhomRef = useRef([250, 210, 100, 100]);

  useEffect(() => {
    const paper = new dia.Paper({
      el: paperRef.current,
      width: 700,
      height: 700,
      model: new dia.Graph(),
    });
    paperInstance.current = paper;
  }, []);

  const updateRef = (ref) => {
    let newRef = ref.current.map((value, index) => {
      return ref[index] = value + 10;
    })
    return newRef;
  }

  const handleRect = () => {
    rectRef.current = updateRef(rectRef)
    // console.log(rectRef)
    createRectangle(paperInstance, rectRef.current);
  }
  const handleEllip = () => {
    ellipRef.current = updateRef(ellipRef)
    createEllipse(paperInstance, ellipRef.current);
  }
  const handleRhom = () => {
    rhomRef.current = updateRef(rhomRef)
    createRhombus(paperInstance, rhomRef.current);
  }
  const handleCirc = () => {
    circRef.current = updateRef(circRef)
    createCircle(paperInstance, circRef.current);
  }

  return (
    <div className="kitchen-skin">
      <Grid columns={ 3 } >
        <GridColumn width={ 3 } className="stencil" >
          <div className="standard">
            <Image className="img" onClick={ () => handleRect() } src={ require("../../assets/shapes/rectangle.png") } />
            <Image className="img" onClick={ () => handleEllip() } src={ require("../../assets/shapes/ellipse.png") } />
            <Image className="img" onClick={ () => handleRhom() } src={ require("../../assets/shapes/rhombus.jpeg") } />
            <Image className="img" onClick={ () => handleCirc() } src={ require("../../assets/shapes/circle.png") } />
          </div>
        </GridColumn>
        <GridColumn width={ 10 } className="paper-container" >
          <div className="paper" ref={ paperRef } />
        </GridColumn>
        <GridColumn width={ 3 } className="inspector"></GridColumn>
      </Grid>
    </div>
  );
};

export default KitchenSkin;
