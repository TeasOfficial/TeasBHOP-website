<template>
  <v-pagination
    v-model="page"
    class="my-4"
    length="7"
    @update:model-value="dataChangedOrigin()"
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
        <th v-if="route.query.c == 'SourceJump'">
          国家
        </th>
        <th>
          {{ $t('recentruns.table.head.3') }}
        </th>
        <th>
          {{ $t('recentruns.table.head.4') }}
        </th>
        <th v-if="route.query.c == 'TeasBHOP'">
          {{ $t('recentruns.table.head.5') }}
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <v-hover
        v-for="k in recentruns"
        :key="k"
        v-slot="{ isHovering, props }"
      >
        <tr v-bind="props" style="position: relative" @click="$router.push(`/run/${k.id}?c=${route.query.c}`)">
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
    @update:model-value="dataChangedOrigin()"
  />
</template>

<script setup>
  import axios from '@/plugins/axios';
  const route = useRoute()
  const router = useRouter()
  import dayjs from 'dayjs';
  const page = ref(route.query.page || 1);

  const recentruns = ref([])
  const loading = ref(true)

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

  const dataChangedOrigin = () => {
    router.replace(`/main/records?c=${route.query.c}&page=${page.value}`)
    loading.value = true
    recentruns.value = []
    a();
  }
  dataChangedOrigin();
</script>
