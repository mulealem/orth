<template>
  <div class="w-full h-full bg-neutral-100">
    <div
      class="w-full px-3 py-4 flex flex-row justify-between items-center bg-neutral-700 text-white"
    >
      <h1 class="text-xl font-bold">Orthanc Study Viewer</h1>
    </div>
    <StudyFilter @search="fetchStudies" />
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <StudyTable :studies="paginatedStudies" v-else />
    <Pagination
      :total-items="filteredStudies.length"
      :page-size="pageSize"
      :current-page.sync="currentPage"
    />
  </div>
</template>

<script>
import axios from "axios";
import StudyFilter from "@/components/StudyFilter.vue";
import StudyTable from "@/components/StudyTable.vue";
import Pagination from "@/components/Pagination.vue";

import axiosClient from "@/webClient/API"; // Adjust the import path as necessary

export default {
  components: {
    StudyFilter,
    StudyTable,
    Pagination,
  },
  mounted() {
    // Fetch initial studies on mount
    this.fetchStudies();
  },
  data() {
    return {
      filteredStudies: [],
      currentPage: 1,
      pageSize: 10,
      isLoading: true,
    };
  },
  computed: {
    paginatedStudies() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredStudies.slice(start, start + this.pageSize);
    },
  },
  methods: {
    fetchStudies(filters) {
      this.isLoading = true;
      axiosClient.axiosClient
        .post("notes/orthanc/search", filters || {})
        .then((response) => {
          this.filteredStudies = response.data;
          this.currentPage = 1;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Failed to fetch studies:", error);
          this.isLoading = false;
        });
    },
  },
};
</script>
