import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../theme/img/logo.png'
import { BiSearch, BiWorld } from 'react-icons/all'
import { UserType } from '../models/UserType'
import ReactDOM from 'react-dom';
function Header(props: Props) {
    const historry = useHistory();
    const dangXuat = (user: UserType) => {
        localStorage.setItem('user', "{}")
        historry.replace('/')
    }
    React.useEffect(() => {
        console.log(props.user.role);
        let element = (
            <a href={'/login'}> ĐĂNG NHẬP </a>
        );
        if (props.user.role == 'user') {
            element = (
                <a className="sign-in-setting-focus" href={'#'}> {props.user.username}
                    <ul className="sign-in-setting">
                        <li><a onClick={() => { dangXuat(props.user) }} href="/">ĐĂNG XUẤT</a> </li>
                    </ul>
                </a>
            )
        }
        if (props.user.role == 'admin') {
            element = (
                <a className="sign-in-setting-focus" href={'#'}> {props.user.username}
                    <ul className="sign-in-setting">
                        <li > <a href="/master/movie">PHIM</a> </li>
                        <li><a onClick={() => { dangXuat(props.user) }} href="/">ĐĂNG XUẤT</a> </li>
                    </ul>
                </a>
            )
        }
        ReactDOM.render(element, document.getElementById('login-user'));
    }, [])


    return (
        <React.Fragment>
            <nav>
                <div id="header-logo"> <Link to={'/'}> <img src={Logo} alt="Logo" /> </Link> </div>
                <div id="header-menu-0">
                    <ul className="menu-lv-1">
                        <li> <a href="#">Lịch Chiếu</a></li>
                        <li> <a href="#">Cụm rạp</a></li>
                        <li> <a href="#">Tin Tức</a></li>
                        <li> <a href="#">Ứng dụng</a> </li>
                    </ul>
                </div>
                <div id="header-feature">
                    <ul className="nav-feature">
                        <li><BiSearch fontSize="17px" fontWeight={700} /></li>
                        <li><BiWorld fontSize="17px" color="yellow" style={{ marginRight: "10px" }} fontWeight={700} />  VN</li>
                        <li id="login-user"></li>
                        {/* <li><Link to={'/login'}> ĐĂNG NHẬP </Link>
                            <ul className="sign-in-setting">
                                <li> <Link to="/master/movie">PHIM</Link> </li>
                                <li><Link onClick={() => { dangXuat(props.user) }} to="/">ĐĂNG XUẤT</Link> </li>
                            </ul>
                        </li>
                        {props.user.username == '' ? <li><Link to={'/login'}> SIGN IN </Link></li> : <li><Link to={'/'}> {props.user.username}</Link></li>} */}
                    </ul>
                </div>
            </nav>

        </React.Fragment>
    )
}

export default Header

export interface Props {
    user: UserType
}
