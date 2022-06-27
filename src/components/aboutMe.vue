<!--
 * @Date: 2021-07-31 19:27:24
 * @LastEditTime: 2022-04-15 17:16:18
-->
<template>
  <div class="about-me column-center">
    <div class="show-item">
      <n-popover trigger="hover">
        <template #trigger>
          <div class="love-headers">
            <n-avatar
              round
              :size="100"
              :src="getImage('me.jpeg')"
              @click="swtichTheme"
            />
          </div>
        </template>
        <span>来换个心情呗 {{ t("about") }}</span>
      </n-popover>
    </div>

    <h1>
      <n-gradient-text type="info">
        {{ user.name }}
      </n-gradient-text>
    </h1>
    <n-button @click="googleSignIn">谷歌登录</n-button>
    <div @click="toggleLocale">语言切换: {{ language }}</div>
    <n-space>
      <n-tag
        v-for="(item, index) in user.tags"
        :key="item + index"
        :type="getRandomType()"
        round
      >
        {{ item }}
      </n-tag>
    </n-space>
    <n-divider title-placement="center">签名</n-divider>
    <div class="sign">
      {{ user.personalSign }}
    </div>
  </div>
</template>
<script setup>
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/hooks/useTheme";
import { getRandomType } from "@/utils/random";
const { t, locale } = useI18n();
let { user, updateAge } = useUser();
let { swtichTheme } = useTheme();
console.log(user, "我的");


onInitGoogle();

/**
 * @description: 配置初始化-加载auth2的库
 * @param {*}
 * @return {*}
 */
function onInitGoogle() {
  let baseOptions = {
    client_id:
      "675793533606-2udrroc6jhkr0k9ucas051900qg4n5sb.apps.googleusercontent.com",
    cookiepolicy: "single_host_origin",
  };

  gapi.load("auth2", function () {
    console.log("%c%s", "color: #00e600", "auth2-ready");
    gapi.auth2
      .init(baseOptions)
      .then((res) => {
        window.getAuthInstance = gapi.auth2.getAuthInstance(); //获取GoogleAuth对象
        console.log("google init complete...",  window.getAuthInstance);

        let isSignedIn = getAuthInstance.isSignedIn.get(); //存储登录状态
        let GoogleUser = getAuthInstance.currentUser.get(); //这个方法获取返回的响应对象
        if (isSignedIn) {
          console.log(
            "%c%s",
            "color: #00a3cc",
            "window.getAuthInstance",
            GoogleUser
          );
        }
      })
      .catch((err) => console.log(err));
  });
}

/**
 *google登录
 */
function googleSignIn() {
  window.getAuthInstance
    .signIn()
    .then((res) => {
      let user = res.Qu? res.Qu: res.Iu
      console.log(res, "googleSignIn");
      window.$message?.success(user?.sf + "欢迎回来");
    })
    .catch((err) => console.log(err));
}

updateAge("logo.jpeg");
const language = computed(() =>
  locale.value === "zh-CN" ? "中文" : "English"
);

const toggleLocale = () => {
  locale.value = locale.value === "zh-CN" ? "en" : "zh-CN";
};


const getImage = (name) => {
  const picModules = import.meta.globEager("/src/assets/*");
  const path = `/src/assets/${name}`;
  return picModules[path].default;
};


</script>

<style lang="scss" scoped>
.about-me {
  padding: 1rem 0 1rem;
  .show-item {
    padding: 1rem 0 0;
    .love-headers {
      display: flex;
      align-items: center;
      .n-icon {
        margin: 0 10px;
      }
      .n-icon:active {
        animation: bounce; /* referring directly to the animation's @keyframe declaration */
        animation-duration: 2s; /* don't forget to set a duration! */
      }
    }
    .n-avatar {
      cursor: pointer;
      transition: transform 0.5s ease-in-out 0s;
      &:hover {
        transform: rotate(720deg);
      }
    }
  }
  .sign {
    font-weight: 500;
    font-size: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
}
</style>
