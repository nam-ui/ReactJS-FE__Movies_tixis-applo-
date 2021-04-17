import React from 'react'
import { useForm } from 'react-hook-form';
import Logo from '../theme/img/logo.png'


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(errors);
    return (

        <React.Fragment>
            <div className="body-sign-in">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="logo-login">
                        <img src={Logo} alt="Logo"/>
                        <p className="fs-20 color-white ">  Thế Giới Phim Trên Đầu Ngón Tay </p>
                    </h1>
                    <h3>Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!</h3>
                    <input type="text" placeholder="User" {...register("User", { min: 10, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i })} />
                    <input type="text" placeholder="Password"{...register("Password", { min: 8, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/i })} />
                    <input type="submit" value="Đăng nhập" />
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login
