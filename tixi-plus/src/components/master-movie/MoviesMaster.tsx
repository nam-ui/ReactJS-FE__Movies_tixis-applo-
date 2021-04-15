import React from 'react'
import { Grid } from '@material-ui/core'
import MovieMaster from './MovieMaster'
import { styleGrid } from '../../theme/MaterialUI';
function MoviesMaster(props: Props) {
    const classes = styleGrid();


    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={2} >
                <MovieMaster onClickOpenDetailsRoom={(statusOpen) => props.onClickOpenDetailsRoom(statusOpen)} />
                <MovieMaster onClickOpenDetailsRoom={(statusOpen) => props.onClickOpenDetailsRoom(statusOpen)} />
                <MovieMaster onClickOpenDetailsRoom={(statusOpen) => props.onClickOpenDetailsRoom(statusOpen)} />
            </Grid>
        </React.Fragment>
    )


}

export default MoviesMaster
export interface Props {
    onClickOpenDetailsRoom(isOpen: boolean): void,
}
