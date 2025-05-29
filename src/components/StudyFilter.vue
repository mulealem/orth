<template>
  <form
    class="flex flex-wrap gap-4 px-3 py-3 border-b-[1px] border-neutral-300"
    @submit.prevent="submit"
  >
    <!-- <input
      v-model="query.PatientName"
      placeholder="Patient Name"
      class="p-2 border rounded"
    /> -->
    <v-text-field
      v-model="query.PatientName"
      label="Patient Name"
      class=""
      variant="outlined"
      density="compact"
    />
    <v-text-field
      v-model="query.PatientID"
      label="Patient ID"
      class=""
      variant="outlined"
      density="compact"
    />
    <v-text-field
      v-model="query.StudyDate"
      label="Study Date (YYYYMMDD)"
      class=""
      type="date"
      variant="outlined"
      density="compact"
    />
    <v-text-field
      v-model="query.ModalitiesInStudy"
      label="Modality (CT, MR, etc.)"
      class=""
      variant="outlined"
      density="compact"
    />
    <button
      type="submit"
      class="col-span-full bg-blue-500 text-white px-4 py-2 rounded"
    >
      Search
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      query: {
        PatientName: "",
        PatientID: "",
        StudyDate: "",
        ModalitiesInStudy: "",
      },
    };
  },
  methods: {
    submit() {
      this.$emit("search", this.query);
    },
  },
};
</script>
