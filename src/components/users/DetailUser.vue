<script setup>
import { toRef } from 'vue'
import { fetchUser } from '../../api/reqres/users'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number
  }
})

const emit = defineEmits(['update:modelValue', 'removeID', 'toggleLoading'])

const visible = toRef(props, 'modelValue')

const { data, isLoading, isSuccess, isError, error } = useQuery({
  queryKey: ['user'],
  queryFn: async () => {
    return await fetchUser(props.id)
  },
  enabled: props.id !== null,
  onSuccess: () => {
    emit('removeID')
    emit('toggleLoading')
  }
})
</script>

<template>
  <p-dialog
    v-if="visible"
    modal
    header="Detail User"
    :visible="visible"
    :dismissable-mask="true"
    :draggable="false"
    :style="{ width: '35vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    @update:visible="emit('update:modelValue', $event)"
  >
    <div v-if="isLoading">loading....</div>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <div v-else-if="isSuccess">
      <div class="tw-flex tw-flex-row tw-gap-12 tw-py-4">
        <div class="tw-pl-4">
          <p-avatar
            :image="data.data.avatar"
            shape="circle"
            class="shadow-rainbow tw-w-[100px] tw-h-[100px]"
          >
          </p-avatar>
        </div>
        <div>
          <div>
            <div class="tw-text-[14px]">Fullname:</div>
            <div class="bold tw-text-[20px]">
              {{ `${data.data.first_name} ${data.data.last_name}` }}
            </div>
          </div>

          <div class="tw-mt-4">
            <div class="tw-text-[14px]">Email:</div>
            <div class="tw-text-[#0079D8]">{{ data.data.email }}</div>
          </div>
        </div>
      </div>
    </div>
  </p-dialog>
</template>

<style lang="scss" scoped></style>
