import React from 'react'
import { useForm } from "react-hook-form";
import { MovieTypeCreate } from '../../models/MovieType';
import { IoCloseSharp } from 'react-icons/all'
import { useMutation, useQuery } from '@apollo/client';
import { movieQuery } from '../../graphql/Movie';
import { UPDATE_MOVIE } from '../../graphql/Movie'
import { useHistory } from 'react-router';
import { TextField } from '@material-ui/core';
import moment from 'moment'


function PopupMovieMaster(props: Props) {
    const { loading, error, data } = useQuery(movieQuery, {
        variables: {
            _id: props.idPropMovie
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [updateMovie, mutationMovie] = useMutation(UPDATE_MOVIE);
    const historry = useHistory();
    const [picture, setPicture] = React.useState<picture>({
        picture: ``
    })
    const onSubmit = async (movie: MovieTypeCreate) => {
        movie.picture = picture.picture
        await updateMovie({
            variables: {
                _id: props.idPropMovie,
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
    const [isOpenPopupUpdateMovie, setIsOpenPopupUpdateMovie] = React.useState(false)
    const convertBase64 = async (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (e) => reject(e);
        })
    }
    const onChangeIMG = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        const base64 = await convertBase64(file);
        setPicture({ picture: `${base64}` })
    };

    React.useEffect(() => {

    }, [])
    const onLaunhDate = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(data.movie.launchDate);
        console.log(event.target.value);
    };
    const setTime = (time: any) => {
        const timeNow = new Date(parseInt(time.toString())).toISOString().slice(0, 16)
        return timeNow.toString()
    }
    return (
        <React.Fragment>
            <div className="mark">
            </div>
            {loading === false && (
                <div className="popup-movie-detail-master">
                    <div className="popup-movie-img">
                        <img src={picture.picture === `` ? data.movie.picture : picture.picture} alt="poster-img" />
                        <TextField label="picture" type="file" InputLabelProps={{ shrink: true, }} variant="outlined" {...register("picture", { required: true })}
                            onChange={onChangeIMG}
                        />
                    </div>
                    <div className="popup-movie-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="movie-aliases" defaultValue={data.movie.aliases || ""} placeholder="Bí danh" {...register("aliases", { maxLength: 300 })} />
                            <input type="text" className="movie-moviesName" defaultValue={data.movie.moviesName} placeholder="Tên phim" {...register("moviesName", { maxLength: 350, required: true })} />
                            <input type="text" className="movie-trailer" defaultValue={data.movie.trailer} placeholder="Trailer" {...register("trailer", { required: false })} />
                            <input type="text" className="movie-groupCode" defaultValue={data.movie.groupCode} placeholder="Mã nhóm" {...register("groupCode", { required: true })} />
                            <TextField type="datetime-local" style={{ float: "left", margin: "0px 0 10px 0"}} variant="outlined" defaultValue={setTime(data.movie.launchDate)} {...register("launchDate", { required: true })}
                                onChange={onLaunhDate}
                            />
                            <input type="number" className="movie-rating" defaultValue={data.movie.rating} placeholder="Đánh giá" {...register("rating", { max: 10, min: 1, maxLength: 2, required: true })} />
                            <textarea defaultValue={data.movie.described || ""} className="movie-de scribed" placeholder="Nội dung" {...register("described", { maxLength: 1500, required: true })} />
                            <input type="submit" className="movie-submit" value="Hoàn tất" ></input>
                        </form>
                    </div>
                    <div className="exit-detail-movie-master"  >
                        <IoCloseSharp fontSize="30px" color="black" onClick={async (event) => { await setIsOpenPopupUpdateMovie(!isOpenPopupUpdateMovie); props.onClickOpenDetailsRoom(isOpenPopupUpdateMovie) }} />
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
export interface picture {
    picture: string
}