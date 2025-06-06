<template>
  <v-card>
    <v-card-title>
      {{ $t('parallax.view.sign') }}
    </v-card-title>
    <v-card-text style="white-space: pre-line;">
      {{ info.sign.value || '这个家伙懒死了，还没写个性签名。' }}
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    info: Object,
  });
</script>
