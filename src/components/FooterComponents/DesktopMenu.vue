<template>
  <v-btn to="/main/records">
    <v-icon>mdi-history</v-icon>
    <span>{{ $t('footer.records.button') }}</span>
  </v-btn>
  <v-btn to="/main/maps">
    <v-icon>mdi-map-outline</v-icon>
    <span>{{ $t('footer.maps.button') }}</span>
  </v-btn>
  <v-btn to="/main/leaderboards">
    <v-icon>mdi-podium</v-icon>
    <span>{{ $t('footer.leaderboards.button') }}</span>
  </v-btn>
</template>
