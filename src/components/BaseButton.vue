<template>
  <button type="button" class="base-button" @click="emit('handleClick')">
    <BaseIcon :name="iconName" />
  </button>
</template>

<script setup>
import BaseIcon from "@components/BaseIcon.vue";

const { iconName } = defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["handleClick"]);
</script>

<style lang="scss" scoped>
@import "@assets/styles/components/BaseButton.scss";
</style>
