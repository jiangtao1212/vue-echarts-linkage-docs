<script setup>
import { defineClientComponent } from 'vitepress'

const ClientComp = defineClientComponent(() => {
  return import('./detail.vue')
})
</script>

<template>
  <ClientComp />
</template>