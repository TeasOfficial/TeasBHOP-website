<template>
  <v-menu v-if="info.is_me.value">
    <template #activator="{ props }">
      <v-btn color="white" variant="text" v-bind="props">
        {{ $t('parallax.view.edit') }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="active_username = !active_username; iHaveReaded = false; editStatus = 0">
        <v-list-item-title>
          {{ $t('parallax.edit.changename') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="active_image = !active_sign; iHaveReaded = false; editStatus = 0">
        <v-list-item-title>
          {{ $t('parallax.edit.changeBgImg') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="active_sign = !active_sign; iHaveReaded = false; editStatus = 0">
        <v-list-item-title>
          {{ $t('parallax.edit.changesign') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <!-- 用户名 -->
  <v-dialog v-model="active_username" fullscreen>
    <v-card
      max-width="400"
      prepend-icon="mdi-account-edit"
      :title="$t('parallax.edit.changename')"
    >
      <v-card-text v-if="!iHaveReaded">
        <p class="text-h5">
          {{ $t('parallax.edit.name.alert.title') }}
        </p>
        <p>{{ $t('parallax.edit.name.alert.2') }}</p>
        <p>{{ $t('parallax.edit.name.alert.3') }}</p>
        <br>
        <p>{{ $t('parallax.edit.username.fin') }}</p>
        <br>
        <v-btn color="primary" @click="iHaveReaded = true">
          {{ $t('parallax.edit.iknowBtn') }}
        </v-btn>
      </v-card-text>
      <v-card-text v-else>
        <p class="text-h5">{{ $t('parallax.edit.name.title') }}</p>
        <p>{{ $t('parallax.edit.name.2') }}</p>
        <p>{{ $t('parallax.edit.name.3') }}</p>
        <br>
        <v-form @submit.prevent="changeProfile('name')">
          <v-text-field
            v-model="new_username"
            :label="$t('parallax.edit.name.newname')"
            :rules="rules"
          />
          <v-btn
            block
            class="mt-2"
            color="primary"
            :loading="loading"
            type="submit"
          >
            {{ $t('submit') }}
          </v-btn>
        </v-form>
        <br>
        <v-alert
          v-if="editStatus == 1"
          :text="$t('parallax.edit.success.text')"
          :title="$t('parallax.edit.success.title')"
          type="success"
        />
        <v-alert
          v-if="editStatus == 2"
          :text="$t('parallax.edit.failed.text')"
          :title="$t('parallax.edit.failed.title')"
          type="error"
        />
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- 简介 -->
  <v-dialog v-model="active_sign" fullscreen>
    <v-card
      max-width="400"
      prepend-icon="mdi-account-edit"
      :title="$t('parallax.edit.changesign')"
    >
      <v-card-text v-if="!iHaveReaded">
        <p class="text-h5">
          {{ $t('parallax.edit.sign.alert.title') }}
        </p>
        <p>{{ $t('parallax.edit.name.alert.2') }}</p>
        <p>{{ $t('parallax.edit.sign.alert.3') }}</p>
        <br>
        <p>{{ $t('parallax.edit.username.fin') }}</p>
        <br>
        <v-btn color="primary" @click="iHaveReaded = true">
          {{ $t('parallax.edit.iknowBtn') }}
        </v-btn>
      </v-card-text>
      <v-card-text v-else>
        <p class="text-h5">{{ $t('parallax.edit.sign.title') }}</p>
        <p>{{ $t('parallax.edit.sign.2') }}</p>
        <p>{{ $t('parallax.edit.sign.3') }}</p>
        <br>
        <v-textarea
          v-model="new_sign"
          counter
          :label="$t('parallax.view.sign')"
        />
        <v-btn
          block
          class="mt-2"
          color="primary"
          :loading="loading"
          @click="changeProfile('sign')"
        >
          {{ $t('submit') }}
        </v-btn>
        <br>
        <v-alert
          v-if="editStatus == 1"
          :text="$t('parallax.edit.success.text')"
          :title="$t('parallax.edit.success.title')"
          type="success"
        />
        <v-alert
          v-if="editStatus == 2"
          :text="$t('parallax.edit.failed.text')"
          :title="$t('parallax.edit.failed.title')"
          type="error"
        />
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- 背景图 -->
  <v-dialog v-model="active_image" fullscreen>
    <v-card
      max-width="400"
      prepend-icon="mdi-account-edit"
      title="$t('parallax.edit.changeBgImg')"
    >
      <v-card-text v-if="!iHaveReaded">
        <p class="text-h5">
          {{ $t('parallax.edit.bgImg.alert.title') }}
        </p>
        <p>{{ $t('parallax.edit.name.alert.2') }}</p>
        <p>{{ $t('parallax.edit.bgImg.alert.2') }}</p>
        <br>
        <p>{{ $t('parallax.edit.username.fin') }}</p>
        <br>
        <v-btn color="primary" @click="iHaveReaded = true">
          {{ $t('parallax.edit.iknowBtn') }}
        </v-btn>
      </v-card-text>
      <v-card-text v-else>
        <p class="text-h5">{{ $t('parallax.edit.bgImg.title') }}</p>
        <p>{{ $t('parallax.edit.name.2') }}</p>
        <br>
        <p>{{ $t('parallax.edit.bgImg.alert.3') }}</p>
        <p>{{ $t('parallax.edit.bgImg.alert.3') }}</p>
        <p>{{ $t('parallax.edit.bgImg.alert.3') }}</p>
        <br>
        <v-form @submit.prevent="changeProfile('bgImg')">
          <v-text-field
            v-model="new_image"
            :label="$t('parallax.edit.bgImg.link')"
          />
          <v-btn
            block
            class="mt-2"
            color="primary"
            :loading="loading"
            type="submit"
          >
            {{ $t('submit') }}
          </v-btn>
        </v-form>
        <br>
        <v-alert
          v-if="editStatus == 1"
          :text="$t('parallax.edit.success.text')"
          :title="$t('parallax.edit.success.title')"
          type="success"
        />
        <v-alert
          v-if="editStatus == 2"
          :text="$t('parallax.edit.failed.text')"
          :title="$t('parallax.edit.failed.title')"
          type="error"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
  const infos = defineProps({
    info: Object,
  });

  const iHaveReaded = ref(false)
  const active_username = ref(false)
  const active_sign = ref(false)
  const active_image = ref(false)
  const new_username = ref(infos.info.username)
  const new_sign = ref(infos.info.sign)
  const new_image = ref(infos.info.background)
  const loading = ref(false)
  const editStatus = ref(0)

  import { useI18n } from 'vue-i18n';
  const { t } = useI18n()

  const rules = [
    value => {
      if (!value) return t('parallax.edit.name.alert.nameValid')
      if (value == infos.info.username) return t('parallax.edit.name.alert.nameSame')
      return true
    },
  ]

  import axios from '@/plugins/axios'
  const changeProfile = type => {
    loading.value = true
    if(type=='name'){
      axios.post('/user/changeName', {
        uid: infos.info.uid.value,
        new_name: new_username.value,
      }).then(
        res => {
          loading.value = false
          if(res.data.stats == 'success') {
            editStatus.value = 1
          }else{
            editStatus.value = 2
          }
        }
      ).catch(
        () => {
          loading.value = false
          editStatus.value = 2
        }
      )
    }
    if(type=='sign'){
      axios.post('user/changeSign', {
        uid: infos.info.uid.value,
        new_sign: new_sign.value,
      }).then(
        res => {
          loading.value = false
          if(res.data.stats == 'success') {
            editStatus.value = 1
          }else{
            editStatus.value = 2
          }
        }
      ).catch(() => {
        loading.value = false
        editStatus.value = 2
      })
    }
    if(type=='bgImg'){
      axios.post('user/changeBgImg', {
        uid: infos.info.uid.value,
        new_image: new_image.value,
      }).then(
        res => {
          loading.value = false
          if(res.data.stats == 'success') {
            editStatus.value = 1
          }else{
            editStatus.value = 2
          }
        }
      ).catch(() => {
        loading.value = false
        editStatus.value = 2
      })
    }
  };
</script>
