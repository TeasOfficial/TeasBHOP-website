<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn variant="text" v-bind="props">
        <v-icon icon="mdi-translate" />
        <span v-if="!$route.path.startsWith('/downloads')">
          {{ $t('footer.translate') }}
        </span>
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
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const languages = [
    { title: '简体中文', type: 'zhHans', compile: 100 },
    { title: 'English', type: 'en', compile: 12.7 },
  ]

  function changeLanguage (e) {
    localStorage.setItem('locale', e)
    locale.value = e
  }
</script>

<style lang="scss" scoped>
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
