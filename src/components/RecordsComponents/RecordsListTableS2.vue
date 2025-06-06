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
        <th>
          国家
        </th>
        <th>
          {{ $t('recentruns.table.head.3') }}
        </th>
        <th>
          {{ $t('recentruns.table.head.4') }}
        </th>
        <th>

        </th>
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
            {{ k.country ? k.country.toUpperCase() : 'None' }}
          </td>
          <td>
            {{ k.map }}
          </td>
          <td>
            {{ k.time }}s
          </td>
          <td v-if="k.wrDif == 'World Record'" style="color: #4CAF50;">
            {{ $t('worldrecord') }}
          </td>
          <td v-else style="color: #F44336;">
            {{ k.wrDif }}
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
  const page = ref(route.query.page || 1);

  const recentruns = ref([])
  const loading = ref(true)

  const b = () => {
    axios.get('https://wr.ipairsdo.xin/ajax/records/server').then(
      res => {
        loading.value = false
        const startWith = (page.value - 1) * 15
        const endWith = (page.value * 15) - 1
        for(const k in res.data){
          if(k < startWith) continue;
          const v = res.data[k]
          recentruns.value.push({
            id: v.id,
            name: v.name,
            country: v.country,
            map: v.map,
            time: v.time,
            wrDif: v.wrDif,
          })
          if(k >= endWith) break;
        }
      }
    )
  }

  const dataChangedOrigin = () => {
    router.replace(`/main/records?c=${route.query.c}&page=${page.value}`)
    loading.value = true
    recentruns.value = []
    b();
  }
  dataChangedOrigin();
</script>
