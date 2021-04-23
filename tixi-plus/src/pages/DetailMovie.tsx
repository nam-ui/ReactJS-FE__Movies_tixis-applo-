import { useQuery } from '@apollo/client';
import React from 'react'
import { BiShareAlt } from 'react-icons/bi';
import { FiClock } from 'react-icons/fi';
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer';
import Header from '../components/Header';
import { movieQuery } from '../graphql/Movie';
import { UserType } from '../models/UserType';
import banner from '../theme/img/movie_details_bg.jpg'

function DetailMovie() {
    const params = useParams<params>();
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

    const time = (time: any) => {
        const timeNow = new Date(parseInt(time.toString())).toISOString().slice(0, 4)
        return timeNow
    }

    const { loading, error, data } = useQuery(movieQuery, {
        variables: {
            _id: params.id,
        }
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>

    console.log(data);


    return (
        <React.Fragment>
            <header style={{ backgroundImage: `url(${banner})` }} >
                <Header user={account} />
                <div id="header-detail-movie" >
                    <div id="poster-movie-detail">
                        <a href="#" className="open-movie"></a>
                        <img src={data.movie.picture} alt="poster-movie" />
                    </div>
                    <div id="information-movie-detail">
                        <p><h2 className="episodes">{"New Episodes"}</h2></p>
                        <p><h2  className="movie-detail-name">{data.movie.moviesName}</h2></p>
                        <p>  <span className="date">{time(data.movie.launchDate)}</span><span className="duration"><FiClock ></FiClock> 128 min</span> </p>
                        <p>
                            <span className="described">
                                {data.movie.described}
                            </span>
                        </p>
                        <div className="btn-share">
                            <button className="btn-share-left" >
                                < BiShareAlt fontSize="25px" />
                                <p>Share</p>
                            </button>
                            <div className="btn-share-right">
                                <div>
                                    <p>Prime Video </p>
                                    <p>Streaming Channels</p>
                                </div>
                                <button>
                                    Mua vé
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Footer />
        </ React.Fragment>
    )
}

export default DetailMovie

export interface params {
    id: string
}
