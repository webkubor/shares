/*
 * @Date: 2021-10-13 17:43:29
 * @LastEditTime: 2021-10-14 15:35:43
 */
import fly from "utils/fly.js"
fly.config.baseURL = "https://api.66mz8.com/"
/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getHotCommit(params) {
  return fly.get("api/music.163.php", params)
}