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
  tags: [ "前端开发工程师", "网易云音乐人", "签约小说作家", "新民乐爱好者"],
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
  }
  
  return {
    updateAge,
    user,
  };
}
