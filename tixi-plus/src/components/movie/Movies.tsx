import React from 'react'
import Movie from './Movie'
import { Grid } from '@material-ui/core'
import { styleGrid } from '../../theme/MaterialUI'
import { MovieType } from '../../models/MovieType';




function Movies(props: Props) {
    const classes = styleGrid();
    return (
        <React.Fragment>
            <h2>
                <p>
                    ONLINE STREAMING
                </p>
                <p>Upcoming Movies</p>
            </h2>
            <Grid container spacing={2} className={classes.root} style={{ margin: "2% auto" }} >
                {
                    props.Movies.map(movie => <Movie Movie={movie} />)
                }
            </Grid>
        </React.Fragment >
    )
}

export default Movies

export interface Props {
    Movies: MovieType[]
}
