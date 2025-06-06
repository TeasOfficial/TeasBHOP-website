<template>
  <v-img
    class="align-end text-white"
    :color="runinfo.acolor.value"
    cover
    height="400"
  >
    <v-row class="shadow-inline" style="margin-bottom: -32px;">
      <v-col>
        <span v-if="!runinfo.loading.value">
          <v-card-title>
            {{ runinfo.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ $t('runinfo.subtitle.line1', {mapname: runinfo.map.value}) }}
            <br>
            {{ $t('runinfo.subtitle.line2', {time: typeof(runinfo.time.value) == Number ? runinfo.time.value.toFixed(3) : runinfo.time.value}) }}
            <span v-if="status.wrDiff.value">
              丨
              <span :class="status.wrDiff.value == 'World Record' ? 'green' : 'red'">
                {{ status.wrDiff || '' }}
              </span>
            </span>
            <br>
            <span class="btngroup">
              <v-btn color="white" :href="`https://steamcommunity.com/profiles/[U:1:${runinfo.auth.value}]`" target="_blank" variant="text">
                {{ $t('runinfo.view.steamprofile') }}
              </v-btn>
              &ensp;
              <v-btn color="white" :to="`/user/${runinfo.auth.value}?type=auth`" variant="text">
                {{ $t('runinfo.view.userprofile') }}
              </v-btn>
              &ensp;
              <v-btn color="white" :to="`/maps/${runinfo.map.value}`" variant="text">
                {{ $t('runinfo.view.map') }}
              </v-btn>
            </span>
          </v-card-subtitle>
        </span>
        <span v-else>
          <v-card-title>
            {{ $t('runinfo.loading') }}
          </v-card-title>
        </span>
      </v-col>
      <v-col class="text-right mr-5">
        <v-avatar
          class="ml-4"
          rounded="0"
          size="100"
        >
          <v-img cover :src="runinfo.avatar.value" />
        </v-avatar>
      </v-col>
    </v-row>
    <br>
  </v-img>
</template>

<script setup>
  defineProps({
    runinfo: Object,
    status: Object,
  });
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
.btngroup{
  &>.v-btn{
    padding: 0 !important;
  }
}
.red{
  color: #F44336;
}
.green{
  color: #4CAF50
}
</style>
