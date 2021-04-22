import { makeStyles } from '@material-ui/core/styles';

export const styleGrid = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: "1330px",
        margin: "0 auto",
    },
    rootChild: {
    },
    Paper: {
        backgroundColor: "#1f1e24",
        padding: "15px 15px 10px ",
        display: 'grid',
        justifyContent: "center"
    }
}));
export const stylePagination = makeStyles((theme) => ({
    root: {
        // backgroundColor: "#ddd",
        "& .MuiPagination-ul": {
            color: "red",
        },
        "& .MuiPaginationItem-root": {
            color: "white",
        },
        "& .MuiPaginationItem-outlined":{
            
        },
        "& .MuiPaginationItem-page.Mui-selected":{
            color: "yellow",
            backgroundColor: "#404040",
        }
    }
}));





