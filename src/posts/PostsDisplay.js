import React, { useState, useEffect, useContext } from "react";
import SearchForm from "../common/SearchForm";
import A2Api from "../api/a2api";
import LoadingSpinner from "../common/LoadingSpinner";
import PostCard from "./PostCard";
import { useHistory } from "react-router-dom";
import '../styles/PostsDisplay.css';
import TopBanner from "../top-banner/TopBanner";

import PostContext from "./PostContext";

function PostsDisplay(){

    // const [posts, setPosts] = useState(null);

    const {allPosts,setAllPosts} = useContext(PostContext);

    useEffect(function getPostsOnMount() {
      search();
    }, []);
  
    async function search(params) {
      let posts = await A2Api.getPosts(params);
      setAllPosts(posts);
    }

    const history = useHistory();

    if (!allPosts) return <LoadingSpinner />;

    function clickHandler(e){
      let elem = e.target;
      let maxJumps = 99;
      while(elem.className != 'PostCard' && maxJumps > 0){
        maxJumps--;
        elem = elem.parentNode;
      }
      const postId = elem.id.slice(9);
      history.push(`/posts/${postId}`);
    }    

    return (
      <div className="main-view">
        <TopBanner/>
        <div className="posts-display">
          <div onClick={(e)=>clickHandler(e)}>
            {allPosts.map(p => (
              <PostCard 
                key={p.id}
                post_date = {p.post_date}
                poster_handle={p.poster_handle}
                post_body = {p.post_body}
                post_subject = {p.post_subject}
                post_tags = {p.post_tags}
                admin_post = {p.admin_post}
                reply_to = {p.reply_to}
                image = {p.image}
                id = {p.id}
              />
            ))}   
          </div>;
          
        </div>

      </div>


    );
}


export default PostsDisplay;
