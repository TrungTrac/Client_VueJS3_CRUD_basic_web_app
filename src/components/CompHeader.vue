<template >
    <div class="nav_container">
        <div class="left_nav">
                <router-link to="/" class="nav-link"> Home</router-link>               
                <router-link to="/goal" class="nav-link"> Goal</router-link>               
                <router-link to="/plan" class="nav-link">Plan</router-link>               
        </div> 
        <div class="right_nav">
                                
        </div> 
    </div>
     

</template>
<script>
export default {
    name:"comp-header"
}
</script>
<style >
.nav_container{
    display: flex;
    justify-content: space-between;
    
}
  .left_nav{ 
    width: 500px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
   
}
.nav-link{
 font-size: 30px;
 text-decoration: none;
}

    .right_nav{
        width: 300px;
     height: 100%;
    }
</style>