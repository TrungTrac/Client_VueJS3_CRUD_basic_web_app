<template>
  <div class="target">
    <div class="title_target"><h1>YOU TARGET</h1></div>
    <div>
      <h1>TARGET : {{ targetName }}</h1>
      <h1>Deadline : {{ targetDeadline }}</h1>
    </div>
    <textarea
      class="input_target"
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="You target"
      v-model="targetName"
    ></textarea>
    <div>
      <span>Deadline</span>:<input type="date" v-model="targetDeadline" />
    </div>

    <button class="button_target" v-on:click="handleSubmitTarget">ADD</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "target-plan",
  data() {
    return {
      target: [],
      targetName: "",
      targetDeadline: "",
    };
  },
  methods: {
    // Api tạo target mới
    handleSubmitTarget() {
      axios
        .post("http://localhost:3000/api/v1/target", {
          targetName: this.targetName,
          targetDeadline: this.targetDeadline,
        })
        .then((result) => {
          const targetId = result.data.newTarget.id;
          alert("Create Target Successfuly!");
          this.$router.push({ name: "PlanCreatePage", params: { targetId } });
        })
        .catch((err) => {
          console.log("🚀 ~ file: TargetPage.vue:34 ~ .then ~ err:", err);
          alert("Server err");
        });
    },
  },
};
</script>
<style lang="scss">
.target {
  height: 100%;
  color: white;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  text-align: center;
  align-items: center;
  .title_target {
    background-color: rgb(180, 180, 180);
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 0px 200px;
    h1 {
      font-size: 30px;
    }
  }
  .input_target {
    width: 100%;
    height: 50%;
    font-size: 30px;
    padding: 20px;
  }

  /* Tùy chỉnh kiểu hiển thị */
  input[type="date"] {
    appearance: none;
    background-color: rgb(238, 247, 247);
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 4px;
    outline: none;
  }

  /* Màu nền khi focus */
  input[type="date"]:focus {
    background-color: #fc7a7a;
  }
  .targetDeadline {
    width: 100px;
    height: 50px;
    background-color: gray;
  }
  .button_target {
    width: 200px;
    height: 10%;
    cursor: pointer;
  }
}
</style>
