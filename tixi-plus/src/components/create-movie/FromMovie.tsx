import React from 'react'
// import { compareAsc, format } from 'date-fns'
import { useForm } from "react-hook-form";
// ANCHOR model
import { MovieTypeCreate } from '../../models/MovieType'
// ANCHOR files
function FromMovie() {
    // const [movieState, setMovieState] = React.useState<MovieTypeCreate>({
    //     aliases: "",
    //     described: "",
    //     groupCode: "",
    //     moviesName: "",
    //     picture: "",
    //     rating: 10,
    //     trailer: "",
    //     launchDate: new Date(2014, 1, 11),
    // })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: MovieTypeCreate) => {
        console.log(data)
        console.log(register);

    };
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Tên phim" {...register("moviesName", { maxLength: 350, pattern: /^[A-Za-z\s]+$/, required: true })} />
            <input type="text" placeholder="Bí danh" {...register("aliases", { maxLength: 300, pattern: /^[A-Za-z\s]+$/, required: true })} />
            <input type="text" placeholder="Trailer" {...register("trailer", { required: false })} />
            <input type="text" placeholder="Poster" {...register("picture", { required: true })} />
            <input type="text" placeholder="Nội dung" {...register("Mô tả", { maxLength: 1500, required: true })} />
            <input type="text" placeholder="Mã nhóm" {...register("groupCode", { required: true })} />
            <input type="datetime-local" placeholder="Ngày ra mắt" {...register("launchDate", { required: true })} />
            <input type="number" defaultValue={10} placeholder="Đánh giá" {...register("rating", { max: 10, min: 1, maxLength: 2, required: true })} />
            <input type="submit" value="Hoàn tất" ></input>
        </form>
    )
}

export default FromMovie
