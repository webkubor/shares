/*
 * @Date: 2021-10-13 14:03:05
 * @LastEditTime: 2021-10-22 14:02:04
 */
import { reactive } from "vue";
import dayjs from "dayjs";

const user = reactive({
  name: "webkubor",
  age: "18",
  birthday: "1995-11-13",
  avatar: "https://gitee.com/web-kubor/oss/raw/master/uPic/WechatIMG1543.jpeg",
  personalSign: "Unkillable makes you stronger",
  tags: [ "开朗", "社交NB症", "民族音乐爱好者"],
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
