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
             <div v-if="!isLogin" class="login">
                <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号"
                    prop="uname"
                    >
                        <el-input v-model.trim="user.uname" autofocus></el-input>
                    </el-form-item>
                    <el-form-item label="密　码" prop="upwd">
                        <el-input v-model.trim="user.upwd" show-password @keyup.native.13.prevent="doLogin()"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click.prevent="doLogin()" style="margin:0 0 0 4rem;">登录下单</el-button>
                </el-form>
             </div>
             <div v-if="isLogin" class="logout">
                 <table></table>
                 
                 <el-button type="primary" style="float:right" @click="doLogout">退出当前账号</el-button>
                 <!-- <el-button type="primary" style="float:right;margin:0 2rem 0 0;" @click="getID">上传有效证件</el-button> -->
                 <div class="box">
                     <h3 style="margin:0 0 1rem 0;">我的订单列表:</h3>
                 <el-table
                    :data="addrList"
                    style="width: 100%"
                    border
                    :row-class-name="tableRowClassName">
                        <el-table-column
                            prop="express"
                            label="追踪码"
                            width="90px">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                             width="60px">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机号"
                             width="100px">
                        </el-table-column>
                        <el-table-column
                            prop="goods_name"
                            label="包裹内件">
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="数量"
                            width="60px">
                        </el-table-column>
                        <el-table-column
                            label="二维码"
                            width="80px">
                            <template slot-scope="scope">
                                <el-button @click="showQrcode(scope.row)" type="text" size="small">查看二维码</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="60px">
                         <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">复制</el-button>
                        </template>
                        </el-table-column>
                </el-table>
                <div style="display:flex;flex-direction: row-reverse;margin:2rem 0 0 0;">
                    <el-pagination
                        background
                        :current-page="currentPage"
                        @current-change="change"
                        layout="prev, pager, next"
                        :page-size="6"
                        :total="total">
                    </el-pagination>
                </div>
                </div>
             </div>
        </div>
        <el-dialog
            title="订单二维码"
            :visible.sync="qrShow"
            width="40%"
            :modal="false"
            top="22vh"
            >
            单号：<span style="margin:0 0 0 1rem;color:#409EFF;">{{order}}</span>
            <span style="margin:0 0 0 3rem;">二维码：</span>
            <div style="text-align:center">

                <img :src="qrcode" alt="">
            </div>
           
           
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="qrShow = false">关　闭</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="扫描二维码上传证件"
            :visible.sync="showID"
            width="40%"
            :modal="false"
            top="22vh"
            >
           
            <span style="margin:0 0 0 3rem;">二维码：</span>
            <div style="text-align:center">

                <img :src="IDqrcode" alt="">
            </div>
           
           
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showID = false">关　闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import {mapState,mapMutations} from 'vuex';
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            user:{
                uname:"",
                upwd:""
            },
            total:0,
            showID:false,
            qrcode:"",
            IDqrcode:"",
            order:-1,
            qrShow:false,
            addrList:[],
            rules:{
                uname: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                upwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
            },
            currentPage:1,
            count:""
        }
    },
    computed: {
      ...mapState(['isLogin','hasId'])
    },
    methods:{
        ...mapMutations(['login','hasIdChange']),
        doLogin(e){
            let that=this;
            for(let item in this.user){
                if(!this.user[item]) return
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
            let loading=this.$loading()
            that.$axios.post('/dologin',that.qs.stringify({
                phone:that.user.uname,
                password:that.user.upwd
            })).then((res)=>{
                
               console.log(res.data)
               loading.close()
                if(res.data.code==200){
                    window.sessionStorage.uid=res.data.data.id
                    that.login(true)
                    
                    MessageBox.alert(res.data.msg, '提示', {
                        confirmButtonText: '确定',
                        closeOnClickModal:true,
                        type: 'success'
                    }).then(()=>{
                    //    window.sessionStorage.uid=res.data.data.id
                    //    that.login(true)
                   
                        if(res.data.data.ID_number){
                            window.sessionStorage.hasId=1
                        }else{
                            window.sessionStorage.hasId=0
                        }
                        if(res.data.data.address){
                            window.sessionStorage.hasAddr=1
                        }else{
                            window.sessionStorage.hasAddr=0
                        }
                        // that.hasIdChange(window.sessionStorage.hasId)
                        that.$router.go(0)
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
                loading.close()
                console.log(err)

            })



           
        },
        doLogout(){
            this.login(false)
            window.sessionStorage.removeItem("uid");
        },
        getList(){
            let that=this;
            if(that.isLogin&&window.sessionStorage.uid){
                that.$axios.post('/orderList',that.qs.stringify({
                    uid:window.sessionStorage.uid,
                    page:that.currentPage
                })).then(res=>{
                    console.log(res)
                    let list=res.data.data.data;
                    for(let item of list){
                       
                    }
                    that.addrList=list
                   
                    that.total=Number(res.data.data.total)
                    console.log(that.total)
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 1) {
                return '';
            } else if (rowIndex%2 === 0) {
                return 'success-row';
            }
                return '';
        },
        change(currentPage){
            let that=this;
            that.$axios.post('/orderList',that.qs.stringify({
                    uid:window.sessionStorage.uid,
                    page:currentPage
                })).then(res=>{
                    console.log(res)
                    let list=res.data.data.data;
                    
                    that.addrList=list
                }).catch(err=>{
                    console.log(err)
                })
        },
        handleClick(row){
            let that=this;
            let goods_detail={};
            for(let item in row){
                goods_detail[item]=row[item]
            }
            console.log(goods_detail)
            delete goods_detail['id'];
            delete goods_detail['express'];

            goods_detail.uid=window.sessionStorage.uid;
            console.log(goods_detail)
            that.$axios.post('/Order',that.qs.stringify(goods_detail)).then(res=>{
                console.log(res.data)
                alert(res.data.msg)
                that.$router.go(0)
            }).catch(err=>{
                console.log(err)
            })
        },
        showQrcode(row){
            let that=this;
            that.order=row.express
            that.$axios.post("/qrCode",that.qs.stringify({
                id:row.id
            })).then(res=>{
                console.log(res)
                if(res.data.code===200){
                    that.qrcode=res.data.data
                    that.qrShow=true
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getID(){
            this.showID=true
        }
    },
    created () {
        if(window.sessionStorage.uid===undefined||window.sessionStorage.uid===""){
            this.login(false)
        }
        this.getList()
    }
}
</script>

<style scoped>
.container{
    
} 
.login{
    width: 20vw;
    margin: 10rem auto 0;
    text-align: center;
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
}
.logout{
  width: 55vw;
  margin: 1rem auto 0;

}
.login{
    background-color: rgba(255,255,255,0.8);
    padding: 5rem 5rem 5rem 2rem;
    border-radius: 8px;
}
 .el-table >>> .warning-row {
    background: oldlace;
  }

.el-table >>> .success-row {
    background: #f0f9eb;
  }
.el-table >>> .el-cell{
    color: #000;
}
.box{
    padding: 1rem;
    margin:5rem 0 2rem 0;
    font-size:1.2rem;
    color:#666;
    background-color: rgba(255,255,255,0.8);
}
.box >>> .el-table{
    background-color: transparent;
}
.box >>> .el-table th, .el-table tr{
    background-color: '';
}
.box >>> .el-table th, .el-table tr{
    background-color: '';
}
</style>