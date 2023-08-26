import { client } from "../../server.js";

export const getRedisCache = async (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

export const setRedisCache = async (key, value) => {
  return new Promise((resolve, reject) => {
    client.set(key, JSON.stringify(value), (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const deleteRedisKey = async (key) => {
  return new Promise((resolve, reject) => {
    client.del(key, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};
