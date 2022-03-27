import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import ColoredLine from "../common/ColoredLine";

import A2api2 from "../api/a2api2";
import A2Api from "../api/a2api";

import '../styles/test.css';






import picunrel from "../resources/images/picunrel.jpeg";

import ReplyForm from "./ReplyForm";

// function displayReplyForm(){
//     return <ReplyForm/>;
// }



function Thread({createThread}) {

    const {id} = useParams();

    const [showReplyForm,setShowReplyForm] = useState(false);

    const [Thread, setThread] = useState(null);
    useEffect(function getThreadsOnMount() {
        search();
    }, []);
  
    async function search() {
        let result = await A2Api.getThreads({id:id});
        console.log('thread number=================================',id);

        setThread(result);
    }


    console.log('thread number=================================',id);
    

    if (!Thread) return <LoadingSpinner />;

    const punrel = 'https://a2uploads.s3.us-west-1.amazonaws.com/unrelated.jpg';

    return <div className="Thread-page">

                <div className="Thread" id={`Thread-${Thread[0].id}` }>
                    <div className="image-subject">
                        {Thread.Thread_subject}
                    </div>

                    <ColoredLine color="white"/>

                    <div>
                        <img src={Thread[0].image} alt='' className="Thread-image" />
                    </div>

                    <ColoredLine color="white"/>

                    <div>
                        {Thread[0].Thread_body}
                    </div>

                    <ColoredLine color="white"/>

                    <small>
                        <div className='centered'>
                            Threaded by : {Thread[0].poster_handle}
                        </div>

                        <div className='centered'>
                            Threaded at: {Thread[0].post_date}
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

                    THREAD ID={id}

                </div>

            </div>
                
    
}

export default Thread;
