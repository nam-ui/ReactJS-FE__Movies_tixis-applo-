import React from 'react'
import { useMutation } from '@apollo/client'
// import { compareAsc, format } from 'date-fns'
import { useForm } from "react-hook-form";
// ANCHOR model
import { MovieTypeCreate } from '../../models/MovieType'
import { ADD_MOVIE } from '../../graphql/Movie';
import { RiFullscreenExitLine } from 'react-icons/all'
// ANCHOR files
function FromMovie() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // TODO event create
    const [addMovie, { loading, error }] = useMutation(ADD_MOVIE);
    const onSubmit = async (movie: MovieTypeCreate) => {
        await addMovie({
            variables: {
                moviesName: movie.moviesName,
                aliases: movie.aliases,
                trailer: movie.trailer,
                picture: movie.picture,
                described: movie.described,
                groupCode: movie.groupCode,
                launchDate: movie.launchDate,
                rating: parseInt(movie.rating.toString()),
            },
        }).catch((res) => {
            res.graphQLErrors.map((error: any) => {
                console.log(error);
                return error.message;
            });
        });
    };
    console.log(loading);
    console.log(error);
    console.log(errors);
    return (
        <React.Fragment>
            <div className="mark">
            </div>
            <div className="popup-create-master-movie">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Tên phim" {...register("moviesName", { maxLength: 350, required: true })} />
                    <input type="text" placeholder="Bí danh" {...register("aliases", { maxLength: 300 })} />
                    <input type="text" placeholder="Trailer" {...register("trailer", { required: false })} />
                    <input type="text" placeholder="Poster" {...register("picture", { required: true })} />
                    <input type="text" placeholder="Nội dung" {...register("described", { maxLength: 1500, required: true })} />
                    <input type="text" placeholder="Mã nhóm" {...register("groupCode", { required: true })} />
                    <input type="datetime-local" placeholder="Ngày ra mắt" {...register("launchDate", { required: true })} />
                    <input type="number" defaultValue={10} placeholder="Đánh giá" {...register("rating", { max: 10, min: 1, maxLength: 2, required: true })} />
                    <input type="submit" value="Hoàn tất" ></input>
                </form>
            </div>
            <div className="exit-create-movie-master"  >
                <RiFullscreenExitLine fontSize="40px" color="white" />
            </div>
        </React.Fragment>
    )
}

export default FromMovie


