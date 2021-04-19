import { Link, useHistory, useLocation } from 'react-router-dom';
import React from 'react'
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import Logo from '../theme/img/logo.png'
import { LOGIN } from '../graphql/Movie'
import { UserType } from '../models/UserType';
import { useMutation } from '@apollo/client';
function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ACTION_LOGIN, { data, loading, error }] = useMutation(LOGIN);
    const [isLoginError, setIsLoginError] = React.useState(false)
    const historry = useHistory();
    React.useEffect(() => {
        ACTION_LOGIN({
            variables: {
                username: " ",
                password: " "
            }
        }).catch((res) => {
            res.graphQLErrors.map((error: any) => {
                console.log(error);
                return error.message;
            });
        })
    }, [])
    const onSubmit = async (user: UserType) => {
        await ACTION_LOGIN({
            variables: {
                username: user.username,
                password: user.password
            }
        }).catch((res) => {
            res.graphQLErrors.map((error: any) => {
                console.log(error);
                return error.message;
            });
        }).then(() => {
            if (data.login.user != null) {
                localStorage.setItem('user', JSON.stringify(data.login.user) || '[]')
                historry.replace('/')
            } else {
                setIsLoginError(true)
            }

        })
    };
    console.log(error + "error");
    console.log(errors);
    return (
        <React.Fragment>
            <div className="body-sign-in">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="exit-login"> <Link to="/"><IoMdClose fontSize="40px" color="#23324c" style={{ backgroundColor: "#081630", padding: "7px", borderRadius: "50px", boxShadow: "0 2px 10px 0 rgb(0 0 0 / 50%)" }} /></Link>  </div>
                    <h1 className="logo-login">
                        <Link to="/" > <img src={Logo} alt="Logo" /> </Link>
                        <p className="fs-20 color-white ">  Thế Giới Phim Trên Đầu Ngón Tay </p>
                    </h1>
                    <h3>Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!</h3>
                    <input type="text" placeholder="Email hoặc số điện thoại" {...register("username", { min: 20, required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i })} />
                    <input type="password" placeholder="Mật khẩu"{...register("password", { min: 8, required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/i })} />
                    {isLoginError == true ? <p className="color-danger"> Tài Khoản hoặc Mật Khẩu sai </p> : null}
                    <input type="submit" value="Đăng nhập" />
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login
