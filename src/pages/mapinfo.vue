<template>
  <v-lazy>
    <v-container>
      <div class="mx-auto cursor-default" style="width: 80%;">
        <p class="text-h4 mt-5">
          {{ $t('mapinfo.title') }}
        </p>
        <br>
        <v-card
          class="mx-auto mb-15"
          min-height="400"
        >
          <v-img
            class="align-end text-white"
            cover
            height="400"
            :src="`https://raw.githubusercontent.com/TeasOfficial/map-tumbnail/refs/heads/main/${mapname}.jpg`"
          >
            <v-row class="shadow-inline">
              <v-col>
                <v-card-title>
                  {{ mapname }}
                  <v-chip :color="getChipColor()">
                    {{ $t('tier') }} {{ tier.server }}
                  </v-chip>
                </v-card-title>
                <v-card-subtitle v-if="sourcejump_nomap">
                  {{ $t('mapinfo.sourcejump.nomap') }}
                </v-card-subtitle>
                <v-card-subtitle v-else>
                  {{ $t('mapinfo.sourcejump.infomation') }} <br>
                  {{ $t('mapinfo.sourcejump.points') }}
                  {{ points.sourcejump }}
                  丨
                  {{ $t('tier') }} {{ tier.sourcejump }}
                  丨
                  WR: {{ WR }}
                </v-card-subtitle>
              </v-col>
              <v-col class="card-end text-right">
                <v-btn :href="`https://main.fastdl.me/maps/${mapname}.bsp.bz2`" target="_blank" variant="text">
                  {{ $t('mapinfo.downloadbtn') }}
                </v-btn>
              </v-col>
            </v-row>
            <br>
          </v-img>
          <v-card-text>
            <v-card :color="top1.avatarColor.value">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    TOP #1
                    <span style="font-size: 14px;">
                      {{ $t('mapinfo.serverrecord') }}
                    </span>
                  </v-card-title>

                  <v-card-subtitle>
                    {{ top1.name }}
                  </v-card-subtitle>

                  <v-card-text v-if="top1.time > 0">
                    <div class="mb-1">
                      {{ $t('mapinfo.record.spenttime') }}: {{ top1.time }}s

                      <span>
                        <v-chip v-if="top1.time == WR" color="green" size="small" variant="flat">
                          WR
                        </v-chip>
                        <v-chip v-else color="red" size="small" variant="flat">
                          + {{ (top1.time - WR).toFixed(3) }}
                        </v-chip>
                      </span>
                    </div>
                    <div>
                      {{ $t('mapinfo.record.createtime') }}: {{ top1.date }}
                    </div>
                  </v-card-text>
                </div>

                <v-avatar
                  class="ma-3"
                  rounded="0"
                  size="125"
                >
                  <v-img
                    :src="top1.avatar.value"
                    @load="extractColors"
                  />
                </v-avatar>
              </div>
            </v-card>
            <br>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    {{ $t('mapinfo.table.title1') }}
                  </th>
                  <th class="text-left">
                    {{ $t('mapinfo.table.title2') }}
                  </th>
                  <th class="text-left">
                    {{ $t('mapinfo.table.title3') }}
                  </th>
                  <th class="text-left">
                    {{ $t('mapinfo.table.title4') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <v-hover
                  v-for="k,v in _records"
                  :key="k"
                  v-slot="{ isHovering, props }"
                >
                  <tr v-bind="props" style="position: relative">
                    <td>
                      {{ v + 1 }}
                    </td>
                    <td>
                      {{ k.name }}
                    </td>
                    <td>
                      {{ Math.floor(k.time * 1000) / 1000 }}s
                      <v-chip v-if="Math.floor(k.time * 1000) / 1000 == WR" color="green" size="x-small">
                        WR
                      </v-chip>
                      <v-chip v-else color="red" size="x-small">
                        + {{ ((Math.floor(k.time * 1000) / 1000) - WR).toFixed(3) }}
                      </v-chip>
                    </td>
                    <td>
                      {{ dayjs(k.date * 1000).format("YYYY-MM-DD HH:mm:ss") }}
                    </td>
                    <v-overlay
                      class="cursor-pointer"
                      contained
                      :model-value="isHovering"
                      scrim="rgba(255,255,255,.1)"
                    />
                  </tr>
                </v-hover>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-lazy>
  <AppFooter />
</template>

<script setup>
  import { useRoute } from 'vue-router';
  const $route = useRoute();
  import ColorThief from 'colorthief';
  import dayjs from 'dayjs';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n()

  const mapname = $route.path.split('/')[2]
  const tier = {
    server: ref(0),
    sourcejump: ref(0),
  }
  const points = {
    sourcejump: ref(0),
    strafedb: ref(0),
  }
  const sourcejump_nomap = ref(false)
  const WR = ref(0)

  const top1 = {
    name: ref(t('mapinfo.top1.map_no_records')),
    avatar: ref(''),
    avatarColor: ref('#000'),
    time: ref(),
    date: ref(),
  }
  const _records = ref()

  const chipColors = {
    0: 'white',
    1: 'green',
    2: 'green-darken-1',
    3: 'orange',
    4: 'orange-darken-1',
    5: 'orange-darken-4',
    6: 'red',
    7: 'red-darken-1',
  }
  function getChipColor () {
    return chipColors[tier.server.value] || 'red-darken-4'
  }

  import axios from '@/plugins/axios';
  import { RGBtoHex } from 'vuetify/lib/util/colorUtils.mjs';

  axios.get(`/maps?search=${mapname}`).then(res => {
    res = res.data
    const mapinfo = res.response[0]
    tier.server.value = mapinfo.tier
  })

  axios.get(`https://sourcejump.net/api/records/${mapname}?key=SJPublicAPIKey`).then(res => {
    res = res.data
    if(Object.keys(res).length === 0){
      sourcejump_nomap.value = true
      return
    }
    points.sourcejump.value = res[0].points
    tier.sourcejump.value = res[0].tier
    WR.value = res[0].timeSeconds
  })

  // [U:1:1294596335] [U:1:322639589]

  axios.get(`/records?map=${mapname}`).then(
    res => {
      res = res.data
      if(Object.keys(res.response).length === 0){
        return
      }
      if(res.stats == 'success'){
        getTop1Infomation(res.response[0])
        _records.value = res.response
      }
    }
  )

  function getTop1Infomation (data) {
    top1.name.value = t('mapinfo.top1.loading')
    axios.get(`https://uapis.cn/api/steamuserinfo?input=[U:1:${data.auth}]`).then(res => {
      res = res.data
      if(res.code == 200){
        top1.name.value = res.username
        top1.avatar.value = res.avatar
        top1.date = dayjs(data.date * 1000).format('YYYY-MM-DD HH:mm:ss')
        top1.time = Math.floor(data.time * 1000) / 1000
      }else{
        getTop1Infomation(data)
      }
    })
  }

  function extractColors () {
    const colorThief = new ColorThief();
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.src = top1.avatar.value;

    img.onload = () => {
      const rgb = colorThief.getColor(img)
      top1.avatarColor.value = RGBtoHex({
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
      });
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
</style>
