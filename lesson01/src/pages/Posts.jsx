import React, { useState, useEffect} from "react";
import PostService from "./API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyLoader from "./components/UI/loader/MyLoader";
import MyModal from "./components/UI/MyModal/MyModal";
import { useFetching } from "./hooks/useFetching";
import { usePagination } from "./hooks/usePagination";
import { usePosts } from "./hooks/usePost";
import "./styles/App.css";
import { getPageCount } from "./utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const pagesArray = usePagination(totalPages);

  useEffect(()=>{
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
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
      {postError &&
        <h3>Error occur: {postError}</h3>
      }
      {isPostsLoading
        ?<MyLoader/>
        :<PostList 
          posts={sortedAndSearchedPosts} 
          title={"Posts List 1"} 
          remove={removePost} 
          pagesArray={pagesArray}
          page={page}
          changePage={changePage}
        />  
      }
    </div>
  );
}

export default Posts;