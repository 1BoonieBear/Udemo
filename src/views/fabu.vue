<template>
  <div class="box">
    <div class="titel_con">
      <span>注册</span>
    </div>
    <div class="main">
      <van-cell-group>
        <van-field v-model="titl" placeholder="请输入标题" />
      </van-cell-group>

      <van-field readonly clickable name="picker" :value="value" placeholder="点击选择分类名称" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>

      <van-field v-model="message" rows="3" autosize type="textarea" placeholder="请输入内容" />
      <van-uploader v-model="fileList" multiple />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" @click="submit">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/utils/http';
export default {
  created() {
    //标签页数据
    http({
      method: "post",
      url: "/api/get_cate_list",
    }).then((res) => {
      this.biaoqian = res.data.data;
      var arr = this.biaoqian
      this.name = arr.map((item) => {
        return item.name
      })
      this.id = arr.map((item) => {
        return item._id
      })
      this.columns = this.name
    });
  },

  data() {
    return {

      index: 0,
      name: [],
      id: [],
      titl: "",
      message: "",
      fileList: [],
      value: "",
      columns: [],
      showPicker: false,
    };
  },

  methods: {
    onConfirm(value, index) {
      this.value = value;
      this.index = index
      this.showPicker = false;
    },
    submit() {
      var uid = localStorage.getItem('uid')
      var nick = localStorage.getItem('nick')
      http({
        method: 'post',
        url: '/api/add_article',
        params: {

          title: this.titl,
          content: this.message,
          cate_name: this.name[this.index],
          cate_id: this.id[this.index],
          author: nick,
          author_id: uid,
          imageSrc: [],
        }


      }).then(res => {

        console.log(res);
      })
    },
  },
};
</script>
<style lang="less" scoped>
.titel_con {
  width: 100%;
  background-color: green;
  display: flex;
}

.van-button--info {
  background-color: green;
  border: 1px solid green;
}

.titel_con span {
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
}

.van-field {
  border-bottom: 1px solid #eee;
}
</style>