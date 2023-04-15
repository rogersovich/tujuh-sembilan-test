<script>
import { defineAsyncComponent, computed } from 'vue';
import router from './router';

const HomeLayout = defineAsyncComponent(() =>
  import('./layouts/HomeLayout.vue')
);

export default {
  name: 'App',
  components: {
    HomeLayout
  },
  setup() {
    const currentLayout = computed(() => {
      const route = router.currentRoute.value;
      return route.meta.layout || 'div';
    });

    return {
      currentLayout,
    };
  },
};
</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<style scoped>
</style>
