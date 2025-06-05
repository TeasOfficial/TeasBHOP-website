<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <div class="mx-auto cursor-default" style="width: 80%;">
        <PageTitle :subtitle="$t('leaderboards.subtitle')" :title="$t('leaderboards.title')" />
        <br>
        <div v-if="isMobile">
          <LeaderBoardsTops
            :auth="others[0].auth"
            :name="others[0].name"
            :points="others[0].points"
            :top="1"
          />
          <br>
          <LeaderBoardsTops
            :auth="others[1].auth"
            :name="others[1].name"
            :points="others[1].points"
            :top="2"
          />
          <br>
          <LeaderBoardsTops
            :auth="others[2].auth"
            :name="others[2].name"
            :points="others[2].points"
            :top="3"
          />
        </div>
        <v-row v-else>
          <v-col cols="4">
            <LeaderBoardsTops
              :auth="others[1].auth"
              :name="others[1].name"
              :points="others[1].points"
              :top="2"
            />
          </v-col>
          <v-col cols="4">
            <LeaderBoardsTops
              :auth="others[0].auth"
              :name="others[0].name"
              :points="others[0].points"
              :top="1"
            />
          </v-col>
          <v-col cols="4">
            <LeaderBoardsTops
              :auth="others[2].auth"
              :name="others[2].name"
              :points="others[2].points"
              :top="3"
            />
          </v-col>
        </v-row>
        <br>
        <v-table class="mt-5 mx-auto" style="width: 95%">
          <thead>
            <tr>
              <th>
                {{ $t('leaderboards.table.header.1') }}
              </th>
              <th>
                {{ $t('leaderboards.table.header.2') }}
              </th>
              <th>
                {{ $t('leaderboards.table.header.points') }}
              </th>
            </tr>
          </thead>
          <v-skeleton-loader
            v-if="loading"
            type="table-row-divider@15"
          />
          <tbody v-else>
            <v-hover
              v-for="k,v in others"
              :key="k"
              v-slot="{ isHovering, props }"
            >
              <tr
                v-if="v > 2"
                v-bind="props"
                style="position: relative"
                @click="router.push(`/user/${k.auth}?type=auth`)"
              >
                <td>
                  {{ v + 1 }}
                </td>
                <td>
                  {{ k.name }}
                </td>
                <td>
                  {{ k.points }}
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
      </div>
    </v-container>
  </v-lazy>
</template>

<script setup>
  import axios from '@/plugins/axios'
  import router from '@/router'
  import { useDisplay } from 'vuetify'
  const display = useDisplay()
  const isMobile = display.xs

  const others = ref({
    0: {},
    1: {},
    2: {},
  })

  axios.get('/tops').then(
    res => {
      res = res.data
      if(res.stats == 'success') {
        others.value = res.response
      }
    }
  )
</script>
