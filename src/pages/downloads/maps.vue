<template>
  <v-lazy>
    <v-container>
      <p class="text-h5">
        {{ $t('downloads.fastdl.title') }}
      </p>
      <div class="text-body-2 font-weight-light mb-n1">
        {{ $t('downloads.fastdl.desc') }}
      </div>
      <v-divider /><br><br><br>
      <center>
        <p class="text-h5">
          {{ $t('downloads.fastdl.confirm.text') }} </p>
        <p>{{ $t('downloads.fastdl.confirm.subtext') }}</p>
        <br>
        <v-btn href="https://hub.ipairsdo.xin/" target="_blank" @click="$router.push('/downloads')">
          {{ $t('downloads.fastdl.confirm.button') }}
        </v-btn>
      </center>
    </v-container>
  </v-lazy>
</template>
