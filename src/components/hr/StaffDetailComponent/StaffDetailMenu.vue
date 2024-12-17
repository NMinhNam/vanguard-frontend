<template>
  <ul class="nav nav-tabs mt-4">
    <li class="nav-item">
      <a
        class="nav-link"
        href="#"
        @click.prevent="$emit('setActiveTab', 'resume')"
        :class="{ active: activeTab === 'resume' }"
        >Resume
      </a>
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        aria-current="page"
        href="#"
        @click.prevent="$emit('setActiveTab', 'contract')"
        :class="{ active: activeTab === 'contract' }"
        >Contract</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        aria-current="page"
        href="#"
        @click.prevent="$emit('setActiveTab', 'infomation')"
        :class="{ active: activeTab === 'infomation' }"
        >Private Information</a
      >
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  activeTab: String,
});
</script>