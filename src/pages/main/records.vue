<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <PageTitle :subtitle="$t('recentruns.subtitle')" :title="$t('recentruns.title')" />
      <v-pagination
        v-model="page"
        class="my-4"
        length="7"
        @update:model-value="a()"
      />
      <v-table class="mt-5 mx-auto" style="width: 95%">
        <thead>
          <tr>
            <th>
              {{ $t('recentruns.table.head.1') }}
            </th>
            <th>
              {{ $t('recentruns.table.head.2') }}
            </th>
            <th>
              {{ $t('recentruns.table.head.3') }}
            </th>
            <th>
              {{ $t('recentruns.table.head.4') }}
            </th>
            <th>
              {{ $t('recentruns.table.head.5') }}
            </th>
          </tr>
        </thead>
        <v-skeleton-loader
          v-if="loading"
          type="table-row-divider@15"
        />
        <tbody v-else>
          <v-hover
            v-for="k in recentruns"
            :key="k"
            v-slot="{ isHovering, props }"
          >
            <tr v-bind="props" style="position: relative" @click="$router.push(`/run/${k.id}`)">
              <td>
                {{ k.id }}
              </td>
              <td>
                {{ k.name }}
              </td>
              <td>
                {{ k.map }}
              </td>
              <td>
                {{ k.time.toFixed(3) }}s
              </td>
              <td class="text-disabled">
                <i>{{ dayjs(k.date * 1000).format("YYYY-MM-DD") }}</i>
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
      <v-pagination
        v-model="page"
        class="my-4"
        length="7"
        @update:model-value="a()"
      />
    </v-container>
  </v-lazy>
</template>

<script setup>
  import axios from '@/plugins/axios';
  import dayjs from 'dayjs';

  const page = ref(1);
  const recentruns = ref([])
  const loading = ref(true)
  // import { useDisplay } from 'vuetify';
  // const display = useDisplay()

  const a = () => {
    axios.get(`/records?page=${page.value}`).then(
      res => {
        res = res.data
        if(res.stats == 'success'){
          recentruns.value = res.response
          loading.value = false
        }
      }
    )
  }
  a();
</script>

<style lang="scss" scoped>
.isDesktop {
  width: 80%;
}
.isMobile {

}
</style>
