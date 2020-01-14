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
  submitList(list) {
    console.log('postList', list);
    //TODO the below is a temporary measure:
    //this outer object should already be in place when list is returned from server
    //so we should construct it when parsing user input for consistency
    //but for testing purposes:
    list = {
      contents: list,
      list_id: -1
    };
    console.log('contents', list);
    if (list.list_id) {
      return fetch(`${config.API_ENDPOINT}/list/${list.list_id}`, {
        method: 'PUT',
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      }).then(res => {
        switch (res.status) {
          case 404:
            //bad ID, fall back to making a new list
            delete list.list_id;
            return this.submitList(list);
          case 201:
            return res.headers.location;
          default:
            return Promise.reject(res.body ? res.json() : res.status);
        }
      });
    } else {
      return fetch(`${config.API_ENDPOINT}/list/`, {
        method: 'POST',
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      }).then(res =>
        res.status === 201
          ? res.headers.location
          : Promise.reject(res.body ? res.json() : res.status)
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

export default PersistApiService;
