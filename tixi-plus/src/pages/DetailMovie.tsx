import { useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom'
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


    const { loading, error, data } = useQuery(movieQuery, {
        variables: {
            _id: params.id,
        }
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>
    
    return (
        <React.Fragment>
            <header  style={{backgroundImage:`url(${banner})`}} >
                <Header user={account} />
                <div id="header-detail-movie" >
                    <img src={data.movie.picture} alt=""/>
                    <h2 style={{color: "red"}}>{data.movie.moviesName}</h2>
                    <iframe width="560" height="315" src={data.movie.trailer} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </header>
        </ React.Fragment>
    )
}

export default DetailMovie

export interface params {
    id: string
}
