<script setup>
import { reactive } from 'vue'
import { useHead } from '@vueuse/head'
import CardUser from '../components/users/CardUser.vue'
// api
import { fetchUsers } from '../api/reqres/users.js'
import { useInfiniteQuery } from '@tanstack/vue-query'

useHead({
  title: `Rogersovich - Users`,
  meta: [
    { name: 'description', content: 'This is an example' },
    { property: 'og:title', content: 'Hello world' }
  ]
})

// Query
const params = reactive({
  page: 1,
  per_page: 4
})
const {
  isLoading,
  isError,
  isSuccess,
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteQuery({
  queryKey: ['users'],
  queryFn: async ({ pageParam = 1 }) => {
    params.page = pageParam
    return await fetchUsers(params)
  },
  getNextPageParam: (pages) => {
    if (pages.page === pages.total_pages) {
      return false
    } else {
      return pages.page + 1
    }
  }
})
</script>

<template>
  <span v-if="isLoading">
    <div class="grid-12 tw-gap-6">
      <div class="tw-col-span-3" v-for="skel in 12" :key="skel">
        <div class="tw-bg-white tw-px-4 tw-py-6 tw-rounded-lg shadow-sketch-line">
          <div class="fcc tw-my-2.5">
            <p-skeleton shape="circle" width="90px" height="90px"></p-skeleton>
          </div>
          <div>
            <div class="fcc tw-mb-2 tw-mt-4">
              <p-skeleton height="0.5rem" width="60%"></p-skeleton>
            </div>
            <div class="fcc">
              <p-skeleton height="0.5rem" width="75%"></p-skeleton>
            </div>
          </div>
          <br />
          <div class="grid-2 tw-gap-4">
            <p-skeleton height="2.4rem"></p-skeleton>
            <p-skeleton height="2.4rem"></p-skeleton>
          </div>
        </div>
      </div>
    </div>
  </span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <div v-else-if="isSuccess">
    <div class="grid-12 tw-gap-6">
      <div class="tw-col-span-12">
        <div class="grid-12 tw-gap-4">
          <div class="tw-col-span-10">
            <pInputText type="text" placeholder="Search user" class="tw-w-full tw-h-[46px]" />
          </div>
          <div class="tw-col-span-2">
            <p-button class="tw-w-full tw-h-[46px] tw-justify-center"> Create New </p-button>
          </div>
        </div>
      </div>
      <div
        class="tw-col-span-3"
        v-for="user in data.pages.flatMap((page) => page.data)"
        :key="user.id"
      >
        <CardUser
          :avatar="user.avatar"
          :fullname="`${user.first_name} ${user.last_name}`"
          :email="user.email"
        />
      </div>
      <div class="tw-col-span-12">
        <div class="tw-text-center">
          <p-button
            outlined
            class="tw-h-[46px] tw-justify-center"
            :loading="isFetchingNextPage"
            :disabled="!hasNextPage || isFetchingNextPage"
            @click="fetchNextPage()"
          >
            {{
              isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load more'
                : 'Nothing more to load'
            }}
          </p-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
