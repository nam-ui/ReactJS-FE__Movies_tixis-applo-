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
    const [idFindMovie, setIdFindMovie] = React.useState("")
    console.log(isOpenMovie, isOpenCreateMovie);

    return (
        <React.Fragment>
            <div id="container-relative">
                <CssBaseline />
                <a id="btn-open-popup-movie-create" href="#" onClick={() => { setIsOpenCreateMovie(!isOpenCreateMovie) }} > Create Movie </a>
                <MoviesMaster onChangeId={(id) => setIdFindMovie(id)} onClickOpenDetailsMovie={(statusOpen) => setIsOpenPopupUpdateMovie(statusOpen)} />
                {isOpenCreateMovie === true && <FormCreateMovie onOpenCreatePopup={(event) => { setIsOpenCreateMovie(event) }} />}
                {isOpenPopupUpdateMovie === true && <PopupMovieMaster onClickOpenDetailsRoom={(statusOpen) => {
                    setIsOpenPopupUpdateMovie(statusOpen)
                    setIsOpenMovie(false)
                }}
                    idPropMovie={idFindMovie}
                />}
            </div>
        </React.Fragment>
    )
}
export default MasterMovie
