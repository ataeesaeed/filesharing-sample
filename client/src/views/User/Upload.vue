<template>
  <form class="upload" @submit.prevent="onSubmit">
    <div class="upload-selector">
      <input
        ref="fileUploader"
        id="upload-input"
        @change="onChange"
        type="file"
      />
      <label
        for="upload-input"
        :class="
          file ? (fileSizeError || fileTypeError ? 'fail-bg' : 'pass-bg') : ''
        "
      >
        <img :src="upload" alt="choose" />
      </label>
      <div class="upload-info" v-if="file">
        <p>
          File size:
          <b :class="fileSizeError ? 'fail' : 'pass'">{{ getFileSize() }}</b>
        </p>
        <p>
          File Name: <b>{{ file.name }}</b>
        </p>
        <p>
          File Extention:
          <b :class="fileTypeError ? 'fail' : 'pass'">{{ file.type }}</b>
        </p>
      </div>
    </div>
    <div v-if="file" class="submit">
      <input
        class="btn btn-primary"
        type="submit"
        value="Submit"
        :disabled="fileTypeError || fileSizeError || !file"
      />
    </div>
  </form>
</template>

<script>
import upload from "@/assets/images/upload.svg";
import { getFileSize } from "@/_helpers/common";
export default {
  data() {
    return {
      upload,
      tenMb: 10 * 1024 * 1024,
      file: null,
      fileTypeError: false,
      fileSizeError: false,
    };
  },
  methods: {
    resetValues() {
      this.file = null;
      this.fileTypeError = false;
      this.fileSizeError = false;
      this.$refs.fileUploader.value = "";
    },
    onChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.getFileSize();
      this.checkFileType();
    },
    getFileSize() {
      if (!this.file) return;
      let number = this.file.size || 0;
      if (number > this.tenMb) this.fileSizeError = true;
      return getFileSize(number);
    },
    checkFileType() {
      if (!this.file) return;
      const fileTypes = [
        "text/vnd.trolltech.linguist",
        "text/javascript",
        "image/bmp",
        "application/x-ms-dos-executable",
      ];
      let isFileBanned = fileTypes.includes(this.file.type);
      if (isFileBanned) this.fileTypeError = true;
    },
    onSubmit() {
      let self = this;
      if (self.fileSizeError || self.fileTypeError || !self.file) return;
      this.$emit("set-loading");
      fetch("api/files/upload", {
        method: "post",
        body: { file: this.file },
        "Content-Type": "multipart/form-data",
      })
        .then(() => {
          self.resetValues();
          this.$emit("unset-loading");
          this.$snotify.success("File successfully uploaded");
        })
        .catch((error) => {
          self.resetValues();
          this.$emit("unset-loading");
          this.$snotify.error(error.message || "Oops! Something went wront");
        });
    },
  },
};
</script>

<style scoped>
.upload {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: url('../../assets/images/folder.svg');
  background-size: 20%;
  background-position: left 10% bottom 10%;
  background-repeat: no-repeat;
  background-color: #d9eef5;
}

.upload .upload-selector {
  margin-top: 1rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload .upload-selector input {
  display: none;
}

.upload .upload-selector .upload-info {
  margin-top: 1rem;
  text-align: left;
}

.upload .upload-selector label {
  background-color: white;
  box-shadow: 0 0.5rem 1rem -0.2rem rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.upload .upload-selector label img {
  width: 50%;
}

.upload .upload-selector .pass-bg {
  background-color: #8ce78c;
}

.upload .upload-selector .fail-bg {
  background-color: #ff3447;
}

.upload .upload-info {
  width: 40%;
}

.upload .submit {
  margin: 1rem 0;
}

.fail {
  color: #ff3447;
}

.pass {
  color: #6aca6a;
}
</style>