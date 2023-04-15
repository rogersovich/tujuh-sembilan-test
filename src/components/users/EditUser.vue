<script setup>
import { reactive, toRef } from 'vue'
import { object, string } from 'yup'
import { Field, Form } from 'vee-validate'
// api
import { updateUsers, fetchUser } from '../../api/reqres/users'
import { useMutation, useQuery } from '@tanstack/vue-query'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  id: {
    type: Number
  }
})
const visible = toRef(props, 'modelValue')
const emit = defineEmits(['update:modelValue', 'toggleToast', 'toggleLoading', 'removeID'])

// init form
const initData = reactive({
  name: '',
  email: ''
})

// update value visible
const updateValue = (value) => {
  emit('update:modelValue', value)
  emit('removeID')
}

// fetch api detail user
const { isLoading, isSuccess, isError, error } = useQuery({
  queryKey: ['user'],
  queryFn: async () => {
    return await fetchUser(props.id)
  },
  enabled: props.id !== null,
  onSuccess: (data) => {
    initData.name = `${data.data.first_name} ${data.data.last_name}`
    initData.email = data.data.email
    emit('toggleLoading')
  }
})

// Mutate update user
const mutationUpdate = useMutation({
  mutationFn: (formData) => {
    emit('update:modelValue', false)
    emit('toggleLoading')
    return updateUsers({ id: props.id, data: formData })
  },
  onSuccess: () => {
    emit('toggleLoading')
    emit('removeID')
    emit('toggleToast', {
      type: 'success',
      message: 'Success Update User'
    })
  },
  onError: () => {
    emit('toggleLoading')
    emit('removeID')
    emit('toggleToast', {
      type: 'error',
      message: 'Failed Update User'
    })
  }
})

// schema validation update user
const schema = object({
  name: string().required(),
  email: string().required()
})

// handle update
const onSubmit = (values, actions) => {
  mutationUpdate.mutate(values)
  actions.resetForm()
}
</script>

<template>
  <div>
    <p-dialog
      modal
      header="Create User"
      :visible="visible"
      :dismissable-mask="true"
      :draggable="false"
      :style="{ width: '35vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
      @update:visible="updateValue"
    >
      <div v-if="isLoading">loading....</div>
      <span v-else-if="isError">Error: {{ error.message }}</span>
      <div v-else-if="isSuccess">
        <Form :initial-values="initData" :validation-schema="schema" @submit="onSubmit">
          <Field name="name" v-model="initData.name" v-slot="{ field, errorMessage }">
            <div class="tw-flex tw-flex-col tw-gap-2 tw-mb-6">
              <label for="name" class="tw-text-[14px]">Your Name</label>
              <p-input-text
                id="name"
                name="name"
                placeholder="Input Name"
                class="tw-w-full"
                v-bind="field"
                :class="{ 'p-invalid': errorMessage }"
              ></p-input-text>
              <small id="name-help" class="p-error">{{ errorMessage }}</small>
            </div>
          </Field>
          <Field name="email" v-model="initData.email" v-slot="{ field, errorMessage }">
            <div class="tw-flex tw-flex-col tw-gap-2 tw-mb-6">
              <label for="email" class="tw-text-[14px]">Your email</label>
              <p-input-text
                id="email"
                name="email"
                placeholder="Input email"
                class="tw-w-full"
                v-bind="field"
                :class="{ 'p-invalid': errorMessage }"
              ></p-input-text>
              <small id="email-help" class="p-error">{{ errorMessage }}</small>
            </div>
          </Field>
          <div>
            <p-button type="submit" class="tw-w-full tw-justify-center"> Update User </p-button>
          </div>
        </Form>
      </div>
    </p-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
