import React, { useState, useEffect, useContext } from "react";
import '../styles/TagList.css';
import ColoredLine from '../common/ColoredLine';
import LoadingSpinner from "../common/LoadingSpinner";

import PostContext from "../threads/PostContext";

import $ from 'jquery';

import TagToggler from "./TagToggler";

import A2api2 from "../api/a2api2";
// import A2Api from "../api/a2api";


function TagList(){

    const {allPosts,setAllPosts} = useContext(PostContext);
    const [allTags, setAllTags] = useState(null);
    const [tagsIncluded,setTagsIncluded] = useState(null);
    const [tagsExcluded,setTagsExcluded] = useState(null);

    const tagIncluded = 'tag-included';
    const tagExcluded = 'tag-excluded';

    useEffect(function getTagsOnMount() {
      search();
    }, []);
  
    async function search(params) {
        // console.log('PARAMS IN TAGLIST ',params);

        // let result = await A2Api.getTags(params);
        let result = await A2api2.getTags();

        result.tags.sort((a,b)=>{
            return a.tag > b.tag ? 1 : -1;
        });
        const sorted = result.tags;
        setAllTags(sorted);
        setTagsIncluded(sorted);
    }

    function getAllThreadPreviews(){
        return document.querySelectorAll('.ThreadPreview');
    }

    function displayTaggedClient(e){
        const target = e.target;
        TagToggler.toggle(target);
        if(target.className != 'tag')return;
        const clickedTag = target.innerHTML;
        const allThreadPreviews = document.querySelectorAll('.ThreadPreview');
        for(let ThreadPreview of allThreadPreviews){
            const ThreadPreviewId = ThreadPreview.id;
            const tags = ThreadPreview.querySelector('.pc-tags').innerHTML;
            const tagArray = tags.split(/\W+/);
            if(!tagArray.includes(clickedTag)){
                $(ThreadPreview).hide();
            }                        
        }
    }

    ///======================================================================TESTING
    async function clickHandler(e){
        if(e.target.id==='test-click'){
            // await A2Api.deleteAllPosts();
            // await A2Api.deleteAllTags();
            
            
        }
        displayTaggedClient(e);
    }
    /////////////////////////////////////////////////////////////////////////////////


    if (!allTags) return <LoadingSpinner />;

    return <div className='tag-list' style={{
        height: window.outerHeight 
        }} onClick={(e)=>clickHandler(e)}>

            <h3 id="test-click">Popular Tags</h3>
            <ColoredLine color="white"/>

            {allTags.map(p => (
                <div className="tag neutral" key={p.id} id={'tag-'+p.tag}>
                    {p.tag}
                </div>
            ))} 

    </div>
}

export default TagList;

