<template>
  <v-btn v-if="!token" @click="login()">
    {{ $t('login_with_steam') }}
  </v-btn>
  <v-card
    v-else
    class="teasbhop-center"
  >
    <v-parallax
      v-if="!isMobile"
      class="text-center cursor-pointer"
      scale="0.9"
      :src="user.backgroundImage"
      @click="router.push(`/user/${user.uid}?type=uid`)"
    >
      <div class="userprofile">
        <v-row class="align-center">
          <v-col class="text-right">
            <v-avatar size="100">
              <v-img
                :src="user.avatar"
              />
            </v-avatar>
          </v-col>
          <v-col class="text-left">
            <v-row>
              <v-col cols="12">
                <p class="text-h5">
                  {{ $t('userprofile.welcome.desktop') }}
                </p>
              </v-col>
              <v-col cols="12">
                {{ user.username }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-parallax>
    <v-parallax
      v-else
      class="text-center"
      scale="1.0"
      :src="user.backgroundImage"
      @click="router.push(`/user/${user.uid}?type=uid`)"
    >
      <v-row class="mt-1">
        <v-col class="mt-1" cols="12" style="padding: 0;">
          <v-avatar size="75">
            <v-img
              :src="user.avatar"
            />
          </v-avatar>
        </v-col>
        <v-col class="text-center mt-1" style="padding: 0;">
          <b>{{ $t('userprofile.welcome.mobile') }}</b>
          <br>
          {{ user.username }}
        </v-col>
      </v-row>
    </v-parallax>
    <v-btn style="width: 100%;" @click="logout">
      {{ $t('logout') }}
    </v-btn>
  </v-card>
</template>

<script setup>
  const login = () => {
    const host = window.location.host
    const protocol = window.location.protocol;
    const reurl = `${protocol}//${host}`
    const href = `https://steamcommunity.com/openid/login?` +
      `openid.ns=http://specs.openid.net/auth/2.0` +
      `&openid.mode=checkid_setup` +
      `&openid.return_to=${reurl}/auth/callback` +
      `&openid.realm=${reurl}` +
      `&openid.identity=http://specs.openid.net/auth/2.0/identifier_select` +
      `&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select` +
      `&openid.ns.sreg=http://openid.net/extensions/sreg/1.1`

    window.location.href = href

  };

  import cookies from 'vue-cookies'
  const token = cookies.get('teasbhop-token')
  import { jwtDecode } from 'jwt-decode';
  const user = ref({})
  if(token){
    user.value = jwtDecode(token)
  }

  import { useDisplay } from 'vuetify'
  const router = useRouter()
  const display = useDisplay()
  const isMobile = display.xs;

  const logout = () => {
    cookies.remove('teasbhop-token')
    router.go(0)
  }
</script>

<style lang="scss" scoped>
.teasbhop-center{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
}
.v-parallax{
  border-radius: 15px;
  height: 150px !important;

  &>*{
    background-color: rgba(#000, .4);
  }
}
.userprofile{
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
}
</style>
