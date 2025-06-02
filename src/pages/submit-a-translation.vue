<template>
  <v-lazy>
    <v-container>
      <p class="text-h5">
        {{ $t('$vuetify.translate.title') }}
      </p>
      <div class="text-body-2 font-weight-light mb-n1">
        {{ $t('$vuetify.translate.subtitle') }}
      </div>
      <v-divider /><br>
      <p class="text-h6">
        {{ $t('$vuetify.translate.q1') }}
      </p>
      <p>
        {{ $t('$vuetify.translate.a1') }}
      </p>
      <br>
      <p class="text-h6">
        {{ $t('$vuetify.translate.q2') }}
      </p>
      <p>
        {{ $t('$vuetify.translate.a2') }}
      </p>
      <br>
      <p class="text-h6">
        {{ $t('$vuetify.translate.q3') }}
      </p>
      <p>
        <a href="https://github.com/TeasOfficial/TeasBHOP-website" target="_blank">
          https://github.com/TeasOfficial/TeasBHOP-website
        </a>
      </p>
    </v-container>
  </v-lazy>
</template>

<style lang="scss" scoped>
a {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  text-decoration: none;
  transition: color .2s;
  &:hover{
    color: rgba(25, 118, 210, 1);
  }
}
</style>
