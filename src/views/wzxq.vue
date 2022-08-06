<template>
    <div>
        <!-- 标题 -->
        <van-nav-bar style="position: fixed; top: 0;width: 100vw;" title="文章详情" class="red" left-text="返回" rleft-arrow
            @click-left="onClickLeft" />
        <!-- 内容区 -->
        <div class="section" style="padding-top: 10%;">
            <!-- /title -->

            <h3 style="overflow: hidden; text-overflow: ellipsis;">{{ this.message.title }}</h3>
            <!-- /author -->
            <div class="author" style="display: flex; justify-content: space-between;">
                <div style="display: flex;">
                    <img :src=this.message.avatar width="50px" height="50px">
                    <div class="xiao">
                        <p>{{ this.message.author }}</p>
                        <p>2001-09-29</p>
                    </div>

                </div>
                <div>
                    <van-button style="margin-top: 10px;" type="primary">关注</van-button>
                </div>
            </div>
            <hr>
            <p style="font-size: 16px;">{{ this.message.title }}

            </p>
        </div>
        <!-- 功能区 -->
        <div
            style="z-index: 999; width: 100vw;position: fixed;bottom: 0; height: 50px;border-top:1px solid; display: flex;background:white;">
            <div style="width:50%; margin-top:4px;">
                <van-field v-model="comment" placeholder="评论" @keyup.enter="fa" />
            </div>
            <div style="margin-top: 5px;">
                <van-button>
                    <van-icon name="comment" :badge="this.counts" />
                </van-button>
                <!-- 评论数 -->
                <van-button @click="sc" class="scc" icon="star  "></van-button>
                <!-- //收藏 -->
                <van-button class="dzw" @click="dz" icon="good-job"></van-button>
                <!-- 点赞 -->
                <van-button @click="showShare = true" icon="share"></van-button>
                <!-- 分享 -->
                <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" />
            </div>
        </div>
        <!--  -->
        <!-- 评论区 -->

        <div style="margin-bottom: 10vh;">
            <div v-for="(item, index) in comlist"
                style="display:flex; justify-content: space-between;width: 100vw;height: 12vh;border-top: 1px solid black;">
                <div style="display: flex;">
                    <img width="50px" height="50px" style="border-radius: 50px;margin-top: 10px;margin-right: 10px;"
                        :src=item.info.avatar>
                    <div style="margin-top: 5px;">
                        <p> 用户名：{{ item.info.nickname }}</p>
                        <p> {{ item.content }}</p>
                    </div>

                </div>
                <div>
                    <van-button icon="good-job" class="pldzz" @click="pldz(index)">{{ item.like_count }}</van-button>
                </div>
            </div>


        </div>

        <!--  -->
    </div>
</template>

