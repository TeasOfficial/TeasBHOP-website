<template>
  <v-footer app :class="$route.path == '/' && 'in-index' || 'in-other align-center justify-center'" height="40">
    <span v-if="$route.path == '/'">

      <v-menu>
        <template #activator="{ props }">
          <v-btn variant="text" v-bind="props">
            <v-icon icon="mdi-translate" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in languages"
            :key="index"
            :value="index"
            @click.stop="changeLanguage(item.type)"
          >
            <v-list-item-title>{{ item.title }} ({{ item.compile }}%)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <div
        class="d-inline-block text-caption text-disabled cursor-default"
        style="position: absolute; right: 16px; top: 11.6px"
      >
        &copy; 2020-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Teas Official</span>
      </div>
    </span>

    <span v-else>
      <v-menu>
        <template #activator="{ props }">
          <v-btn variant="text" v-bind="props">
            <v-icon icon="mdi-translate" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in languages"
            :key="index"
            :value="index"
            @click.stop="changeLanguage(item.type)"
          >
            <v-list-item-title>{{ item.title }} ({{ item.compile }}%)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn to="/" variant="text">
        {{ $t('footer.back') }}
      </v-btn>
    </span>
  </v-footer>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const languages = [
    { title: '简体中文', type: 'zhHans', compile: 100 },
    { title: 'English', type: 'en', compile: 18.3 },
  ]

  function changeLanguage (e) {
    localStorage.setItem('locale', e)
    locale.value = e
  }
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

.in-other {
  max-width: 100%;
}

.v-footer {
  transition: all .8s;
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
