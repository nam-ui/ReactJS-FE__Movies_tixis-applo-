import { MovieType } from "./MovieType";

export interface MoviesPagination {
    page: number ,
    pageSize: number,
    totalPage: number ,
    movies: MovieType[]
}
