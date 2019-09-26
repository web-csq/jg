<template>
    <div class="container">
        <div class="m" v-if="!IDshow">
            <el-button type="primary" style="float:right;" @click="getID">扫码上传</el-button>
           
            <h3>发件人身份证正面（请按样版样式上传。大小不超过4M）：</h3>
            <div style="display:flex;margin:1rem 0 0 0;">
               <img src="../assets/zhen.jpg" alt="" ref="img"  style="width:300px;height:12.5rem;border-radius:8px;display:inline-block;margin-top:1rem;">

                <van-uploader v-model="zheng" :preview-full-image="false" preview-size="200px" multiple :max-count=1 style="margin:1rem 0 0 4rem;"/>
                
            </div>

            <h3 style="margin:2rem 0 0 0;">发件人身份证反面（请按样版样式上传。大小不超过4M）：</h3>
            <div style="display:flex;margin:1rem 0 0 0;">
                <div>
                    <img src="../assets/fan.jpg" alt="" style="width:300px;height:12.4rem;border-radius:8px;display:inline-block;margin-top:1rem;">
                </div>
                
                <van-uploader v-model="fan" multiple preview-size="200px" :preview-full-image="false" :max-count=1 style="margin:1rem 0 0 4rem;"/>
               

            </div>
            <div style="text-align:center">
                <el-button type="primary" style="margin:0 0 0 39rem" @click="submit">提交</el-button>
            </div>
            
        </div>
        <div class="m" style="margin-top:1rem;padding-bottom:3rem;" v-if="!showAddr">
             <el-button type="primary" style="float:right;margin:0 0 0 0;" @click="getAddr">添加收货人地址</el-button>
        </div>
         <el-dialog
            title="扫描二维码上传证件"
            :visible.sync="showID"
            width="40%"
            :modal="false"
            top="22vh"
            >
           
            <span style="margin:0 0 0 3rem;">二维码：</span>
            <div style="text-align:center">

                <img :src="IDqrcode" alt="" style="width:15rem;">
            </div>
           
           
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showID = false">关　闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="发件人信息"  :visible.sync="addrShow" :modal="false" top="22vh">
            <el-form :model="sendAddr" :rules="rules" :inline="true">
                <el-form-item label="发件人姓名:" label-width="120px" prop="name">
                    <el-input v-model="sendAddr.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" label-width="120px" prop="mobile">
                    <el-input v-model="sendAddr.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="详细地址:" label-width="120px" prop="address">
                    <el-input v-model="sendAddr.address" autocomplete="off"  class="inp"></el-input>
                </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="addrShow = false">取 消</el-button>
                <el-button type="primary" @click="addAddr">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';

import {mapState, mapMutations} from 'vuex'

export default {
    data(){
        return{
           IDshow:false,
           showAddr:false,
           zheng:[],
           fan:[],
           IDqrcode:"",
           showID:false,
           dialogImageUrl: '',
           dialogVisible: false,
           erweima:"",
           addrShow:false,
           sendAddr: {
                name: '',
                mobile: '',
                address:"",
            },
            rules: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '收货地址不能为空', trigger: 'blur' },
                ],
            },
           
        }
    },
    computed: {
        ...mapState(['hasId'])
    },
    methods:{
        ...mapMutations(['hasIdChange']),
        submit(){
            let that=this
             if(this.zheng.length===0&&this.fan.length===0){
                alert('请上传图片');
                return;
            }

            
           
            this.$axios.post('/apiCard',this.qs.stringify({
                uid:window.sessionStorage.uid,
                path_z:this.zheng[0].content,
                path_f:this.fan[0].content
            })).then(res=>{
                console.log(res)
                if(res.data.code=200){
                    
                     MessageBox.alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                        closeOnClickModal:true,
                        type: 'success'
                    }).then(()=>{
                       window.sessionStorage.hasId=1
                       
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getID(){
            this.showID=true
            
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        getAddr(){
            this.addrShow=true
        },
        addAddr(){
            let that=this;
            for(let item in that.sendAddr){
                if(that.sendAddr[item]===""){
                    switch(item){
                        case 'name':
                            alert('用户名不能为空');
                            return;
                        case 'mobile':
                            alert('手机号不能为空');
                            return;
                        case 'address':
                            alert('地址不能为空');
                            return;
                    }
                }
            }
            if(!((/^1[3456789]\d{9}$/.test(that.sendAddr.mobile)||(/^[23456789][0135678][023456789]\d{7}$/.test(that.sendAddr.mobile))))){
                alert('请检查手机号格式！');
                return;
            }
            this.$axios.post('/addr',this.qs.stringify({
                ...that.sendAddr,
                uid:window.sessionStorage.uid             
            })).then(res=>{
                console.log(res)
                alert(res.data.msg)
                if(res.data.code==200){
                   window.sessionStorage.hasAddr=1
                   that.addrShow = false
                }
            })
        },
        imgUpload(){}
    },
    created(){
        let that=this
        this.IDshow=Number(window.sessionStorage.hasId);
        this.showAddr=Number(window.sessionStorage.hasAddr);
        
       this.$axios.post('/createCode',this.qs.stringify({
                uid:window.sessionStorage.uid
            })).then(res=>{
                console.log(res)
                that.IDqrcode=res.data.data
            })
    },
    mounted(){
        let that=this
        let timer= setInterval(()=>{
            
            // console.log(that.$refs.img.style.width)
            if( that.$refs.img.style.width=="300px"){
                that.$refs.img.style.width="300.1px"
            }else{
                that.$refs.img.style.width="300px"
            }
            setTimeout(()=>{
                clearInterval(timer)
            },2000)

        },50) 
        
    }
}
</script>

<style scoped>

.container{
    padding: 1rem;
    margin: 0 auto;
    width: 98vw;
}
.m{
    width: 37vw;
    margin: 0 auto;
    padding: 1rem;
    font-size: 1rem;
    background-color: rgba(255,255,255,0.7);
}
.container >>> .el-dialog{
    z-index: 9999;
}
.container >>> .van-uploader__upload{
    width: 290px!important;
}
.container >>> .van-uploader__preview-image{
    width: 290px!important;
}
.inp{
    width:30.5rem;
}
</style>