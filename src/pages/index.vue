<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <div class="text-center cursor-default">
        <h1 class="text-h2">TeasBhop</h1>
        <div class="text-body-2 font-weight-light mb-n1">
          {{ $t('$vuetify.welcome') }}
        </div>

        <br>

        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn to="home">
              {{ $t(`$vuetify.index.website`) }}
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn to="downloads">
              {{ $t(`$vuetify.index.downloads`) }}
            </v-btn>
          </v-col>
        </v-row>
        <br>
        <v-btn to="/submit-a-translation" variant="text">
          {{ $t('$vuetify.index.translate') }}
        </v-btn>
      </div>
    </v-container>
  </v-lazy>
</template>

<script setup>
</script>

<style lang=scss scoped>
.v-container>div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
a {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  text-decoration: none;
  transition: color .2s;
  &:hover{
    color: rgba(25, 118, 210, 1);
  }
}
</style>
