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
    const [picture, setPicture] = React.useState<picture>({
        picture: ``
    })

    const [formStateMovie, setFormStateMovie] = React.useState<MovieTypeCreate>({ rating: 10 })

    const [addMovie] = useMutation(ADD_MOVIE, {
        variables: {
            moviesName: formStateMovie.moviesName,
            aliases: formStateMovie.aliases,
            trailer: formStateMovie.trailer,
            picture: picture.picture,
            described: formStateMovie.described,
            groupCode: formStateMovie.groupCode,
            launchDate: formStateMovie.launchDate,
            rating: formStateMovie.rating
        },
        onCompleted: ({ movies }) => {
            console.log(movies);
            
           props.stateFormCreated(movies)
        }
    });

    const onSubmit = async (movie: MovieTypeCreate) => {
        setFormStateMovie({ ...movie, picture: picture.picture })
        addMovie().catch((res) => {
            res.graphQLErrors.map((error: any) => {
                console.log(error);
                return error.message;
            });
        }).then(res => {

        });
    };

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
            <div className="mark" >
                <div className="popup-create-master-movie">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Tên phim" {...register("moviesName", { maxLength: 350, required: true })} />
                        {errors.moviesName && <p className="f-danger text text-align-left" > ⚠ Lổi tên phim</p>}
                        <input type="text" placeholder="Bí danh" {...register("aliases", { maxLength: 300 })} />
                        {errors.aliases && <p className="f-danger text text-align-left" > ⚠ Lổi bí danh</p>}
                        <input type="text" placeholder="Trailer" {...register("trailer", { required: true })} />
                        {errors.trailer && <p className="f-danger text text-align-left" > ⚠ Lổi trailer</p>}
                        <TextField label="picture" type="file" InputLabelProps={{ shrink: true, }} variant="outlined" {...register("picture", { required: true })}
                            onChange={onChangeIMG}
                        />
                        {errors.moviesName && <p className="f-danger text text-align-left" > ⚠ Lổi hình ảnh</p>}
                        <input style={{ display: "none" }} type="text" {...register("picture", { required: false })} />
                        <input type="text" placeholder="Mã nhóm" {...register("groupCode", { required: true })} />
                        {errors.groupCode && <p className="f-danger text text-align-left" > ⚠ Lổi Mã nhóm</p>}
                        <input type="datetime-local" placeholder="Ngày ra mắt" {...register("launchDate", { required: true })} />
                        {errors.launchDate && <p className="f-danger text text-align-left" > ⚠ Lổi ngày ra mắt</p>}
                        <input type="text" defaultValue={10} placeholder="Đánh giá" {...register("rating", { maxLength: 3, required: true })} />
                        {errors.rating && <p className="f-danger text text-align-left" > ⚠ Lổi ngày đánh giá</p>}
                        <textarea placeholder="Nội dung" rows={5} className="described" {...register("described", { required: true })} />
                        {errors.described && <p className="f-danger text text-align-left" > ⚠ Lổi ngày bình luận</p>}
                        <input type="submit" value="Hoàn tất" ></input>
                    </form>
                </div>
                <div className="exit-create-movie-master" style={{}} >
                    <IoCloseSharp fontSize="40px" color="white" onClick={() => props.onOpenCreatePopup(false)} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default FromMovie;

export interface Props {
    onOpenCreatePopup(event: boolean): void ,
    stateFormCreated( movies : MovieTypeCreate ) : void
}


export interface picture {
    picture: string , 
}