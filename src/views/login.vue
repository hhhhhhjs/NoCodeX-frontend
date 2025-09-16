<script setup lang="ts">
import BasicLayout from '@/components/layout/BasicLayout.vue'
import axios from '@/api/axios';

axios.get('/api/health/').then((res) => {
    console.log('第一个请求', res)
})
</script>

<template>
  <BasicLayout />
</template>

<style>
</style>
