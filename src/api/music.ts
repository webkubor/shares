/*
 * @Date: 2021-10-13 17:43:29
 * @LastEditTime: 2022-03-05 12:24:11
 */
import fly from "@/utils/fly.js"
fly.config.baseURL = "https://api.66mz8.com/"
/**
 * @description: 
 * @param {*}
 * @return {*}
 */
export function getHotCommit(params) {
  return fly.get("api/music.163.php", params)
}