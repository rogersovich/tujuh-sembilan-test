<script setup>
import { useRoute } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 619px)')

const route = useRoute()

const listNav = [
  {
    title: 'Users',
    key: 'users'
  },
  {
    title: 'Chart',
    key: 'chart'
  }
]


const year = new Date().getFullYear()

const routeToGithub = () => {
  window.open('https://github.com/rogersovich/tujuh-sembilan-test', '_blank')
}
</script>

<template>
  <div>
    <header class="tw-bg-[#0079D8] grid-12 tw-gap-4 tw-py-2 tw-px-6 tw-text-white">
      <div class="tw-col-span-4 fc">
        <div class="tw-text-[18px] md:tw-text-[24px] medium">Rogers</div>
      </div>
      <div class="tw-col-span-4 fcc">
        <ul class="fcc tw-gap-8 md:tw-gap-16 tw-text-[14px] md:tw-text-[18px] tw-list-none tw-px-0">
          <li
            class="tw-mb-0 hover:tw-text-[#FBBD00] hover:bold grow"
            :class="route.name === nav.key ? 'tw-text-[#FBBD00] bold' : ''"
            v-for="nav in listNav"
            :key="nav.key"
          >
            <router-link :to="{ name: nav.key }" class="tw-text-inherit tw-no-underline">
              {{ nav.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="tw-col-span-4 fcr">
        <Iconify
          icon="radix-icons:github-logo"
          :width="isMobile ? 25 : 40"
          class="tw-cursor-pointer"
          @click="routeToGithub"
        />
      </div>
    </header>

    <main class="tw-py-8 tw-px-6 tw-min-h-[88vh]">
      <router-view />
    </main>

    <footer class="tw-bg-[#0079D8] tw-p-4">
      <div class="tw-text-white tw-text-center tw-text-[14px] md:tw-text-[18px]">
        © {{ year }} design by rogersovich
      </div>
    </footer>
  </div>
</template>

<style lang="css" scoped>
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  font-size: 18px;
}
</style>
