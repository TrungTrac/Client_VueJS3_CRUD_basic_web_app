<template>
  <div class="plan_container">
    <div class="progress_container">
      <router-link
        v-for="(step, index) in steps"
        :key="index"
        :to="router_link[index]"
        class="progress"
        v-on:click="handle($event, index)"
      >
        <p v-bind:class="classActive(index)">
          {{ `STEP ${index + 1}.${step}` }}
        </p>
      </router-link>
    </div>
    <div class="items_container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "plan_page",
  data() {
    return {
      steps: ["TARGET", "CREAT PLAN", "PLANING"],
      progress: 0,
      router_link: [
        "/plan/target",
        "/plan/plancreate:targetId",
        "/plan/planing",
      ],
    };
  },
  methods: {
    handle(e, index) {
      this.progress = index;
    },
    classActive(index) {
      return {
        active: this.progress === index,
      };
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.plan_container {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  padding: 20px;
  gap: 20px;
  .progress_container {
    width: 20%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: space-between;

    .progress {
      width: 100%;
      background-color: rgb(255, 255, 255);
      height: 100px;
      border-radius: 10px;
      justify-content: center;
      display: flex;
      text-decoration: none;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      color: black;
      align-items: center;
      cursor: pointer;
    }
  }
  .items_container {
    width: 80%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    border-radius: 20px;
    padding: 20px;
  }
}
</style>
