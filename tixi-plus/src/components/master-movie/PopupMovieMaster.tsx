import React from 'react'
import { useForm } from "react-hook-form";
import { MovieTypeCreate } from '../../models/MovieType';
import { RiFullscreenExitLine } from 'react-icons/all'

function PopupMovieMaster(props: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (movie: MovieTypeCreate) => {
        console.log(errors);
    }
    const [isOpenPopupUpdateMovie, setIsOpenPopupUpdateMovie] = React.useState(false)
    return (
        <React.Fragment>
            <div className="mark">
            </div>
            <div className="popup-movie-detail-master">
                <div className="popup-movie-img">
                    <img src="https://themebeyond.com/html/movflx/img/poster/movie_details_img.jpg" alt="poster-img" />
                </div>
                <div className="popup-movie-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <input type="file"
                            id="poster-movie" name="poster"
                            accept="image/png, image/jpeg" /> */}
                        <input type="text" className="movie-aliases" placeholder="Bí danh" {...register("aliases", { maxLength: 300 })} />
                        <input type="text" className="movie-moviesName" placeholder="Tên phim" {...register("moviesName", { maxLength: 350, required: true })} />
                        <input type="text" className="movie-trailer" placeholder="Trailer" {...register("trailer", { required: false })} />
                        <input type="text" className="movie-picture" placeholder="Poster" {...register("picture", { required: true })} />
                        {/* <input type="text" className="movie-described" placeholder="Nội dung" {...register("described", { maxLength: 1500, required: true })} /> */}
                        <p className="movie-described" > Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod tempor.There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some injected humour. </p>
                        <input type="text" className="movie-groupCode" placeholder="Mã nhóm" {...register("groupCode", { required: true })} />
                        <input type="datetime-local" className="movie-launchDate" placeholder="Ngày ra mắt" {...register("launchDate", { required: true })} />
                        <input type="number" className="movie-rating" defaultValue={10} placeholder="Đánh giá" {...register("rating", { max: 10, min: 1, maxLength: 2, required: true })} />
                        <input type="submit" className="movie-submit" value="Hoàn tất" ></input>
                    </form>
                </div>
                <div className="exit-detail-movie-master"  >
                    <RiFullscreenExitLine fontSize="40px" color="white" onClick={async (event) => {await setIsOpenPopupUpdateMovie(!isOpenPopupUpdateMovie); props.onClickOpenDetailsRoom(isOpenPopupUpdateMovie) }} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default PopupMovieMaster
export interface Props {
    onClickOpenDetailsRoom(isOpen: boolean): void
}