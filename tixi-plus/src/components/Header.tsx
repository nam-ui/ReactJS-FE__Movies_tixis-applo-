import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../theme/img/logo.png'
import { BiSearch, BiWorld } from 'react-icons/all'


function Header() {
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
                        <li><Link  to={'/login'}> SIGN IN </Link></li>
                    </ul>
                </div>
            </nav>
            
        </React.Fragment>
    )
}

export default Header
