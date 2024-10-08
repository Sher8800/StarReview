import React, { useMemo } from 'react'
import UserPageComponent from '../components/UserPageComponent'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/slices/usersSlice';

function UserPage() {
    const params = useParams()
    const { id } = params
    const { users } = useSelector(usersSelector)

    const correntUser = useMemo(() => {
        return users?.find(user => user._id === id)
    }, [users, id]);

    return (
        <UserPageComponent
            userPage={true}
            user={correntUser}
        />
    )
}

export default UserPage
