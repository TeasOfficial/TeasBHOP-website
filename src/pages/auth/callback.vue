<script setup>
  import axios from '@/plugins/axios'
  import router from '@/router'
  import cookies from 'vue-cookies'
  const route = useRoute()
  const loading = ref('正在验证登录，请稍后...');

  axios.post('/steamapi', route.query)
    .then(res => {
      res = res.data
      if(res.stats == 'success') {
        cookies.set('teasbhop-token',res.token,res.expires)
        loading.value = '登录成功，正在跳转'
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
