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

function Home() {
    const classes = stylePagination()
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
    }, [])
    const [state, setState] = React.useState<MoviesPagination>({
        page: 1,
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
        if (loading === false && data) {
            setState(data.pagination);
        }
    }, [state.pageSize])
    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setState({ ...state, page: value });
    };

    return (
        <React.Fragment>
            <header>
                <Header user={account} />
                <div className="header-slider">
                    <h1>Movflx</h1>
                    <h2> Unlimited<span>Movie</span>, TVs Shows, &amp; More.</h2>
                    <div className="banner-meta wow fadeInUp" data-wow-delay=".6s">
                        <p className=""> <span>PG 18</span> <span>HD</span> <span>Drama,Romance</span> <span>2021</span> <span>128min</span> </p>
                        {/* <video tabIndex={-1} className="video-stream html5-main-video" controlsList="nodownload" src="blob:https://www.youtube.com/af8e90a6-4098-4409-b189-a98f9c876f02" style={{ width: "929px", height: "523px", left: "0px", top: "0px" }}></video> */}
                    </div>
                </div>
            </header>
            <section>
                <main>
                    <Movies Movies={data.pagination.movies} />
                    <Pagination className={classes.root} page={state.page} variant="outlined" count={data.pagination.totalPage} onChange={handleChange}  ></Pagination>
                </main>

            </section>

            <Footer />
        </React.Fragment>
    )
}
export default Home
