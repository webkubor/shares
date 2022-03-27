/*
 * @Date: 2021-10-13 14:03:05
 * @LastEditTime: 2022-03-27 13:53:16
 */
import { reactive } from "vue";
import dayjs from "@/utils/dayjs";

const user = reactive({
  name: "webkubor",
  name2: "stacy",
  age: "18",
  birthday: "1995-11-13",
  avatar: "https://cdn.nlark.com/yuque/0/2022/png/584428/1642152722495-avatar/4b40f9fe-dbd1-4723-be8a-d8620093c6e6.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_320%2Ch_320%2Fformat%2Cpng",
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
