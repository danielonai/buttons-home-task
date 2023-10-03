import axios from "axios";
//basic fetch hook
export const UseFetch = async (url:string) => {
   return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });}