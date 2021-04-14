<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ desc }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "desc"],
};
</script>

<style>
</style>