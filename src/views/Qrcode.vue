<template>
    <div class="container">
        <div class="line">
            快递单号: &nbsp;{{detail.express}}
        </div>
        <div class="line">
            商品名称: &nbsp;{{detail.goods_name}}
        </div>
        <div class="line">
            商品品牌: &nbsp;{{detail.brand}}
        </div>
        <div class="line">
            商品价格: &nbsp;{{detail.money}}
        </div>
        <div class="line">
            商品重量: &nbsp;{{detail.weight}}
        </div>
        <div class="line">
            当前状态: &nbsp;
        </div>
    </div>
</template>
<script>


export default {
    data(){
        return{
            detail:{}
        }
    },
    methods:{
        getDetail(){
            let that=this;
            let express=this.$route.query.express;
            console.log(express)
            that.$axios.post('/showInfo',that.qs.stringify({
                express,
            })).then(res=>{
                that.detail=res.data.data
            })

        }
    },
    created(){
        this.getDetail()
    },
    components:{
      
    }
}
</script>

<style scoped>
.container{
    width: 100vw;
    font-size: 1rem;
    
}
.line{
    margin: 1rem;
}

</style>