<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <v-app-bar class="mx-auto">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
        <v-app-bar-title class="cursor-default">
          {{ $t('downloads.header.title') }}
          <span v-if="$route.path != '/downloads'">
            — {{ routeLink[$route.path] }}
          </span>
        </v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" class="cursor-default">
        <v-btn style="margin: 15px; width: calc(100% - 30px);" @click="$router.push('/downloads')">
          {{ $t('downloads.drawer.index') }}
        </v-btn>

        <span v-for="k in draweritem" :key="k">
          <v-list-item
            :subtitle="k.subtitle"
            :title="k.title"
          />
          <v-divider /><br>
          <v-list-item
            v-for="v in k.items"
            :key="v"
            link
            :title="v.name"
            :to="v.link"
          />
          <br>
        </span>

      </v-navigation-drawer>

      <router-view v-if="$route.path != '/downloads'" />
      <v-lazy v-else>
        <v-container class="cursor-default">
          <p class="text-h5">
            {{ $t('downloads.title') }}
          </p>
          <v-divider /><br>
          <p class="text-h6">
            {{ $t('downloads.forDesktop.q') }}
          </p>
          <p>
            {{ $t('downloads.forDesktop.a1') }}
          </p>
          <p>
            {{ $t('downloads.forDesktop.a2') }}
          </p>
          <br>
          <p class="text-h6">
            {{ $t('downloads.forMobile.q') }}
          </p>
          <p>
            {{ $t('downloads.forMobile.a1') }}
          </p>
          <p>
            {{ $t('downloads.forMobile.a2') }}
          </p>
          <p>
            {{ $t('downloads.forMobile.a3') }}
          </p>
          <br>
          <p class="text-h6">
            {{ $t('downloads.cdn.title') }}
          </p>
          <p>
            <v-row>
              <v-col cols="auto">
                <a href="https://www.123pan.com/" target="_blank">
                  {{ $t('downloads.cdn.pan123') }}
                </a>
              </v-col>
              <v-col cols="auto">
                <a href="https://github.com/" target="_blank">
                  {{ $t('downloads.cdn.github') }}
                </a>
              </v-col>
            </v-row>
          </p>
          <br>
          <p><i>
            {{ $t('downloads.tips') }}
          </i></p>
        </v-container>
      </v-lazy>

    </v-container>
  </v-lazy>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const draweritem = [
    {
      title: t('downloads.drawer.item1.title'),
      subtitle: t('downloads.drawer.item1.subtitle'),
      items: [
        {
          name: t('downloads.drawer.item2'),
          link: '/downloads/64',
        },
      ],
    },
    {
      title: t('downloads.drawer.item3.title'),
      subtitle: t('downloads.drawer.item3.subtitle'),
      items: [
        {
          name: t('mmod.title'),
          link: '/downloads/metamod',
        },
        {
          name: t('smod.title'),
          link: '/downloads/sourcemod',
        },
        {
          name: t('shavit.timer.title'),
          link: '/downloads/shavit-timer',
        },
      ],
    },
    {
      title: t('downloads.drawer.item4.title'),
      subtitle: t('downloads.drawer.item4.subtitle'),
      items: [
        {
          name: t('downloads.fastdl.mirror'),
          link: '/downloads/maps',
        },
      ],
    },
  ]

  const routeLink = {
    '/downloads/64': t('downloads.header.s64'),
    '/downloads/32': t('downloads.header.s32'),
    '/downloads/metamod': t('mmod.title'),
    '/downloads/sourcemod': t('smod.title'),
    '/downloads/shavit-timer': t('shavit.timer.title'),
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
