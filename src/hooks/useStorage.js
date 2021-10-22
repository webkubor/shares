/*
 * @Date: 2021-10-22 14:30:45
 * @LastEditTime: 2021-10-22 15:10:32
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
    let storageVal = value;
    if (judgeTypes(storageVal) === "function") {
      console.warn("暂不支持保存函数");
      return;
    }
    if (judgeTypes(storageVal) === "array") {
      storageVal = JSON.stringify(storageVal);
    }
    window.localStorage.setItem(key, storageVal);
  }

  function getData(key) {
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
    if (localStorage.getItem(key)) localStorage.removeItem(key);
  }

  return {
    clearAll,
    setData,
    getData,
    removeData,
  };
}
