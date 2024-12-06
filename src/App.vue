<script setup>
import HelloWorld from './components/HelloWorld.vue'

import { ElMessage } from 'element-plus'
import request from './request.js'



// POST 请求
async function postData(data) {
  try {
    const response = await request.post('/api/tray/api/login', data)
    console.log(response)
    ElMessage({
    message: response.message,
    type: 'success',
  })
  } catch (error) {
    console.error(error)
  }
}
postData({pass:1000})
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>

</style>
