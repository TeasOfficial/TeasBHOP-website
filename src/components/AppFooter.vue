<template>
  <v-footer
    app
    :class="($route.path == '/') ? 'in-index ' : ($route.path.startsWith('/main') ? '' : 'align-center justify-center ') + 'in-other'"
    :height="props.footmode != 0 || $route.path.startsWith('/main') ? '0' : '40'"
  >
    <span v-if="$route.path == '/'">

      <TranslateButton :footmode="props.footmode" />

      <div
        class="d-inline-block text-caption text-disabled cursor-default"
        style="position: absolute; right: 16px; top: 11.6px"
      >
        &copy; 2020-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Teas Official</span>
      </div>
    </span>

    <span v-else-if="$route.path.startsWith('/main')">
      <v-bottom-navigation v-model="open" :elevation="24">
        <v-btn v-if="$route.path == '/main'" to="/">
          <v-icon>mdi-home</v-icon>
          <span>{{ $t('footer.back') }}</span>
        </v-btn>

        <v-btn v-else :active="false" to="/main">
          <v-icon>mdi-keyboard-return</v-icon>
          <span>{{ $t('footer.index') }}</span>
        </v-btn>

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

        <TranslateButton :footmode="props.footmode" />
      </v-bottom-navigation>
    </span>

    <span v-else-if="props.footmode == 2">
      <v-bottom-navigation v-model="open" :elevation="24">

        <v-btn @click="$router.back()">
          <v-icon>mdi-keyboard-return</v-icon>
          <span>{{ $t('footer.backtolast') }}</span>
        </v-btn>

        <TranslateButton :footmode="props.footmode" />
      </v-bottom-navigation>
    </span>

    <span v-else>
      <TranslateButton :footmode="props.footmode" />

      <v-btn to="/" variant="text">
        {{ $t('footer.back') }}
      </v-btn>
    </span>
  </v-footer>
</template>

<script setup>
  import TranslateButton from './TranslateButton.vue';
  const open = true;

  const props = defineProps({
    footmode: {
      type: Number,
      default: 0,
    },
  });

</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>

<style lang="scss" scoped>
.in-index {
  max-width: calc(100% - 30px);
  margin: 0 15px 15px 15px;
  border-radius: 10px;
}

.in-other, .home {
  max-width: 100%;
}

.v-footer {
  transition: all .8s;
  z-index: 9999999 !important;

  &>*{
    z-index: 9999998 !important;
  }
}

a,
.v-btn {
  text-decoration: none;
  transition: .2s ease-in-out;
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity));

  &:hover {
    color: rgba(25, 118, 210, 1)
  }
}
</style>
