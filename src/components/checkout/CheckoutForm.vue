<script setup lang="js">
import { useStore } from 'vuex'
import InputBase from '@/components/forms/InputBase.vue'
import FieldWrapper from '@/components/forms/FieldWrapper.vue'
import CheckoutItems from '@/components/checkout/CheckoutItems.vue'
import CheckoutConfirmed from '@/components/checkout/CheckoutConfirmed.vue'
import ModalConfirm from '@/components/ui/ModalConfirm.vue'
import * as yup from 'yup'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { validateCpf, validateName } from '@/utils/validators'
import { computed, ref } from 'vue'

yup.addMethod(yup.string, 'cpf', function (message = 'CPF inválido') {
  return this.test('cpf', message, function (value) {
    if (!value) return true
    return validateCpf(value)
  })
})

yup.addMethod(yup.string, 'fullName', function (message = 'Digite seu nome completo') {
  return this.test('fullName', message, function (value) {
    if (!value) return true
    return validateName(value)
  })
})

const schema = yup.object({
  name: yup.string().fullName().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  cpf: yup.string().cpf().length(11, 'CPF inválido').required('Campo obrigatório'),
  phone: yup.string().length(11, 'Celular inválido').required('Campo obrigatório'),
  cep: yup.string().length(8, 'CEP inválido').required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),
})

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    city: '',
    state: '',
  },
})
const isValid = useIsFormValid()

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: cpf } = useField('cpf')
const { value: phone } = useField('phone')
const { value: cep } = useField('cep')
const { value: address } = useField('address')
const { value: city } = useField('city')
const { value: state } = useField('state')

const store = useStore()
const address_data = computed(() => store.getters['zipCode/address'])
const confirmedCheckout = ref(false)
const isModalConfirmOpen = ref(false)

async function handleGetAddress() {
  if (errors.value.cep) return
  await store.dispatch('zipCode/fetchAddress', cep.value)
  address.value = address_data.value.logradouro
  city.value = address_data.value.localidade
  state.value = address_data.value.estado
}

function handleClearCart() {
  store.dispatch('cart/clearCart', cep.value)
}

function handleOpenModalConfirm() {
  isModalConfirmOpen.value = true
}

const onSubmit = handleSubmit(async (values) => {
  isModalConfirmOpen.value = false
  console.log(values)
  confirmedCheckout.value = true
})
</script>

<template>
  <div class="space-y-5 sm:space-y-10">
    <h3 class="text-3xl font-semibold">Finalizar Compra</h3>

    <form @submit.prevent="handleOpenModalConfirm">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20">
        <div class="space-y-4">
          <FieldWrapper id="name" label="Nome completo *" :error="errors.name">
            <InputBase
              v-model="name"
              name="name"
              placeholder="Nome completo"
              :has-error="!!errors.name"
              required
            />
          </FieldWrapper>
          <div class="grid grid-cols-2 gap-4">
            <FieldWrapper id="cpf" label="CPF *" :error="errors.cpf">
              <InputBase
                v-model="cpf"
                name="cpf"
                placeholder="CPF"
                mask="###.###.###-##"
                :has-error="!!errors.cpf"
                required
              />
            </FieldWrapper>
            <FieldWrapper id="phone" label="Celular *" :error="errors.phone">
              <InputBase
                v-model="phone"
                name="phone"
                placeholder="Celular"
                mask="(##) #####-####"
                :has-error="!!errors.phone"
                required
              />
            </FieldWrapper>
          </div>
          <FieldWrapper id="email" label="E-mail *" :error="errors.email">
            <InputBase
              v-model="email"
              type="email"
              name="email"
              placeholder="Email"
              :has-error="!!errors.email"
              required
            />
          </FieldWrapper>
          <div class="grid grid-cols-1 sm:grid-cols-[30%_auto] gap-4">
            <FieldWrapper id="cep" label="CEP *" :error="errors.cep">
              <InputBase
                v-model="cep"
                name="cep"
                placeholder="CEP"
                mask="#####-###"
                :has-error="!!errors.cep"
                required
                @blur="handleGetAddress"
              />
            </FieldWrapper>
            <FieldWrapper id="address" label="Endereço *" :error="errors.address">
              <InputBase
                v-model="address"
                name="address"
                placeholder="Endereço"
                :has-error="!!errors.address"
                required
              />
            </FieldWrapper>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldWrapper id="city" label="Cidade *" :error="errors.city">
              <InputBase
                v-model="city"
                name="city"
                placeholder="Cidade"
                :has-error="!!errors.city"
                required
              />
            </FieldWrapper>
            <FieldWrapper id="state" label="Estado *" :error="errors.state">
              <InputBase
                v-model="state"
                name="state"
                placeholder="Estado"
                :has-error="!!errors.state"
                required
              />
            </FieldWrapper>
          </div>
        </div>

        <div>
          <div
            class="grid grid-cols-[60px_auto_100px] items-center gap-2 text-sm text-neutral-400"
          >
            <p>Imagem</p>
            <p class="flex-1">Título</p>
            <p>Preço</p>
          </div>
          <CheckoutItems :form-is-valid="isValid" />
        </div>
      </div>
    </form>

    <CheckoutConfirmed
      v-model="confirmedCheckout"
      :client-name="name"
      @close="handleClearCart"
    />

    <ModalConfirm
      v-model="isModalConfirmOpen"
      @confirm="onSubmit"
      @cancel="isModalConfirmOpen = false"
    />
  </div>
</template>
