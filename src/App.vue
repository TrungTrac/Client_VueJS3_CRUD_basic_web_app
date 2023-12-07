<template>
    <comp-header class="header"/>
    <div class="body">
     <router-view></router-view>
    </div>
    <comp-footer class="footer"/>
</template>

<script>

import CompHeader from "./components/CompHeader.vue";
import CompFooter from "./components/CompFooter.vue";

export default {
  name: 'App',
  components: {
    CompHeader,
    CompFooter
    
  }
}
</script>

<style>
*{ 
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  box-sizing: border-box;
 }

 #app{
  height: 100vh;

 }
.header{
  width: 100%;
  height: 10%;
border-bottom: 1px solid black;
}
.body{
  width: 100%;
  height: 100%;
  padding: 50px 100px;
}
.footer{
  background-color:rgb(90, 90, 90);
  width: 100%;
  height: 10%;
}
</style>
