<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          全球排名
        </v-card-title>
        <v-card-text>
          {{ info.rank_auto }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          世界纪录数量
        </v-card-title>
        <v-card-text>
          {{ info.records_total }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          国家
        </v-card-title>
        <v-card-text>
          {{ info.country || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          鼠标
        </v-card-title>
        <v-card-text>
          {{ info.mouse || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          DPI
        </v-card-title>
        <v-card-text>
          {{ info.dpi || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          灵敏度
        </v-card-title>
        <v-card-text>
          {{ info.sens || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          鼠标垫
        </v-card-title>
        <v-card-text>
          {{ info.mousePad || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          键盘
        </v-card-title>
        <v-card-text>
          {{ info.keyboard || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          显示器
        </v-card-title>
        <v-card-text>
          {{ info.monitor || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Aspect
        </v-card-title>
        <v-card-text>
          {{ info.aspect || '暂未填写' }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <br><br><br>
</template>

<script setup>
  defineProps({
    info: Object,
  });
</script>

<style scoped>

</style>
