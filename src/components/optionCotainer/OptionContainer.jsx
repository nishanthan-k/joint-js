import React, { useContext, useState } from 'react';
import { Button, GridRow, Segment } from 'semantic-ui-react';
import { LinkContext } from '../../contexts/LinkContext';
import "./OptionContainer.scss";

const OptionContainer = () => {
  const { updateContext } = useContext(LinkContext);
  const [activeButton, setActiveButton] = useState(null);

  const handleUpdateContext = (item) => {
    updateContext(item);
    if (activeButton === item) {
      setActiveButton(null)
    } else if (item === "downloadCanvas" || item === "exportToJson") {
      setActiveButton(item);
      setTimeout(() => {
        setActiveButton("");
      }, 1000);
    } else {
      setActiveButton(item);
    }
  };

  return (
    <GridRow className='option-container'>
      <Segment className='options'>
        <p className={ `add-link ${activeButton === "addLink" ? 'show-add-link' : ''}` }>Add Link</p>
        <Button
          className={ `add-link-btn ${activeButton === "addLink" ? 'active-add-link' : ''}` }
          onClick={ () => handleUpdateContext("addLink") }
          primary={ activeButton === "addLink" }
          icon="linkify"
          size='large'
        />
        <p className={ `remove-link ${activeButton === "removeLink" ? 'show-remove-link' : ''}` }>Remove Link</p>
        <Button
          className={ `remove-link-btn ${activeButton === "removeLink" ? 'active' : ''}` }
          onClick={ () => handleUpdateContext("removeLink") }
          primary={ activeButton === "removeLink" }
          icon="unlinkify"
          size='large'
        />
        <p className={ `remove-shape ${activeButton === "removeShape" ? 'show-remove-shape' : ''}` }>Remove Elements</p>
        <Button
          className={ `remove-shape-btn ${activeButton === "removeShape" ? 'active' : ''}` }
          onClick={ () => handleUpdateContext("removeShape") }
          primary={ activeButton === "removeShape" }
          icon="remove circle"
          size='large'
        />
        <p className={ `download-canvas ${activeButton === "removeShape" ? 'show-download-canvas' : ''}` }>Download</p>
        <Button
          className={ `download-canvas-btn ${activeButton === "removeShape" ? 'active' : ''}` }
          onClick={ () => handleUpdateContext("downloadCanvas") }
          primary={ activeButton === "downloadCanvas" }
          icon="download"
          size='large'
        />
        <p className={ `export-To-Json ${activeButton === "removeShape" ? 'show-export-To-Json' : ''}` }>Download</p>
        <Button
          className={ `export-To-Json-btn ${activeButton === "removeShape" ? 'active' : ''}` }
          onClick={ () => handleUpdateContext("exportToJson") }
          primary={ activeButton === "exportToJson" }
          icon="share square"
          size='large'
        />
      </Segment>
    </GridRow>
  );
}

export default OptionContainer;
