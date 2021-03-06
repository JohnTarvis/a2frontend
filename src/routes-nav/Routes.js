import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Landingpage from "../landingpage/Landingpage";
import LoginForm from "../auth/LoginForm";
import RegistrationForm from "../auth/RegistrationForm";
import NewThreadForm from "../threads/NewThreadForm";
import ThreadsDisplay from "../threads/ThreadsDisplay";
import Thread from "../threads/Thread";
import FileUploadForm from "../threads/FileUploadForm";



function Routes({ login, register, createThread, getAllPosts, testPost }) {

  
  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Landingpage getAllPosts={getAllPosts}/>
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/register">
            <RegistrationForm register={register}/>
          </Route>

          <Route exact path="/new-post">
            <NewThreadForm createThread={createThread}/>
          </Route>

          <Route exact path="/file-upload">
            <FileUploadForm />
          </Route>

          <Route exact path="/test-post">
            <NewThreadForm testPost={testPost}/>
          </Route>

          <Route exact path="/posts">
            <ThreadsDisplay createThread={createThread} />
          </Route>

          <Route exact path="/posts/:id">
            <Thread createThread={createThread}/>
          </Route>
          

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;


