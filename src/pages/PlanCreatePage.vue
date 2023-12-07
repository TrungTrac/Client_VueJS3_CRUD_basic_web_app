<template>
  <div class="targets">
    <div class="title_target"><h1>YOU PLAN</h1></div>
    <input
      type="text"
      class="input_targets"
      placeholder="Enter You Plan Name"
      v-model="planName"
    />
    <input
      type="date"
      class="input_targets"
      placeholder="Enter You Plan Name"
      v-model="planDeadline"
    />
    <h1>Plan Name: {{ planName }}</h1>
    <h1>Deadline: {{ planDeadline }}</h1>
    <button class="button_target" v-on:click="handelCreatePlan">ADD</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "create-plan",
  data() {
    return {
      plan: [],
      targetId: 0,
      planName: "",
      planDeadline: "",
    };
  },
  methods: {
    handelCreatePlan() {
      axios
        .post("http://localhost:3000/api/v1/plan", {
          targetId: this.targetId,
          planName: this.planName,
          planDeadline: this.planDeadline,
        })
        .then((result) => {
          const planId = result.data.newPlan.id;
          alert("Create Plan Successfuly!");
          this.$router.push({ name: "PlaningPage", params: { planId } });
        })
        .catch((err) => {
          console.log("🚀 ~ file: TargetPage.vue:34 ~ .then ~ err:", err);
          alert("Server err");
        });
    },
  },
  mounted() {
    const targetId = this.$route.params.targetId;
    this.targetId = targetId;
    // Use targetId as needed in your component logic
  },
};
</script>
<style lang="scss">
.targets {
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
  .input_targets {
    width: 100%;
    font-size: 30px;
    padding: 0px 20px;
  }
  h1 {
    color: white;
  }
  .button_target {
    width: 200px;
    height: 10%;
    cursor: pointer;
  }
}
</style>
