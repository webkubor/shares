/*
 * @Date: 2021-10-11 15:59:46
 * @LastEditTime: 2021-10-11 15:59:46
 */

export default {
  install: app => {
    app.directive("numberOnly", {
      updated(el) {
        el.value = el.value.replace(/[^\d.]/g, ""); //清除非数字.
        el.value = el.value
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", "."); //只保留首个.
        if (el.value.length > 1 && el.value[0] === "0" && el.value[1] !== ".") {
          el.value = el.value.replaceAll("0", "");
        }
      }
    });
  }
};
