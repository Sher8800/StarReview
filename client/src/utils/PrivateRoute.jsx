import { Navigate } from "react-router-dom"
import Layout from "../components/Layout"

function PrivateRoute() {
    const isAuthenticated = false
    return (
        isAuthenticated ? <Layout /> : <Navigate to='/authorization' replace />
    )
}

export default PrivateRoute
