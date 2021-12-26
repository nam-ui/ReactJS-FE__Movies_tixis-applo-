import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN } from '../graphql/Movie';
import { UserType } from '../models/UserType';
import Logo from '../theme/img/logo.png';
export const AUTH_TOKEN = 'auth-token';
function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ACTION_LOGIN, { data, loading, error }] = useMutation(LOGIN);
    const [isLoginError, setIsLoginError] = React.useState(false)
    const history = useHistory();
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
    }, [ACTION_LOGIN])

    const [formState, setFormState] = useState<UserType>({
        _id: "",
        username: "",
        password: ""
    });

    const [login] = useMutation(LOGIN, {
        variables: {
            username: formState.username,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            const loginExists = login.user ?? true
            if (loginExists === true) {
                setIsLoginError(loginExists)
             } else {
                localStorage.setItem("user", JSON.stringify(login.user) || "{}");
                history.push('/');
            }
        }
    });

    const [showPass , setShowPass] = React.useState('password')

    const onSubmit = async (user: UserType) => {
        console.log(user);
        setFormState(user)
        login().catch((res) => {
            res.graphQLErrors.map((error: any) => {
                console.log(error);
                return error.message;
            });
        }).finally(() => {
            return <div id="loadding-and-error-data-resp">
                <svg xmlnsXlink="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="80px" height="80px" viewBox="0 0 128 128" xmlSpace="preserve"><rect x="0" y="0" width="100%" height="100%" fill="#171D22" /><g><path d="M76.34 52.05l-43.6-43.6a63.42 63.42 0 0 1 29.7-8.2zm4.2 7.7L64.64.2A63.32 63.32 0 0 1 94.44 8zm-.08 8.86l16-59.5a63.32 63.32 0 0 1 21.94 21.6zm-4.5 7.6l43.62-43.5a63.32 63.32 0 0 1 8.17 29.7zm-7.7 4.4l59.56-15.9a63.32 63.32 0 0 1-7.78 29.8zm-8.86-.1l59.56 16a63.32 63.32 0 0 1-21.66 22zM51.8 76l43.58 43.63a63.32 63.32 0 0 1-29.72 8.17zm-4.36-7.7l15.92 59.6a63.32 63.32 0 0 1-29.82-7.8zm.1-8.83l-16 59.55A63.3 63.3 0 0 1 9.6 97.3zm4.5-7.62L8.44 95.4a63.32 63.32 0 0 1-8.2-29.72zm7.7-4.33L.16 63.36a63.32 63.32 0 0 1 7.8-29.8zm8.85.1L9 31.56A63.32 63.32 0 0 1 30.68 9.6z" fill="#e4d804" /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="30 64 64" dur="500ms" repeatCount="indefinite" /></g></svg>
            </div>
        })


    };
    if (loading === true) return <div id="loadding-and-error-data-resp">
        <svg xmlnsXlink="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="80px" height="80px" viewBox="0 0 128 128" xmlSpace="preserve"><rect x="0" y="0" width="100%" height="100%" fill="#171D22" /><g><path d="M76.34 52.05l-43.6-43.6a63.42 63.42 0 0 1 29.7-8.2zm4.2 7.7L64.64.2A63.32 63.32 0 0 1 94.44 8zm-.08 8.86l16-59.5a63.32 63.32 0 0 1 21.94 21.6zm-4.5 7.6l43.62-43.5a63.32 63.32 0 0 1 8.17 29.7zm-7.7 4.4l59.56-15.9a63.32 63.32 0 0 1-7.78 29.8zm-8.86-.1l59.56 16a63.32 63.32 0 0 1-21.66 22zM51.8 76l43.58 43.63a63.32 63.32 0 0 1-29.72 8.17zm-4.36-7.7l15.92 59.6a63.32 63.32 0 0 1-29.82-7.8zm.1-8.83l-16 59.55A63.3 63.3 0 0 1 9.6 97.3zm4.5-7.62L8.44 95.4a63.32 63.32 0 0 1-8.2-29.72zm7.7-4.33L.16 63.36a63.32 63.32 0 0 1 7.8-29.8zm8.85.1L9 31.56A63.32 63.32 0 0 1 30.68 9.6z" fill="#e4d804" /><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="30 64 64" dur="500ms" repeatCount="indefinite" /></g></svg>
    </div>
    console.log(watch + "useForm watch");
    console.log(errors + "useForm errors");
    console.log(error + "error");
    console.log(data + "error");
    console.log(setShowPass + "error");


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
                    <input type={showPass} placeholder="Mật khẩu"{...register("password", { min: 8, required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/i })} />
                    {isLoginError === true ? <p className="color-danger"> Tài Khoản hoặc Mật Khẩu sai </p> : null}
                    {/* <input type="checkbox" onChange={(event) =>{
                        console.log(event.target.value);
                        
                        setShowPass('text')
                    }} checked  /> <span></span> */}
                    <h3>Demon account admin <br/>Username: namnam@gmail.com <br/>Password: 123456Aa </h3>
                    <input type="submit" value="Đăng nhập" />
                </form>

            </div>
        </React.Fragment>
    )
}

export default Login
