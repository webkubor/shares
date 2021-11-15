/*
 * @Date: 2021-10-22 14:30:45
 * @LastEditTime: 2021-11-15 10:23:35
 */
import { judgeTypes } from "utils/index.js";

/**
 * @description: clear all storage
 * @param {*}
 * @return {*}
 */
export function useStorage() {
  
  function clearAll() {
    window.localStorage.clear();
  }

  /**
   * @description: Reset or Add storage
   * @param {*} key
   * @return {*}
   */
  function setData(key, value) {
    if (!key) return
    let storageVal = value;
    if (judgeTypes(value) !== "string") {
      storageVal = JSON.stringify(storageVal);
    }
    window.localStorage.setItem(key, storageVal);
  }

  function getData(key) {
    if (!key) return
    if (localStorage.getItem(key)) {
      let myData = localStorage.getItem(key);
      if (
        JSON.parse(localStorage[key]) &&
        judgeTypes(JSON.parse(localStorage[key])) === "array"
      ) {
        return JSON.parse(localStorage[key]);
      }
      return myData;
    } else {
      console.warn("当前的key在storage中不存在或者为空值");
      return null;
    }
  }

  /**
   * @description: clear  single data
   * @param {*} key
   * @return {*}
   */
  function removeData(key) {
    if (!key) return
    if (localStorage.getItem(key)) localStorage.removeItem(key);
  }

  return {
    clearAll,
    setData,
    getData,
    removeData,
  };
}
