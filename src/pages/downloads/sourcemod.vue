<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <p class="text-h5">
        {{ $t('smod.title') }}
      </p>
      <div class="text-body-2 font-weight-light mb-n1">
        {{ $t('smod.desc') }}
      </div>
      <v-divider /><br>
      <p>
        {{ $t('downloads.link') }}
      </p>
      <br>
      <v-row>
        <v-col cols="auto">
          <v-btn href="https://www.sourcemod.net/downloads.php?branch=dev" target="_blank">
            {{ $t('downloads.cdn.origin') }}
          </v-btn>
        </v-col>
      </v-row>
      <br>
      <v-expansion-panels>
        <v-expansion-panel
          style="white-space: pre-line;"
          :text="$t('downloads.mmod.notice1.value')"
          :title="$t('downloads.mmod.notice1.title')"
        />
        <v-expansion-panel
          style="white-space: pre-line;"
          :text="$t('downloads.cdn.mmod.value')"
          :title="$t('downloads.cdn.notice.title')"
        />
      </v-expansion-panels>
    </v-container>
  </v-lazy>
</template>
