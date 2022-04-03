import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import ColoredLine from "../common/ColoredLine";

import A2api2 from "../api/a2api2";
import A2Api from "../api/a2api";

import '../styles/test.css';

import picunrel from "../resources/images/picunrel.jpeg";

import ReplyForm from "./ReplyForm";

import './Thread.css';


function replyImageClickHandler(e){
    let elem = e.target;

    if(elem.className == 'reply-image'){
        elem.className = 'reply-image-expanded';
    } else {
        elem.className = 'reply-image';
    }

}



function Thread({createThread}) {

    const {id} = useParams();
    const [showReplyForm,setShowReplyForm] = useState(false);
    const [Thread, setThread] = useState(null);
    const [Replies, setReplies] = useState([]);

    useEffect(function getRepliesOnMount() {
        search();
    }, []);
  
    async function search() {
        let allThreads = await A2Api.getThreads();
        let currentThread = allThreads.filter((thread)=>thread.id == id);
        let replies = allThreads.filter((thread)=>thread.reply_to == id);

        setThread(currentThread);
        setReplies(replies);
    }    

    if (!Thread) return <LoadingSpinner />;

    const punrel = 'https://a2uploads.s3.us-west-1.amazonaws.com/unrelated.jpg';

    return <div className="Thread-page">

                <div className="Thread" id={`Thread-${Thread[0].id}` }>
                    <div className="image-subject">
                        {Thread.post_subject}
                    </div>

                    <ColoredLine color="white"/>

                    <div>
                        <img src={Thread[0].image} alt='' className="Thread-image" />
                    </div>

                    <ColoredLine color="white"/>

                    <div>
                        {Thread[0].post_body}
                    </div>

                    <ColoredLine color="white"/>

                    <small>
                        <div className='centered'>
                            posted by : <i>{Thread[0].poster_handle}</i> at: <span className = 'date'>{Thread[0].post_date}</span>
                        </div>

                        <div className='centered'>
                            tags : {Thread[0].post_tags}
                        </div>
                    </small>

                    <div>
                        {Thread[0].admin_Thread}
                    </div>

                    <div>
                        {Thread[0].reply_to}
                    </div>

                    <div>
                        <button type="button" class="btn btn-primary" onClick={()=>setShowReplyForm(true)}>reply</button>
                    </div>
                </div>

                <div>
                        {showReplyForm && <ReplyForm ThreadNumber={id} createThread={createThread}/>}
                </div>

                <div>

                    {/* THREAD ID={id} */}

                </div>


                <div>
                {Replies.map(p => (

                    <div className = 'reply' onClick={(e)=>replyImageClickHandler(e)}>

                        <div>
                            <img src={p.image} alt='' className="reply-image" />
                        </div>

                        <div>
                            date: {p.post_date}
                        </div>

                        <div>
                            posted by: {p.poster_handle}
                        </div>

                        <div className = "post-body">
                            {p.post_body}
                        </div>


                        
                    </div>


                    ))}  
                </div>

            </div>
                
    
}

export default Thread;
