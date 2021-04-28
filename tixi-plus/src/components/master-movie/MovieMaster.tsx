import React from 'react'
import { Paper, Grid, useMediaQuery } from '@material-ui/core'
import { styleGrid } from '../../theme/MaterialUI'
import Rating from '@material-ui/lab/Rating';
// import { AiFillSetting, AiFillDelete } from 'react-icons/all'
import { MovieType } from '../../models/MovieType'
import { useMutation } from '@apollo/client';
import { REMOVE_MOVIE } from '../../graphql/Movie';

function MovieMaster(props: Props) {
    const [isOpenPopupUpdateMovie, setIsOpenPopupUpdateMovie] = React.useState(false)
    const [deleteMovie, { loading, error }] = useMutation(REMOVE_MOVIE);
    const classes = styleGrid();
    const onCheck = () => {
        let confix = window.confirm(`Bạn muốn ${props.propMovie.moviesName}`);
        if (confix == true) {
            deleteMovie({
                variables: {
                    _id: props.propMovie.id
                }
            })
        }
    }
    const matches = useMediaQuery('(max-width: 768px)');

    const sizeGird = React.useMemo(() => {
        if (matches == false) {
            return 2;
        }
        if (matches == true) {
            return 4;
        }
    }, [matches])




    return (
        <Grid item xs={sizeGird || 2} className={classes.rootChild}  >
            <Paper className={classes.Paper}     >
                <div className="box-image-master">
                    <img className="image-master" alt={props.propMovie.moviesName || "Postermovie"} src={props.propMovie.picture} />
                    <div className="box-master-hover-setting">
                        <div className="master-movie-btn">
                            <a className="master-movie-btn-details" onClick={async (even) => {
                                props.onChangeId(props.propMovie.id);
                                await props.onClickOpenDetailsMovie(!isOpenPopupUpdateMovie);
                            }}
                            > Details </a>
                            <a href="#" className="master-movie-btn-remove" onClick={(event) => {
                                onCheck()
                            }}   >Remove </a>
                        </div>
                    </div>
                    <div className="box-master-hover-mark">
                    </div>
                </div>
                <Rating style={{ fontSize: "13px", color: "#e4d804", marginBottom: "10px", margin: "auto" }} name="movie-rating" value={parseInt(props.propMovie.rating.toString()) || 5} precision={0.5} readOnly />
                <a className="master-movie-a" href="/">{props.propMovie.moviesName}</a>
                <span className="master-movie-rel">{props.propMovie.aliases}</span>
            </Paper>
        </Grid>
    )
}

export default MovieMaster;

export interface Props {
    onClickOpenDetailsMovie(isOpen: boolean): void,
    onChangeId(_id: string): void,
    propMovie: MovieType
}
