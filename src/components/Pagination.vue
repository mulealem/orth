<template>
  <div class="mt-4 flex justify-center gap-2">
    <button
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
      class="px-4 py-2 border rounded disabled:opacity-50"
    >
      Previous
    </button>

    <span class="px-4 py-2">Page {{ currentPage }}</span>

    <button
      :disabled="currentPage >= totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
      class="px-4 py-2 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: ["totalItems", "pageSize", "currentPage"],
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
};
</script>
