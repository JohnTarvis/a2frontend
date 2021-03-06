import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Landingpage.css';
import AnonContext from "../auth/AnonContext";
import { useHistory } from "react-router-dom";
import TagList from '../tag-list/TagList';
import ThreadsDisplay from "../threads/ThreadsDisplay";
import '../styles/Landingpage.css';
import PostContext from "../threads/PostContext";



function Landingpage({getAllPosts}) {

  const { anon } = useContext(AnonContext);

  const history  = useHistory();
  const [allPosts,setAllPosts] = useState(null);
  return ( 
    <div>
      <div className="Landingpage" >
        <PostContext.Provider value={{allPosts,setAllPosts}}>
          <TagList/>
          <div className="ThreadsDisplay-container" >
            <div >
              <ThreadsDisplay getAllPosts={getAllPosts} />
            </div>
          </div>
        </PostContext.Provider>
      </div>
    </div>
  );
}

export default Landingpage;



