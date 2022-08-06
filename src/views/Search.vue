<template>
  <div class="conSearch">
    <van-search
    class="search"
      key="sa"
      v-model.trim="InpVal"
      placeholder="请输入搜索关键词"
      input-align="center"
      @clear="clears"
      show-action
      @cancel="$router.push('/shouye')"
    />
    <div key="as" class="animate__animated animate__fadeIn appear">
      <p class="hisp">历史记录</p>
      <ul class="hisul">
        <li v-for="(data,index) in historyArr" :key="index" @click="$router.push(`/wzxq/${data.id}`)">
          {{ data.title }}<van-icon name="cross" @click.stop="close"  class="close"/>
        </li>
      </ul>
    </div>
    <div
      class="scrollbar animate__animated animate__fadeIn appear"
      :key="searchArr.length"
      v-show="InpBox"
    >
      <div ref="wrapper" class="scrollbar-wrapper wrapper">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="scrollbar-content"
        >
          <div
            class="scrollbar-content-item"
            v-for="item in searchArr"
            :key="item._id"
            @click.stop="arthors(item)"
          >
            <p class="title">
              {{ item.title }}
              <img
                :src="item.imageSrc.length ? item.imageSrc[0] : '/favicon.ico'"
                alt=""
              />
            </p>
            <span>{{
              item.cate_name == "undefined" ? "今日头条" : item.cate_name
            }}</span>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template> 
<script>
import http from '@/utils/http';
export default {
  data() {
    return {
      InpVal: "",
      scrollbarObj: {
        fade: true,
      },
      loading: false,
      finished: false,
      searchArr: [],
      InpBox: false,
      skip: 10,
      num: 0,
      historyArr: [],
      history: "",
      // 是否加载
      isScroll:false,
      timer:0
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      this.skip += 10
      // console.log(this.skip);
      this.Seatch(this.skip)
      /* if (this.list.length >= 40) {
          this.finished = true;
        } */
    },
    Seatch(skip) {

http({

  method:'post',
  url:'/api/search',
  params:{  key_word: this.InpVal,
          skip: skip,
          limit: 10,}
}).then((result) => {
          // let obj = {}
          this.loading = false;
          if (
            this.skip > result.data.data.length ||
            result.data.data.length == 0
          ) {
            console.log(111);
            this.finished = true;
          }
          this.InpBox = true;
          this.searchArr = [...this.searchArr,...result.data.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initBscroll() {
      new BScroll(this.$refs.wrapper, {
        scrollY: true,
        scrollbar: true,
        click: true,
      });
    },
    clears() {
      this.InpBox = false;
    },
    // 跳转详情
    arthors(item) {
      this.$router.push(`/wzxq/${item._id}`);
      this.historyArr.unshift({title:item.title,id:item._id});
      let a = []
      for(var i =0;i<this.historyArr.length;i++){
         if(a.indexOf(this.historyArr[i].id)==-1){
           a.push(this.historyArr[i].id)
         }else{
            this.historyArr.splice(i,1)
         }
      }
      console.log(this.historyArr);
      if(this.historyArr.length>6){
        this.historyArr.pop()
      }
      this.historyArr = JSON.stringify(this.historyArr);
      
      localStorage.setItem("history", this.historyArr);
      this.historyArr = Array.from(new Set(JSON.parse(localStorage.history)));

    },
    close(index){
      this.historyArr.splice(index,1)
      console.log(this.historyArr);
      localStorage.setItem('history',JSON.stringify(this.historyArr))
      this.historyArr = JSON.parse(localStorage.history) 
    }
  },
  mounted() {
    if (localStorage.history) {
      this.historyArr = Array.from(new Set(JSON.parse(localStorage.history)));
      // console.log(this.historyArr);
    }
  },
  watch: {
    InpVal() {
      if(this.timer){
        clearTimeout(this.timer)
      }
      if (this.InpVal.length != 0) {
        this.timer = setTimeout(()=>{
          this.InpBox = true;
          this.searchArr = [];
          this.finished = false
          this.skip = 0
          this.Seatch(this.skip);
        },300)
      } else {
        this.InpBox = false;
      }
    },

  },
};
</script>
<style lang="less" scoped>
.conSearch{
  height: 100vh;
}
.close{
  position: absolute;
  right: 0;
  top: 0;
  font-size: 18px;
  z-index: 10000;
  &:hover{
    color: red;
  }
}
.scrollbar-wrapper {
  position: relative;
  height: 100%;
  padding: 0 10px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.scrollbar-content-item {
  padding: 10px 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
  text-align: left;
}
.title {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  img {
    width: 20%;
  }
}
.hisp{
  text-align: right;
  padding-right: 10px;
}
.hisul{
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 10px 0;
  justify-content: space-between;
  li{
    margin: 5px 0;
    width: 45%;
    padding-top: 5px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
  }
}

</style>