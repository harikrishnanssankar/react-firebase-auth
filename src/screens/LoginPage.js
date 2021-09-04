import Login from '../components/Login/Login'
import Machine from '../components/Machine/Machine'
import './LoginPage.css'

const LoginPage = () => {
    return (
        <div className="loginPage__container" >
            <Machine />
            <Login/>
        </div>
    )
}

export default LoginPage
