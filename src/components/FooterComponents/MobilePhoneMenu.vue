<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn variant="text" v-bind="props">
        <v-icon icon="mdi-format-list-bulleted" />
        <span>
          菜单
        </span>
      </v-btn>
    </template>
    <v-list class="text-center">
      <v-list-item to="/main/records">
        <span>{{ $t('footer.records.button') }}</span>
      </v-list-item>
      <v-list-item to="/main/maps">
        <span>{{ $t('footer.maps.button') }}</span>
      </v-list-item>
      <v-list-item to="/main/leaderboards">
        <span>{{ $t('footer.leaderboards.button') }}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss">
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
