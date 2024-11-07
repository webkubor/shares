<template>
  <n-config-provider :theme="local.theme" :theme-overrides="allThemeOverrides">
    <n-notification-provider :max="1">
      <n-loading-bar-provider>
        <n-dialog-provider>
          <n-message-provider>
            <router-view />
          </n-message-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
<script setup>
import { useTheme } from "@/hooks/useTheme";
import { onMounted } from "vue";
import JSEncrypt from "jsencrypt"
let { allThemeOverrides, local, initTheme } = useTheme();

onMounted(() => {
  initTheme();
  let password = '123456';
  let nonce = '123456';
  let result = encryptWithRsaPublicKeyAndNonce(nonce, password)
  console.log(result);
})

function encryptWithRsaPublicKeyAndNonce(nonce, password) {
  let jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey('MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmIT4/27lSU2bJUrtKOBIPOnCS6Si3k8/EjdbgQEyU7QGtYOmYt8Ec+Su3je3412AN5VO3VhBBlcaARKaXOo6EA/vnIZlNzkWd5sp1w5u/EnaVkoZBI6WvElz0mv1D5rPtEW+jHKi4aRGeBD8A1FFrp6RERANuGk97l/WOT1mT44mWnQI9kopJINIZI49xSE3zP1upi//X4ybJEdfwl9VBBnDj0Xh5wz0rkDDmNiS5puegx3KOB2tHJuJgeWK4KgQAnLrENmqW5I0yrh2vrr/89tN+NizEXZRhhn5bzYcrf2WRXQUuEqbNpXR6VScDkJbG7mBr3DQSil8Qomf7xC9U7VPDcdGbyMqXi/lZUSMhPdIFz73ijGr8NxjNfXQIagvX1z9IRpmoiplQOpaT2MXDl9Xc5NDc473QJnHBHPx9KhrQe7IFTuITkeTW956n/OMhzd0ay0y4ETOT3tv0qGJPZikUM5LOfwA4SplgadaAgcsm/WL3ZSVLd+twUydFupSALzjEW/SMzuWKY2meUPRpDsu4dnOc42Hh5ulz1Nlm1d9RzilxkOGaXLEEUd+W7t2ahHOeg1LVjXj52NPAP2r6LlpsorDygYzJkxH8WFKxcY1sj0A586mmWsSerRCZJOYZ9b+O9lJJXwSzvxBZlKrX5809IiZ58mVSxtzbshIJp0CAwEAAQ==');

  let appendedText = nonce.slice(0, 5) + password;
  let encryptedPassword = jsEncrypt.encrypt(appendedText);

  return { encryptedPassword, nonce }
}


</script>
