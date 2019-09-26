<template>
    <div>
        <div class="container">
            
            <!-- <div class="line">
               <div>用户名：</div>
               <div class="input">
                    <el-input
                    placeholder="请输入用户名"
                    v-model.trim="uname"
                    clearable>
                    </el-input>
               </div>
            </div>
            <div class="line" style="margin:2rem 0 0 0;">
               <div>密　码：</div>
               <div class="input">
                    <el-input
                    placeholder="请输入密码"
                    v-model.trim="upwd"
                    show-password
                    >
                    </el-input>
               </div>
            </div>
             <div class="line" style="margin:1.5rem 0 0 0;justify-content:center">
                 <el-button type="primary" @click="logo">登录下单</el-button>
             </div> -->
             <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号"
                   prop="uname"
                >
                    <el-input v-model.trim="user.uname" autofocus></el-input>
                </el-form-item>
                <el-form-item label="密　码" prop="upwd1">
                    <el-input v-model.trim="user.upwd1" show-password></el-input>
                </el-form-item>
                 <el-form-item label="密　码" prop="upwd2">
                    <el-input v-model.trim="user.upwd2" show-password></el-input>
                </el-form-item>
                <el-button type="primary" @click="reg" style="margin:0 0 0 4rem;">点击注册</el-button>
             </el-form>
            
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
    data(){
        return{
            user:{
                uname:"",
                upwd1:"",
                upwd2:""
            },
            rules:{
                uname: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                upwd2: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                upwd1: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        reg(){
            let that=this;
            for(let item in this.user){
                if(!this.user[item]) return
            }
            window.sessionStorage.removeItem('uid')
            window.sessionStorage.removeItem('hasId')
            if(that.user.upwd1!=that.user.upwd2){
                MessageBox.alert('两次密码不一致', '提示', {
                    confirmButtonText: '确定',
                    closeOnClickModal:true,
                    type: 'warning'
                    }).then(()=>{
                        
                    })
              return;
            }
            
            if(!((/^1[3456789]\d{9}$/.test(that.user.uname)||(/^[23456789][0135678][023456789]\d{7}$/.test(that.user.uname))))){
                
                MessageBox.alert('手机号格式不正确', '提示', {
                    confirmButtonText: '确定',
                    closeOnClickModal:true,
                    type: 'warning'
                    }).then(()=>{
                        
                    })
                return;    
            }
            if(that.user.upwd2.length<6||that.user.upwd2.length>14){
                MessageBox.alert('密码长度6到12位', '提示', {
                    confirmButtonText: '确定',
                    closeOnClickModal:true,
                    type: 'warning'
                    }).then(()=>{
                        
                    })
                return;    
            }
            
            // var loading=this.$loading()
            that.$axios.post('/register',that.qs.stringify({
                phone:that.user.uname,
                password:that.user.upwd2
            })).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    MessageBox.alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                        closeOnClickModal:true,
                        type: 'success'
                        }).then(()=>{
                        that.$router.push('/login')
                    })
                }else{
                    MessageBox.alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                        closeOnClickModal:true,
                        type: 'warning'
                        }).then(()=>{
                        
                    })
                }
            }).catch(err=>{
                console.log(err)
            })


            // setTimeout(()=>{
            //     loading.close()
            // },2000)
        }
    }
}
</script>

<style scoped>
.container{
    width: 20vw;
    margin: 6rem auto 0;
    text-align: center;
    background-color: rgba(255,255,255,0.8);
    padding: 2rem 5rem 2rem 2rem;
    border-radius: 8px;
} 

.line{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    color:#666;
}
.input{
    width: 20rem;
}
.line div{
    white-space: nowrap;
    text-align:center;
    line-height: 1.5rem;
}
.container >>> .el-input__inner{
    font-size: 1.2rem;
    width: 15vw;
}
</style>