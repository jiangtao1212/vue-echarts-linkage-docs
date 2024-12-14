<script setup>
import { defineClientComponent } from 'vitepress'

const ClientComp = defineClientComponent(() => {
  return import('./demo1.vue')
})
</script>

<template>
  <ClientComp />
</template>