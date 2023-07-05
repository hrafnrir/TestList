/*eslint-env node*/

import axios from "axios";

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "scope-key": process.env.SCOPE_KEY, Accept: "application/json" },
});
