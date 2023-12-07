// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import GoalPage from "../pages/GoalPage.vue";
import PlanPage from "../pages/PlanPage.vue";
import TargetPage from "../pages/TargetPage.vue";
import PlanCreatePage from "../pages/PlanCreatePage.vue";
import PlaningPage from "../pages/PlaningPage.vue";
import TargetDetailPage from "../pages/TargetDetailPage.vue";

const routes = [
  { path: "/", component: HomePage, name: "HomePage" },
  { path: "/goal", component: GoalPage, name: "GoalPage" },
  {
    path: "/target-detail/:id",
    component: TargetDetailPage,
    name: "TargetDetailPage",
  },
  {
    path: "/plan",
    component: PlanPage,
    redirect: "/plan/target",
    name: "PlanPage",
    children: [
      { path: "/plan/target", component: TargetPage, name: "TargetPage" },
      {
        path: "/plan/plancreate/:targetId",
        component: PlanCreatePage,
        name: "PlanCreatePage",
      },
      {
        path: "/plan/planing/:planId",
        component: PlaningPage,
        name: "PlaningPage",
      },
      
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
