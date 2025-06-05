<template>
  <v-lazy>
    <v-container>
      <div class="mx-auto cursor-default" style="width: 80%;">
        <p class="text-h4 mt-5">
          {{ $t('mapinfo.title') }}
        </p>
        <br>
        <v-card
          class="mx-auto mb-15 element-parent"
          min-height="400"
        >
          <v-carousel
            v-model="carousel"
            class="align-end text-white element-under"
            :cycle="2"
            height="500"
            hide-delimiters
            progress="primary"
            show-arrows="hover"
          >
            <v-carousel-item
              v-for="k in mapthumbnail"
              :key="k"
              cover
              :lazy-src="k.lazy"
              :src="k.full"
            >
              <template #error>
                <div
                  class="d-flex align-center justify-center fill-height"
                >
                  <p>
                    无缩略图
                  </p>
                </div>
              </template>
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                  />
                </div>
                <p>加载中...</p>
              </template>
            </v-carousel-item>
            <span class="element-over">
              <v-row class="shadow-inline">
                <v-col style="padding-top: 0; margin-top: -15px;">
                  <v-card-title>
                    {{ mapname }}
                    <v-chip :color="getChipColor()">
                      {{ $t('tier') }} {{ tier.server }}
                    </v-chip>
                    <div
                      v-if="authors"
                      class="text-disabled"
                      style="font-size: 14px;"
                    >
                      {{ $t('mapinfo.authors', {authors}) }}
                      <br>
                      {{ $t('mapinfo.publicdate', {date: formatRelativeTime(publishtime)}) }}
                    </div>
                  </v-card-title>
                  <v-card-subtitle>
                    <v-btn v-if="fastdl.sha1.value" :href="`https://main.fastdl.me/maps/${mapname}.bsp.bz2`" target="_blank" variant="text">
                      {{ $t('mapinfo.downloadbtn') }}
                      <v-tooltip
                        activator="parent"
                        location="bottom"
                      >
                        <div class="text-center" style="font-size: 10px;">
                          {{ $t('filesize') }}: {{ fastdl.filesizeBz2 }} {{ $t('bytes') }}
                        </div>
                      </v-tooltip>
                    </v-btn>
                    <v-btn v-else disabled variant="text">
                      {{ $t('mapinfo.nodownloadLink') }}
                    </v-btn>
                    <v-btn
                      v-if="fastdl.url.value"
                      color="yellow"
                      :href="fastdl.url.value"
                      target="_blank"
                      variant="text"
                    >
                      {{ $t('gamebanana') }}
                    </v-btn>
                  </v-card-subtitle>
                </v-col>
                <v-col
                  class="card-end text-right text-disabled"
                  style="font-size: 14px;"
                >
                  <span v-if="sourcejump_nomap">
                    {{ $t('mapinfo.sourcejump.nomap') }}
                  </span>
                  <span v-else>
                    {{ $t('mapinfo.sourcejump.infomation') }} <br>
                    {{ points.sourcejump }}P
                    丨
                    T{{ tier.sourcejump }}
                    丨
                    WR: {{ WR }}
                  </span>
                </v-col>
              </v-row>
              <br>
            </span>
          </v-carousel>

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
                  <tr v-bind="props" style="position: relative" @click="$router.push(`/run/${k.id}`)">
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
  <AppFooter :footmode="2" />
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  const $route = useRoute();
  const router = useRouter();
  import ColorThief from 'colorthief';
  import dayjs from 'dayjs';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n()

  const mapname = $route.path.split('/')[2]
  if(!mapname) router.push('/404')
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
  const carousel = ref(0)

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

  const fastdl = {
    sha1: ref(''),
    filesize: ref(0),
    filesizeBz2: ref(0),
    url: ref(''),
    gml: ref(false),
  }
  const mapthumbnail = ref([
    {
      lazy: '',
      full: '',
    },
  ])
  const authors = ref('')
  const publishtime = ref(0)

  axios.get(`https://d.ipairsdo.xin/maps_index.html.csv`).then(
    res => {
      res = res.data
      const lines = res.split('\n')
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const [mapname1, sha1, filesize, filesizeBz2, url = ''] =
          line.split(',').map(field => field.trim());

        if (mapname1 === mapname) {
          fastdl.sha1.value = sha1
          fastdl.filesize.value = filesize
          fastdl.filesizeBz2.value = filesizeBz2
          fastdl.url.value = url
          if (url) {
            const itemid = url.split('/')[4]
            axios.get(
              `https://api.gamebanana.com/Core/Item/Data?itemid=${itemid}&itemtype=Mod&fields=screenshots`
            ).then(res => {
              res = res.data
              res = JSON.parse(res[0])
              mapthumbnail.value = []
              res.forEach(k => {
                mapthumbnail.value.push({
                  lazy: `https://images.gamebanana.com/${k._sRelativeImageDir || '/img/ss/mods'}/${k._sFile100}`,
                  full: `https://images.gamebanana.com/${k._sRelativeImageDir || '/img/ss/mods'}/${k._sFile}`,
                })
              });
              carousel.value = 1
            })
            axios.get(
              `https://api.gamebanana.com/Core/Item/Data?itemid=${itemid}&itemtype=Mod&fields=authors`
            ).then(res => {
              res = res.data
              // authors.value = res[0]
              const _at = JSON.parse(res[0])
              const _at2 = Object.keys(_at)[0]
              authors.value = _at[_at2][0][0]
            })
            axios.get(
              `https://api.gamebanana.com/Core/Item/Data?itemid=${itemid}&itemtype=Mod&fields=date`
            ).then(res => {
              publishtime.value = res.data[0]
            })
          }else{
            mapthumbnail.value = [
              {
                lazy: ``,
                full: `https://raw.githubusercontent.com/TeasOfficial/map-tumbnail/refs/heads/main/${mapname}.jpg`,
              },
            ]
          }
        }
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

  function formatRelativeTime (timestamp) {
    const now = Date.now();
    const target = new Date(timestamp * 1000);
    const diff = now - target;

    const units = {
      year: 365 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000,
    };

    const diffYears = Math.floor(diff / units.year);
    const diffMonths = Math.floor((diff % units.year) / units.month);
    const diffDays = Math.floor((diff % units.month) / units.day);
    const diffHours = Math.floor((diff % units.day) / units.hour);
    const diffMinutes = Math.floor((diff % units.hour) / units.minute);
    let _formatT = ''

    if (diffYears > 0) {
      if(diffYears > 1) _formatT = t('date.years')
      else _formatT = t('date.year')
      return `${diffYears} ${_formatT}`;
    }
    if (diffMonths > 0) {
      if(diffMonths > 1) _formatT = t('date.months')
      else _formatT = t('date.month')
      return `${diffMonths} ${_formatT}`;
    }
    if (diffDays > 0) {
      if(diffDays > 1) _formatT = t('date.days')
      else _formatT = t('date.day')
      return `${diffDays} ${_formatT}`;
    }
    if (diffHours > 0) {
      if(diffHours > 1) _formatT = t('date.hours')
      else _formatT = t('date.hour')
      return `${diffHours} ${_formatT}`;
    }
    if (diffMinutes > 0) {
      if(diffMinutes > 1) _formatT = t('date.minutes')
      else _formatT = t('date.minute')
      return `${diffMinutes} ${_formatT}`;
    }
    return t('date.now');
  }

</script>

<style lang="scss" scoped>
.card-end {
  margin-top: auto;
  margin-right: 20px;
}
.shadow-inline {
  box-shadow: 0 0 15px 20px rgba( #000000, 0.6);
  background-color: rgba( #000000, 0.6);
}

.element-over {
  position: absolute;
  width: 100%;
  bottom: -10px;
}
</style>
