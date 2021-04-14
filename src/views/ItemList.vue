<template>
  <div>
    <ul>
      <li v-for="(item, index) in itemsData" :key="index">
        <Item :title="item.title" :desc="item.description" />
      </li>
    </ul>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import is from "@/service/item";
export default {
  components: {
    Item,
  },
  data: () => ({
    itemsData: [],
  }),
  methods: {
    getData: async function () {
      const { code, data } = await is.getAll();
      if (code) this.itemsData = [...data];
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>