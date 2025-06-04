<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <div class="mx-auto" style="width: 80%">
        <v-row align="center" justify="center">
          <v-col cols="5">
            <p class="text-h4">
              {{ $t('maplist.title') }}
            </p>
          </v-col>
          <v-col>
            <v-form class="mt-5" @submit="a(mapname)" @submit.prevent>
              <v-text-field
                v-model="mapname"
                append-inner-icon="mdi-magnify"
                :hint="$t('maplist.searchhint')"
                :label="$t('maplist.mapname')"
                variant="solo-filled"
                @click:append-inner="a(mapname)"
              />
            </v-form>
          </v-col>
        </v-row>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="maxPage"
          @update:model-value="a()"
        />
        <v-table class="mt-5 mx-auto" style="width: 95%">
          <thead>
            <tr>
              <th>
                {{ $t('maplist.mapname') }}
              </th>
              <th>
                {{ $t('tier') }}
              </th>
            </tr>
          </thead>
          <v-skeleton-loader
            v-if="loading"
            type="table-row-divider@15"
          />
          <tbody v-else>
            <v-hover
              v-for="k in mapLists"
              :key="k"
              v-slot="{ isHovering, props }"
            >
              <tr v-bind="props" style="position: relative" @click="$router.push(`/maps/${k.map}`)">
                <td>
                  {{ k.map }}
                </td>
                <td :class="`text-${getChipColor(k.tier)}`">
                  {{ k.tier }}
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
          :length="maxPage"
          @update:model-value="a()"
        />
      </div>

    </v-container>
  </v-lazy>
</template>

<script setup>
  import axios from '@/plugins/axios';
  import merge from 'webpack-merge';

  const router = useRouter()
  const route = useRoute()

  const mapLists = ref([])
  const page = ref(route.query.page || 1)
  const maxPage = ref(1)
  const loading = ref(false)

  function a (search){
    loading.value = true
    if(search){
      axios.get(`/maps?search=${search}`).then(res => {
        mapLists.value = []
        res = res.data
        if(res.stats == 'success'){
          mapLists.value = res.response
          maxPage.value = 1
        }
        loading.value = false
      })
    }else{
      router.push({
        query:merge(
          route.query,
          { page: page.value },
        ),
      })
      axios.get(`/maps?page=${page.value}`).then(res => {
        mapLists.value = []
        res = res.data
        if(res.stats == 'success'){
          mapLists.value = res.response
          maxPage.value = Math.ceil(res.total / 15)
        }
        loading.value = false
      })
    }
  }
  a();

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
  function getChipColor (tier) {
    return chipColors[tier] || 'red-darken-4'
  }
</script>

<style lang="scss" scoped>

</style>
