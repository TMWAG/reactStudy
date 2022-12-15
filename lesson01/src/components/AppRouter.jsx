import React from "react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import {privateRoutes, publicRoutes} from "../router/index"
import MyLoader from "./UI/loader/MyLoader";

const AppRouter = () =>{
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
        return <MyLoader/>
    }
    return(
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route => 
                    <Route 
                        path={route.path} 
                        element={<route.component/>}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate to="/posts" replace/>} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route => 
                    <Route 
                        path={route.path} 
                        element={<route.component/>}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
    );
};

export default AppRouter;