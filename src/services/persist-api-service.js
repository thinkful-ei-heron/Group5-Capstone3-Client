import config from '../config';
import TokenService from './token-service';

const PersistApiService = {
  getLists() {
    return fetch(`${config.API_ENDPOINT}/user/lists`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getList(listId) {
    return fetch(`${config.API_ENDPOINT}/list/${listId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  postList(list) {
    if (list.list_id) {
      return fetch(`${config.API_ENDPOINT}/list/${list.list_id}`, {
        method: 'POST',
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(list)
      }).then(res =>
        !res.ok
          ? res.json().then(e => {
              if (res.status === 404) {
                //bad list ID, fall back to making a new list
                delete list.list_id;
                return this.postList(list);
              }
              return Promise.reject(e);
            })
          : res.json()
      );
    } else {
      return fetch(`${config.API_ENDPOINT}/list/`, {
        method: 'POST',
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`
        }
      }).then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      );
    }
  },
  getSettings() {
    return fetch(`${config.API_ENDPOINT}/user/settings`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  patchSettings(settings) {
    return fetch(`${config.API_ENDPOINT}/user/lists`, {
      method: 'PATCH',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(settings)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

module.exports = PersistApiService;
