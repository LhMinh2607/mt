import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Redirect, Route, Routes } from 'react-router';
import MessageBox from './MessageBox';

export default function UserOnlyRoute({children}) //OnlyFans lol
{
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    return(
        userInfo ? (userInfo.role==='user' ? children : <Navigate to='/drink'></Navigate>) : children
    );
}