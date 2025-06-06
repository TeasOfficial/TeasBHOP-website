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
          <RunInfoHeadImgS :runinfo="runinfo" :status="status" />
          <v-card-text>
            <RunInfoBodyT v-if="isTeasBHOP" :runinfo="runinfo" :status="status" />
            <RunInfoBodyS v-else :runinfo="runinfo" :status="status" />
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

  const isTeasBHOP = !route.query.c || route.query.c == 'TeasBHOP'

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
    strafes: ref(0),
    jumps: ref(0),
    sync: ref(0),
    completions: ref(0),
    server: ref(''),
    wrDiff: ref(''),
  }

  runinfo.loading.value = true
  if(isTeasBHOP){
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
        status.strafes.value = data.strafes
        status.jumps.value = data.jumps
        status.sync.value = data.sync
        status.completions.value = data.completions
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
  }else{
    axios.get(`https://wr.ipairsdo.xin/ajax/records/id/${runid}`)
      .then(res => {
        res = res.data
        const authid = res.steamid.split(':')[2].split(']')[0]
        runinfo.auth.value = authid
        runinfo.date.value = res.date
        runinfo.map.value = res.map
        runinfo.name.value = res.name
        runinfo.avatar.value = res.avatar
        runinfo.points.value = res.points
        runinfo.time.value = res.time
        runinfo.tier.value = res.tier
        status.strafes.value = res.strafes
        status.jumps.value = res.jumps
        status.sync.value = res.sync
        status.completions.value = 'Invalid'
        status.server.value = res.hostname
        status.wrDiff.value = res.wrDif
        extractColors()
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

    img.onerror = () => {
      runinfo.loading.value = false
      runinfo.acolor.value = '#2f2f2f'
    }
  }
</script>
