/*
 * @Date: 2021-10-13 14:03:05
 * @LastEditTime: 2021-10-13 15:17:01
 */
import { reactive } from "vue";
import dayjs from "dayjs";

const user = reactive({
  name: "webkubor",
  age: "18",
  birthday: "1995-11-13",
  avatar: "https://gitee.com/web-kubor/oss/raw/master/uPic/WechatIMG1543.jpeg",
  personalSign: "今天你起舞了吗",
  tags: ["乐观", "开朗", "社交NB症", "多才多艺"],
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
