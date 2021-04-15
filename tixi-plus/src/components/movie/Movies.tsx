import React from 'react'
import Movie from './Movie'
import { Grid } from '@material-ui/core'
import { styleGrid } from '../../theme/MaterialUI'
function Movies() {
    const classes = styleGrid();
    return (
        <React.Fragment>
            <Grid container spacing={2} className={classes.root} >
                <Movie />
                <Movie />
                <Movie />
                <Movie />
            </Grid>
        </React.Fragment >
    )
}

export default Movies
