import React from 'react'
// ANCHOR materialui Container, Typography,
import { CssBaseline } from '@material-ui/core'
// ANCHOR files
import FormCreateMovie from '../components/master-movie/FromMovie';
import MoviesMaster from '../components/master-movie/MoviesMaster';
import PopupMovieMaster from '../components/master-movie/PopupMovieMaster';
import Header from '../components/Header';
import { UserType } from '../models/UserType';
import Pages404 from './Pages404';
function MasterMovie() {
    const [account, setAccount] = React.useState<UserType>({
        _id: '',
        password: '',
        username: '',
        role: '',
        createdAt: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
    })
    const [isOpenCreateMovie, setIsOpenCreateMovie] = React.useState(false)
    const [isOpenPopupUpdateMovie, setIsOpenPopupUpdateMovie] = React.useState(false)
    const [isOpenMovie, setIsOpenMovie] = React.useState(true)
    const [idFindMovie, setIdFindMovie] = React.useState("")
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(account))
        setAccount(user)
    }, [])
    return (
        <React.Fragment>
            <header style={{ minHeight: "auto", backgroundImage: "none" }}>
                <Header user={account} />
            </header>
            {
                account.role === "admin" ? (
                    <section>
                        <main>
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
                        </main>
                    </section>
                ) : <Pages404 />
            }
        </React.Fragment>
    )
}
export default MasterMovie
