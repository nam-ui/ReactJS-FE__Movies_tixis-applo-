import React from 'react'
import Header from '../components/Header'
import { UserType } from '../models/UserType'

function Pages404() {
    const [account, setAccount] = React.useState<UserType>({
        _id: '',
        password: '',
        username: '',
        role: '',
        createdAt: new Date(Date.UTC(0, 0, 0, 0, 0, 0))
    })
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(account))
        setAccount(user)
    }, [])
    return (
        <React.Fragment>
            <header style={{ minHeight: "auto", backgroundImage: "none" }}>
                <Header user={account} />
                <div id="main">
                    <div className="fof">
                        <h1 style={{ textDecoration: "none" }}>Error 404</h1>
                        <div>
                            <a href="/" style={{ color: " white", textDecoration: "none" , fontWeight:700 }}> GO HOME </a>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}
export default Pages404
