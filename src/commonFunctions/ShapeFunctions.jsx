import { shapes } from "jointjs";

export const createRectangle = (paperInstance, refArray) => {
  
  const rect = new shapes.standard.Rectangle();
  rect.position(refArray[0], refArray[1]);
  rect.resize(70, 40);
  rect.attr({
    body: {
      fill: "red",
      rx: 7,
      ry: 7,
    },
    label: {
      text: "Joint JS",
      fill: "blue",
    },
  });
  paperInstance.current.model.addCell(rect);
};

export const createEllipse = (paperInstance, refArray) => {
  var ellipse = new shapes.standard.Ellipse();
  ellipse.resize(150, 100);
  ellipse.position(refArray[0], refArray[1]);
  ellipse.attr('root/title', 'joint.shapes.standard.Ellipse');
  ellipse.attr('label/text', 'Ellipse');
  ellipse.attr('body/fill', 'white');
  paperInstance.current.model.addCell(ellipse);
};

export const createRhombus = (paperInstance, refArray) => {
  console.log("rho");
  var polygon = new shapes.standard.Polygon();
  polygon.resize(100, 100);
  polygon.position(refArray[0], refArray[1]);
  polygon.attr('root/title', 'joint.shapes.standard.Polygon');
  polygon.attr('label/text', 'Rhombus');
  polygon.attr('body/refPoints', '0,10 10,0 20,10 10,20');

  paperInstance.current.model.addCell(polygon);
};

export const createCircle = (paperInstance, refArray) => {
  var circle = new shapes.standard.Circle();
  circle.resize(100, 100);
  circle.position(refArray[0], refArray[1]);
  circle.attr('root/title', 'joint.shapes.standard.Circle');
  circle.attr('label/text', 'Circle');
  circle.attr('body/fill', 'yellow');
  paperInstance.current.model.addCell(circle)
};