import axios from 'axios'

const post = async (url, data) => {
  try {
    const result = await axios.post(url, data);
    return { code: 1, ...result.data };
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log("data:", error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return { code: 0, error: error.response.data }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("request:", error.request);
      return { code: 0, error: "error request" }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      return { code: 0, error: error.message }
    }
  }
}

const get = async (url) => {
  try {
    const result = await axios.get(url);
    return { code: 1, data: result.data };
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log("data:", error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return { code: 0, error: error.response.data }
    } else if (error.request) {
      // The request was made but no response was received
      console.log("request:", error.request);
      return { code: 0, error: "error request" }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      return { code: 0, error: error.message }
    }
  }
}


export default {
  post, get
}