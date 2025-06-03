<template>
  <v-empty-state
    :headline="$t('error.404.title')"
    style="white-space: pre-line;"
    :text="$t('error.404.text')"
    :title="$t('error.404.subtitle')"
  >
    <v-btn to="/">
      {{ $t('footer.back') }}
    </v-btn>
  </v-empty-state>
</template>
