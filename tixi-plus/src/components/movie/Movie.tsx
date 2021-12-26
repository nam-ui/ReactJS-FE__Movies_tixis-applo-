import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, useMediaQuery } from '@material-ui/core'
import { AiTwotoneStar, FiClock } from 'react-icons/all'
import { MovieType } from '../../models/MovieType'

function Movie(props: Props) {
    const time = (time: any) => {
        try {
           return  new Date(parseInt(time.toString())).toISOString().slice(0, 4);
        } catch (error) {
            console.log(time);
            return 2020;
        }
    }
    const matches = useMediaQuery('(max-width: 768px)');
    const [mobileStyle, setMobileStyle] = React.useState({})
    const sizeGird = React.useMemo(() => {
        if (matches === false) {
            return 3;
        }
        if (matches === true) {
            setMobileStyle({
                padding: "10px 2.5px"
            })
            return 6;
        }
    }, [matches])
    return (
        < Grid item xs={sizeGird} >
            <div className={"movie-box"} style={mobileStyle} >
                <div className={"movie-poster"}>
                    <Link to={`/movie/${props.Movie.id}`}>
                        <img src={props.Movie.picture} alt="Pic_product" />
                    </Link>
                </div>
                <div className={"movie-content"}>
                    <div className="top">
                        <h5 className="title"><a href={`/movie/${props.Movie.id}`}>{props.Movie.moviesName}</a></h5>
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
