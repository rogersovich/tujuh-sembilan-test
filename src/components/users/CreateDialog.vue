<script setup>
import { toRef } from 'vue'
import { object, string } from 'yup'
import { Field, Form } from 'vee-validate'
import { createUsers } from '../../api/reqres/users'
import { useMutation } from '@tanstack/vue-query'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:modelValue', 'toggleToast'])

// Mutation
const mutationCreate = useMutation({
  mutationFn: (formData) => {
    emit('update:modelValue', false)
    return createUsers(formData)
  },
  onSuccess: () => {
    emit('toggleToast', {
      type: 'success',
      message: 'Success Create User'
    })
  },
  onError: () => {
    emit('toggleToast', {
      type: 'error',
      message: 'Failed Create User'
    })
  }
})

const visible = toRef(props, 'modelValue')
const initData = {
  name: '',
  job: ''
}

const schema = object({
  name: string().required(),
  job: string().required()
})

const onSubmit = (values, actions) => {
  mutationCreate.mutate(values)
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
      @update:visible="emit('update:modelValue', $event)"
    >
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
        <Field name="job" v-model="initData.job" v-slot="{ field, errorMessage }">
          <div class="tw-flex tw-flex-col tw-gap-2 tw-mb-6">
            <label for="job" class="tw-text-[14px]">Your Job</label>
            <p-input-text
              id="job"
              name="job"
              placeholder="Input Job"
              class="tw-w-full"
              v-bind="field"
              :class="{ 'p-invalid': errorMessage }"
            ></p-input-text>
            <small id="job-help" class="p-error">{{ errorMessage }}</small>
          </div>
        </Field>
        <div>
          <p-button type="submit" class="tw-w-full tw-justify-center"> Submit User </p-button>
        </div>
      </Form>
    </p-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
