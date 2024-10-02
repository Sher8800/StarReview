import React from 'react'
import UserPageComponent from '../components/UserPageComponent'
import { useLocation } from 'react-router-dom'

function UserPage() {
    const location = useLocation()
    const { state } = location

    return (
        <UserPageComponent
            username={state.user.username}
            email={state.user.email}
            roles={state.user.roles}
            userPage={true}
        />
    )
}

export default UserPage
