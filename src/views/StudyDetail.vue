<template>
  <div v-if="isLoading" class="w-full h-full flex items-center justify-center">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
  <div class="w-full h-full flex flex-col overflow-hidden" v-else>
    <!-- <div
      class="w-full px-3 py-2 flex flex-row justify-between items-center bg-neutral-700 text-white"
    >
      <h1 class="text-xl font-bold">
        <v-btn
          icon
          elevation="0"
          @click="$router.go(-1)"
          color="transparent"
          size="small"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </h1>
    </div> -->
    <div class="w-full h-full overflow-hidden">
      <div
        class="w-full flex flex-row justify-between items-center bg-neutral-700 px-3 py-2"
      >
        <div>
          <v-btn
            icon
            elevation="0"
            @click="goBack()"
            color="transparent"
            size="small"
            class="text-white"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </div>
        <div class="flex gap-1 px-1 py-1 bg-neutral-200 rounded-full">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="rounded-full px-3 py-1 cursor-pointer select-none"
            :class="{
              'bg-white text-black shadow-xl': tab.selected,
              'bg-neutral-200 text-neutral-600': !tab.selected,
            }"
            @click="selectTab(tab)"
            v-wave
          >
            {{ tab.title }}
          </div>
        </div>
        <div class="w-36">
          <v-menu v-if="selectedTab?.title === 'Image'">
            <template v-slot:activator="{ props }">
              <div
                v-bind="props"
                class="px-3 py-2 bg-white rounded-full text-neutral-600 text-sm"
              >
                {{ selectedViewer.name }}
              </div>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in viewerOptions"
                @click="selectViewer(item)"
                :key="index"
                :value="index"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            v-else-if="selectedTab?.title === 'Reading'"
            color="primary"
            @click="saveReading()"
            elevation="0"
            class="w-full"
          >
            Save Reading
          </v-btn>
        </div>
      </div>
      <!-- {{ selectedViewer }} -->
      <!-- <a
        v-if="selectedViewer.url"
        :href="selectedViewer.url"
        target="_blank"
        class="absolute top-0 left-0 w-full h-full"
        rel="noopener noreferrer"
      >
        {{ selectedViewer.name }} Viewer
      </a> -->
      <div class="w-full h-full relative">
        <div class="w-full h-full">
          <iframe
            @load="handleIframeLoad"
            v-if="selectedViewer.url"
            :src="selectedViewer.url"
            class="w-full h-full"
            frameborder="0"
          ></iframe>
        </div>
        <div
          v-if="selectedTab?.title === 'Reading' && study"
          class="w-full h-full bg-white absolute top-0 left-0 z-10 p-4"
        >
          <div class="flex">
            <div class="bg-orange-500 text-white px-4 py-1 text-sm">
              Study ID: {{ study.MainDicomTags.StudyInstanceUID }}
            </div>
          </div>
          <!-- <editor v-model="content" />

          <div class="output-group">
            <label>Content</label>
            <code>{{ content }}</code>
          </div> -->
          <div class="w-full flex flex-row gap-3 overflow-hidden px-5 py-5">
            <div
              class="w-96 h-full bg-white border-[1px] border-neutral-300 overflow-y-auto px-3 py-3"
            >
              <p>
                <strong>Patient ID:</strong>
                {{ study.PatientMainDicomTags.PatientID }}
              </p>
              <p>
                <strong>Patient Name:</strong>
                {{ study.PatientMainDicomTags.PatientName }}
              </p>
              <p>
                <strong>Study Date:</strong> {{ study.MainDicomTags.StudyDate }}
              </p>
              <p>
                <strong>Study Time:</strong> {{ study.MainDicomTags.StudyTime }}
              </p>
              <!-- <p>
                <strong>Study Instance UID:</strong>
                {{ study.MainDicomTags.StudyInstanceUID }}
              </p> -->
              <!-- v-model="readingNotes" -->

              <!-- Add more details as needed -->
            </div>
            <div class="w-full h-full">
              <v-textarea
                height="100%"
                rows="4"
                label="Reading Notes"
                variant="outlined"
                density="compact"
                v-model="content"
              ></v-textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosClient from "@/webClient/API";
