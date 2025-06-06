<script setup>
  import axios from '@/plugins/axios'
  import router from '@/router'
  import cookies from 'vue-cookies'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const route = useRoute()
  const loading = ref(t('steam.authing'));

  axios.post('/steamapi', route.query)
    .then(res => {
      res = res.data
      if(res.stats == 'success') {
        cookies.set('teasbhop-token',res.token,res.expires)
        loading.value = t('steam.authed')
      }
      router.push('/main')
    })
</script>

<template>
  <v-empty-state>
    <template #headline>
      <v-progress-circular
        color="grey-lighten-4"
        indeterminate
        size="100"
        width="12"
      />
      <div class="mt-5 text-h4">
        {{ loading }}
      </div>
    </template>
  </v-empty-state>
</template>
