<script setup>
const props = defineProps({
  id: Number,
  avatar: String,
  fullname: String,
  email: String
})

const emit = defineEmits(['submitEdit', 'submitDetail'])
const onDetail = () => {
  emit('submitDetail', props.id)
}
</script>

<template>
  <div class="tw-bg-white tw-px-4 tw-py-6 tw-rounded-lg shadow-sketch-line">
    <div class="fcc tw-my-2.5">
      <p-avatar
        :image="props.avatar"
        shape="circle"
        class="shadow-rainbow tw-w-[110px] tw-h-[110px]"
      >
      </p-avatar>
    </div>
    <div class="tw-text-center tw-pt-3">
      <div class="bold tw-text-[20px]">
        {{ props.fullname }}
      </div>
      <div class="tw-text-[#0079D8]">{{ props.email }}</div>
      <div class="tw-mt-2 grid-3 tw-gap-3">
        <PButton
          class="tw-w-full tw-h-[36px] tw-justify-center tw-text-[14px]"
          severity="success"
          @click="onDetail"
        >
          Detail
        </PButton>
        <PButton
          class="tw-w-full tw-h-[36px] tw-justify-center tw-text-[14px]"
          severity="warning"
        >
          Edit
        </PButton>
        <PButton class="tw-w-full tw-h-[36px] tw-justify-center tw-text-[14px]" severity="danger">
          Delete
        </PButton>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
