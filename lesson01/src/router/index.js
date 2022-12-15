import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
    {path: "/about", component: About},
    {path: "/posts", component: Posts},
    {path: "/posts/:id", component: PostIdPage},
];

export const publicRoutes = [
    {path: "/login", component: Login}
];

