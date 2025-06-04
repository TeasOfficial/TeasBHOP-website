<template>
  <v-card class="mb-2" variant="tonal">
    <v-card-title>
      {{ props.title }}
    </v-card-title>
    <v-card-subtitle class="mb-2">
      {{ props.subtitle }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: 'Title 占位符',
    },
    subtitle: {
      type: String,
      default: 'Subtitle 占位符',
    },
  });
</script>
