<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container class="cursor-default">
      <p class="text-h5">
        {{ $t('downloads.x64.title') }}
      </p>
      <div class="text-body-2 font-weight-light mb-n1">
        Counter-Strike: Source
      </div>
      <v-divider /><br>
      <p>
        {{ $t('downloads.link') }}
      </p>
      <br>
      <v-row>
        <v-col cols="auto">
          <v-btn href="https://www.123912.com/s/oXqMjv-BmVov" target="_blank">
            {{ $t('downloads.cdn.pan123') }}
          </v-btn>
        </v-col>
      </v-row>
      <br>
      <v-expansion-panels>
        <v-expansion-panel
          style="white-space: pre-line;"
          :text="$t('downloads.x64.notice1.value')"
          :title="$t('downloads.x64.notice1.title')"
        />
        <v-expansion-panel
          style="white-space: pre-line;"
          :text="$t('downloads.cdn.notice.value')"
          :title="$t('downloads.cdn.notice.title')"
        />
      </v-expansion-panels>
    </v-container>
  </v-lazy>
</template>
