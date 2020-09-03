<template>
    <div class='login_body'>
        <div>
            <input type="text" class="login_text" placeholder='账户名/手机号/Email'>
        </div>
        <div>
            <input type="password" class='login_text' placeholder='密码'>
        </div>
        <div class='login_btn'>
            <input type="submit" value='登录' @click='handleClick'>
        </div>
        <div class='login_link'>
            <a href="#" @click='handleClick'>立即注册</a>
            <a href="#" @click='handleClick'>找回密码</a>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    name: 'Login',
    methods: {
        handleClick(){
            Toast({
                message: '该功能尚未开发 (⊙x⊙;)',
                duration: 1000
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #content .login_body{
        width: 100%;
    }
    .login_body .login_text{
        width: 100%;
        height: 30px;
        border:none;
        border-bottom: 1px #ccc solid;
        margin-bottom: 5px;
        outline: none;
        padding: 5px;
    }
    .login_body .login_btn{
        height: 50px;
        margin: 10px;
    }
    .login_body .login_btn input{
        width: 100%;
        height: 100%;
        background: #e54847;
        border-radius: 3px;
        border:none;
        display: block;
        color: white;
    }
    .login_body .login_link{
        display: flex;
        justify-content: space-between;
    }
    .login_body .login_link a{
        text-decoration: none;
        margin: 0 5px;
        font-size: 12px;
        color: #fe8c00;
    }
</style>
