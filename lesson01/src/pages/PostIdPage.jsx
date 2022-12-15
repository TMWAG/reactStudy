import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import MyLoader from "../components/UI/loader/MyLoader";
import {useFetching} from "../hooks/useFetching";

const PostIdPage = () => {
    const params = useParams();

    const [post, setPost] = useState({});
    const [fetchPost, postIsLoading] = useFetching(async () => {
        const response = await PostService.getOneById(params.id);
        setPost(response.data);
    });
    const [comments, setComments] = useState([]);
    const [fetchComments, commentsIsLoading] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPost(params.id);
        fetchComments(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <main>
            {postIsLoading
                ? <MyLoader/>
                : 
                <article>
                    <h3>{post.id}. {post.title}</h3>
                    <span>{post.body}</span>
                </article>
            }
            {commentsIsLoading
                ? <MyLoader/>
                :<div className="comment_section">
                    Comments
                    {comments.map((c) => 
                        <div key={c.id} className="comment">
                            <span className="comment__user">User: {c.name}</span>
                            <br />
                            <span className="comment__body">{c.body}</span>
                        </div>
                    )}
                </div>
            }
            
        </main>
        
    );
};

export default PostIdPage;