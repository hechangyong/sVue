<template>
    <div>
        <div  v-if='nobind==1'>
            <van-cell-group>
            <van-field class="van-cell-reload"
                value="手机号码"
                label="手机号"
                left-icon="phone-o"
                disabled
            />
            </van-cell-group>   
            <van-button class="buttonclass" round type="info">修改手机号码</van-button>
        </div>
        <div  v-else-if='nobind==2'>
            <van-cell-group>
            <van-field class="van-cell-reload"
                label="原手机号"
                left-icon="phone-o"
                placeholder="手机号码"
            />
            <van-field
                v-model="sms"
                center
                clearable
                label="短信验证码"
                left-icon="photo-o"
                placeholder="请输入短信验证码"
            >
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
            </van-cell-group>   
            <van-button class="buttonclass" round type="info">修改手机号码</van-button>
        </div>
        
        
    </div>
</template>

<script>
 import { Field,Button  } from 'vant';
 export default {
    data(){
        return {
            nobind : 2
        }
    },
    components: {
        [Field.name]: Field,
        [Button.name]:Button 
    }

}
</script>
<style scoped>
.buttonclass {
    margin-top: 50px;
    width: 90%;
    margin-left: 20px;
    /* width: -webkit-fill-available; */
    border-radius : 700px;
    font-size: 14px;
}
.van-cell-reload {
    line-height:34px;
    font-size: 14px;
}
</style>