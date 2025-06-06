<template>
  <v-lazy>
    <v-container>
      <center class="mt-10 profile-card">
        <ParallaxMobile
          v-if="display.xs.value"
          :info="info"
        />
        <ParallaxDesktop
          v-else
          :info="info"
        />
      </center>
      <br>
      <TeasBHOPUser v-if="route.query.type != 'sj'" :info="info" />
      <SourceJumpUser v-else :info="sjres" />
    </v-container>
  </v-lazy>
  <AppFooter :footmode="2" />
</template>

<script setup>
  const router = useRouter()
  const route = useRoute()

  const uid = route.path.split('/')[2]
  if(!uid) router.push('/404')
  const type = route.query.type // uid or auth
  if(!type) router.push('/404')

  import axios from '@/plugins/axios'
  import { useDisplay } from 'vuetify'
  const display = useDisplay();

  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  import cookies from 'vue-cookies'
  const token = cookies.get('teasbhop-token')
  import { jwtDecode } from 'jwt-decode';
  const user = ref({})
  if(token){
    user.value = jwtDecode(token)
  }

  const info = {
    has_account: ref(false),
    uid: ref(0),
    username: ref(''),
    is_me: ref(false),
    avatar: ref(''),
    avatar32: ref(''),
    date: ref(''),
    steamdate: ref(''),
    points: ref(0),
    background: ref(''),
    auth: ref(''),
    color: ref('#000'),
    sign: ref(''),
    alias: ref(''),
    banned: ref(),
    country: ref(''),
    dpi: ref(''),
    keyboard: ref(''),
  }

  const sjres = ref({})
  if(route.query.type == 'sj'){
    axios.get(`https://wr.ipairsdo.xin/ajax/players/search/[U:1:${uid}]`).then(
      res => {
        res = res.data.info[0]
        info.background.value = 'no-img'
        info.avatar.value = res.avatar
        info.username.value = res.alias || res.name
        info.date.value = 'Invalid Date'
        info.has_account.value = false
        info.points.value = res.points_auto
        info.uid.value = res.id
        info.auth.value = uid
        sjres.value = res
      }
    )
  }else{
    axios.get(`/user?${type}=${uid}`).then(
      res => {
        res = res.data
        if(res.stats == 'success'){
          if(res.data.uid){
            router.replace(`/user/${res.data.uid}?type=uid`)
            info.has_account.value = true
            info.uid.value = res.data.uid
            info.is_me.value = res.data.uid == user.value.uid
            info.username.value = res.data.username
            info.date.value = res.data.created_at
            info.background.value = res.data.background
            info.sign.value = res.data.mysign
          }else{
            info.username.value = res.data.username
          }
          info.auth.value = res.data.auth
          info.points.value = res.data.points

          getSteamProfile()
        }
      }
    )
  }

  const getSteamProfile = () => {
    axios.get(`https://uapis.cn/api/steamuserinfo?input=[U:1:${info.auth.value}]`).then(
      res => {
        res = res.data
        if(res.code == 432) {
          getSteamProfile()
        }else{
          if(!info.has_account.value){
            info.username.value = res.username
            info.date.value = res.accountcreationdate
            info.sign.value = t('parallax.not_registed')
          }
          info.steamdate.value = res.accountcreationdate
          info.avatar.value = res.avatar
        }
      }
    ).catch(() => {
      info.points.value = -1
      info.username.value = t('parallax.load_fail')
    })
  };
</script>

<style lang="scss">

</style>
