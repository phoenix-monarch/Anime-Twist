/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

const baseURL = 'https://twist.moe';
const CDN = 'https://twistcdn.bunny.sh';
const key = 'LXgIVP&PorO68Rq7dTx8N^lP!Fa5sGJ^*XK';
const accessToken = '1rj2vRtegS8Y60B3w3qNZm5T2Q0TN2NR';
const userAgent = require('../../package.json').version;

export const getAnimeList = async () => {
  try {
    const response = await fetch(`${baseURL}/api/anime`, {
      headers: {
        'user-agent': userAgent,
        'x-access-token': accessToken,
      },
    });

    return response.json();
  } catch (error) {
    return null;
  }
};
