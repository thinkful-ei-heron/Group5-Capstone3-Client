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
  submitList(list, listName = null, listId = null) {
    //TODO the below is a temporary measure:
    //this outer object should already be in place when list is returned from server
    //so we should construct it when parsing user input for consistency
    //but for testing purposes:
    if (Array.isArray(list)) {
      list = {
        contents: list,
        name: listName
      };
    }
    console.log('Submit ', listId);
    if (listId) {
      return fetch(`${config.API_ENDPOINT}/list/${listId}`, {
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
            return this.submitList(list, listName);
          case 204:
            return { id: listId };
          default:
            return res.json().then(e => Promise.reject(e));
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
          ? res.json()
          : res.json().then(e => Promise.reject(e))
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
