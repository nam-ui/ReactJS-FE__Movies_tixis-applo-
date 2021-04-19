import { useQuery } from '@apollo/client'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Movies from '../components/movie/Movies'
import { moviesQuery } from '../graphql/Movie'
import { UserType } from '../models/UserType'
import { Pagination } from '@material-ui/lab'

function Home() {
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
    const { loading, error, data } = useQuery(moviesQuery)
    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>
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
                    <Movies Movies={data.movies} />
                    <Pagination color={"primary"} count={10} style={{color:"white"}} ></Pagination>
                </main>
            </section>

            <Footer />
        </React.Fragment>
    )
}
export default Home
