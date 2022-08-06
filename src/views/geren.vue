<template>
  <div>
    <van-nav-bar class="wie" title="修改信息" left-text="返回" @click-left="onClickLeft" />
    <div style="background: silver;">
      <!-- 头像 -->
      <div @click="wq"
        style="background: white; display: flex;justify-content:space-between; width:90%;padding-left:4%;padding-right: 5%;">
        <p>头像</p>
        <div><img width="50px" height="50px" style="border-radius: 50px;" :src=this.$route.query.mess.avatar alt="">
        </div>
      </div>

      <van-image-preview v-model="oo" title="头像" :images=[this.$route.query.mess.avatar]>
        <template v-slot:index>
          <van-uploader  :after-read="afterRead"  class="chanGe">
            <van-button class="changheader"   icon="checked" type="primary">上传文件</van-button>
          </van-uploader>
        </template>
      </van-image-preview>

      <!-- 性别 -->
      <van-cell is-link title="性别" @click="show = true" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <!-- 昵称 -->
      <van-cell is-link @click="showPopup">昵称</van-cell>
      <van-popup v-model="show2" position="bottom" :style="{ height: '30%' }">
        <van-cell-group>
          <van-field v-model="value" placeholder="请输入用户名" />
        </van-cell-group>
      </van-popup>
      <!-- shengri -->
      <!-- 生日 -->
      <van-cell is-link @click="ji = !ji">生日</van-cell>
      <van-datetime-picker v-show="ji" v-model="currentDate" @confirm="con" @cancel="can"
        style="position:fixed;bottom: 0; width: 100vw;" type="date" title="选择年月日" />
      <!-- button -->

      <div style="display: flex;justify-content: center; width:100vw; background:white;padding-top: 20px;">
        <van-button @click="xiugai"
          style=" width: 200px;height: 50px;   background-color:green;color: white; border: none;" type="success">提交
        </van-button>
      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import http from '@/utils/http';
export default {
  data() {
    return {
      ji: false,
      currentDate: new Date(),
      show: false,
      value: '',
      show2: false,
      actions: [{ name: '男' }, { name: '女' },],
      oo: false,
      index: 0,
      d2:'',
    }
  },
  methods: {
    onSelect(item) {
      this.show = false;
      Toast(item.name);
      console.log(item);
    },
    onClickLeft() {
      this.$router.push('/my')
    },
    showPopup() {
      this.show2 = true;
    },
    con() {
      var d2 = this.currentDate.getFullYear() + "年" + (this.currentDate.getMonth() + 1) + "月" + this.currentDate.getDate() + "日";
console.log(d2);

    },
    can() {
      this.ji = false
    },
    xiugai() {
      var uid = localStorage.getItem('uid')
      http({
        method: 'post',
        url: '/user/editUserInfo',
        params: {
          avatar:"this.file",
          nickname: this.value,
          sex: this.actions[0].name,
          birthday:this.d2,
          uid: uid,
        }
      }).then(res => {
        console.log(res);

      })
    },
    wq() {
      this.oo = true
    },
      afterRead(file) {
    console.log(file);
    this.file=file
  },
  },

};


</script>

<style scoped>
.wie /deep/ .van-nav-bar__title {
  color: white;


}

.wie {
  background: green;
}

.wie /deep/ .van-nav-bar__text {
  color: white;
}

.content {
  padding: 16px 16px 160px;

}
 .changheader {
  background-color: rgba(0, 0, 0, .1);
  border: 1px solid white;
  
}
.chanGe{
  top: 85vh;
}
</style>