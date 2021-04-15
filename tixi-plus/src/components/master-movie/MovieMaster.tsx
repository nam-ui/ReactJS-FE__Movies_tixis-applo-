import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { styleGrid } from '../../theme/MaterialUI'
import Rating from '@material-ui/lab/Rating';
// import { AiFillSetting, AiFillDelete } from 'react-icons/all'

function MovieMaster(props: Props) {
    const [isOpenPopupUpdateMovie, setIsOpenPopupUpdateMovie] = React.useState(false)
    const classes = styleGrid();
      
    return (
        <Grid item xs={2} className={classes.rootChild}  >
            <Paper className={classes.Paper}     >
                <div className="box-image-master">
                    <img className="image-master" alt={'name-img'} src={"https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg"} />
                    <div className="box-master-hover-setting">
                        <div className="master-movie-btn">
                            <a className="master-movie-btn-details" href="#" onClick={async (even) => {
                                await  props.onClickOpenDetailsRoom(!isOpenPopupUpdateMovie);
                            }}
                            > Details </a>
                            <a href="#" className="master-movie-btn-remove">Remove </a>
                        </div>
                    </div>
                    <div className="box-master-hover-mark">

                    </div>
                </div>
                <Rating style={{ fontSize: "13px", color: "#e4d804", marginBottom: "10px", margin: "auto" }} name="movie-rating" defaultValue={5} precision={0.5} readOnly />
                <a className="master-movie-a" href="/">The Parkar Legend</a>
                <span className="master-movie-rel">Adventure</span>
            </Paper>
        </Grid>
    )
}

export default MovieMaster

export interface Props {
    onClickOpenDetailsRoom(isOpen: boolean): void
}
