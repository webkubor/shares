/*
 * @Date: 2021-10-13 14:03:05
 * @LastEditTime: 2023-03-10 15:09:19
 */
import { reactive } from "vue";
import dayjs from "@/utils/dayjs";

const user = reactive({
  name: "webkubor",
  name2: "stacy",
  age: "18",
  birthday: "1995-11-13",
  Guideline: 1,
  isfirstLogin:true,
  personalSign: "Unkillable makes you stronger",
  tags: [ "前端开发工程师", "ENFP", "网易云音乐人", "小说作家"],
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
