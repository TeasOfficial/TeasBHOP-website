<template>
  <v-btn v-if="$route.path == '/main'" :active="false" to="/">
    <v-icon>mdi-home</v-icon>
    <span>{{ $t('footer.back') }}</span>
  </v-btn>
  <v-btn v-else :active="false" to="/main">
    <v-icon>mdi-keyboard-return</v-icon>
    <span>{{ $t('footer.index') }}</span>
  </v-btn>
</template>
