<template>
  <div class="w-full h-full bg-neutral-100">
    <div
      class="w-full px-3 py-4 flex flex-row justify-between items-center bg-neutral-700 text-white"
    >
      <h1 class="text-xl font-bold">Orthanc Study Viewer</h1>
    </div>
    <StudyFilter @search="fetchStudies" />
    <StudyTable :studies="paginatedStudies" />
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
      axiosClient.axiosClient
        .post("notes/orthanc/search", filters || {})
        .then((response) => {
          this.filteredStudies = response.data;
          this.currentPage = 1;
        })
        .catch((error) => {
          console.error("Failed to fetch studies:", error);
        });
    },
  },
};
</script>
