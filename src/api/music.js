/*
 * @Date: 2021-10-13 17:43:29
 * @LastEditTime: 2021-10-13 17:54:59
 */
import fly from "utils/fly.js"
/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getHotCommit(params) {
  return fly.post("https://api.66mz8.com/api/music.163.php", params)
}