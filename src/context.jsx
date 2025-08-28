import React, { useContext, useEffect } from 'react'
import { createContext} from 'react'
import useFetch from './hooks/useFetch';
import {getCurrentUserProfile} from "./db/apiAuth"
const UrlContext = createContext();
const UrlProvider = ({children})=>{
    const {data:user, loading, fn:fetchUser} = useFetch(getCurrentUserProfile);
    const isAuthenticated = user?.id === "authenticated";
    useEffect(()=>{
        fetchUser();
    },[])
    return <UrlContext.Provider value = {{user, fetchUser, loading, isAuthenticated}}>
        {children}
    </UrlContext.Provider>
}

export const UrlState = () =>{
    return useContext(UrlContext);
}

export default UrlProvider;