import { dia, shapes } from "jointjs";
import React, { useEffect, useRef } from "react";

const Joint = () => {
  const paperRef = useRef(null);

  useEffect(() => {
    const paper = new dia.Paper({
      el: paperRef.current,
      width: 700,
      height: 700,
      model: new dia.Graph(),
    });

    const rect1 = new shapes.standard.Rectangle();
    rect1.position(100, 100);
    rect1.resize(70, 40);
    rect1.attr({
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
    paper.model.addCell(rect1);

    const rect2 = new shapes.standard.Rectangle();
    rect2.position(300, 100);
    rect2.resize(70, 40);
    rect2.attr({
      body: {
        fill: "yellowgreen",
        rx: 7,
        ry: 7,
      },
      label: {
        text: "Diagrams",
        fill: "blue",
      },
    });
    paper.model.addCell(rect2);

    var link = new shapes.standard.Link();
    link.source(rect1);
    link.target(rect2);
    link.attr({
      id: "l1",
    });
    paper.model.addCell(link);

    const linkSvgElement = link.findView(paper).el;

    linkSvgElement.addEventListener('click', () => {
      console.log('link clicked');

      const currentSource = link.getSourceElement();
      const currentTarget = link.getTargetElement();

      // link.remove();

      const newLink = new shapes.standard.Link();
      newLink.source(currentTarget);
      newLink.target(currentSource);
      newLink.attr({
        id: "l1",
      });

      link = newLink;
      paper.model.addCell(newLink);
    });


    rect1.on("click", () => {
      console.log("rect1 clicked");
    });

  }, []);

  return <div ref={ paperRef } style={ { border: "1px solid gray" } } />;
};

export default Joint;
