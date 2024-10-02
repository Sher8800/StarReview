import { Navigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useSelector } from "react-redux"
import { userSelector } from "../redux/slices/userSlice"

function PrivateRoute() {
    const { token } = useSelector(userSelector)

    return (
        token ? <Layout /> : <Navigate to='/authorization' replace />
    )
}

export default PrivateRoute
