<template>
    <div class="index">
        <div class="input">
            <el-form :model="order" :rules="rules"  label-width="100px" class="demo-ruleForm">
                <el-form-item prop="order">
                    <el-input placeholder="请输入要查询的订单编号" v-model.trim="order.order" class="input-with-select" autofocus @keyup.native.13="query">
                        <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
           
        </div>

        <div style="margin:2rem auto 40rem ;width:50vw;background:rgba(255,255,255,0.4);padding:1rem;" v-if="show">
            <div class="status">
                当前快递: <span style="color:#000;font-size:1.3rem;margin:0 0rem 0rem 0;">{{info.msg}}</span>
            </div>
            <el-timeline :reverse="false">
                <el-timeline-item
                v-for="(item, index) in info.data"
                color="#4e92fc"
                :key="index"
                :timestamp="item.time">
               <span style="color:#000"> {{item.status}}</span>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div class="info" v-if="!show">
            <div class="title">温馨提示:</div>
            <div style="display:flex;justify-content: space-between;">
                <div class="msgbox" style="background:rgba(245,177,177,0.18)">
                  <span class="num">1.</span>运输过程中，国外快递公司不会随便联系收件人，中国海关也不会直接联系收件人。<br /><span style="color:red">如有类似问题 请确认对方的身份 </span>（国内方派件的快递公司除外）请您提高警惕！
                </div>
                <div class="msgbox">
                  <span class="num">2.</span>如需更改收件人信息，<br/><span style="color:red">请与发件人(北美方)直接联系 </span>谢谢合作！
                </div>
                <div class="msgbox">
                  <span class="num">3.</span>签收包裹时，<br/><span style="color:red"> 请确认包裹的完整性与数量准确性后，方可签收。</span>
                </div>
            </div>
            <div class="msgbox" style="width:98%;background:rgba(176,239,236,0.2);">
               <span class="num">Tips:</span>如发生由于快递原因导致的包裹问题和疑问，请拍照记录包裹上的单号信息，及其他信息照片。收件人有权拒收包裹并及时通知发件人回馈问题。如果收件人在不清楚包裹情况下随意签名收包裹，事后我们将不予受理有关投诉及赔偿损失，敬请留意！
            </div>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
import { MessageBox } from 'element-ui';
export default {
    data(){
        return{
            order:{
                order:""
            },
            info:"",
            show:false,
            rules:{
                 order: [
                    { required: true, message: '单号不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        query(){
            let that=this;

            if(that.order.order==""){
                  MessageBox.alert('请检查单号格式', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                    }).then(() => {

                    })
                return;
            }
            
            let load=that.$loading()

            that.$axios.post('/expressCheck',that.qs.stringify({
                express:that.order.order
            })).then(res=>{
                console.log(res)
                load.close()
                if(res.data.code===200){
                    if(res.data.data.length==0){
                        MessageBox.alert('暂无物流信息', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                            }).then(() => {

                            })
                            return;
                    }
                    that.info=res.data;
                   
                    that.show=true;
                }else{
                    alert('单号：'+that.order.order+"  暂无信息")
                }
            }).catch(err=>{
                 load.close()
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.input{
    width: 40vw;
    margin: 4rem auto 0;
}
.input >>> .el-input-group__append .el-button{
    margin: 0;
}
.input >>> .el-input-group__append{
    box-sizing: border-box;
    background-color: #4e92fc;
    border: 0;
}
.input >>> .el-icon-search:before{
   font-size: 1.5rem;
   color:#fff;
   
}
.input >>> .el-input__inner{
    height: 3rem;
    font-size: 1.2rem;
    margin: 1px 0 0 0;   
}
.input >>> .el-form-item__content{
    margin: 0 !important;
}
.input >>> .el-input-group__append{
    /* border: 0; */
}
.info{
    border: 1px solid #ccc;
    width: 50vw;
    margin: 5rem auto 17rem; 
    padding: 1rem;
    font-size: 1.2rem;
    background-color: rgba(255,255,255,0.4);
    transition: 1s;
    box-sizing: border-box;
}
.info:hover{
    transform: scale(1.01);
    box-shadow: 0 0 15px #ccc;
}
.title{
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    font-weight: 600;
}
.msgbox{
    margin: 1rem 0 0 0;
    padding:1rem 0 1rem 1rem; 
    border-radius: 8px;
    width: 17rem;
}
.msgbox:nth-child(2n){
    background-color: rgba(104, 245, 137, 0.164);
}
.msgbox:nth-child(2n-1){
    background-color: rgba(245, 229, 177, 0.657);
}
.num{
    font-size: 2rem;
}
.el-timeline-item >>> .el-timeline-item__content{
    color: #fff;
}
/* .el-timeline-item >>>   */

.index >>> .el-timeline{
    font-size:1.5rem;
}
.input >>>.el-timeline .el-timeline-item__wrapper .el-timeline-item__content{
    color: #f1b761 !important;
}
.index >>> .el-timeline-item__timestamp{
   color: #000;
    font-size: 1rem;
    
}
.status{
    font-size: 1rem;
    color: #fff;
    margin: 0 0 1rem 0;
}
</style>