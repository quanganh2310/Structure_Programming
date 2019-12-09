import axios from 'axios';
import * as Config from './../constants/Config';

export default function callApi(endpoint, method, body) {
    return axios({
        method : method,
        headers: { 'Content-Type': 'application/json' },
        url : `${Config.API_URL}/${endpoint}`,
        data : body
      }).catch(err => {
        console.log(err);
      });

}
