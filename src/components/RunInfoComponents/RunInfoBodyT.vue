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
        :subtitle="status.completions"
        :title="$t('runinfo.completions')"
      />
    </v-col>
    <v-col cols="12">
      <RunInfoCard
        :subtitle="getRecDate()"
        :title="$t('runinfo.date')"
      />
    </v-col>
  </v-row>
</template>

<script setup>
  const props = defineProps({
    runinfo: Object,
    status: Object,
  })

  import { useDisplay } from 'vuetify';
  const display = useDisplay()
  import dayjs from 'dayjs';

  const getRecDate = () => {
    return dayjs(props.runinfo.date.value * 1000).format('YYYY-MM-DD HH:mm:ss')
  };
</script>
