<script setup>
import { reactive, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
// component
import CardUser from '../components/users/CardUser.vue'
import TableUser from '../components/users/TableUser.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import CreateUser from '../components/users/CreateUser.vue'
import DetailUser from '../components/users/DetailUser.vue'
import EditUser from '../components/users/EditUser.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
// api
import { fetchUsers, deleteUsers } from '../api/reqres/users.js'
import { useInfiniteQuery, useQueryClient, useMutation } from '@tanstack/vue-query'

useHead({
  title: `Rogersovich - Users`,
  meta: [{ name: 'description', content: 'This is page of list users' }]
})

// prime vue
const toast = useToast()
const confirm = useConfirm()

const createDialog = ref(false)
const detailDialog = ref(false)
const editDialog = ref(false)
const isLoad = ref(false)
const idEdit = ref(null)
const idUpdate = ref(null)

const activeTabs = ref(0)
const tabs = ref([{ title: 'User Card' }, { title: 'User Table' }])

const onTabChange = (index) => {
  activeTabs.value = index
}

// Fetch Api Users
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

// handle Create
const handleDetail = (ID) => {
  isLoad.value = true
  setTimeout(() => {
    detailDialog.value = true
    idEdit.value = ID
  }, 500)
}

// handle Edit
const handleEdit = (ID) => {
  isLoad.value = true
  setTimeout(() => {
    editDialog.value = true
    idUpdate.value = ID
  }, 500)
}

// Handle Delete
const deleteItemMutation = useMutation(
  async () => {
    deleteUsers(idEdit.value)
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      idEdit.value = null
      isLoad.value = false
      toast.add({
        severity: 'success',
        summary: 'success',
        detail: 'Success Delete User',
        life: 2000
      })
    },
    onError: () => {
      idEdit.value = null
      isLoad.value = false
      toast.add({ severity: 'error', summary: 'error', detail: 'Failed Delete User', life: 2000 })
    }
  }
)
const handleDelete = (ID) => {
  idEdit.value = ID
  confirm.require({
    message: 'Do you want to delete User with Id ' + ID + '?',
    header: 'Delete Confirmation',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    accept: () => {
      isLoad.value = true
      setTimeout(() => {
        deleteItemMutation.mutate()
      }, 500)
    },
    reject: () => {
      idEdit.value = null
      return true
    }
  })
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
            <p-tab-view :activeIndex="activeTabs" @update:activeIndex="onTabChange">
              <p-tab-panel v-for="(tab, i) in tabs" :key="i">
                <template #header>
                  <div class="tw-text-[20px] bold">{{ tab.title }}</div>
                </template>
              </p-tab-panel>
            </p-tab-view>
          </div>
          <div class="tw-col-span-2">
            <p-button class="tw-w-full tw-h-[46px] tw-justify-center" @click="createDialog = true">
              Create User
            </p-button>
          </div>
        </div>
      </div>
      <div class="tw-col-span-12">
        <div v-if="activeTabs === 0">
          <div class="grid-12 tw-gap-6">
            <div
              class="tw-col-span-3"
              v-for="user in data.pages.flatMap((page) => page.data)"
              :key="user.id"
            >
              <CardUser
                :id="user.id"
                :avatar="user.avatar"
                :fullname="`${user.first_name} ${user.last_name}`"
                :email="user.email"
                @submitDetail="handleDetail"
                @submitEdit="handleEdit"
                @submitDelete="handleDelete"
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
        <div v-else>
          <TableUser
            :users="data.pages.flatMap((page) => page.data)"
            @submitDetail="handleDetail"
            @submitEdit="handleEdit"
            @submitDelete="handleDelete"
          />
          <br />
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

    <!-- init toast -->
    <p-toast></p-toast>
    <!-- init confirm dialog -->
    <p-confirm-dialog></p-confirm-dialog>
    <!-- init loading overlay -->
    <LoadingOverlay :loading="isLoad"></LoadingOverlay>
    <!-- Create User -->
    <CreateUser
      v-show="createDialog"
      v-model="createDialog"
      @toggleToast="showToast"
      @toggleLoading="isLoad = !isLoad"
    />
    <!-- Detail User -->
    <DetailUser
      v-if="detailDialog"
      v-model="detailDialog"
      :id="idEdit"
      @removeID="idEdit = null"
      @toggleLoading="isLoad = false"
    />
    <!-- Edit User -->
    <EditUser
      v-if="idUpdate"
      v-model="editDialog"
      :id="idUpdate"
      @toggleToast="showToast"
      @removeID="idUpdate = null"
      @toggleLoading="isLoad = !isLoad"
    />
  </div>
</template>

<style lang="css" scoped>
:deep(.p-tabview .p-tabview-panels) {
  display: none;
}
:deep(.p-tabview .p-tabview-nav) {
  border: none;
}
</style>
