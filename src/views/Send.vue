<template>
    <div>
        <div class="container">
            <div class="title">
                收件人信息:
                <el-select v-model="value" placeholder="请选择收件人地址">
                    <el-option
                    v-for="item in addrList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>

                <span class="add" @click="showAddAddr">添加收件人信息</span>
            </div>
             <div class="title">
               物品信息:
                <el-form :model="goodInfo" :rules="goodsRules" :inline="true" style="margin:1rem 0 0 0;">
                    <el-form-item label="物品编号:" label-width="120px" prop="number">
                        <el-input v-model="goodInfo.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物品名称:" label-width="120px" prop="goods_name">
                        <el-input v-model="goodInfo.goods_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物品简介:" label-width="120px" prop="brief">
                        <el-input v-model="goodInfo.brief" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规格:" label-width="120px" prop="size">
                        <el-input v-model="goodInfo.size" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌:" label-width="120px" prop="brand">
                        <el-input v-model="goodInfo.brand" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物品数量:" label-width="120px" prop="num">
                        <el-input v-model="goodInfo.num" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="物品单价:" label-width="120px" prop="money">
                        <el-input v-model="goodInfo.money" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="总净重(KG):" label-width="120px">
                        <el-input v-model="goodInfo.suttle" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="行邮税号:" label-width="120px">
                        <el-input v-model="goodInfo.duty" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="重量:" label-width="120px">
                        <el-input v-model="goodInfo.weight" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="毛重-净重:" label-width="120px">
                        <el-input v-model="goodInfo.rough" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>

            </div>
            <div style="text-align:right">
                <el-button type="primary" @click="order">下 单</el-button>
            </div>
            











            <div>
                
                

                <!-- <el-form :model="receive" :rules="rules" class="demo-form-inline" ref="ruleForm"  :inline="true" label-width="100px">
                    <el-form-item label="收件人姓名" prop="name">
                        <el-input v-model="receive.name" autofocus></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="receive.phone"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="receive" :rules="rules" class="demo-form-inline" ref="ruleForm"  label-width="100px">
                    <el-form-item label="收件人地址" prop="addr">
                        <el-input v-model="receive.addr"></el-input>
                    </el-form-item>
                </el-form> -->
            </div>
        </div>






        <el-dialog title="收件人信息"  :visible.sync="addShow" :modal="false" top="22vh">
            <el-form :model="rece" :rules="rules" :inline="true">
                <el-form-item label="收件人姓名:" label-width="120px" prop="name">
                    <el-input v-model="rece.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" label-width="120px" prop="phone">
                    <el-input v-model="rece.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人身份证:" label-width="120px" prop="id">
                    <el-input v-model="rece.id" autocomplete="off" class="inp"></el-input>
                </el-form-item>
                <el-form-item label="详细地址:" label-width="120px" prop="addr">
                    <el-input v-model="rece.addr" autocomplete="off" class="inp"></el-input>
                </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="addShow = false">取 消</el-button>
                <el-button type="primary" @click="addAddr">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rece: {
                name: '',
                phone: '',
                addr:"",
                id:""
            },
            goodInfo:{
                number:"",
                goods_name:"",
                brief:"",
                size:"",
                brand:"",
                num:"",
                money:"",
                suttle:"",
                duty:"",
                weight:"",
                rough:"",
                
            },
            addrList:[],
            addShow:false,
            goodsRules:{
                number: [
                    { required: true, message: '物品编号不能为空', trigger: 'blur' },
                ],
                goods_name: [
                    { required: true, message: '物品名称不能为空', trigger: 'blur' },
                ],
                brief: [
                    { required: true, message: '物品介绍不能为空', trigger: 'blur' },
                ],
                size: [
                    { required: true, message: '规格不能为空', trigger: 'blur' },
                ],
                num: [
                    { required: true, message: '物品数量不能为空', trigger: 'blur' },
                ],
                brand: [
                    { required: true, message: '品牌不能为空', trigger: 'blur' },
                ],
                money: [
                    { required: true, message: '物品单价不能为空', trigger: 'blur' },
                ],
            },
            rules: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                ],
                id: [
                    { required: true, message: '身份证号码不能为空', trigger: 'blur' },
                ],
                addr: [
                    { required: true, message: '收货地址不能为空', trigger: 'blur' },
                ],
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
                }],
            value:""
        }
    },
    
    methods:{
       showAddAddr(){
           this.addShow=true;
       },
       getAddr(){
           let that=this;
           that.$axios.post('/address',that.qs.stringify({
               uid:window.sessionStorage.uid
           })).then(res=>{
               console.log(res)
                for(let item of res.data.data){
                    let addr={
                        label:item.name+" | "+item.address,
                        value:item.id
                        };
                    that.addrList.push(addr)
                    
                }
                console.log(that.addrList)
           }).catch(err=>{
               console.log(err)
           })
       },
       addAddr(){
           let that=this;
           
           for(let item in that.rece){
               if(!that.rece[item]){
                   switch(item){
                       case "name":
                       alert("收件人姓名不能为空");
                       break;
                       case "phone":
                       alert("手机号不能为空");
                       break;
                       case "id":
                       alert("身份证不能为空");
                       break;
                       case "addr":
                       alert("地址不能为空");
                       break;
                   }
                   return;
               }
           }
           if(!((/^1[3456789]\d{9}$/.test(that.rece.phone)||(/^[23456789][0135678][023456789]\d{7}$/.test(that.rece.phone))))){
               alert('请检查手机号格式');
               return;
           }
           that.$axios.post('/addressAdd',that.qs.stringify({
                mobile:that.rece.phone,
                ID_number:that.rece.id,
                uid:window.sessionStorage.uid,
                name:that.rece.name,
                address:that.rece.addr
           })).then(res=>{
               console.log(res.data)
               if(res.data.code==200){

                   alert(res.data.msg)
                   that.addShow=false;
                   that.$router.go(0)
                   
               }
           }).catch(err=>{
               
           })
       },
       order(){
           let that=this;
           that.goodInfo.uid=window.sessionStorage.uid;
           that.goodInfo.addressid=that.value;
           if(!that.goodInfo.addressid){
               alert('请检查收货人地址');
               return;
           }
           for(let item in that.goodInfo){
               if(!that.goodInfo[item]){
                   switch(item){
                       case "number":
                           alert('商品 编号不能为空');
                            return;
                        case "goods_name":
                           alert('商品名称不能为空');
                           return;
                        case "brief":
                          alert('商品介绍不能为空');
                          return;
                        case "size":
                          alert('商品规格不能为空');
                          return;
                        case "brand":
                          alert('商品品牌不能为空');
                          return;
                        case "num":
                          alert('商品数量不能为空');
                          return;
                        case "money":
                          alert('商品单价不能为空');
                          return;
                        default:
                    }     
                }
            }
            console.log(that.goodInfo)
            that.$axios.post('/Order',that.qs.stringify(that.goodInfo)).then(res=>{
                console.log(res.data)
                alert(res.data.msg)
            }).catch(err=>{
                console.log(err)
            })
       }
    },
    created () {
        this.getAddr()
    }
}
</script>

<style scoped>

.container{
    width: 50vw;
    margin: 3rem auto 0;
    font-size: 1.2rem;
    border: 1px solid #ddd;
    padding: 1rem 2rem;
    background-color: rgba(255,255,255,0.4);
    transition: 1s;
}
.container:hover{
    transform: scale(1.01);
    box-shadow: 0 0 15px #ccc;
}
.container >>> .el-input__inner{
    height: 30px;
    font-size:1rem;
}
.title{
    border-bottom:1px solid #ccc; 
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}
.container >>> .el-input__icon{
    line-height: 30px;
}
.container >>> .el-select{
    width: 35rem;
}
.add{
    color: #409EFF;
    margin: 0 0 0 2rem;
    text-decoration: underline;
    cursor: pointer;
}
.inp{
    width: 30.5rem;
}






</style>