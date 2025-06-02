<template>
  <v-lazy min-height="200" :options="{ 'threshold': 0.5 }" transition="fade-transition">
    <v-container>
      <p class="text-h5">
        {{ $t('shavit.timer.title') }}
      </p>
      <div class="text-body-2 font-weight-light mb-n1">
        {{ $t('shavit.timer.desc') }}
      </div>
      <v-divider /><br>
      <p>
        {{ $t('downloads.link') }}
      </p>
      <br>
      <v-row>
        <v-col cols="auto">
          <v-btn href="https://github.com/shavitush/bhoptimer" target="_blank">
            {{ $t('downloads.cdn.github') }}
          </v-btn>
        </v-col>
      </v-row>
      <br>
      <v-expansion-panels>
        <v-expansion-panel
          style="white-space: pre-line;"
          :text="$t('downloads.cdn.notice.github')"
          :title="$t('downloads.cdn.notice.title')"
        />
      </v-expansion-panels>
      <br>
      <p>
        <i>{{ $t('shavit.timer.alert') }}</i>
      </p>
    </v-container>
  </v-lazy>
</template>
