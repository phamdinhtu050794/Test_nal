<template>
  <div class="inventory-container">
    <div class="inventory-header">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <i @click="back()" class="fa">&#xf190;</i>
      <h1>Manager Blogs</h1>
      <i @click="addCard()" class="fa">&#xf055;</i>
    </div>
    <div class="table-header">
      <div class="cell">Classify</div>

      <div class="cell">Image</div>

      <div class="cell">
        <div>Title</div>
        <div>/</div>
        <div>Description</div>
      </div>

      <div class="cell">Action</div>
    </div>
    <div class="table-body-container">
      <div class="table">
        <div v-for="(item, idx) in items" :key="idx">
          <BlogCard
            :item="item"
            @delete="deleteItem"
            @edit="editItem"
            class="list-item"
          ></BlogCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogCard from "./../components/BlogCard.vue";
export default {
  name: "ManagerBlog",
  components: {
    BlogCard,
  },

  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
  },
  created() {
    this.$store.dispatch("getItems");
  },
  methods: {
    addCard() {
      this.$router.push({ name: "EditBlog" });
    },

    async deleteItem(item) {
      console.log("delete", item.id);
      await this.$store.dispatch("deleteItem", item);
      this.$store.dispatch("getItems");
    },
    editItem(item) {
      console.log("EditBlog", item.id);
      this.$router.push({ name: "EditBlog", params: { item: item } });
    },
    back() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "bootstrap/dist/css/bootstrap.css";
// @import "bootstrap-vue/dist/bootstrap-vue.css";
.inventory-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1%;
  margin: 0px;
}
.inventory-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.fa {
  font-size: 48px;
}
.table-header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.cell {
  height: 50px;
  background-color: bisque;
  color: black;
  font-size: 24px;
}
::v-deep .card-container {
  display: flex;

  // flex-direction: row;
  // justify-content: center;
  // width: 100%;
}
::v-deep .cells {
  overflow: scroll;
  width: 25vw;
  height: 200px;
  padding: 1%;
  text-align: center;
  // align-items: center;
  align-content: center;
  //   border-top: none;
  //   border-bottom: 0.1px solid black;
}
.cell {
  flex: 1 0 15%; // flex: grow shirnk percent
  //   border: 0.5px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>