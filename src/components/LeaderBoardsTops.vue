<template>
  <v-card
    :class="`grow-${props.top}`"
    :color="colors[props.top]"
    height="100"
    :to="`/user/${props.auth}?type=auth`"
  >
    <v-row>
      <v-col>
        <v-card-title>
          TOP #{{ props.top }}
        </v-card-title>
        <v-card-subtitle class="mb-2" style="overflow: hidden;">
          {{ props.name }}
          <br>
          {{ props.points }} 积分
        </v-card-subtitle>
      </v-col>
      <v-col>
        <v-avatar
          class="ma-3"
          rounded="0"
          size="125"
        >
          <v-img
            :src="props.avatar"
          />
        </v-avatar>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  const props = defineProps({
    top: {
      type: Number,
      default: 0,
    },
    name: String,
    avatar: String,
    points: {
      type: Number,
      default: 0,
    },
    auth: {
      type: Number,
      default: 0,
    },
  });
  const colors = {
    0: 'black',
    1: 'yellow',
    2: 'blue-grey',
    3: 'brown',
  };
</script>

<style lang="scss">
.grow-1 {
  box-shadow: 0 0 15px 5px #FFEB3B !important;
}
.grow-2 {
  box-shadow: 0 0 15px 5px #607D8B !important;
}
.grow-3 {
  box-shadow: 0 0 15px 5px #795548 !important;
}
</style>
