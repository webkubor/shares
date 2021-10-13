<!--
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-13 18:07:12
-->
<template>
   <h2>Hello ,this is {{user.name}}</h2>
  <AboutMe/>
  <AboutProject/>
  <AboutLife/>
</template>
<script>
import AboutMe from "comps/aboutMe.vue"
import AboutProject from "comps/aboutProjects.vue"
import AboutLife from "comps/aboutLife.vue"
import { useUser } from "hooks/useUser";
import {getHotCommit} from "api/music"
export default {
  components : {
    AboutMe,
    AboutProject,
    AboutLife
  },

  setup () {
    let {user} = useUser()
   fetchHotCommit()
    function fetchHotCommit() {
      getHotCommit({name: "爱情"}).then(res => {
        console.log(res, "fetchHotCommit")
      }).catch(err=> console.error(err))
    }


    return {
      user
    }
    
  }

  
}
</script>


