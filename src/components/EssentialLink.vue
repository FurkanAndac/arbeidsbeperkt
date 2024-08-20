<!-- src/components/EssentialLink.vue -->
<template>
  <q-item :to="computedLink" exact>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon :name="icon" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
  caption: String,
  icon: String,
  link: [String, Object], // Accept both string and object types for `link`
});

const router = useRouter();

const computedLink = computed(() => {
  // If link starts with '/' it should be treated as a local route
  if (typeof props.link === "string" && props.link.startsWith("/")) {
    return { path: props.link };
  }
  // Otherwise, assume it is an external link
  return props.link;
});
</script>
