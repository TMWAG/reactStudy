import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";
import cl from "./Navbar.module.css";

const Navbar = () =>{
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () =>{
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return(
        <nav className={cl.navbar}>
            <Link 
                className="" 
                to="/posts"
            >
                Posts
            </Link>
            <Link 
                className=""
                to="/about"
            >
                About
            </Link>
            {isAuth &&
                <MyButton onClick={logout}>
                    Logout
                </MyButton>
            }
            
        </nav>
    );
};

export default Navbar