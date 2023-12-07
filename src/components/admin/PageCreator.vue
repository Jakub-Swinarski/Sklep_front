<template>
  <div>
    <button @click="createNewPage">Utwórz nową stronę</button>
    <div v-for="(page, index) in pages" :key="index">
      <Page :content="page.content" :editable="page.editable" @editPage="editPage(index)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pages = ref([]);
let nextPageId = 1;

const createNewPage = () => {
  const newPage = {
    id: nextPageId++,
    content: `Zawartość strony ${nextPageId}`,
    editable: true,
  };
  pages.value.push(newPage);
};

const editPage = (pageIndex) => {
  pages.value[pageIndex].editable = !pages.value[pageIndex].editable;
};
</script>

<script>
import Page from "@/components/admin/Page.vue";

export default {
  components: {
    Page,
  },
};
</script>