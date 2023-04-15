<script setup>
import { reactive, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { useToast } from 'primevue/usetoast'
import CardUser from '../components/users/CardUser.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import CreateDialog from '../components/users/CreateDialog.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
// api
import { fetchUsers } from '../api/reqres/users.js'
import { useInfiniteQuery, useQueryClient } from '@tanstack/vue-query'

useHead({
  title: `Rogersovich - Users`,
  meta: [
    { name: 'description', content: 'This is an example' },
    { property: 'og:title', content: 'Hello world' }
  ]
})

const createDialog = ref(false)
const toast = useToast()
const isLoad = ref(false)

// Query
const params = reactive({
  page: 1,
  per_page: 4
})
const queryClient = useQueryClient()
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

const showToast = (val) => {
  toast.add({ severity: val.type, summary: val.type, detail: val.message, life: 2000 })
  // Invalidate and refetch
  queryClient.invalidateQueries({ queryKey: ['users'] })
}
</script>

<template>
  <span v-if="isLoading">
    <div class="grid-12 tw-gap-6">
      <div class="tw-col-span-3" v-for="skel in 12" :key="skel">
        <SkeletonCard />
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
            <p-button class="tw-w-full tw-h-[46px] tw-justify-center" @click="createDialog = true">
              Create User
            </p-button>
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
    <p-toast></p-toast>
    <LoadingOverlay :loading="isLoad"></LoadingOverlay>
    <CreateDialog v-model="createDialog" @toggleToast="showToast" @toggleLoading="isLoad = !isLoad" />
  </div>
</template>

<style lang="css" scoped></style>
