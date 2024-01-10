import { shapes } from "jointjs";

export const createLink = (paperInstance, selectedShape, linkArr) => {
  // if (checkLink(linkArr, selectedShape)) {
    var link = new shapes.standard.Link({
      source: { id: selectedShape[0].id },
      target: { id: selectedShape[1].id },
      attrs: {
        line: {
          stroke: "black"
        }
      }
    });
    linkArr.push(link)
    paperInstance.current.model.addCell(link);
  // } else {
  //   console.log("link already exists")
  // }
};

export const deleteLink = (paperInstance, linkId) => {
  const linkToRemove = paperInstance.current.model.getCell(linkId);
  if (linkToRemove) {
    linkToRemove.remove();
  }
};

export const checkLink = (linkArr, selectedShape) => {
  // linkArr.map(link => {
  //   if ((selectedShape[1] === link.attributes.source.id && selectedShape[0] === link.attributes.target.id) || (selectedShape[0] === link.attributes.source.id && selectedShape[1] === link.attributes.target.id)) {
  //     return false;
  //   }
  // })
  return true;
}
