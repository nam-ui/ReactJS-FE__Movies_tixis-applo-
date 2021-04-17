import React from 'react'
import { useForm } from "react-hook-form";
import { MovieTypeCreate } from '../../models/MovieType';
import { RiFullscreenExitLine } from 'react-icons/all'
import { useMutation, useQuery } from '@apollo/client';
import { movieQuery } from '../../graphql/Movie';
import { UPDATE_MOVIE } from '../../graphql/Movie'
import { useHistory } from 'react-router';
function PopupMovieMaster(props: Props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [updateMovie, mutationMovie ] = useMutation(UPDATE_MOVIE);
    const historry = useHistory();
  
    const onSubmit = async (movie: MovieTypeCreate) => {
        await updateMovie({
            variables:{
                _id:props.idPropMovie ,
                moviesName: movie.moviesName,
                aliases: movie.aliases,
                trailer: movie.trailer,
                picture: movie.picture,
                described: movie.described,
                groupCode: movie.groupCode,
                launchDate: movie.launchDate,
                rating: parseInt(movie.rating.toString()),
            }
        })
        historry.replace('/master/movie');
        props.onClickOpenDetailsRoom(isOpenPopupUpdateMovie) 
    }
    console.log(errors);
    const { loading, error, data } = useQuery(movieQuery, {
        variables: {
            _id: props.idPropMovie
        }
    })
    const [isOpenPopupUpdateMovie, setIsOpenPopupUpdateMovie] = React.useState(false)
    return (
        <React.Fragment>
            <div className="mark">
            </div>
            {loading === false && (
                <div className="popup-movie-detail-master">
                    <div className="popup-movie-img">
                        <img src={data.movie.picture} alt="poster-img" />
                    </div>
                    <div className="popup-movie-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <input type="file"
                             id="poster-movie" name="poster"
                             accept="image/png, image/jpeg" /> */}
                            <input type="text" className="movie-aliases" defaultValue={data.movie.aliases || ""} placeholder="Bí danh" {...register("aliases", { maxLength: 300 })} />
                            <input type="text" className="movie-moviesName" defaultValue={data.movie.moviesName} placeholder="Tên phim" {...register("moviesName", { maxLength: 350, required: true })} />
                            <input type="text" className="movie-trailer" defaultValue={data.movie.trailer} placeholder="Trailer" {...register("trailer", { required: false })} />
                            <input type="text" className="movie-picture" defaultValue={data.movie.picture} placeholder="Poster" {...register("picture", { required: true })} />
                            {/* <input type="text" className="movie-described" placeholder="Nội dung" {...register("described", { maxLength: 1500, required: true })} /> */}
                            <p className="movie-described" > {data.movie.described} </p>
                            <input type="text" className="movie-groupCode" defaultValue={data.movie.groupCode} placeholder="Mã nhóm" {...register("groupCode", { required: true })} />
                            <input type="datetime-local" className="movie-launchDate" defaultValue={data.movie.launchDate} placeholder="Ngày ra mắt" {...register("launchDate", { required: true })} />
                            <input type="number" className="movie-rating" defaultValue={data.movie.rating} placeholder="Đánh giá" {...register("rating", { max: 10, min: 1, maxLength: 2, required: true })} />
                            <input type="submit" className="movie-submit" value="Hoàn tất" ></input>
                        </form>
                    </div>
                    <div className="exit-detail-movie-master"  >
                        <RiFullscreenExitLine fontSize="40px" color="white" onClick={async (event) => { await setIsOpenPopupUpdateMovie(!isOpenPopupUpdateMovie); props.onClickOpenDetailsRoom(isOpenPopupUpdateMovie) }} />
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default PopupMovieMaster
export interface Props {
    onClickOpenDetailsRoom(isOpen: boolean): void,
    idPropMovie: string
}