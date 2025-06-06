<template>
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
        :subtitle="status.sync.value + '%'"
        :title="$t('runinfo.sync')"
      />
    </v-col>
    <v-col :cols="display.xs.value ? 12 : 6">
      <RunInfoCard
        :subtitle="dayjs(runinfo.date.value).format('YYYY-MM-DD HH:mm:ss')"
        :title="$t('runinfo.date')"
      />
    </v-col>
    <v-col cols="12">
      <RunInfoCard
        :subtitle="status.server"
        :title="$t('runinfo.server')"
      />
    </v-col>
  </v-row>
</template>

<script setup>
  defineProps({
    runinfo: Object,
    status: Object,
  })

  import { useDisplay } from 'vuetify';
  const display = useDisplay()
  import dayjs from 'dayjs';
</script>
