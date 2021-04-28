import React from 'react'
import Movie from './Movie'
import { Grid } from '@material-ui/core'
import { styleGrid } from '../../theme/MaterialUI'
import { MovieType } from '../../models/MovieType';

import useMediaQuery from '@material-ui/core/useMediaQuery';

function Movies(props: Props) {
    const classes = styleGrid();
    const matches = useMediaQuery('(max-width: 768px)');

    const sizeGird = React.useMemo(() =>{
        if(matches == false) {
            return 2;
        }
        if(matches == true) {
            return 0;
        }
    },[matches])
    
    return (
        <React.Fragment>
            <h2>
                <p>
                    ONLINE STREAMING
                </p>
                <p>Upcoming Movies</p>
            </h2>
            <Grid container spacing={sizeGird} className={classes.root} style={{ margin: "2% auto" }} >
                {
                    props.Movies.map(movie => <Movie key={movie.id} Movie={movie} />)
                }
            </Grid>
        </React.Fragment >
    )
}
export default Movies
export interface Props {
    Movies: MovieType[]
}
