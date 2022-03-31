import React, { useState, useEffect, useContext } from "react";
import SearchForm from "../common/SearchForm";
import A2Api from "../api/a2api";
import LoadingSpinner from "../common/LoadingSpinner";
import ThreadPreview from "./ThreadPreview";
import { useHistory } from "react-router-dom";
import '../styles/ThreadsDisplay.css';
import TopBanner from "../top-banner/TopBanner";

import PostContext from "./PostContext";

import A2api2 from "../api/a2api2";

function randomBG(){
  let L = () => Math.ceil(Math.random() * 8);
  return `#${L()}${L()}${L()}`;

}

const currentBG = randomBG();

const style = {
  backgroundColor: currentBG,
}


function ThreadsDisplay(){

    const {allPosts,setAllPosts} = useContext(PostContext);

    useEffect(function getThreadsOnMount() {
      search();
    }, []);
  
    async function search(params) {
      let posts = await A2Api.getThreads(params).filter((post)=>!post.reply_to);
      setAllPosts(posts);
    }

    const history = useHistory();

    if (!allPosts) return <LoadingSpinner />;

    // allPosts = allPosts.filter((post) => !post.reply_to)

    function clickHandler(e){
      let elem = e.target;
      let maxJumps = 99;
      while(elem.className != 'ThreadPreview' && maxJumps > 0){
        maxJumps--;
        elem = elem.parentNode;
      }
      const postId = elem.id.slice(14);
      history.push(`/posts/${postId}`);
    }    

    return (
      <div className="main-view" >
        <TopBanner/>
        <div className="posts-display" style = {style}>
          <div onClick={(e)=>clickHandler(e)} >
            {allPosts.map(p => (
              <ThreadPreview 
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


export default ThreadsDisplay;
