<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-12 13:51:28
-->
<template>
   <h2>webkubor的项目分享</h2>
  <AboutMe/>
  <AboutProject/>
  <AboutLife/>
</template>
<script>

import AboutMe from "comps/aboutMe.vue"
import AboutProject from "comps/aboutProjects.vue"
import AboutLife from "comps/aboutLife.vue"
export default {
  components : {
    AboutMe,
    AboutProject,
    AboutLife
  }
  
}
</script>


