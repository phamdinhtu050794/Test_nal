<template>
  <div class="editcard-container">
    <div>
      <h1>Create/Edit</h1>
    </div>
    <select class="select" v-model="item.classify">
      <option disabled value="">Please select one</option>
      <option>Foreign Language Blog</option>
      <option>Food Blog</option>
      <option>Travel Blog</option>
      <option>Health Blog</option>
      <option>News Blog</option>
    </select>
    <!-- <input class="input" v-model="item.classify" placeholder="classify" /> -->
    <!-- <input type="file" id="pictureTest" capture> -->
    <textarea class="input" v-model="item.title" placeholder="title" />
    <textarea
      class="input"
      v-model="item.description"
      placeholder="description"
    />
    <!-- <textarea class="input" v-model="item.price" placeholder="price" /> -->
    <h5>Please select image</h5>
    <input type="file" accept="image/*" @change="uploadImage" />
    <div id="preview">
      <img v-if="item.imageUrl" :src="item.imageUrl" width="150" height="150" />
    </div>
    <button class="btn" @click="save">Save</button>
    <button class="btn" @click="back">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "EditBlog",
  props: {
    msg: String,
  },
  data() {
    return {
      item: null,
      item: {
        classify: Number,
        image: null,
        imageUrl: null,
      },
    };
  },
  created() {
    if (this.$route.params.item) {
      this.item = this.$route.params.item;
    } else {
      this.item = {
        // classify: Number,
        imageUrl: this.item.imageUrl,
        name: this.name,
        description: this.description,
        price: this.price,
      };
    }
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.item.imageUrl = e.target.result;
        console.log(this.item.imageUrl);
      };
    },

    async save() {
      await this.$store.dispatch("saveItem", this.item);
      console.log("back");
      this.$router.push("/managerBlog");
    },
    back() {
      this.$router.push("/managerBlog");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.editcard-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin: 20%;

  margin-top: 10%;
  // padding: 20%;

  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
.input {
  width: 50vw;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  width: 50vw;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color: #45a049;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 70%;
  max-height: 200px;
}
.select {
  width: 20%;
  height: 30px;
}
</style>