<template>
    <div>
        <van-nav-bar title="登陆/注册" left-arrow @click-left="onClickLeft" />
        <!-- ssssssssssssss -->
        <div>
            <van-form @submit="onSubmit">
                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
                    <template #button>
                        <van-button size="small" type="primary" @click="smsa">发送验证码</van-button>
                    </template>
                </van-field>
                <div style="margin: 16px;">
                    <van-button round block native-type="submit" @click="deng">登陆</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import http from '@/utils/http';
export default {
    data() {
        return {
            username: '',
            password: '',
            sms: '',
        }
    },
    methods: {
        onSubmit() {



        },
        onClickLeft() {

        },
        smsa() {

            http({
                methods: 'post',
                url: '/user/sendSms',
                params: { mobile: this.username, type: 'register' }
            }).then(res => {
                console.log(res);
            })
        },
        deng() {

            http({

                method: 'post',
                url: '/user/login',
                params: { username: this.username, password: this.password }
            }).then(res => {
                console.log(res);
                
                var token=res.data.token
                localStorage.setItem("token",token)
                if (res.data.msg === "登录成功") {
                    this.$router.push('/my')
                }
            })

        }

    },

}
</script>

<style scoped>
.van-nav-bar {
    background: green;
}

.van-button {
    background: green;
    border-radius: 2px;
    color: white;
}
</style>