import axios from 'axios';

const api_host = 'http://localhost:58819/';

export default {
    get: (endpoint, params={}, auth=true) =>
      axios({
          'method':'GET',
          'url': api_host + endpoint,
          'headers': {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: auth ? `Bearer ${localStorage.getItem('token')}` : '',
          },
          'params': {
              ...params
          },
      }),
    post: (endpoint, payload={}, auth=true) =>
      axios({
        'method':'POST',
        'url': api_host + endpoint,
        'headers': {
            'Content-Type':'application/json',
            'Authorization': auth ? `Bearer ${localStorage.getItem('token')}` : '',
        },
        'data': {...payload},
    }),
    delete: (endpoint, params={}, auth=true) =>
      axios({
        'method':'DELETE',
        'url': api_host + endpoint,
        'headers': {
            'Content-Type':'application/json',
            'Authorization': auth ? `Bearer ${localStorage.getItem('token')}` : '',
        },
        'params': {
            ...params
        },
    }),
};
