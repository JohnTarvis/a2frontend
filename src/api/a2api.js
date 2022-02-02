import axios from "axios";

// import { response } from 'express';

// const app = require('express');
const cors = require('cors');


// app.use(response);


app.use(cors);


const BASE_URL = 'https://damp-island-15072.herokuapp.com';//"http://localhost:3001";
class A2Api {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 
      Authorization: `Bearer ${A2Api.token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    const params = (method === "get")
        ? data
        : {};
    try {
      // console.log('toaxios=========================================',{url,method,data,params,headers});
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

////////////////////////////////////////////////////////////////////////////////-posts
//-add delete post

  static async getPosts(params){
    let res = await this.request(`post/`,params);
    return res.posts;
  }
  static async createPost(params){
    let res = await this.request('post/',params,'post');
    return res.posts;
  }
  static async deleteAllPosts(){
    await this.request('post/',{},'delete');
  }

////////////////////////////////////////////////////////////////////////////////-anons

  static async getAnon(handle) {
    let res = await this.request(`anon/${handle}`);
    return res.anon;
  }
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
  static async saveProfile(handle, data) {
    let res = await this.request(`anon/${handle}`, data, "patch");
    return res.anon;
  }

  static async deleteAllAnons(){
    await this.request('anon/',{},'delete');
  }

 ////////////////////////////////////////////////////////////////////////////////-tags

  static async getTags(tag){
    let res = await this.request(`tag/`,{tag});
    return res;
  }

  static async createTag(tag){
    let res = await this.request('tag/',{tag},'post');
  }

  static async deleteAllTags(){
    await this.request('tag/',{},'delete');
  }


}


export default A2Api;

