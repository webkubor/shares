/*
 * @Date: 2021-10-13 14:03:05
 * @LastEditTime: 2022-03-27 14:43:44
 */
import { reactive } from "vue";
import dayjs from "@/utils/dayjs";

const user = reactive({
  name: "webkubor",
  name2: "stacy",
  age: "18",
  birthday: "1995-11-13",
  personalSign: "Unkillable makes you stronger",
  tags: [ "开朗", "社交NB症", "民族音乐爱好者", "爱国"],
  timeLine: [
    {
      title: "成功",
      content: "哪里成功",
      time: "2018-04-03 20:46",
      show:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
    },
    {
      title: "成功",
      content: "哪里成功",
      time: "2018-04-03 20:46",
      show:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    },
    {
      title: "成功",
      content: "哪里成功",
      time: "2018-04-03 20:46",
      show:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    },
    {
      title: "成功",
      content: "哪里成功",
      time: "2018-04-03 20:46",
      show:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
    }
  ]
});

export function useUser() {
  /**
   * @description: 更新年龄
   * @param {*}
   * @return {*}
   */
  function updateAge() {
    let time = dayjs(user.birthday).fromNow(true);
    user.age = time.split(" ")[0];
    console.log("%c%s", "color: #e50000", "我的年龄已更新", user.age);
  }
  
  return {
    updateAge,
    user,
  };
}
