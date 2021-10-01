<template>
  <div class="manage">
    <RemoveDialog
      :dialog="removeFileData.dialog"
      :message="removeFileData.removeMessage"
      :onAccept="removeFile"
      :onCancel="hideRemoveDialog"
    />
    <div class="cards">
      <div class="card" v-for="file in pagination.filesToShow" :key="file.id">
        <FileCard
          @show-file="filePage"
          @delete="onDeleteFileClicked"
          :file="file"
        />
      </div>
    </div>
    <div class="pagination">
      <v-pagination
        v-if="pagination.pagesNumber > 1"
        v-model="pagination.page"
        class="my-4"
        :length="pagination.pagesNumber"
        @input="onInput"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import FileCard from "@/components/FileCard.vue";
import RemoveDialog from "@/components/RemoveDialog";
export default {
  components: { FileCard, RemoveDialog },
  data() {
    return {
      files: [],
      pagination: {
        filesToShow: [],
        page: 1,
        currentPage: 1,
        pagesNumber: 1,
        itemsPerPage: 8,
      },
      removeFileData: {
        dialog: false,
        selectedFileToRemove: null,
        removeMessage:
          "You are going to remove the file permanently, Are you sure?",
      },
    };
  },
  methods: {
    filePage(id) {
      this.$router.push(`file/${id}`);
    },
    onDeleteFileClicked(fileId) {
      this.removeFileData.selectedFileToRemove = fileId;
      this.removeFileData.dialog = true;
    },
    hideRemoveDialog() {
      this.removeFileData.dialog = false;
      this.removeFileData.selectedFileToRemove = null;
    },
    removeFile() {
      let self = this;
      this.$emit("set-loading");
      fetch(`api/files/${this.removeFileData.selectedFileToRemove}`, {
        method: "delete",
      })
        .then(() => {
          self.files.splice(
            self.files.findIndex(
              ({ id }) => id === self.removeFileData.selectedFileToRemove
            ),
            1
          );
          self.hideRemoveDialog();
          self.calculatePagesNumber();
          self.paginate();
          self.$emit("unset-loading");
          self.$snotify.warning("File permenently removed :(");
        })
        .catch((error) => {
          self.hideRemoveDialog();
          self.$emit("unset-loading");
          self.$snotify.error(error.message || "Oops! Something went wrong");
        });
    },
    calculatePagesNumber() {
      if (this.files.length <= this.pagination.itemsPerPage) {
        this.pagination.pagesNumber = 1;
      } else if (!(this.files.length % this.pagination.itemsPerPage)) {
        this.pagination.pagesNumber = Math.floor(
          this.files.length / this.pagination.itemsPerPage
        );
      } else {
        this.pagination.pagesNumber =
          Math.floor(this.files.length / this.pagination.itemsPerPage) + 1;
      }
      if (this.pagination.pagesNumber < this.pagination.page) {
        this.pagination.page = this.pagination.pagesNumber;
        this.pagination.currentPage = this.pagination.pagesNumber;
      }
    },
    paginate() {
      let filesToShow = [];
      let start =
        (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
      let end = this.pagination.currentPage * this.pagination.itemsPerPage;
      for (let i = start; i < end; i++) {
        if (i >= this.files.length) break;
        filesToShow.push({ ...this.files[i] });
      }
      this.pagination.filesToShow = filesToShow;
    },
    onInput(page) {
      if (!page) return;
      if (page > this.pagination.pagesNumber || page < 1) return;
      if (page === this.pagination.currentPage) return;
      this.pagination.currentPage = page;
      this.paginate();
    },
  },
  created() {
    let self = this;
    self.$emit("set-loading");
    fetch("api/files", {})
      .then((files) => {
        self.files = files.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        self.calculatePagesNumber();
        self.paginate();
        self.$emit("unset-loading");
      })
      .catch((error) => {
        self.$emit("unset-loading");
        self.$snotify.error(error.message || "Oops! Something went wrong");
      });
  },
};
</script>

<style scoped>
.manage {
  width: 100%;
  height: 100%;
  padding: 2rem;
  max-width: calc(15rem * 5);
  margin: auto;
  background: #ccdde8;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>