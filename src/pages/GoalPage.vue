<template>
  <div>
    <div class="header_goal">
      <div class="search"><input type="text" /><button>Search</button></div>
      <div class="add_new">
        <button v-on:click="handleAddTarget()">ADD NEW</button>
      </div>
    </div>
    <div class="goal_container">
      <div class="item_goal" v-for="(item, index) in target" :key="index">
        <div class="header_item">
          <span>Target: {{ index + 1 }}</span
          ><span>Deadline: {{ item.targetDeadline }}</span>
        </div>
        <div class="body_item">
          {{ item.targetName }}
        </div>
        <div class="footer_item">
          <button v-on:click="handleTargetDetail(item.id)">Edit</button>
          <button v-on:click="handleDelete(item.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "agoal-page",
  data() {
    return {
      target: [],
    };
  },
  methods: {
    async fetchDataTarget() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/target");
        if (response.status === 200) {
          this.target = response.data;
          const TargetData = JSON.parse(JSON.stringify(this.target));
          console.log(
            "🚀 ~ file: GoalPage.vue:52 ~ computedTarget ~ TargetData:",
            TargetData
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    handleAddTarget() {
      this.$router.push("/plan/target");
    },
    async handleTargetDetail(id) {
      this.$router.push({ name: "TargetDetailPage", params: { id } });
    },
    async handleDelete(id) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/target/${id}`
        );
        this.target = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async handleEdit(item) {
      console.log("te", item.id);
      this.$router.push({
        name: "target-plan", // Tên route của trang bạn muốn chuyển đến
        params: item,
      });
    },
  },
  computed: {
    computedTarget() {
      const TargetData = JSON.parse(JSON.stringify(this.target));
      return TargetData;
    },
  },
  mounted() {
    this.fetchDataTarget();
  },
};
</script>
<style lang="scss">
.header_goal {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
  .search {
    height: 100%;
    display: flex;
    width: 500px;
    input {
      border: 1px solid black;
      margin-right: 5px;
      width: 400px;
    }
    button {
      border: 1px solid black;
      padding: 2px;
    }
  }
  .add_new {
    button {
      height: 100%;
      border: 1px solid black;
      padding: 2px;
      &:hover {
        background-color: rgb(177, 197, 197);
        transition: 0.3s;
      }
    }
  }
}
.goal_container {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 20px;
  padding: 20px;
  gap: 20px;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;

  .item_goal {
    width: 296px;
    height: 200px;
    border-radius: 20px;
    background-color: rgb(177, 197, 197);
    padding: 20px;
    display: flex;
    flex-direction: column;
    &:hover {
      background-color: rgb(226, 225, 225);
      transition: 0.3s;
    }
    .header_item {
      width: 100%;
      height: 20%;
      border-bottom: 1px solid black;
      display: flex;
      justify-content: space-between;
    }
    .body_item {
      width: 100%;
      height: 50%;
      border-bottom: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .footer_item {
      width: 100%;
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-content: space-around;
      button {
        width: 100px;
        height: 30px;
        &:hover {
          background-color: rgb(163, 163, 163);
        }
      }
    }
  }
}
</style>