import Editor from "@/components/Editor.vue";
export default {
  name: "study-detail",
  components: {
    Editor,
  },
  mounted() {
    this.refresh();
  },
  data() {
    return {
      tabs: [
        {
          title: "Image",
          icon: "mdi-image",
          selected: true,
        },
        {
          title: "Reading",
          icon: "mdi-file-document",
          selected: false,
        },
      ],
      viewerOptions: [
        // Stone Web Viewer, OHIF Viewer, Kitware's VolView, etc.
        {
          name: "Stone Web Viewer",
          url: "http://75.119.148.56:8042/stone-webviewer/index.html?study=STUDY_INSTANCE_UID",
          selected: true,
        },
        {
          name: "OHIF Viewer",
          url: "https://viewer.orthanc-server.com",
          selected: false,
        },
        {
          name: "Kitware's VolView",
          url: "http://75.119.148.56:8042/volview/index.html?names=[archive.zip]&urls=[../studies/STUDY_ID/archive]",
          selected: false,
        },
      ],

      content:
        "<p>A Vue.js wrapper component for Tiptap to use <code>v-model</code>.</p>",

      isLoading: false,
      study: null, // This will hold the study data
    };
  },
  computed: {
    selectedTab() {
      return this.tabs.find((tab) => tab.selected);
    },
    selectedViewer() {
      return this.viewerOptions.find((viewer) => viewer.selected);
    },
  },
  methods: {
    refresh() {
      //http://localhost:3000/notes/orthanc/studies/9fcadbc3-58807fe5-05a2969e-ab4aafaa-af735eaa
      this.isLoading = true;
      this.study = null; // Reset study data before fetching

      let promises = [];

      promises.push(
        axiosClient.axiosClient
          .get("notes/orthanc/studies/" + this.$route.params.id)
          .then((response) => {
            console.log("Study details fetched:", response.data);
            this.study = response.data;
            this.viewerOptions.find(
              (viewer) => viewer.name === "Stone Web Viewer"
            ).url = this.viewerOptions
              .find((viewer) => viewer.name === "Stone Web Viewer")
              .url.replace(
                "STUDY_INSTANCE_UID",
                this.study.MainDicomTags.StudyInstanceUID
              );

            this.viewerOptions.find(
              (viewer) => viewer.name === "OHIF Viewer"
            ).url = this.viewerOptions
              .find((viewer) => viewer.name === "OHIF Viewer")
              .url.replace(
                "STUDY_INSTANCE_UID",
                this.study.MainDicomTags.StudyInstanceUID
              );

            this.viewerOptions.find(
              (viewer) => viewer.name === "Kitware's VolView"
            ).url = this.viewerOptions
              .find((viewer) => viewer.name === "Kitware's VolView")
              .url.replace("STUDY_ID", this.study.ID);

            // this.isLoading = false;
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            console.error("Failed to fetch study details:", error);
            // this.isLoading = false;
            return Promise.reject(error);
          })
      );

      promises.push(
        axiosClient.axiosClient
          .get("notes/studies/" + this.$route.params.id)
          .then((response) => {
            console.log("Study notes fetched:", response.data);
            this.content = response.data.content || "";
            // this.isLoading = false;
            return Promise.resolve(response.data);
          })
          .catch((error) => {
            console.error("Failed to fetch study notes:", error);
            // this.isLoading = false;
            return Promise.reject(error);
          })
      );

      Promise.all(promises)
        .then(() => {
          this.isLoading = false;
          console.log("All data fetched successfully");
        })
        .catch((error) => {
          this.isLoading = false;
          console.error("Error fetching data:", error);
        });
    },
    selectTab(tab) {
      this.tabs.forEach((t) => (t.selected = false));
      tab.selected = true;
    },
    selectViewer(viewer) {
      this.viewerOptions.forEach((v) => (v.selected = false));
      viewer.selected = true;
      console.log("Selected viewer:", viewer);
    },
    goBack() {
      this.$router.push({ name: "home" });
    },
    handleIframeLoad() {
      // Handle any actions after the iframe loads, if necessary
      console.log("Iframe loaded successfully");
    },
    saveReading() {
      this.isSavingReading = true;
      axiosClient.axiosClient
        .post("notes", {
          title: "Reading for " + this.study.MainDicomTags.StudyInstanceUID,
          content: this.content,
          referenceId: this.study.ID,
          metadata: JSON.stringify(this.study),
        })
        .then((response) => {
          console.log("Reading saved successfully:", response.data);
          this.isSavingReading = false;
          // Optionally, you can show a success message or update the UI
        })
        .catch((error) => {
          console.error("Failed to save reading:", error);
          this.isSavingReading = false;
          // Handle error (e.g., show notification)
        });
    },
  },
};
</script>
