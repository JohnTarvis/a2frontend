import axios from "axios";

const BASE_URL = 'https://damp-island-15072.herokuapp.com';
class A2Api {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;

    // console.log(`================================url ${url}
    //              =============================method ${method}`);

    const headers = { 
      Authorization: `Bearer ${A2Api.token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    const params = (method === "get")
        ? data
        : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  

////////////////////////////////////////////////////////////////////////////////-posts
//-add delete post


  static async testPost(params){
    let res = await this.request('post/test',params);
    return res;
  }

  static async getThreads(params){
    let res = await this.request(`post/`,params);
    return res.posts;
  }
  static async createThread(params){
    let res = await this.request('post/',params,'post');

    return res.posts;
  }
  static async deleteAllPosts(){
    await this.request('post/',{},'delete');
  }

  // static async deleteThread(id){
  //   console.log('id in a2api.js=================================',id);
  //   let result = await this.request('post/',id,'delete');
  //   console.log('result in a2api.js=============================',result);
  // }

  static async deleteThread(id){
    let result = await this.request(`post/${id}`,{},'delete');
    return result;
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


  static async getTags(){
    let res = await this.request(`tag/`);
    return res;
  }

  static async createTag(tag){
    let res = await this.request('tag/',{tag},'post');
    return res;
  }

  static async deleteAllTags(){
    await this.request('tag/',{},'delete');
  }


}


export default A2Api;

