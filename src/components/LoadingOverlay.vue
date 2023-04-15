<script setup>
const props = defineProps({
  loading: Boolean
})
</script>

<template>
  <div v-if="props.loading">
    <div className="overlay">
      <div className="overlay__inner">
        <div className="overlay__content">
          <p-progress-spinner strokeWidth="3" aria-label="Loading"></p-progress-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
