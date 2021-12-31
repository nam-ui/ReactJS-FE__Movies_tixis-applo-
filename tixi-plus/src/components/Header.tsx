import { useMutation } from '@apollo/client'
import { useMediaQuery } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { AiOutlineClose, BiWorld, HiMenu } from 'react-icons/all'
import { Link, useHistory } from 'react-router-dom'
import { FIND_MOVIES } from '../graphql/Movie'
import { MovieType } from '../models/MovieType'
import { UserType } from '../models/UserType'
import Logo from '../theme/img/logo.png'

function Header(props: Props) {
    const [search, setSearch] = React.useState("");
    const historry = useHistory();
   
    const matches = useMediaQuery('(max-width: 768px)');
    const menu = React.useMemo(() => {
        if (matches===false) {
            return false;
        }
        if (matches===true) {
            return true;
        }
    }, [matches])
    const [styleMenu, setStyleMenu] = React.useState({
        display: "none",
    })
    const [Find] = useMutation(FIND_MOVIES, {
        variables: {
            moviesName: search
        }, onCompleted: ({ findMovie }) => {
            const findMovieElement = (
                <React.Fragment>
                    { findMovie.map((movie: MovieType) => {
                        return <li key={movie.id}> <a  href={`${window.location.protocol}//${window.location.host}/movie/${movie.id}`}> {movie.moviesName} </a> </li>
                    })}
                </ React.Fragment>
            )
            ReactDOM.render(findMovieElement, document.getElementById('menu-search-lv-1'));
        }
    })
    const onSearchKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code==="Enter") {
            Find()
        }

    }
    const onSearchChangge = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }



    React.useEffect(() => {
        const dangXuat = (user: UserType) => {
            localStorage.setItem('user', "{}")
            historry.replace('/')
        }


        let element = (
            <a href={'/login'}> ĐĂNG NHẬP </a>
        );
        if (props.user.role==='user') {
            element = (
                <button className="sign-in-setting-focus" > {props.user.username}
                    <ul className="sign-in-setting">
                        <li><a onClick={() => { dangXuat(props.user) }} href="/">ĐĂNG XUẤT</a> </li>
                    </ul>
                </button>
            )
        }
        if (props.user.role==='admin') {
            element = (
                <button className="sign-in-setting-focus" > {props.user.username}
                    <ul className="sign-in-setting">
                        <li > <a href="/master/movie">PHIM</a> </li>
                        <li><a onClick={() => { dangXuat(props.user) }} href="/">ĐĂNG XUẤT</a> </li>
                    </ul>
                </button>
            )
        }
        ReactDOM.render(element, document.getElementById('login-user'));
    }, [props, menu,historry])

    console.log(KeyboardEvent);


    return (
        <React.Fragment>
            <nav>
                <div id="header-logo"> <Link to={'/'}> <img src={Logo} alt="Logo" /> </Link> </div>
                {
                    menu === true ? (
                        <div id="mobi-menu" >
                            < HiMenu fontSize="35px" color="white" style={{ position: "relative" }} onClick={() => setStyleMenu({ display: "block" })} />
                            <div id="mobi-menu-click" style={styleMenu}>
                                <div id="menu-mobile-logo-and-close">
                                    <div id="header-logo"> <Link to={'/'}> <img src={Logo} alt="Logo" /> </Link> </div>
                                    < AiOutlineClose fontSize="40px" fontWeight={700} color="white" onClick={() => setStyleMenu({ display: "none" })} />
                                </div>
                                <div id="header-menu-0">
                                    <ul className="menu-lv-1">
                                        <li> <a href="/">Lịch Chiếu</a></li>
                                        <li> <a href="/">Cụm rạp</a></li>
                                        <li> <a href="/">Tin Tức</a></li>
                                        <li> <a href="/">Ứng dụng</a> </li>
                                    </ul>
                                </div>
                                <div id="header-feature">
                                    <ul className="nav-feature">
                                        <li>
                                            <div id="text-search-popup" className="menu-search-relative" >
                                                <input onKeyDown={onSearchKeyUp} onChange={onSearchChangge} type="text" placeholder="Tìm kiếm... " />
                                                <div id="menu-search">
                                                    <ul id="menu-search-lv-1">

                                                    </ul>
                                                </div>
                                            </div>
                                            {/* <BiSearch fontSize="17px" fontWeight={700} /> */}
                                        </li>
                                        <li><BiWorld fontSize="17px" color="yellow" style={{ marginRight: "10px" }} fontWeight={700} />  VN</li>
                                        <li id="login-user"></li>
                                    </ul>
                                </div>
                            </div>
                        </ div>
                    ) : <React.Fragment>
                        <div id="header-menu-0">
                            <ul className="menu-lv-1">
                                <li> <a href="/">Lịch Chiếu</a></li>
                                <li> <a href="/">Cụm rạp</a></li>
                                <li> <a href="/">Tin Tức</a></li>
                                <li> <a href="/">Ứng dụng</a> </li>
                            </ul>
                        </div>
                        <div id="header-feature">
                            <ul className="nav-feature">
                                <li>
                                    <div id="text-search-popup" className="menu-search-relative">
                                        <input onKeyDown={onSearchKeyUp} onChange={onSearchChangge} type="text" placeholder="Tìm kiếm... "  />
                                        <div id="menu-search">
                                            <ul id="menu-search-lv-1">

                                            </ul>
                                        </div>
                                    </div>
                                    <div id="focus-open-text-search">
                                        {/* <BiSearch fontSize="17px" color={"#e4d804"} fontWeight={700} /> */}
                                    </div>
                                </li>
                                <li><BiWorld fontSize="17px" color="yellow" style={{ marginRight: "10px" }} fontWeight={700} />  VN</li>
                                <li id="login-user"></li>
                            </ul>
                        </div>
                    </React.Fragment>
                }
            </nav>

        </React.Fragment>
    )
}

export default Header

export interface Props {
    user: UserType
    // onSearch( dataSearch: MovieType[]) : void
}
