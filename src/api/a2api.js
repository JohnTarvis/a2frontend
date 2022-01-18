import axios from "axios";

const BASE_URL = 'https://damp-island-15072.herokuapp.com/'//"http://localhost:3001";


class A2Api {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${A2Api.token}` };
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

  static async getPosts(params){
    let res = await this.request(`post/`,params);
    return res.posts;
  }
  static async createPost(params){
    let res = await this.request('post/',params,'post');
    return res.posts;
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

 ////////////////////////////////////////////////////////////////////////////////-tags

  static async getTags(tag){
    let res = await this.request(`tag/`,{tag});
    return res;
  }

  static async createTag(tag){
    let res = await this.request('tag/',{tag},'post');
  }

 
















  // static async getCompanies(name) {
  //   let res = await this.request("companies", { name });
  //   return res.companies;
  // }

  // static async getCompany(handle) {
  //   let res = await this.request(`companies/${handle}`);
  //   return res.company;
  // }

  // static async getJobs(title) {
  //   let res = await this.request("jobs", { title });
  //   return res.jobs;
  // }

  // static async apply(handle, id) {
  //   await this.request(`anon/${handle}/jobs/${id}`, {}, "post");
  // }
}


export default A2Api;

