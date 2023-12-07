<template>
  <div>
    <h2>Strona {{ id }}</h2>
    <p v-if="editable" @click="toggleEdit">{{ localContent }}</p>
    <textarea v-else @input="updateLocalContent" :value="localContent"></textarea>
    <button @click="toggleEdit">{{ editable ? 'Edytuj' : 'Zapisz' }}</button>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

const { content, editable } = defineProps(['content', 'editable']);
const emit  = defineEmits();

const id = ref(null);
const localContent = ref(content);

watch(content, (newContent) => {
  localContent.value = newContent;
});

const toggleEdit = () => {
  emit('editPage');
};

const updateLocalContent = (event) => {
  localContent.value = event.target.value;
  emit('updateContent', event.target.value);
};
</script>