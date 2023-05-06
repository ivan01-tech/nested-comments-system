import api from "../api/axios";

/**
 *	a function to make any kind og resquest with the  axios instance
 * @param {string} url
 * @param {import("axios").AxiosRequestConfig} options
 * @returns
 */

async function makeRequest(url, options) {
  return api(url, options)
    .then((res) => {
      const d = res.data;
      // TODO delete it
      console.log("d : ", d, url);
      return d;
    })
    .catch((err) => {
      // TODO delete it
      console.log("err : ", err, url);
      return Promise.reject(
        err?.response?.data?.message ?? err?.message ?? "Error"
      );
    });
}

export default makeRequest;
