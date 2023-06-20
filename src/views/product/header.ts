// import Cookies from 'js-cookie';
// import Keys from '@/utils/keys';
// export const getToken = () => Cookies.get(Keys.token);

export const getLocalToken = () => {
  return localStorage.getItem('token');
};

export const getTenantId = () => {
  return localStorage.getItem('tenantId');
};
