import { shapes } from "jointjs";

export const createRectangle = (paperInstance, x, y, id, createdShapes) => {
  const rect = new shapes.standard.Rectangle();
  rect.position(x, y);
  rect.resize(100, 40);
  // rect.resize(100, 100);
  rect.attr('root/title', 'joint.shapes.standard.Rectangle');
  rect.attr('label/text', 'Rectangle');
  rect.attr('body/fill', 'skyblue');
  rect.attr("id", id);
  createdShapes.current.push(rect);
  paperInstance.current.model.addCell(rect);
};

export const createEllipse = (paperInstance, x, y, id, createdShapes) => {
  var ellipse = new shapes.standard.Ellipse();
  ellipse.resize(80, 50);
  // ellipse.resize(150, 100);
  ellipse.position(x, y);
  ellipse.attr('root/title', 'joint.shapes.standard.Ellipse');
  ellipse.attr('label/text', 'Ellipse');
  ellipse.attr('body/fill', 'lightcoral');
  ellipse.attr("id", id);
  createdShapes.current.push(ellipse);
  paperInstance.current.model.addCell(ellipse);
};

export const createRhombus = (paperInstance, x, y, id, createdShapes) => {
  var polygon = new shapes.standard.Polygon();
  polygon.resize(120, 50);
  // polygon.resize(100, 100);
  polygon.position(x, y);
  polygon.attr('root/title', 'joint.shapes.standard.Polygon');
  polygon.attr('label/text', 'Rhombus');
  polygon.attr('body/refPoints', '0,10 10,0 20,10 10,20');
  polygon.attr('body/fill', 'violet');
  polygon.attr("id", id);
  createdShapes.current.push(polygon);
  paperInstance.current.model.addCell(polygon);
};

export const createCircle = (paperInstance, x, y, id, createdShapes) => {
  var circle = new shapes.standard.Circle();
  circle.resize(50, 50);
  // circle.resize(100, 100);
  circle.position(x, y);
  circle.attr('root/title', 'joint.shapes.standard.Circle');
  circle.attr('label/text', 'Circle');
  circle.attr('body/fill', 'yellow');
  circle.attr("id", id);
  createdShapes.current.push(circle);
  paperInstance.current.model.addCell(circle)
};