import React from 'react';
import { useLocation } from 'react-router-dom';
import { MovieType } from '../models/MovieType';
function PagesFindMovies(props: Props) {
    const location = useLocation();

    console.log(location);

    return (
        <div className="mark" >
            {
                // location.pathname == 
            }
        </div>
    )
}

export default PagesFindMovies
export interface Props {
    movies: MovieType[]
}
