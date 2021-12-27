import { useQuery } from '@apollo/client';
import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { FiClock } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { movieQuery } from '../graphql/Movie';
import { UserType } from '../models/UserType';
import banner from '../theme/img/movie_details_bg.jpg';

function DetailMovie() {
    const params = useParams<params>();
    const [account, ] = React.useState<UserType>({
        _id: '',
        password: '',
        username: '',
        role: '',
        createdAt: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
    })
    const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(account))

    const time = (time: any) => {
        try {
           return  new Date(parseInt(time.toString())).toISOString().slice(0, 4);
        } catch (error) {
            console.log(time);
            return 2020;
        }
    }

    const [isOpenVideo, setIsOpenvideo] = React.useState(false)
    const { loading, error, data } = useQuery(movieQuery, {
        variables: {
            _id: params.id,
        }
    })
    const matches = useMediaQuery('(max-width: 768px)');
    const [stylesVideo, setStylesVideo] = React.useState({

    })
    React.useMemo(() => {
        if (matches === true) {
            setStylesVideo({
                width: "100%",
                maxWidth :"100%",
                maxHeight :"75vh"
            })
        }
    }, [matches])




    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>


    return (
        <React.Fragment>
            <header style={{ backgroundImage: `url(${banner})` }} >
                <Header user={user} />
                <div id="header-detail-movie" >
                    <div id="poster-movie-detail">
                        <button  onClick={() => { setIsOpenvideo(!isOpenVideo) }} className="open-movie"></button>
                        <img src={data.movie.picture} alt="poster-movie" />
                    </div>
                    <div id="information-movie-detail">
                        <p><h2 className="episodes">{"New Episodes"}</h2></p>
                        <p><h2 className="movie-detail-name">{data.movie.moviesName}</h2></p>
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
                {
                    isOpenVideo === true ?
                        <div className="mark" onClick={() => { setIsOpenvideo(!isOpenVideo) }} >
                        </div> : null
                }
                {
                    isOpenVideo === true ? <div id="video-a-detail" >
                        < ReactPlayer muted={false} playing={isOpenVideo} style={stylesVideo}  left={0} width={"1300px"} height={"100%"} controls stopOnUnmount poster={data.movie.picture} url={data.movie.trailer} config={{
                            youtube: {
                                playerVars: { showinfo: 1 },
                            },
                            file: {
                                tracks: [
                                    { kind: 'subtitles', src: 'subs/subtitles.en.vtt', srcLang: 'en', default: true, label: "EN" },
                                ]
                            }
                        }} />
                    </div> : null
                }
            </header>
            <Footer />
        </ React.Fragment>
    )
}

export default DetailMovie

export interface params {
    id: string
}
