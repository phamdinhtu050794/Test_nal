<template>
  <div class="home">
    <div class="header-blog">
      <h1>My Blogs</h1>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <button class="btn" @click="toManager()">Manager Blog</button>
    </div>

    <div class="search-wrapper panel-heading col-sm-12">
      <input
        class="form-control"
        @input="getTextSearch($event)"
        type="text"
        placeholder="Search"
      />
    </div>

    <div class="panel-body" style="max-height: 80vh; overflow-y: scroll">
      <table
        v-if="items.length"
        class="table"
        :item="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
        <thead>
          <tr>
            <th>Resource</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td v-bind:href="item.title" target="_blank">
              <BlogCard
                class="card"
                style="width: 95vw"
                v-if="item.id"
                @click.native="showModal(item.id)"
                :item="item"
              >
              </BlogCard>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <b-pagination
        class="pagination"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>

    <BlogModal
      class="modal"
      v-if="showingModal != null"
      v-on:close="closeModal"
      :item="items[showingModal]"
    >
    </BlogModal>
  </div>
</template>

<script>
// @ is an alias to /src

import BlogCard from "./../components/BlogCard.vue";
import BlogModal from "./../components/BlogModal.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",

  components: {
    BlogCard,
    BlogModal,
  },

  data() {
    return {
      // id: Number,
      showingModal: null,
      toggled: false,

      // searchQuery: null,
      perPage: 3,
      currentPage: 1,

      // items: [],
      searchQuery: "",
      search: "",
      // currentPage: 1,
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    },

    rows() {
      return this.items.lengths;
    },
  },
  created() {
    this.$store.dispatch("getItems");
  },
  // props: {
  //   item: [],
  // },

  mounted() {
    // Pretend we're getting from vuex
    setTimeout(() => {
      this.max = 7;
    }, 1000);
  },

  methods: {
    // onPageChange(page) {
    //   console.log(page);
    //   this.currentPage = page;
    // },

    myFunction() {
      this.toggled = !this.toggled;
    },
    toManager() {
      this.$router.push({ name: "ManagerBlog" });
    },
    showModal(IDs) {
      for (var i = 0; i < this.items.length; i++) {
        console.log("loooking " + i);
        if (this.items[i].id == IDs) {
          this.showingModal = i;
        }
      }
      // this.showingModal = IDs;
    },
    closeModal() {
      console.log("make");
      this.showingModal = null;
    },
    close() {
      console.log("closingggg");
      this.$emit("close");
    },

    // sắp xếp
    sortFunc: function () {
      return this.items.slice().sort(function (a, z) {
        return a.classify < z.classify ? 1 : -1;
      });
    },

    ...mapActions(["filteredProducts"]),

    getTextSearch: function (textSearch) {
      this.filteredResources = this.items;

      this.filteredResources = this.filteredResources.filter((item) => {
        return item.title.toLowerCase().includes(textSearch);
      });
    },
  },

  // watch: {
  //   search(newsearch) {
  //     this.filteredProducts(newsearch);
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100%;
  width: 100%;

  // padding-bottom: 0%;
  // padding-top: -10vh;
  // margin-top: -10vh;
}
.header-blog {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 999;
  height: 10%;
  align-items: baseline;
  background-color: rgb(0, 153, 255);
}

.table {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  width: 100%;
  // text-align: center;
}
.item-content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: space-around;
  // padding-left: 2%;
  // padding-right: 2%;
  // min-height: 100vh;
  // max-height: auto;
  height: 80%;
  padding: 5%;
  width: 100%;
  // border: 0.5px solid black;
  border-radius: 15px;
}
::v-deep .card-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  // width: 25vw;
  min-width: 25vw;
  height: 25vh;
  margin-bottom: 5vh;
  background-color: white;
  border-radius: 15px;
  // border: 0.2px solid grey;
}
::v-deep .table #title {
  position: relative;
  text-align: start;
  padding-left: 10px;
  margin-left: 10px;
  // overflow: scroll;
  scrollbar-width: none;
  width: 90%;
  height: 30px;
  font-family: monospace;
  font-size: 18px;
}

::v-deep .table #classify {
  display: none;
}
::v-deep .table #description {
  position: relative;
  text-align: start;
  padding-left: 10px;
  margin-left: 10px;
  // overflow: scroll;
  scrollbar-width: none;
  width: 90%;
  height: 30px;
  font-family: monospace;
  font-size: 18px;
}
::v-deep .table #action {
  display: none;
}

.btn {
  background-color: rgb(0, 153, 255); /* Green */
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
}
.input-search {
  height: 40px;
  width: 0px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: #22a6b3;
  padding-right: 40px;
  color: #fff;
}
.input-search::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 100;
}
.btn-search {
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
}
.btn-search:focus ~ .input-search {
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
.input-search:focus {
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}

.pagination {
  // text-align: center;
  margin-left: 25%;
}

.card {
  border: 0.5px solid grey;
  align-items: flex-start;
}
</style>
