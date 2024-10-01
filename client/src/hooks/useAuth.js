import { useSelector } from 'react-redux'
import { userSelector } from '../redux/slices/userSlice'

export const useAuth = () => {
    const { email, id, token } = useSelector(userSelector)

    return {
        isAuth: !!email,
        email,
        id,
        token
    }
}