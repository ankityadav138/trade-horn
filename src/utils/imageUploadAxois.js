import axios from 'axios';
import showMessage from '../components/showMessage';

axios.defaults.baseURL = 'https://api.tradehorn.com';

export const imageUploadAxois = {
  getResponse: data => {
    return new Promise((resolve, reject) => {
      const result = axios({
        method: data.params.method,
        url: data.params.url,
        data: data.data,
        headers: {Authorization: ` ${data.params.token}`},
      });
      resolve(result);
    }).catch((error)=>{
      showMessage(error.message)
    });
  },
};
