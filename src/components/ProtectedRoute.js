import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../store/userContext"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user,  userLoading, isUserSignedOut } = useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={props => {
                return (!userLoading && !user && isUserSignedOut) ?  <Redirect to="/login" /> : <Component {...props} />
            }}
        ></Route>
    )
}

export default ProtectedRoute
