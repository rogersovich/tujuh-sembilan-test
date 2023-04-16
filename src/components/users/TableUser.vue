<script setup>
const props = defineProps({
  users: Array
})

const emit = defineEmits(['submitEdit', 'submitDetail', 'submitDelete'])
const onDetail = (ID) => {
  emit('submitDetail', ID)
}
const onEdit = (ID) => {
  emit('submitEdit', ID)
}
const onDelete = (ID) => {
  emit('submitDelete', ID)
}
</script>

<template>
  <div>
    <p-data-table :value="props.users" showGridlines tableStyle="min-width: 50rem">
      <p-column field="id" header="Id" class="center-col body-center-col"> </p-column>
      <p-column field="avatar" header="Avatar" class="center-col">
        <template #body="slotProps">
          <div class="fcc">
            <p-avatar
              :image="slotProps.data.avatar"
              shape="circle"
              class="shadow-rainbow tw-w-[60px] tw-h-[60px]"
            >
            </p-avatar>
          </div>
        </template>
      </p-column>
      <p-column field="fullname" header="Fullname">
        <template #body="slotProps">
          <div class="bold">
            {{ `${slotProps.data.first_name} ${slotProps.data.last_name}` }}
          </div>
        </template>
      </p-column>
      <p-column field="email" header="Email"> </p-column>
      <p-column header="Actions" class="tw-w-[350px]">
        <template #body="slotProps">
          <div class="grid-3 tw-gap-3">
            <PButton
              class="tw-w-full tw-h-[36px] tw-justify-center tw-text-[14px]"
              severity="success"
              @click="onDetail(slotProps.data.id)"
            >
              Detail
            </PButton>
            <PButton
              class="tw-w-full tw-h-[36px] tw-justify-center tw-text-[14px]"
              severity="warning"
              @click="onEdit(slotProps.data.id)"
            >
              Edit
            </PButton>
            <PButton
              class="tw-w-full tw-h-[36px] tw-justify-center tw-text-[14px]"
              severity="danger"
              @click="onDelete(slotProps.data.id)"
            >
              Delete
            </PButton>
          </div>
        </template>
      </p-column>
    </p-data-table>
  </div>
</template>

<style lang="css" scoped>
:deep(.center-col .p-column-header-content) {
  display: flex;
  justify-content: center;
}
:deep(.body-center-col) {
  text-align: center !important;
}
</style>
