<template>
  <div>
    <div class="top">
      <!-- 搜索栏 -->
      <van-search style="width: 100vw;" background="#12c150"  v-model="value" shape="round"  placeholder="请输入搜索关键词" @click="search"/>
      <!-- 标签页-->
      <van-tabs v-model="active" @click="q">
        <van-tab :title="item.name" :name="item._id" v-for="item in biaoqian" :id="item._id"></van-tab>
      </van-tabs>
    </div>
    <!-- 内容区 -->
    <div class="nei">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <li class="iu" v-for="item in section" :key="item._id" @click="$router.push(`/wzxq/${item._id}`)">
            <h4>{{ item.title }}</h4>
            <p>作者：{{ item.author }}</p>
            <div>
          <li style="width:90vw; height:20vh;display:flex;overflow: hidden;">
            <img v-for="(item, index) in item.imageSrc" :key="index" :src=item>
          </li>
    </div>
    <hr>
    </li>
    </van-list>
    </van-pull-refresh>
  </div>
  </div>
</template>

<script>
import http from "../utils/http.js";
export default {
  data() {
    return {
      value: "",
      active: "",
      biaoqian: [],
      list: [],
      refreshing: "",
      loading: false,
      finished: false,
      section: [],
      refreshing: false,
      limit: 0,
    };
  },
  created() {
    //标签页数据
    http({
      method: "post",
      url: "/api/get_cate_list",
    }).then((res) => {
      this.biaoqian = res.data.data;
      this.q(this.biaoqian[0]._id)
    });
  },
  methods: {
search(){
  this.$router.push('/Search')
},

    //内容数据
    q(name) {
      this.name = name
      http({
        method: "post",
        url: "/api/get_article_list",
        params: { cate_id: name, skip: 0, limit: 5 },
      }).then((res) => {
        this.section = res.data.data;
      });
    },
    //上拉加载
    onLoad() {
      http({
        method: "post",
        url: "/api/get_article_list",
        params: { cate_id: this.name, skip: 0, limit: this.limit += 10 },
      }).then((ress) => {
        this.section = ress.data.data
        this.loading = false
        this.count = ress.data.count

        if (this.limit >= this.count) {
          this.finished = true
        }


      })
    },
    // /下拉刷新
    onRefresh() {





    },

  },
};
</script>

<style scoped>
.iu {
  list-style-type: none;
  padding-left: 5%;
  padding-right: 5%;
}

h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
}

.top {

  position: fixed;
  z-index: 999;
}

.nei {
  padding-top: 25%;
  padding-bottom: 15%;

}

li img {
  width: 33%;
  height: 100%;
}
</style>
