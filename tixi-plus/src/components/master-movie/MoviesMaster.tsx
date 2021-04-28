import React from 'react'
import { Grid, useMediaQuery } from '@material-ui/core'
import MovieMaster from './MovieMaster'
import { styleGrid, stylePagination } from '../../theme/MaterialUI';
import { useQuery } from '@apollo/client';
import { moviesQuery, PAGINATION } from '../../graphql/Movie';
import { MovieType, MovieTypeCreate } from '../../models/MovieType';
import { Pagination } from '@material-ui/lab';
import { MoviesPagination } from '../../models/PaginationType';


function MoviesMaster(props: Props) {
    const classesPagination = stylePagination();
    const classes = styleGrid();
    const [state, setState] = React.useState<MoviesPagination>({
        page: 1,
        pageSize: 18,
        totalPage: 1,
        movies: [],
    });
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setState({ ...state, page: value });
    };
    const { loading, error, data } = useQuery(PAGINATION, {
        variables: {
            page: state.page,
            pageSize: state.pageSize
        }
    })
    const matches = useMediaQuery('(max-width: 768px)');

    const sizeGird = React.useMemo(() => {
        if (matches == false) {
            return 2;
        }
        if (matches == true) {
            return 0;
        }
    }, [matches])
    React.useEffect(() => {
        if (loading === false && data) {
            setState(data.pagination);
        }
    }, [state.pageSize])
    if(loading == true) return <div id="loadding-and-error-data-resp">
        <svg xmlnsXlink="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="80px" height="80px" viewBox="0 0 128 128" xmlSpace="preserve"><rect x="0" y="0" width="100%" height="100%" fill="#171D22" /><g><path d="M76.34 52.05l-43.6-43.6a63.42 63.42 0 0 1 29.7-8.2zm4.2 7.7L64.64.2A63.32 63.32 0 0 1 94.44 8zm-.08 8.86l16-59.5a63.32 63.32 0 0 1 21.94 21.6zm-4.5 7.6l43.62-43.5a63.32 63.32 0 0 1 8.17 29.7zm-7.7 4.4l59.56-15.9a63.32 63.32 0 0 1-7.78 29.8zm-8.86-.1l59.56 16a63.32 63.32 0 0 1-21.66 22zM51.8 76l43.58 43.63a63.32 63.32 0 0 1-29.72 8.17zm-4.36-7.7l15.92 59.6a63.32 63.32 0 0 1-29.82-7.8zm.1-8.83l-16 59.55A63.3 63.3 0 0 1 9.6 97.3zm4.5-7.62L8.44 95.4a63.32 63.32 0 0 1-8.2-29.72zm7.7-4.33L.16 63.36a63.32 63.32 0 0 1 7.8-29.8zm8.85.1L9 31.56A63.32 63.32 0 0 1 30.68 9.6z" fill="#e4d804" /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="30 64 64" dur="500ms" repeatCount="indefinite" /></g></svg>
    </div>


    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={sizeGird} style={{margin : '3% auto'}} >
                {data.pagination.movies.map((movie: MovieType) => {
                    return <MovieMaster key={movie.id} propMovie={movie} onChangeId={(idProps) =>{props.onChangeId(idProps)}} onClickOpenDetailsMovie={(statusOpen) => props.onClickOpenDetailsMovie(statusOpen)} />
                })}
\            </Grid>
            <Pagination className={classesPagination.root} page={state.page} variant="outlined" count={data.pagination.totalPage} onChange={handleChange}  ></Pagination>
        </React.Fragment>
    )


}

export default MoviesMaster
export interface Props {
    onClickOpenDetailsMovie(isOpen: boolean): void,
    onChangeId(_id: string): void,
}
