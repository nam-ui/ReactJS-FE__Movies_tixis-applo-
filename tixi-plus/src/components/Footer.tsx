import React from 'react'
import { AiOutlineTwitter, FaFacebookF, FaPinterest, FiInstagram, HiSearch } from 'react-icons/all'
import { Link } from 'react-router-dom'
import Logo from '../theme/img/logo.png'
import card from '../theme/img/card_img.png'
function Footer() {
    return (
        <footer>
            <div className="footer-one">
                <div id="footer-one-logo"> <Link to={'/'}> <img src={Logo} alt="Logo" /> </Link> </div>
                <div id="footer-one-ul">
                    <ul id="footer-one-ul-lv-1">
                        <li><a>TRANG CHỦ</a></li>
                        <li><a>BỘ PHIM</a></li>
                        <li><a>TRANG</a></li>
                        <li>
                            <div className="input-footer-send-mail"><input type="text" placeholder="Find Favorite Movie" /> <HiSearch fontWeight={700} color="yellow" /> </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-two">
                <div className="footer-two-nav">
                    <ul className="footer-two-ul-vl-1">
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
                <div className="footer-two-nav-pass2">
                    <ul className="footer-two-ul-vl-pt-2">
                        <li><a href="#">  <  FaFacebookF />  </a></li>
                        <li><a href="#"> < AiOutlineTwitter />  </a></li>
                        <li><a href="#"> < FaPinterest />  </a></li>
                        <li><a href="#">  < FiInstagram /> </a></li>
                    </ul>
                </div>
            </div>
            <div className="container-footer-three">
                <div className="footer-three" >
                    <div className="footer-three-copyright">Copyright © 2021. All Rights Reserved By <a>Nam Nam</a></div>
                    <div>
                        <img src={card} alt="" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
