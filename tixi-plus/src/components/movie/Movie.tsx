import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { AiFillLike, FiClock } from 'react-icons/all'
import { MovieType } from '../../models/MovieType'

function Movie(props : Props) {
    return (
        < Grid item xs={3} >
            <div className={"movie-box"}>
                <div className={"movie-poster"}>
                    <Link to="/">
                        <img src={props.Movie.picture}  alt="image"  />
                    </Link>
                </div>
                <div className={"movie-content"}>
                    <div className="top">
                        <h5 className="title"><a href="/">{props.Movie.moviesName}</a></h5>
                        <span className="date">2021</span>
                    </div>
                    <div className="bottom">
                        <ul>
                            <li><span className="quality">HD</span></li>
                            <li>
                                <span className="duration"><FiClock ></FiClock> 128 min</span>
                                <span className="rating"><AiFillLike ></AiFillLike>{props.Movie.rating}</span>
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
