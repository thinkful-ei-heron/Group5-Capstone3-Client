import jwtDecode from 'jwt-decode';
import config from '../config';

let _timeoutId, _intervalId;
const _TIME_FOR_REFRESH_ATTEMPTS_IN_MS = 1000 * 60 * 30 + 10 * 1000; //30 minutes 10 seconds
const _ATTEMPT_REFRESH_INTERVAL = 1000 * 60 * 5; //attempt 6 times ( 5 minute intervals) in case of connectivity hiccups
const _TEN_SECONDS_IN_MS = 1000 * 10;

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  parseAuthToken() {
    const authToken = TokenService.getAuthToken();
    if (authToken) return TokenService.parseJwt(authToken);
    else return undefined;
  },
  _getMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    this.clearCallbackBeforeExpiry();
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.parseAuthToken()
    );

    if (msUntilExpiry < 2 * _TEN_SECONDS_IN_MS) {
      //unlikely, but since at most one attempt would be made let's just make it now
      callback();
      return;
    }

    if (_TIME_FOR_REFRESH_ATTEMPTS_IN_MS > msUntilExpiry) {
      //our interval would have started some time ago if the page were open
      _intervalId = setInterval(
        callback,
        Math.max(_TEN_SECONDS_IN_MS, msUntilExpiry / 5) //up to 5 attempts, but not more often than every 10s
      );
      return;
    }

    const establishInterval = cb => {
      _intervalId = setInterval(cb, _ATTEMPT_REFRESH_INTERVAL);
    };
    _timeoutId = setTimeout(
      establishInterval(callback),
      msUntilExpiry - _TIME_FOR_REFRESH_ATTEMPTS_IN_MS
    );
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
    clearInterval(_intervalId);
  }
};

export default TokenService;
