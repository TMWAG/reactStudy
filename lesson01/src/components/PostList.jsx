import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  if(!posts.length){
    return(
      <h2>
        No posts found
      </h2>
    )
  }
  return (
    <div>
      <h2>{title}</h2>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      
    </div>
  );
};

export default PostList;
