import axios from "axios";

const API_SERVER = "http://localhost:5000";

axios.defaults.baseURL = API_SERVER;

class API {
  authorizeApi = token => {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  };

  getPost = () => {
    return axios.get(`${API_SERVER}/post/`);
  };

  getUser = () => {
    return axios.get(`${API_SERVER}/user/`);
  };

  getUserById = id => {
    return axios.get(`${API_SERVER}/user/profile/${id}`);
  };

  getPostById = id => {
    return axios.get(`${API_SERVER}/post/${id}`);
  };

  search = value => {
    return axios.get(`${API_SERVER}/user/search?search=${value}`);
  };

  post = (facebookId, name, postContent) => {
    return axios.post(`${API_SERVER}/post/add_post`, {
      id: facebookId,
      name: name,
      content: postContent
    });
  };

  unfollow = name => {
    return axios.post(`${API_SERVER}/user/unfollow`, {
      targetName: name
    });
  };

  follow = name => {
    return axios.post(`${API_SERVER}/user/follow`, {
      targetName: name
    });
  };

  login = accessToken => {
    return axios.post(`${API_SERVER}/user/0authFB`, {
      access_token: accessToken
    });
  };

  upvote = postId => {
    return axios.post(`${API_SERVER}/post/post_detail/${postId}/upvote`);
  };

  downvote = postId => {
    return axios.post(`${API_SERVER}/post/post_detail/${postId}/downvote`);
  };
}

const api = new API();
export default api;
