import React from 'react'
import { Paper, Grid } from '@material-ui/core'
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
    const onCheck = () =>{
        let confix = window.confirm('are you oke');
        if(confix == true) {
            deleteMovie({
                variables: {
                    _id: props.propMovie.id 
                }
            })
        }else {
            // alert('Bạn không muốn xóa thì đừng bấm')
        }
    }


    return (
        <Grid item xs={2} className={classes.rootChild}  >
            <Paper className={classes.Paper}     >
                <div className="box-image-master">
                    <img className="image-master" alt={props.propMovie.moviesName || "Postermovie"} src={props.propMovie.picture} />
                    <div className="box-master-hover-setting">
                        <div className="master-movie-btn">
                            <a className="master-movie-btn-details" href="#" onClick={async (even) => {
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
                <Rating style={{ fontSize: "13px", color: "#e4d804", marginBottom: "10px", margin: "auto" }} name="movie-rating" value={props.propMovie.rating || 5} precision={0.5} readOnly />
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
