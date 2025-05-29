<template>
  <div class="bg-white">
    <table class="w-full">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="px-3 py-2 border-r-[1px] border-neutral-300">Preview</th>
          <th class="px-3 py-2 border-r-[1px] border-neutral-300">
            Patient ID
          </th>
          <th class="px-3 py-2 border-r-[1px] border-neutral-300">
            Patient Name
          </th>
          <th class="px-3 py-2 border-r-[1px] border-neutral-300">
            Study Date
          </th>
          <th class="px-3 py-2 border-r-[1px] border-neutral-300">
            Study Time
          </th>
          <th class="px-3 py-2 border-r-[1px] border-neutral-300">
            Study Instance UID
          </th>
          <th class="px-3 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="study in studies"
          :key="study.ID"
          class="border-b-[1px] border-neutral-300"
        >
          <td class="px-3 py-2 border-r-[1px] border-neutral-300">
            <img :src="study.previewUrls?.[0]" class="h-16" />
          </td>
          <td class="px-3 py-2 border-r-[1px] border-neutral-300">
            {{ study.PatientMainDicomTags.PatientID }}
          </td>
          <td class="px-3 py-2 border-r-[1px] border-neutral-300">
            {{ study.PatientMainDicomTags.PatientName }}
          </td>
          <td class="px-3 py-2 border-r-[1px] border-neutral-300">
            {{ study.MainDicomTags.StudyDate }}
          </td>
          <td class="px-3 py-2 border-r-[1px] border-neutral-300">
            {{ study.MainDicomTags.StudyTime }}
          </td>
          <td class="px-3 py-2 border-r-[1px] border-neutral-300 text-ellipsis">
            <div class="max-w-36 text-ellipsis overflow-hidden">
              {{ study.MainDicomTags.StudyInstanceUID }}
            </div>
          </td>
          <td class="px-3 py-2">
            <v-btn
              elevation="0"
              class="text-blue-500 hover:underline"
              @click="showDetails(study)"
              size="small"
            >
              View Details
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["studies"],
  name: "study-table",
  data() {
    return {};
  },
  mounted() {
    // Any initialization logic can go here
  },
  methods: {
    showDetails(study) {
      // Logic to show study details can be implemented here
      this.$router.push({ name: "study-details", params: { id: study.ID } });
    },
  },
};
</script>
