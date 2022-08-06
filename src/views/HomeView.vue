<template>
  <div class="home">
    <router-view></router-view>
   <van-tabbar v-model="active">
  <van-tabbar-item name="home" icon="home-o"><router-link to="/shouye">文章</router-link></van-tabbar-item>
  <van-tabbar-item name="search" icon="search"><router-link to="/fabu">发布</router-link></van-tabbar-item>
  <van-tabbar-item name="friends" icon="friends-o"><router-link to="/my">我的</router-link></van-tabbar-item>
</van-tabbar>

  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
     active:'',
    }
  },

}
</script>
