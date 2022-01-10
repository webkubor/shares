/*
 * @Date: 2021-10-22 14:30:45
 * @LastEditTime: 2022-01-10 16:35:45
 */

import { reactive, effect } from "@vue/reactivity";

export default function useStorage(key, defaultValue = []) {
  let data = reactive({});

  Object.assign(
    data,
    (localStorage[key] && JSON.parse(localStorage[key])) || defaultValue
  );

  effect(() => (localStorage[key] = JSON.stringify(data)));
  console.log(data);
  return data;
}
