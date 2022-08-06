<template>
  <div>
    <div style="background:green;  width: 100vw;height: 35vh;position: relative;">
      <div style="display: flex;justify-content: space-between; width: 90vw; margin: 0 auto;padding-top: 10vh;">
        <div class="left" style="display: flex;"> <img style="border-radius: 50px; margin-right: 10px;"
            :src=this.mess.avatar width="70px" height="70px">
          <p style="color: white; margin-top: 25px;">{{ this.mess.nickname }}</p>
        </div>
        <div class="right">
          <van-button style="border-radius: 30px; height: 30px;margin-top: 19px;" @click="gai">编辑资料</van-button>
        </div>
      </div>
      <div
        style="position: absolute;bottom: 0; width: 100%;background-color:rgba(0, 0, 0,.1); height: 12vh; display: flex;">
        <div style="width: 50%;">
          <p style="color:white;text-align: center;">1</p>
          <p style="color: white; text-align: center;font-size: 13px;">或赞</p>
        </div>
        <div style="width: 50%;">
          <p style="color:white;text-align: center;">1</p>
          <p style="color:white;text-align: center;font-size: 13px;">评论</p>
        </div>
      </div>
    </div>
    <!--  -->
    <van-grid :column-num="2">
      <van-grid-item icon="star-o" text="收藏"  @click="shouc"/>
      <van-grid-item icon="clock-o" text="历史 " />
    </van-grid>
    <!--  -->
    <van-nav-bar style="background:white;" left-text="修改密码">
      <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <van-nav-bar style="background:white;" left-text="联系我们">
      <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <van-nav-bar style="background:white;" left-text="关于我们">
      <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <button @click="login"
      style="width: 100%;background-color: white;border: none;margin-top: 5px;color: brown;height: 5vh;">退出/登录</button>
    <!--  -->

  </div>

</template>

<script>
import http from '@/utils/http'
export default {
  data() {
    return {
      mess: []
    }
  },
  created() {
    let token = localStorage.getItem("token")

    http({
      methods: 'post',
      url: '/user/getuserInfo',
      params: { token: token }
    }).then(res => {

      var uid = res.data.uid
      localStorage.setItem('uid', uid)
      this.mess = res.data.userInfo
      this.img = res.data.userInfo.avatar
      var nick = res.data.userInfo.nickname
      localStorage.setItem('nick', nick)

    })
  },
  methods: {
    shouc(){

      this.$router.push('/shoucang')
    },
    gai() {
      this.$router.push({ path: '/geren', query: { mess: this.mess } })

    },
    login() {
      this.$router.push('/login')
    }
  },
  go() {

    this.$router.push('/password')

  }


}
</script>

<style scoped>
.van-grid-item__text {
  opacity: 1;
}
</style>