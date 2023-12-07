<template>
  <div class="planing_container">
    <div class="planing_target">
      <h1>YOU PLAN</h1>
      <h2>目標を達成するためには？</h2>
    </div>
    <div class="input_plan">
      <form @submit.prevent="handleSubmit">
        <input placeholder="add plan" type="text" v-model="focusTarget" />
        <input placeholder="must do" type="text" v-model="mustDo" />
        <input type="date" v-model="deadline" />
        <button type="submit">ADD</button>
      </form>
    </div>
    <div class="render_planing">
      <table>
        <tr>
          <th>Step</th>
          <th>Focus Target</th>
          <th>Must Do</th>
          <th>Deadline</th>
        </tr>
        <tr v-for="(step, index) in parsedPlanArr" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ step.focusTarget }}</td>
          <td>{{ step.mustDo }}</td>
          <td>{{ step.deadline }}</td>
        </tr>
      </table>
    </div>
    <button class="button_planing" v-on:click="handleSubmitPlaning">
      CONTINUE
    </button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "plan-ing",
  data() {
    return {
      planArr: [],
      planId: 0,
      focusTarget: "",
      mustDo: "",
      deadline: "",
    };
  },
  methods: {
    handleSubmit() {
      if (
        this.focusTarget === "" ||
        this.mustDo === "" ||
        this.deadline === ""
      ) {
        alert("Please enter in full");
        return;
      }
      axios
        .post("http://localhost:3000/api/v1/plandetail", {
          planId: this.planId,
          focusTarget: this.focusTarget,
          mustDo: this.mustDo,
          deadline: this.deadline,
        })
        .then((result) => {
          alert(" Create Successfuly!");
          (this.focusTarget = result.data.focusTarget),
            (this.mustDo = result.data.mustDo),
            (this.deadline = result.data.deadline);
        })
        .catch((err) => {
          console.log("🚀 ~ file: TargetPage.vue:34 ~ .then ~ err:", err);
          alert("Server err");
        });

      // Xử lý dữ liệu sau khi biểu mẫu được gửi
      const newStep = {
        focusTarget: this.focusTarget, 
        mustDo: this.mustDo,
        deadline: this.deadline,
      };
      this.planArr.push(newStep);

      this.focusTarget = "";
      this.mustDo = "";
      this.deadline = "";
    },
    handleSubmitPlaning() {
      this.$router.push("/goal");
    },
  },
  computed: {
    parsedPlanArr() {
      const result = JSON.parse(JSON.stringify(this.planArr));
      localStorage.setItem("planing", JSON.stringify(result));
      return result;
    },
  },
  mounted() {
    const planId = this.$route.params.planId;
    this.planId = planId;
    // Use targetId as needed in your component logic
  },
};
</script>
<style lang="scss">
.planing_container {
  height: 100%;
  color: white;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  text-align: center;
  align-items: center;
  .planing_target {
    background-color: rgb(180, 180, 180);
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    padding: 0px 200px;
    h1 {
      font-size: 30px;
    }
  }

  .input_plan {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    form {
      width: 100%;
      display: flex;
      justify-content: space-between;
      input {
        height: 100%;
        padding: 5px;
      }
      button {
        width: 100px;
        height: 100%;
        border-radius: 5px;
      }
    }
  }
  .render_planing {
    width: 100%;
    height: 50%;
    table {
      width: 100%;
    }
    table,
    tr,
    th,
    td {
      border: 1px solid white;
    }
  }
  .button_planing {
    width: 200px;
    height: 10%;
    cursor: pointer;
  }
}
</style>
