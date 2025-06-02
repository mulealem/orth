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
    <v-select
      v-model="query.ModalitiesInStudy"
      :items="modalities"
      item-title="code"
      item-value="code"
      label="Modality"
      variant="outlined"
      density="compact"
      clearable
    />
    <v-btn
      color="primary"
      type="submit"
      class="col-span-full bg-blue-500 text-white px-4 py-2 rounded"
    >
      Search
    </v-btn>
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
      modalities: [
        { code: "CR", name: "Computed Radiography" },
        { code: "CT", name: "Computed Tomography" },
        { code: "MR", name: "Magnetic Resonance" },
        { code: "US", name: "Ultrasound" },
        { code: "XA", name: "X-Ray Angiography" },
        { code: "RF", name: "Radio Fluoroscopy" },
        { code: "NM", name: "Nuclear Medicine" },
        { code: "MG", name: "Mammography" },
        { code: "DX", name: "Digital Radiography" },
        { code: "PT", name: "Positron Emission Tomography" },
        { code: "SC", name: "Secondary Capture" },
        { code: "ES", name: "Endoscopy" },
        { code: "XC", name: "External Camera Photography" },
        { code: "IO", name: "Intra-Oral Radiography" },
        { code: "OP", name: "Ophthalmic Photography" },
        { code: "OT", name: "Other" },
        {
          code: "RG",
          name: "Radiographic Imaging (conventional film/screen)",
        },
        { code: "SM", name: "Slide Microscopy" },
        { code: "VL", name: "Visible Light Photography" },
      ],
    };
  },
  methods: {
    submit() {
      console.log("Search query:", this.query);
      this.$emit("search", {
        PatientName: this.query.PatientName,
        PatientID: this.query.PatientID,
        StudyDate: this.query.StudyDate,
        ModalitiesInStudy: this.query.ModalitiesInStudy
          ? this.query.ModalitiesInStudy
          : "",
      });
    },
  },
};
</script>
