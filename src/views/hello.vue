<template>
<div @click="toSecond">
    第一个页面
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const toSecond = () => {
    router.push('/second')
}

</script>