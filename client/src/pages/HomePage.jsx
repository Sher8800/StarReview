import React, { useMemo } from 'react'
import { userSelector } from '../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import UserPageComponent from '../components/UserPageComponent'
import { usersSelector } from '../redux/slices/usersSlice'

function HomePage() {

    const { id } = useSelector(userSelector)
    const { users } = useSelector(usersSelector)

    const [correntUser] = useMemo(() => {
        return users.filter(user => user._id === id)
    }, [users, id]);

    return (
        <UserPageComponent
            user={correntUser} />
    )
}

export default HomePage
