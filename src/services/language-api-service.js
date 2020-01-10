import config from '../config';
import TokenService from './token-service';

const LanguageApiService = {
  getLanguage() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  getHead() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e))
          : res.json()
        )
  },

  postGuess(guess, word_id) {
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guess: guess,
        word_id: word_id,
      })
    })
      .then(res =>
        (!res.ok) ?
          res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
};

export default LanguageApiService;


