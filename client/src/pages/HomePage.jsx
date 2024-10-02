import React from 'react'
import { userSelector } from '../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import UserPageComponent from '../components/UserPageComponent'

function HomePage() {

    const { username, email, roles } = useSelector(userSelector)

    return (
        <UserPageComponent
            username={username}
            email={email}
            roles={roles} />
    )
}

export default HomePage
