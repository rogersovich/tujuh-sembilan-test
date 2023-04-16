<script setup>
import { ref } from 'vue'
import { fetchMetalPrices } from '../api/gold/metal'
import { useQuery } from '@tanstack/vue-query'
import VueApexCharts from 'vue3-apexcharts'
import moment from 'moment'

const isLoad = ref(false)
const chartRef = ref(null)

const seriesData = ref([
  {
    name: 'Gold',
    data: []
  },
  {
    name: 'Silver',
    data: []
  },
  {
    name: 'Platinum',
    data: []
  },
  {
    name: 'Palladium',
    data: []
  }
])
const options = ref({
  chart: {
    id: 'realtime',
    height: 500,
    type: 'area',
    foreColor: '#999',
    dropShadow: {
      enabled: true,
      enabledSeries: [0],
      top: -2,
      left: 2,
      blur: 5,
      opacity: 0.06
    },
    zoom: false
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '12px',
      colors: ['#304758']
    }
  },
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  title: {
    text: 'Real time - Metal Price time series chart'
  },
  yaxis: {
    min: 0,
    tickAmount: 4
  },
  xaxis: {
    categories: []
  }
})

// eslint-disable-next-line no-unused-vars
const priceGold = useQuery({
  queryKey: ['gold-prices'],
  queryFn: async () => {
    return await fetchMetalPrices()
  },
  onSuccess: (data) => {
    const filteredItems = data.filter((item, i) => i < 4)

    options.value.xaxis.categories.push(moment().format('YYYY-MM-DD, HH:mm:ss'))

    const seriesLabel = filteredItems.map((metal) => {
      const keyName = Object.keys(metal)[0]
      return parseFloat(metal[keyName])
    })
    for (const [i, series] of seriesLabel.entries()) {
      // generate random number
      const randomNumb = Math.floor(Math.random() * (10 - 1 + 1)) + 1
      // random number * result from metal prices
      const data = Math.floor(series * randomNumb)
      seriesData.value[i].data.push(data)
    }

    isLoad.value = true
  },
  refetchInterval: 1000 * 30 // 30 detik
})
</script>

<template>
  <div>
    <div v-if="!isLoad">loading...</div>
    <VueApexCharts
      v-else
      ref="chartRef"
      :options="options"
      :series="seriesData"
      type="area"
      height="500"
    />
    <br />
    <div class="tw-leading-relaxed tw-text-[18px]">
      <p>Realtime setiap: <b> 30 Detik </b></p>
      <p>
        Chart di atas merupakan <i>Fetch API</i> dari <u>https://api.metals.live/</u>. saya tidak
        bisa menggunakan API
        <u>https://rapidapi.com/ai-box-ai-box-default/api/gold-price-live/</u> yang di tentukan dari
        soal, dikarenakan API tersebut memiliki max 5 pemanggilan setiap hari nya.
      </p>
      <p>
        Jadi ketika masih tahap development saya tidak bisa menggunakannya. Tapi pada dasarnya API
        dari
        <u>https://api.metals.live/</u> juga menampilkan Live Gold Price. Tetapi saya tambahkan
        random number setiap merefetch data Gold Price, karena penaikan atau penurunan harga Emas
        itu relatif terlihat dalam jangka waktu yang lama tidak setiap menit seperti yang saya
        kerjakan di chart ini
      </p>
      <div>
        Jadi saya membuat seolah olah data itu berubah setiap menitnya dengan
        menggabungkan Data Live Gold Prices + Random Number.
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
