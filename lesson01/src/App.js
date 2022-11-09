import React, { useState, useEffect } from "react";
import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyLoader from "./components/UI/loader/MyLoader";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePost";
import "./styles/App.css";


function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  async function fetchPosts(){
    setIsPostsLoading(true);
    setTimeout(async() => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 5000)
    
  }

  useEffect(()=>{
    fetchPosts();
  }, []);

  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyModal 
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost}/>
      </MyModal>
      
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      <hr/>
      <MyButton onClick={() => setModal(true)} >
        Create New Post
      </MyButton>
      {isPostsLoading
      ?<MyLoader/>
      :<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts List 1"} />
      }
      
    </div>
  );
}

export default App;
