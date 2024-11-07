import { environment } from 'src/environments/environment';

const BASE_URL = environment.production
  ? location.protocol + '//www.tiagoaltstadt.com'
  : location.protocol + '//localhost:5000';

export const USERS_URL = BASE_URL + '/api/users';
