import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const useGetMessage = () => {
    const { selectedUser } = useSelector(store => store.user)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`)

                dispatch(setMessages(res.data))
               
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessage();
    }, [selectedUser,dispatch])

}

export default useGetMessage