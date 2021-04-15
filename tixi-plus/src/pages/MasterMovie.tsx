import React from 'react'

// ANCHOR materialui Container, Typography,
import { CssBaseline } from '@material-ui/core'
// ANCHOR files
import FormCreateMovie from '../components/master-movie/FromMovie';
import MoviesMaster from '../components/master-movie/MoviesMaster';
import PopupMovieMaster from '../components/master-movie/PopupMovieMaster';

function MasterMovie() {
    const [isOpenCreateMovie, setIsOpenCreateMovie] = React.useState(false)
    const [isOpenPopupUpdateMovie, setIsOpenPopupUpdateMovie] = React.useState(false)
    const [isOpenMovie, setIsOpenMovie] = React.useState(true)
    return (
        <React.Fragment>
            <div id="container-relative">
                <CssBaseline />
                <MoviesMaster onClickOpenDetailsRoom={(statusOpen) => setIsOpenPopupUpdateMovie(statusOpen)} />
                {isOpenCreateMovie === true && <FormCreateMovie />}
                {isOpenPopupUpdateMovie === true && <PopupMovieMaster onClickOpenDetailsRoom={(statusOpen) => {
                    setIsOpenPopupUpdateMovie(statusOpen)
                    setIsOpenMovie(false)
                }} />}
            </div>
        </React.Fragment>
    )
}
export default MasterMovie
