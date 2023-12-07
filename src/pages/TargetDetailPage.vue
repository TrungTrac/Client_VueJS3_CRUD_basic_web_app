<template>
  <div class="main_target_container">
    <div class="header_target_detail_container">
      <span class="target_header">Target</span>
      <span class="plan_header">Plan</span>
      <span class="plandetail_header">Plan Detail</span>
      <button class="edit_target" v-on:click="handleEdit">Edit</button>
      <button class="edit_target" v-on:click="handleSave">Save</button>
    </div>
    <div class="target_detail_container">
      <div class="target_itm">
        <div class="target_itm_content">
          <div>
            <input
              type="text"
              v-model="target.targetName"
              :disabled="isDisabled"
            />
          </div>

          <div>{{ target.targetDeadline }}</div>
          <div>
            <input
              type="checkbox"
              v-model="target.isComplete"
              :disabled="isDisabled"
            />
          </div>
        </div>
      </div>
      <div class="plan_itm">
        <div
          class="plan_itm_content"
          v-for="(item, index) in target.plans"
          :key="index"
        >
          <div>
            {{ index + 1 }}.Name:
            <input type="text" :disabled="isDisabled" v-model="item.planName" />
          </div>

          <div>{{ item.planDeadline }}</div>
          <div>
            <input
              type="checkbox"
              v-model="item.isComplete"
              :disabled="isDisabled"
            />
          </div>
        </div>
      </div>
      <div class="plan_detail_itm">
        <div v-for="(item, index) in target.plans" :key="index">
          <div
            class="plan_detail_itm_content"
            v-for="(items, indexs) in item.planDetail"
            :key="indexs"
          >
            <div>
              {{ indexs + 1 }}.Focus target:<input
                :disabled="isDisabled"
                type="text"
                v-model="items.focusTarget"
              />
            </div>
            <div>
              Must do:<input
                type="text"
                :disabled="isDisabled"
                v-model="items.mustDo"
              />
            </div>
            <div>{{ items.deadline }}</div>
            <div>
              <input
                type="checkbox"
                v-model="items.isComplete"
                :disabled="isDisabled"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "target-detail-page",
  data() {
    return {
      target: [],
      targetId: 0,
      isDisabled: true,
    };
  },
  methods: {
    //APi lấy data target theo id
    async handleGetDataTarget() {
      try {
        await axios
          .get(`http://localhost:3000/api/v1/target/${this.targetId}`)
          .then((res) => {
            this.target = res.data;
            console.log(
              "🚀 ~ file: TargetDetailPage.vue:56 ~ .then ~ target:",
              this.target
            );
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: PlanCompletePage.vue:77 ~ .then ~ err:",
              err
            );
            alert("Server Err");
          });
      } catch (err) {
        console.log(
          "🚀 ~ file: TargetDetailPage.vue:68 ~ handleGetDataTarget ~ err:",
          err
        );
      }
    },
    handleEdit() {
      this.isDisabled = !this.isDisabled;
    },
    //APi và hàm sửa thông tin

    async handleSave() {
      console.log("target", this.target);
      try {
        await axios
          .patch(`http://localhost:3000/api/v1/target/${this.targetId}`, {
            data: this.target,
          })
          .then((res) => {
            console.log(
              "🚀 ~ file: TargetDetailPage.vue:56 ~ .then ~ target:",
              res
            );
            alert("Save Success!");
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: PlanCompletePage.vue:77 ~ .then ~ err:",
              err
            );
            alert("Server Err");
          });
      } catch (err) {
        console.log(
          "🚀 ~ file: TargetDetailPage.vue:68 ~ handleGetDataTarget ~ err:",
          err
        );
      }
      this.isDisabled = true;
    },
  },
  computed: {
    computedTarget() {
      const TargetData = JSON.parse(JSON.stringify(this.target));
      return TargetData;
    },
  },
  mounted() {
    const targetId = this.$route.params.id;
    this.targetId = targetId;
    this.handleGetDataTarget();
  },
};
</script>
<style lang="scss">
.main_target_container {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 20px;
  background-color: rgb(228, 223, 223);

  .header_target_detail_container {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0px 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: 1px solid black;

    .target_header {
      flex: 2;
      padding-left: 20px;
      border-right: 1px solid black;
    }
    .plan_header {
      flex: 2;
      padding-left: 20px;
      border-right: 1px solid black;
    }
    .plandetail_header {
      flex: 4;
      padding-left: 20px;
    }
    .edit_target {
      width: 50px;
      height: 30px;
      background-color: rgb(187, 186, 186);
      margin-left: 5px;
      border-radius: 5px;

      &:hover {
        background-color: gray;
      }
    }
  }
  .target_detail_container {
    width: 100%;
    height: 400px;
    display: flex;

    .target_itm {
      flex: 2;
      padding: 10px;
      .target_itm_content {
        padding: 10px;
        width: 100%;

        height: 70px;
        background-color: rgb(128, 192, 245);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 5px;
        input {
          width: 150px;
          border-radius: 3px;
          background-color: rgb(238, 195, 195);
          text-align: center;
        }
        input[type="checkbox"] {
          appearance: none; /* Ẩn giao diện mặc định của checkbox */
          -webkit-appearance: none; /* Đối với trình duyệt WebKit (Chrome, Safari, ...), hỗ trợ cũ */
          -moz-appearance: none; /* Đối với Firefox, hỗ trợ cũ */
          background-color: #7eee5c; /* Màu nền của ô checkbox */
          width: 16px; /* Độ rộng của ô checkbox */
          height: 16px; /* Chiều cao của ô checkbox */
          border: 1px solid #000; /* Viền ô checkbox */
          cursor: pointer; /* Biểu tượng con trỏ khi di chuột qua ô checkbox */
        }
        input[type="checkbox"]:checked::before {
          content: "\2713"; /* Ký hiệu dấu đánh dấu (tick) */
          color: #030303; /* Màu của dấu đánh dấu khi được chọn */
          font-size: 17px; /* Kích thước của dấu đánh dấu */
          position: relative;
          left: 0px;
          top: -6px;
        }
      }
    }
    .plan_itm {
      flex: 2;
      padding: 10px;
      display: flex;
      gap: 10px;
      flex-direction: column;
      .plan_itm_content {
        width: 100%;
        height: 70px;
        background-color: rgb(128, 192, 245);
        border-radius: 5px;

        display: flex;
        padding: 10px;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        text-align: center;
        input {
          width: 100px;
          border-radius: 3px;
          background-color: rgb(238, 195, 195);
          text-align: center;
        }
        input[type="checkbox"] {
          appearance: none; /* Ẩn giao diện mặc định của checkbox */
          -webkit-appearance: none; /* Đối với trình duyệt WebKit (Chrome, Safari, ...), hỗ trợ cũ */
          -moz-appearance: none; /* Đối với Firefox, hỗ trợ cũ */
          background-color: #7eee5c; /* Màu nền của ô checkbox */
          width: 16px; /* Độ rộng của ô checkbox */
          height: 16px; /* Chiều cao của ô checkbox */
          border: 1px solid #000; /* Viền ô checkbox */
          cursor: pointer; /* Biểu tượng con trỏ khi di chuột qua ô checkbox */
        }
        input[type="checkbox"]:checked::before {
          content: "\2713"; /* Ký hiệu dấu đánh dấu (tick) */
          color: #030303; /* Màu của dấu đánh dấu khi được chọn */
          font-size: 17px; /* Kích thước của dấu đánh dấu */
          position: relative;
          left: 0px;
          top: -6px;
        }
      }
    }
    .plan_detail_itm {
      flex: 4;
      padding: 10px;
      display: flex;
      flex-direction: column;

      .plan_detail_itm_content {
        width: 100%;
        height: 70px;
        background-color: rgb(128, 192, 245);
        border-radius: 5px;

        padding: 10px;
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        text-align: center;
        input {
          width: 100px;
          border-radius: 3px;
          background-color: rgb(238, 195, 195);
          text-align: center;
        }
        input[type="checkbox"] {
          appearance: none; /* Ẩn giao diện mặc định của checkbox */
          -webkit-appearance: none; /* Đối với trình duyệt WebKit (Chrome, Safari, ...), hỗ trợ cũ */
          -moz-appearance: none; /* Đối với Firefox, hỗ trợ cũ */
          background-color: #7eee5c; /* Màu nền của ô checkbox */
          width: 16px; /* Độ rộng của ô checkbox */
          height: 16px; /* Chiều cao của ô checkbox */
          border: 1px solid #000; /* Viền ô checkbox */
          cursor: pointer; /* Biểu tượng con trỏ khi di chuột qua ô checkbox */
        }
        input[type="checkbox"]:checked::before {
          content: "\2713"; /* Ký hiệu dấu đánh dấu (tick) */
          color: #030303; /* Màu của dấu đánh dấu khi được chọn */
          font-size: 17px; /* Kích thước của dấu đánh dấu */
          position: relative;
          left: 0px;
          top: -6px;
        }
      }
    }
  }
}
</style>
