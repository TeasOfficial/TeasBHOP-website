<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <v-row v-if="!display.xs.value" align="center" justify="center">
        <v-col cols="5">
          <PageTitle :subtitle="$t('recentruns.subtitle')" :title="$t('recentruns.title')" />
        </v-col>
        <v-col>
          <v-select
            v-model="default_from"
            class="mt-5"
            :items="data_from"
            label="数据来源"
            :menu-props="{ scrollStrategy: 'close' }"
            @update:model-value="dataChangedOrigin()"
          />
        </v-col>
      </v-row>

      <RecordsListTableT v-if="route.query.c == 'TeasBHOP'" />
      <RecordsListTableS1 v-if="route.query.c == 'SourceJump-WR'" />
      <RecordsListTableS2 v-if="route.query.c == 'SourceJump-SR'" />

    </v-container>
  </v-lazy>
</template>

<script setup>
  import { useDisplay } from 'vuetify';

  const route = useRoute()
  const router = useRouter()
  const default_from = shallowRef();
  const display = useDisplay()

  if(!route.query.c) {
    default_from.value = 'TeasBHOP'
  }else{
    default_from.value = route.query.c
  }

  const data_from = [
    'TeasBHOP',
    'SourceJump-WR',
    'SourceJump-SR',
  ];

  const dataChangedOrigin = () => {
    router.replace(`/main/records?c=${default_from.value}&page=${route.query.page || 1}`)
  };
  dataChangedOrigin();
</script>

<style lang="scss" scoped>
.isDesktop {
  width: 80%;
}
</style>
