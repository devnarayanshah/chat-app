import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux';
import { setOtherUSers } from '../redux/userSlice';

const useGetOtherUser = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUser = async () => {
            try {
                axios.defaults.withCredentials=true;
                const res= await axios.get('http://localhost:8080/api/v1/user/')
               
                dispatch(setOtherUSers(res.data))
                console.log(res.data.message)
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUser();

    },[dispatch])
  
}

export default useGetOtherUser