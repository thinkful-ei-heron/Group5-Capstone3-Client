import config from '../config';
import TokenService from './token-service';

const UserService = {
  patchUserSettings(settings) {
    return fetch(`${config.API_ENDPOINT}/user/settings`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(settings),
    })
      .then(res =>
        console.log('inside PatchUserSettings.then()', res)
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },
  getUserSettings() {
    return fetch(`${config.API_ENDPOINT}/user/settings`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      return res.json();
    })
  }
}

export default UserService;