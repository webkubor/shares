/*
 * @Date: 2021-10-13 14:58:51
 * @LastEditTime: 2021-10-13 15:02:41
 */
import { reactive } from "vue";

const myLife = reactive({
  timeLine: [],
  showList: [],
});

export function useLife() {
  return {
    myLife,
  };
}
