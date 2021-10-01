<template>
  <div class="file" v-if="file">
    <div class="file-preview">
      <p>You can download the file with this button</p>
      <img @click="downloadFile" :src="downloadImage" alt="file" />
    </div>
    <div class="file-details">
      <ul>
        <li><h3>File Information</h3></li>
        <li>
          <p>
            File Name:
            <br /><b>{{ file.name }}</b>
          </p>
        </li>
        <li>
          <p>
            Upload Date:
            <br /><b>{{
              file.createdAt
                ? new Date(file.createdAt).toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10)
            }}</b>
          </p>
        </li>
        <li>
          <p>
            File Size:
            <br /><b>{{ getFileSize(file.size) }}</b>
          </p>
        </li>
        <li>
          <p>
            File Extention:
            <br /><b>{{ file.type }}</b>
          </p>
        </li>
        <li>
          <p>
            Downloads:
            <br /><b>{{ file.downloads }}</b>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import downloadImage from "@/assets/images/download.svg";
import { getFileSize } from "@/_helpers/common";
export default {
  data() {
    return { downloadImage, file: null, getFileSize };
  },
  methods: {
    downloadFile() {
      let self = this;
      self.$emit("set-loading");
      fetch(`api/files/${this.$route.params.id}/download`, {
        download: true,
      })
        .then((blob) => {
          return new File([blob], self.file.name, {
            type: self.file.type,
            size: self.file.size,
            lastModified: new Date(),
          });
        })
        .then((file) => {
          this.$emit("unset-loading");
          self.writeFile(file);
          self.file.downloads++;
        })
        .catch((error) => {
          this.$snotify.error(error.message || "Oops! Something went wrong");
          this.$emit("unset-loading");
        });
    },
    writeFile(file) {
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = this.file.name;
      a.href = window.URL.createObjectURL(file);
      a.dataset.downloadurl = [this.file.type, a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
  },
  created() {
    if (!this.$route.params.id) {
      this.$router.push("/dashboard");
    } else {
      this.$emit("set-loading");
      fetch(`api/files/${this.$route.params.id}`)
        .then((selectedFile) => {
          this.file = selectedFile;
          this.$emit("unset-loading");
        })
        .catch((error) => {
          this.$emit("unset-loading");
          this.$snotify.error(error.message || "Oops! Something went wrong");
        });
    }
  },
};
</script>

<style>
.file {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 4fr 2fr;
  background-color: #d9eef5;
  color: #4e5f4f;
}

.file .file-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 2rem 1rem;
}

.file .file-preview p {
  padding: 1rem;
  font-weight: bold;
}

.file .file-preview img {
  width: 50%;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.5s ease-in-out;
}

.file .file-preview img:hover {
  transform: scale(1.08);
}

.file .file-details {
  display: flex;
  justify-content: center;
  background-color: white;
  opacity: 0.9;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem;
  box-shadow: 0 0.5rem 1rem -0.2rem rgba(0, 0, 0, 0.3);
}

.file .file-details ul {
  height: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  text-align: left;
}
.file .file-details ul li {
  margin: 0.2rem 0;
}

.file .file-details ul li p {
  margin: 0.2rem 0;
}

.file .file-details ul li:first-of-type {
  text-align: center;
}

.file .file-details ul li:first-of-type::after {
  content: "";
  border-bottom: 1px solid black;
  width: 20%;
  position: absolute;
  height: 2px;
  transform: translateX(-50%);
}
</style>