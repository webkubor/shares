/*
 * @Date: 2021-10-13 14:03:05
 * @LastEditTime: 2021-10-13 14:09:19
 */
import { reactive } from "vue";

const user  = reactive({
    name: "webkubor",
    age: "",
    birthday: "",
    personalSign: "今天你起舞了吗"
})

export function useUser() {

    return {
      user
    }
}