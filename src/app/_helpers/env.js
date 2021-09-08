export const API = process.env.REACT_APP_API;
export const ENV_MODE = process.env.NODE_ENV;
export const REQUEST_COUNT = 2;
export function isDevelopment() {
  return ENV_MODE === 'development';
}

export function isProduction() {
  return ENV_MODE === 'production';
}
