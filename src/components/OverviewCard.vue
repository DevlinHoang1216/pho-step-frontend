<template>
  <div class="col-12 col-sm-6 col-lg-3">
    <div class="overview-card">
      <h5 class="card-subtitle">{{ title }}</h5>
      <h3 class="card-title">{{ amount }}</h3>
      <div class="icons">
        <span class="icon trend-up">+{{ trends.up }}</span>
        <span class="icon trend-down">-{{ trends.down }}</span>
        <span class="icon trend-neutral">+{{ trends.neutral }}</span>
        <span class="icon trend-down">-{{ trends.zero }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  amount: String,
  trends: Object,
});
</script>