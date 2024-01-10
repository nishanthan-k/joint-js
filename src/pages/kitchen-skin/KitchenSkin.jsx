import { dia } from "jointjs";
import React, { useContext, useRef } from "react";
import { Grid, GridColumn, GridRow, Image } from "semantic-ui-react";
import { createCircle, createEllipse, createRectangle, createRhombus } from "../../commonFunctions/ShapeFunctions";
import { createLink } from "../../commonFunctions/genreralFunctions";
import OptionContainer from "../../components/optionCotainer/OptionContainer";
import { LinkContext } from "../../contexts/Link/LinkContext";
import "./KitchenSkin.scss";

const KitchenSkin = () => {
  const paperRef = useRef(null);
  const paperInstance = useRef(null);
  const shapeRef = useRef(null);
  const createdShapes = useRef([]);
  const totalShapes = useRef(null);
  const selectedShape = [];
  // const selectedLink = [];
  const linkArr = [];
  totalShapes.current = 0;
  let paper = ""; 
  const { addLink, removeLink, removeShape } = useContext(LinkContext)

  const createPaper = () => {
    if (paper === "") {
      paper = new dia.Paper({
        el: paperRef.current,
        width: 900,
        height: 650,
        model: new dia.Graph(),
      });
      paperInstance.current = paper;

      paperInstance.current.on("element:pointerclick", (cellView) => {
        if (addLink.current) {
          if (selectedShape.length === 0 && !selectedShape.find(shape => shape === cellView)) {
            selectedShape.push(cellView.model);
          } else if (selectedShape.length === 1 && !selectedShape.find(shape => shape === cellView)) {
            selectedShape.push(cellView.model);
            createLink(paperInstance, selectedShape, linkArr);
            selectedShape.splice(0, selectedShape.length);
            // addLink.current = false;
            console.log('linkArr', linkArr)
          }
        } else if (removeShape.current) {
          cellView.remove();
        }
      });

      paperInstance.current.on("link:pointerclick", (cellView) => {
        // deleteLink(paperInstance, cellView.model.id)
        if (removeLink.current) {
          cellView.remove();
        }
      })

      paperInstance.current.on("element:pointerdblclick", (cellView) => {
        const model = cellView.model;
        const text = prompt("Enter new text:", model.attr('label/text'));
        if (text !== null) {
          model.attr('label/text', text);
        }
      });


      // paperInstance.current.on("element:pointerclick", (cellView) => {
      //   if (removeLink.current) {
      //     if (selectedLink.length === 0 && !selectedLink.find(shape => shape === cellView)) {
      //       selectedLink.push(cellView.model.id);
      //     } else if (selectedLink.length === 1 && !selectedLink.find(shape => shape === cellView)) {
      //       selectedLink.push(cellView.model.id);
      //       // removeLink(paperInstance, selectedLink);
      //       linkArr.map(link => {
      //         link.on("element:pointerclick", (cellView) => {
      //           console.log(link)
      //         })
      //         // if ((selectedLink[1] === link.attributes.source.id && selectedLink[0] === link.attributes.target.id) || (selectedLink[0] === link.attributes.source.id && selectedLink[1] === link.attributes.target.id)) {
      //         //   console.log("call remove with", link.id)
      //         //   deleteLink(paperInstance,  link.id);
      //         // }
      //       })
      //       selectedLink.splice(0, selectedLink.length);
      //       // removeLink.current = false;

      //     }

      // }
      // });


      paperInstance.current.on("blank:pointerclick", (event, x, y) => {
        if (shapeRef.current === "rectangle") {
          totalShapes.current = totalShapes.current + 1;
          createRectangle(paperInstance, x, y, totalShapes, createdShapes);
        } else if (shapeRef.current === "ellipse") {
          totalShapes.current = totalShapes.current + 1;
          createEllipse(paperInstance, x, y, totalShapes, createdShapes);
        } else if (shapeRef.current === "rhombus") {
          totalShapes.current = totalShapes.current + 1;
          createRhombus(paperInstance, x, y, totalShapes, createdShapes);
        } else if (shapeRef.current === "circle") {
          totalShapes.current = totalShapes.current + 1;
          createCircle(paperInstance, x, y, totalShapes, createdShapes);
        }
        // shapeRef.current = "";
      });
    }
  };

  const handleRect = () => {
    shapeRef.current = "rectangle";
    createPaper();
  }
  const handleEllip = () => {
    shapeRef.current = "ellipse";
    createPaper();
  }
  const handleRhom = () => {
    shapeRef.current = "rhombus";
    createPaper();
  }
  const handleCirc = () => {
    shapeRef.current = "circle";
    createPaper();
  }

  return (
    <div className="kitchen-skin">
      {/* { paperInstance.current === null && ( */ }
      <div className="header" >
        <h1>ER Diagram Sketcher </h1>
      </div>
      {/* ) } */ }
      <Grid columns={ 3 } >
        <GridRow columns={ 3 } className="erd-sketcher" >
          <GridColumn width={ 3 } className="stencil" >
            <div className="standard">
              {/* <Image className="img" onClick={ () => handleRect() } src={ require("../../assets/shapes/rectangle.png") } />
              <Image className="img" onClick={ () => handleEllip() } src={ require("../../assets/shapes/ellipse.png") } />
              <Image className="img" onClick={ () => handleRhom() } src={ require("../../assets/shapes/rhombus.jpeg") } />
              <Image className="img" onClick={ () => handleCirc() } src={ require("../../assets/shapes/circle.png") } /> */}
              <Image className="img" onClick={ () => handleRect() } src={ require("../../assets/images/rectangle.png") } />
              <Image className="img" onClick={ () => handleEllip() } src={ require("../../assets/images/ellipse.png") } />
              <Image className="img" onClick={ () => handleRhom() } src={ require("../../assets/images/rohmbus.png") } />
              <Image className="img" onClick={ () => handleCirc() } src={ require("../../assets/images/circle.png") } />
            </div>
          </GridColumn>
          <GridColumn width={ 10 } className="paper-container" >
            <div className="paper" ref={ paperRef } />
          </GridColumn>
          <GridColumn width={ 3 } className="inspector"></GridColumn>
        </GridRow>
        <GridRow className="erd-options" >
          <OptionContainer />
        </GridRow>
      </Grid>
    </div>
  );
};

export default KitchenSkin;
