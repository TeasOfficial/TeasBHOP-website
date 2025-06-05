<template>
  <div
    class="mx-auto cursor-default"
    :class="display.xs.value ? 'text-center' : ''"
  >
    <p class="text-h4 mt-5">
      {{ props.title }}
    </p>
    <p class="text-disabled">
      {{ props.subtitle }}
    </p>
  </div>

</template>

<script setup>
  const props = defineProps({
    title: String,
    subtitle: String,
  });

  import { useDisplay } from 'vuetify';
  const display = useDisplay()
</script>
