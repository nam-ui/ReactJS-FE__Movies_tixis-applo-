import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { AiTwotoneStar, FiClock } from 'react-icons/all'
import { MovieType } from '../../models/MovieType'

function Movie(props: Props) {
    const time = (time: any) => {
        const timeNow = new Date(parseInt(time.toString())).toISOString().slice(0, 4)
        return timeNow
    }

    return (
        < Grid item xs={3} >
            <div className={"movie-box"}>
                <div className={"movie-poster"}>
                    <Link to="/">
                        <img src={props.Movie.picture} alt="image" />
                    </Link>
                </div>
                <div className={"movie-content"}>
                    <div className="top">
                        <h5 className="title"><a href="/">{props.Movie.moviesName}</a></h5>
                        <span className="date">{time(props.Movie.launchDate)}</span>
                    </div>
                    <div className="bottom">
                        <ul>
                            <li><span className="quality">C18</span></li>
                            <li style={{ display: "flex", alignItems: "center" }} >
                                <span style={{ display: "flex", alignItems: "center" }} className="duration"><FiClock ></FiClock> 128 min</span>
                                <span style={{ display: "flex", alignItems: "center" }} className="rating"><AiTwotoneStar />{props.Movie.rating}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Grid >
    )
}
export default Movie
export interface Props {
    Movie: MovieType
}
