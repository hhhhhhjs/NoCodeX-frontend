<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { useLoginUserStore } from '@/store/loginUser'

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
</script>
