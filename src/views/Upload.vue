<template>
    <div class="container">
        <h3>发件人身份证正面：</h3>
        <div style="display:flex;">
             <img src="../assets/zhen.jpg" ref="img"   style="width:9rem;height:5.5rem;border-radius:8px;display:inline-block;margin-top:1rem;">
             <van-uploader v-model="zheng" multiple preview-size="160px" :max-count=1 style="margin:1rem 0 0 1rem"/>
        </div>
          


        <h3 style="margin-top:2rem">发件人身份证反面：</h3>
        <div style="display:flex;">
             <img src="../assets/fan.jpg" alt="" ref="img"  style="width:9rem;height:5.5rem;border-radius:8px;display:inline-block;margin-top:1rem;">
            <van-uploader v-model="fan" multiple  preview-size="160px" :max-count=1 style="margin:1rem 0 0 1rem"/>
        </div>
        <div style="margin-top:.5rem">
            注意：请按样版样式上传。大小不超过4M
        </div>

        <div style="text-align:right">
            <el-button type="primary" style="margin:2rem auto 0;display:block" @click="submit">提交</el-button>
        </div>

    </div>
</template>

<script>
import { MessageBox } from 'element-ui';


export default {
    data(){
        return{
           zheng:[],
           fan:[]
        }
    },
    methods:{
        submit(){
            

            let that=this
            console.log(this.zheng[0].content)
            console.log(this.fan[0].content)
            this.$axios.post('/apiCard',this.qs.stringify({
                uid:that.$route.query.uid,
                path_z:this.zheng[0].content,
                path_f:this.fan[0].content
            })).then(res=>{
                console.log(res)
                if(res.data.code=200){
                     that.$toast.success(res.data.msg)
                    //  setTimeout(()=>{
                         
                    //  },1000)
                }
            }).catch(err=>{
                console.log(err)
            })

        }
    },
    created(){
       
    },
    components:{
      
    }
}
</script>

<style scoped>

.container{
    padding: 1rem;
}
.container >>> .van-uploader__preview-image{
    height: 5.5rem!important;
}
.container >>> .van-uploader__upload{
    height: 5.5rem!important;
}
h3{
    font-size: 1rem;
}
</style>