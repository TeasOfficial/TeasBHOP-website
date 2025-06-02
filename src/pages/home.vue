<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <div>
        {{ $t('work_in_progress') }}
      </div>
    </v-container>
  </v-lazy>
</template>
