import React, { FC } from 'react'
import { useMutation } from '@apollo/client'
// import { compareAsc, format } from 'date-fns'
import { useForm } from "react-hook-form";
// ANCHOR model
import { MovieTypeCreate } from '../../models/MovieType'
import { ADD_MOVIE } from '../../graphql/Movie';
import { IoCloseSharp } from 'react-icons/all'
import { useHistory, useLocation } from 'react-router-dom';
import { TextField } from '@material-ui/core';
// ANCHOR files
function FromMovie(props: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // TODO event create
    const historry = useHistory();
    const location = useLocation();
    const [addMovie, { loading, error }] = useMutation(ADD_MOVIE);
    const [picture, setPicture] = React.useState<picture>({
        picture: ``
    })

    const onSubmit = async (movie: MovieTypeCreate) => {
        await addMovie({
            variables: {
                moviesName: movie.moviesName,
                aliases: movie.aliases,
                trailer: movie.trailer,
                picture: picture.picture,
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
        }).then(res => {
            console.log(location.pathname);
            historry.replace(location.pathname)
        });
    };
    console.log(loading);
    console.log(error);
    console.log(errors);


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
    return (
        <React.Fragment>
            <div className="mark">
            </div>
            <div className="popup-create-master-movie">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Tên phim" {...register("moviesName", { maxLength: 350, required: true })} />
                    <input type="text" placeholder="Bí danh" {...register("aliases", { maxLength: 300 })} />
                    <input type="text" placeholder="Trailer" {...register("trailer", { required: false })} />
                    <TextField label="picture" type="file" InputLabelProps={{ shrink: true, }} variant="outlined" {...register("picture", { required: true })}
                        onChange={onChangeIMG}
                    />
                    <input style={{ display: "none" }} type="text" {...register("picture", { required: false })}/>
                    <input type="text" placeholder="Mã nhóm" {...register("groupCode", { required: true })} />
                    <input type="datetime-local" placeholder="Ngày ra mắt" {...register("launchDate", { required: true })} />
                    <input type="text" defaultValue={10} placeholder="Đánh giá" {...register("rating", { maxLength: 3, required: true })} />
                    <textarea placeholder="Nội dung" rows={5} className="described" {...register("described", { required: true })} />
                    <input type="submit" value="Hoàn tất" ></input>
                </form>
            </div>
            <div className="exit-create-movie-master" style={{}} >
                <IoCloseSharp fontSize="40px" color="white" onClick={() => props.onOpenCreatePopup(false)} />
            </div>
        </React.Fragment>
    )
}

export default FromMovie;

export interface Props {
    onOpenCreatePopup(event: boolean): void
}


export interface picture {
    picture: string
}