<template>
  <v-parallax
    scale="0.9"
    :src="info.background.value"
  >
    <div class="profiles">
      <v-row class="text-left">
        <!-- 头像 -->
        <v-col cols="auto">
          <v-avatar
            ref="vAvatarRef"
            size="80"
          >
            <v-img
              :src="info.avatar.value"
            />
          </v-avatar>
        </v-col>
        <!-- 用户名以及信息 -->
        <v-col>
          <v-row>
            <v-col class="text-h5" cols="12">
              {{ info.username.value || $t('parallax.view.loading') }}
            </v-col>
            <v-col v-if="info.username.value" cols="12" style="font-size: 14px;">
              <v-row>
                <v-col cols="auto">
                  {{ $t('parallax.view.registed_at') }} {{ dayjs(info.date.value).format('YYYY-MM-DD') }}
                  <v-tooltip
                    v-if="info.has_account.value"
                    activator="parent"
                    location="bottom"
                  >
                    {{ $t('parallax.view.steam_registed_at') }} {{ dayjs(info.steamdate.value).format('YYYY-MM-DD') }}
                  </v-tooltip>
                </v-col>
                <v-col cols="auto">
                  {{ info.points }} {{ $t('parallax.view.point') }}
                </v-col>
                <v-col v-if="info.uid.value">
                  UID: {{ info.uid }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <!-- 用户操作 -->
        <v-col cols="auto">
          <v-row class="text-right">
            <v-col cols="12">
              <ProfileEditButton :info="info" />
              <br>
              <v-btn
                class="mt-1"
                color="white"
                :href="`https://steamcommunity.com/profiles/[U:1:${info.auth.value}]`"
                target="_blank"
                variant="text"
              >
                {{ $t('parallax.view.steamprofile') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-parallax>
</template>

<script setup>
  import dayjs from 'dayjs';

  defineProps({
    info: Object,
  });
</script>

<style lang="scss" scoped>
.v-parallax {
  height: 300px;
  border-radius: 15px;
}

.profiles {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 16px;
  background-color: rgba(#000, .4);
  box-shadow: 0 0 15px 5px rgba(#000, .4);
}
</style>
