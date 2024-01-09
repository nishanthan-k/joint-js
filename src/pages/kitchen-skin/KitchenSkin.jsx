import React from 'react'
import "./KitchenSkin.scss"
import { Grid, GridColumn } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const KitchenSkin = () => {
  return (
    <div className='kitchen-skin'>
      <Grid columns={ 3 } >
        <GridColumn width={ 3 } className='stencil' >
          <div className="standard">
            <FontAwesomeIcon icon={ faSquareFull } size='5x' />
            <FontAwesomeIcon icon={ faCircle } size='5x' />
            <FontAwesomeIcon icon={ faEllipsisV } size='5x' />
          </div>
        </GridColumn>
        <GridColumn width={ 10 } className='paper'>
        </GridColumn>
        <GridColumn width={ 3 } className='inspector'>

        </GridColumn>
      </Grid>
    </div>
  )
}

export default KitchenSkin