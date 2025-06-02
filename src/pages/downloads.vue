<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>

      <v-app-bar class="mx-auto">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
        <v-app-bar-title class="cursor-default">
          {{ $t('$vuetify.downloads.header.title') }}
          <span v-if="$route.path != '/downloads'">
            — {{ $t(routeLink[$route.path]) }}
          </span>
        </v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" class="cursor-default">
        <v-btn style="margin: 15px; width: calc(100% - 30px);" @click="$router.push('/downloads')">
          {{ $t('$vuetify.downloads.drawer.index') }}
        </v-btn>
        <v-list-item
          :subtitle="$t('$vuetify.downloads.drawer.item1.subtitle')"
          :title="$t('$vuetify.downloads.drawer.item1.title')"
        />
        <v-divider /><br>
        <v-list-item
          link
          :title="$t('$vuetify.downloads.drawer.item2')"
          to="/downloads/64"
        />
      </v-navigation-drawer>

      <router-view v-if="$route.path != '/downloads'" />
      <v-lazy v-else>
        <v-container class="cursor-default">
          <p class="text-h5">
            {{ $t('$vuetify.downloads.title') }}
          </p>
          <v-divider /><br>
          <p class="text-h6">
            {{ $t('$vuetify.downloads.forDesktop.q') }}
          </p>
          <p>
            {{ $t('$vuetify.downloads.forDesktop.a1') }}
          </p>
          <p>
            {{ $t('$vuetify.downloads.forDesktop.a2') }}
          </p>
          <br>
          <p class="text-h6">
            {{ $t('$vuetify.downloads.forMobile.q') }}
          </p>
          <p>
            {{ $t('$vuetify.downloads.forMobile.a1') }}
          </p>
          <p>
            {{ $t('$vuetify.downloads.forMobile.a2') }}
          </p>
          <p>
            {{ $t('$vuetify.downloads.forMobile.a3') }}
          </p>
          <br>
          <p class="text-h6">
            {{ $t('$vuetify.downloads.cdn.title') }}
          </p>
          <p>
            <a href="https://www.123pan.com/" target="_blank">
              {{ $t('$vuetify.downloads.cdn.pan123') }}
            </a>
          </p>
          <br>
          <p><i>
            {{ $t('$vuetify.downloads.tips') }}
          </i></p>
        </v-container>
      </v-lazy>

    </v-container>
  </v-lazy>
</template>

<script setup>
  const routeLink = {
    '/downloads/64': '$vuetify.downloads.header.s64',
    '/downloads/32': '$vuetify.downloads.header.s32',
  };

  import { useDisplay } from 'vuetify/lib/framework'
  const { mobile } = useDisplay()

  const drawer = ref(!mobile.value)
</script>

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
