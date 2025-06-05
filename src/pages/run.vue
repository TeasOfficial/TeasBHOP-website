<template>
  <v-lazy>
    <v-container>
      <div class="mx-auto cursor-default" style="width: 80%;">
        <p class="text-h4 mt-5">
          {{ $t('runinfo.title') }} — {{ runid }}
        </p>
        <br>
        <v-card
          class="mx-auto mb-15"
          min-height="400"
        >
          <v-img
            class="align-end text-white"
            :color="runinfo.acolor.value"
            cover
            height="400"
          >
            <v-row class="shadow-inline" style="margin-bottom: -32px;">
              <v-col>
                <span v-if="!runinfo.loading.value">
                  <v-card-title>
                    {{ runinfo.name }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ $t('runinfo.subtitle.line1', {mapname: runinfo.map.value}) }}
                    <br>
                    {{ $t('runinfo.subtitle.line2', {time: runinfo.time.value.toFixed(3)}) }}
                    <br>
                    <span class="btngroup">
                      <v-btn color="white" :href="`https://steamcommunity.com/profiles/[U:1:${runinfo.auth.value}]`" target="_blank" variant="text">
                        {{ $t('runinfo.view.steamprofile') }}
                      </v-btn>
                      &ensp;
                      <v-btn color="white" :to="`/user/${runinfo.auth.value}?type=auth`" variant="text">
                        {{ $t('runinfo.view.userprofile') }}
                      </v-btn>
                    </span>
                  </v-card-subtitle>
                </span>
                <span v-else>
                  <v-card-title>
                    {{ $t('runinfo.loading') }}
                  </v-card-title>
                </span>
              </v-col>
              <v-col class="text-right mr-5">
                <v-avatar
                  class="ml-4"
                  rounded="0"
                  size="100"
                >
                  <v-img cover :src="runinfo.avatar.value" />
                </v-avatar>
              </v-col>
            </v-row>
            <br>
          </v-img>
          <v-card-text>
            <v-row>
              <v-col :cols="display.xs.value ? 12 : 6">
                <RunInfoCard
                  :subtitle="status.strafes"
                  :title="$t('runinfo.strafes')"
                />
              </v-col>
              <v-col :cols="display.xs.value ? 12 : 6">
                <RunInfoCard
                  :subtitle="status.jumps"
                  :title="$t('runinfo.jumps')"
                />
              </v-col>
              <v-col :cols="display.xs.value ? 12 : 6">
                <RunInfoCard
                  :subtitle="status.sync + '%'"
                  :title="$t('runinfo.sync')"
                />
              </v-col>
              <v-col :cols="display.xs.value ? 12 : 6">
                <RunInfoCard
                  :subtitle="status.completions"
                  :title="$t('runinfo.completions')"
                />
              </v-col>
              <v-col cols="12">
                <RunInfoCard
                  :subtitle="dayjs(runinfo.date.value * 1000).format('YYYY-MM-DD HH:mm:ss')"
                  :title="$t('runinfo.date')"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-lazy>
  <AppFooter :footmode="2" />
</template>

<script setup>
  import ColorThief from 'colorthief';
  import { RGBtoHex } from 'vuetify/lib/util/colorUtils.mjs';
  const router = useRouter();
  const route = useRoute();
  const runid = route.path.split('/')[2]
  if(!runid) router.push('/404')
  import axios from '@/plugins/axios'
  import dayjs from 'dayjs';
  import { useDisplay } from 'vuetify';
  const display = useDisplay()

  const runinfo = {
    name:   ref(),
    auth:   ref(),
    map:    ref(),
    points: ref(),
    time:   ref(),
    date:   ref(),
    tier:   ref(0),
    loading:ref(false),
    avatar: ref(),
    acolor: ref('#000'),
  }
  const status = {
    strafes: 0,
    jumps: 0,
    sync: 0,
    completions: 0,
  }

  runinfo.loading.value = true
  axios.get(`/records?id=${runid}`).then(res => {
    res = res.data
    if(res.stats == 'success'){
      const data = res.response[0]
      runinfo.auth.value = data.auth
      runinfo.date.value = data.date
      runinfo.map.value = data.map
      runinfo.name.value = data.name
      runinfo.points.value = data.points
      runinfo.time.value = data.time
      runinfo.tier.value = data.tier
      status.strafes = data.strafes
      status.jumps = data.jumps
      status.sync = data.sync
      status.completions = data.completions
      getUserInfomation()
    }
  })

  function getUserInfomation () {
    axios.get(`https://uapis.cn/api/steamuserinfo?input=[U:1:${runinfo.auth.value}]`).then(res => {
      res = res.data
      if(res.code == 200){
        runinfo.avatar.value = res.avatar
        extractColors()
      }else{
        getUserInfomation()
      }
    })
  }

  function extractColors () {
    const colorThief = new ColorThief();
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = runinfo.avatar.value;

    img.onload = () => {
      const rgb = colorThief.getColor(img)
      runinfo.acolor.value = RGBtoHex({
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
      });
      runinfo.loading.value = false
    }
  }
</script>

<style lang="scss" scoped>
.card-end {
  margin-top: auto;
  margin-right: 20px;
}
.shadow-inline {
  box-shadow:0 0 15px 20px rgba( #000000, 0.6);
  background-color: rgba( #000000, 0.6);
}
.btngroup{
  &>.v-btn{
    padding: 0 !important;
  }
}
</style>
