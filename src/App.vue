<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import axios from "axios";
import StudyFilter from "./components/StudyFilter.vue";
import StudyTable from "./components/StudyTable.vue";
import Pagination from "./components/Pagination.vue";

export default {
  components: {
    StudyFilter,
    StudyTable,
    Pagination,
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
      axios
        .post("http://localhost:3000/notes/orthanc/search", filters || {}, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVtb0BleGFtcGxlLmNvbSIsImlhdCI6MTc0ODQzMzg2NiwiZXhwIjoxNzQ4NDM3NDY2fQ.chG2e3KUR8P_2anpWH5jJ32P9Uu2QXahtAAD46sfBSw`,
          },
        })
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
