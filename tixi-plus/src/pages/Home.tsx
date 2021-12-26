import { useQuery } from '@apollo/client'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Movies from '../components/movie/Movies'
import { PAGINATION } from '../graphql/Movie'
import { UserType } from '../models/UserType'
import { Pagination } from '@material-ui/lab'
import { stylePagination } from '../theme/MaterialUI'
import { MoviesPagination } from '../models/PaginationType'
import { useHistory, useParams } from 'react-router-dom'
function Home() {
    const classes = stylePagination()
    const history = useHistory();
    const [account, setAccount] = React.useState<UserType>({
        _id: '',
        password: '',
        username: '',
        role: '',
        createdAt: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
    })
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(account))
        setAccount(user)
    })
    const paramsPageURL = useParams<PageURLTYPE>();
    const existedParamsPage = paramsPageURL.page ?? 1
    const [state, setState] = React.useState<MoviesPagination>({
        page: parseInt(existedParamsPage.toString()),
        pageSize: 12,
        totalPage: 1,
        movies: [],
    });
    const { loading, error, data } = useQuery(PAGINATION, {
        variables: {
            page: state.page,
            pageSize: state.pageSize
        }
    })
    React.useEffect(() => {
        history.replace(`/page=${state.page}`)
        if (loading === false && data) {
            setState(data.pagination);
        }
    }, [state.page, existedParamsPage])
    if (loading === true) return <div id="loadding-and-error-data-resp">
        <svg xmlnsXlink="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="80px" height="80px" viewBox="0 0 128 128" xmlSpace="preserve"><rect x="0" y="0" width="100%" height="100%" fill="#171D22" /><g><path d="M76.34 52.05l-43.6-43.6a63.42 63.42 0 0 1 29.7-8.2zm4.2 7.7L64.64.2A63.32 63.32 0 0 1 94.44 8zm-.08 8.86l16-59.5a63.32 63.32 0 0 1 21.94 21.6zm-4.5 7.6l43.62-43.5a63.32 63.32 0 0 1 8.17 29.7zm-7.7 4.4l59.56-15.9a63.32 63.32 0 0 1-7.78 29.8zm-8.86-.1l59.56 16a63.32 63.32 0 0 1-21.66 22zM51.8 76l43.58 43.63a63.32 63.32 0 0 1-29.72 8.17zm-4.36-7.7l15.92 59.6a63.32 63.32 0 0 1-29.82-7.8zm.1-8.83l-16 59.55A63.3 63.3 0 0 1 9.6 97.3zm4.5-7.62L8.44 95.4a63.32 63.32 0 0 1-8.2-29.72zm7.7-4.33L.16 63.36a63.32 63.32 0 0 1 7.8-29.8zm8.85.1L9 31.56A63.32 63.32 0 0 1 30.68 9.6z" fill="#e4d804" /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="30 64 64" dur="500ms" repeatCount="indefinite" /></g></svg>
    </div>
    if (error) return <p>error...</p>
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setState({ ...state, page: value });
    };
    return (
        <React.Fragment>
            <header>
                <Header user={account} />
                {/* onSearch={(dataSearch) => setState({ ...state, movies:dataSearch})  } */}
                {console.log(state.movies)}
                <div className="header-slider">
                    <h1>Movflx</h1>
                    <h2> Unlimited<span> Movie</span>, TVs Shows, &amp; More.</h2>
                    <div className="banner-meta" data-wow-delay=".6s">
                        <p> <span>PG 18</span> <span>HD</span> <span>Drama,Romance</span> <span>2021</span> <span>128min</span> </p>
                    </div>
                </div>
            </header>
            <section>
                <main>
                    <Movies Movies={data.pagination.movies} />
                </main>
                <Pagination className={classes.root} page={state.page} variant="outlined" count={data.pagination.totalPage} onChange={handleChange}  ></Pagination>
            </section>
            <Footer />
        </React.Fragment>
    )
}
export default Home;
export interface PageURLTYPE {
    page: string
}