<script>
import { Toast } from 'vant';
import http from '@/utils/http';
export default {
    data() {
        return {
            value: '',
            showShare: false,
            message: [],
            comment: '',
            pig: false,
            comlist: [],
            comlistid: [],
            _id: [],
            counts: '',
            //收藏
            e: 1,
            //点赞
            i: 1,
            //评论
            q: 1,
            //评论点赞
            w: 1,
            fav: '',
            like: '',

            options: [
                [
                    { name: '微信', icon: 'wechat' },
                    { name: '朋友圈', icon: 'wechat-moments' },
                    { name: '微博', icon: 'weibo' },
                    { name: 'QQ', icon: 'qq'},
                ],
                [
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' },
                    { name: '小程序码', icon: 'weapp-qrcode' },
                ],
            ],
        }
    },
    created() {
        var uid = localStorage.getItem('uid')
        this.wzid = this.$route.params.id
        //获取文章详情信息
        http({
            method: "post",
            url: '/api/get_article_detail',
            params: { article_id: this.wzid, user_id: uid, }
        }).then(res => {
            this.message = res.data.data
            this.fav = this.message.is_fav
            this.like = this.message.is_like
            //文章点赞的收藏的记录
            if (this.fav == true) {
                document.querySelector('.scc').style.color = 'gold'
            }
            if (this.like == true) {
                document.querySelector('.dzw').style.color = 'red'
            }
            //评论的记录
            if (this.comlist[index].is_like == true) {
                document.querySelectorAll('.pldzz')[index].style.color = 'red'
            }

        })
        // 评论列表
        var uid = localStorage.getItem('uid')

        http({
            method: "post",
            url: '/api/get_comment_list',
            params: { article_id: this.wzid, limit: 10, user_id: uid }
        }).then(res => {
            this.comlist = res.data.data
            this._id = this.comlist.map(item => (item._id))
            this.comlistid = this.comlist._id
            console.log(this.comlist);
            this.counts = res.data.count
        })
    },

    methods: {
        //评论点赞
        pldz(index) {
            var uid = localStorage.getItem('uid')
            console.log(index);
            this.w++
            if (this.w % 2 == 0) {
                http({
                    method: 'post',
                    url: '/api/comment_like',
                    params: { user_id: uid, comment_id: this.comlist[index]._id }
                }).then(res => {
                    Toast('点赞成功');
                    document.querySelectorAll('.pldzz')[index].style.color = 'red'
                    this.comlist[index].is_like = true
                    //调用刷新
                    http({
                        method: "post",
                        url: '/api/get_comment_list',
                        params: { article_id: this.wzid, limit: 10, user_id: uid }
                    }).then(res => {
                        this.comlist = res.data.data
                        this._id = this.comlist.map(item => (item._id))
                        this.comlistid = this.comlist._id
                    })


                })
            } else {
                http({
                    //取消评论点赞
                    method: 'post',
                    url: '/api/comment_unlike',
                    params: { user_id: uid, comment_id: this.comlist[index]._id }
                }).then(res => {
                    Toast('取消点赞成功');
                    document.querySelectorAll('.pldzz')[index].style.color = 'black'
                    this.comlist[index].is_like = false
                    //调用刷新
                    http({
                        method: "post",
                        url: '/api/get_comment_list',
                        params: { article_id: this.wzid, limit: 10, user_id: uid }
                    }).then(res => {

                        this.comlist = res.data.data
                        this._id = this.comlist.map(item => (item._id))
                        this.comlistid = this.comlist._id


                    })

                })
            }
        },
        //收藏
        sc() {
            var uid = localStorage.getItem('uid')
            this.e++
            if (this.e % 2 == 0) {
                http({
                    method: 'post',
                    url: '/api/add_fav',
                    params: { user_id: uid, article_id: this.wzid, }
                }).then(res => {
                    if (res.data.msg === '收藏成功') {
                        Toast('收藏成功');
                        document.querySelector('.scc').style.color = 'gold'
                    }
                })
            } else {
                //取消收藏
                http({
                    method: 'post',
                    url: '/api/remove_fav',
                    params: { user_id: uid, article_id: this.wzid, }
                }).then(res => {
                    Toast('取消收藏成功');
                    document.querySelector('.scc').style.color = 'black'
                })


            }
        },


        //点赞
        dz() {
            var uid = localStorage.getItem('uid')
            this.i++
            if (this.i % 2 == 0) {
                http({
                    method: 'post',
                    url: '/api/like',
                    params: { user_id: uid, article_id: this.wzid, }
                }).then(res => {
                    Toast('点赞成功');
                    document.querySelector('.dzw').style.color = 'red'
                })
            } else {
                http({
                    //取消点赞
                    method: 'post',
                    url: '/api/unlike',
                    params: { user_id: uid, article_id: this.wzid, }
                }).then(res => {
                    Toast('取消点赞成功');
                    document.querySelector('.dzw').style.color = 'black'
                })

            }
        },
        //返回
        onClickLeft() {
            this.$router.push('/shouye')
        },
        //评论
        fa() {
            var uid = localStorage.getItem("uid")
            http({
                method: 'post',
                url: '/api/add_comment',
                params: {
                    user_id: uid,
                    article_id: this.wzid,
                    comment_type: 0,
                    reply_comment_id: "",
                    content: this.comment
                }
            }).then(res => {
                //再次调用刷新
                http({
                    method: "post",
                    url: '/api/get_comment_list',
                    params: { article_id: this.wzid, limit: 10, }
                }).then(res => {
                    this.comlist = res.data.data
                    Toast('评论成功');
                    this.counts = res.data.count


                })
            })
        }
    },

}
</script>

<style  scoped>
.section {
    padding-top: 5%;
    padding-left: 5%;
    padding-right: 5%;
    background: white;

}

.section h1 {
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;



}

p {
    font-size: .7rem;
}

.xiao {
    width: 80%;
    margin-left: 5%;
    white-space: nowrap;

}

.van-nav-bar {
    background: green;
}

.van-nav-bar__title {
    color: white;
}

.van-nav-bar__text {
    color: white;
}

.van-field {
    background: rgb(241, 241, 241);
    border-radius: 30px;
}

.van-button {
    border: none;
}

.red /deep/ .van-nav-bar__title {
    color: rgb(255, 255, 255);
}

.red /deep/ .van-nav-bar__text {
    color: white;
}
</style>