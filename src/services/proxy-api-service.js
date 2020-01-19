import config from '../config';
import TokenService from './token-service';

const ProxyService = {
  _getProxiedResponse(target, service) {
    const prepped = encodeURIComponent(target);
    return fetch(`${config.API_ENDPOINT}/proxy/${service}?target=${prepped}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getWayback(target) {
    return this._getProxiedResponse(target, 'wayback');
  },
  getMemento(target) {
    return this._getProxiedResponse(target, 'memento');
  }
};

export default ProxyService;
