import React, { useMemo } from 'react'
import { userSelector } from '../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import UserPageComponent from '../components/UserPageComponent'
import { usersSelector } from '../redux/slices/usersSlice'

function HomePage() {

    const { id: authUserId } = useSelector(userSelector)
    const { users } = useSelector(usersSelector)

    const [correntUser] = useMemo(() => {
        return users.filter(user => user._id === authUserId)
    }, [users, authUserId]);

    return (
        <UserPageComponent
            user={correntUser} authUserId={authUserId} />
    )
}

export default HomePage
