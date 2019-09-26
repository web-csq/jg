<template>
    <div>
        <div style="width:100vw;margin:0 auto;background:#fff;" class="intr">
          <div style="margin:0rem auto 0;width:56vw;position:absolute;left:22%" >
              <van-notice-bar
                :text="text"
                delay="1"
                left-icon="volume-o"
              />
            </div>
          <img src="../assets/serve.png" alt="" class="img">
          <div>
            
          </div>
          <div class="intr">
            
            <h2 style="margin:1rem 0 0 0;">企业概述:</h2>
            <p>加国环球快递创建于 1949 年 10 月 1 日，是一家集快递、跨境、快运、商业、云仓、航空、 金融、智能、传媒等生态版块于一体的综合物流服务品牌企业。2000 年 10 月 27 日在美国 纽约证券交易所上市，向全世界打开了一扇了解中国快递发展的 “窗口”。
            </p><p>

加国环球快递在行业内率先开通跨省际网络班车、实施并完善有偿派送机制、优化二级中转 费结算体系、推出全国网络股份制；率先成立网络互助会、加国大家园并实施 “亲情 5+3” 等福利政策。
</p><p>
截至 2019 年 3 月 31 日，加国环球快递全网服务网点 4656515 个，转运中心 863514 个，直接网络 合作伙伴 656400 家，干线运输车辆约 5500 辆 (其中约 2800 辆为高运力甩挂车)，干线路由 2100 条，网络通达 98% 以上的区县，乡镇覆盖率超过 89%。
</p><p>
加国环球快递先后在中国台港澳地区、美国、法国、德国、日韩、新西兰、俄罗斯、迪拜、 马来西亚等地设立中转仓，同时推出欧盟专线、美国专线、日韩专线、新澳专线、东盟专线、中东专线、非洲专线及全球其他国家专线的包裹寄递、物流配送及其相关业务。</p>
          </div>
          <div class="intr" style="margin:2rem auto 0">
            <h2 style="margin:1rem 0 0 0;">联系我们:</h2>
            <p style="margin-top:1rem;">企业热线:　<span style="color:#409EFF">1888888888</span> </p>
            <p style="margin-top:1rem;">企业邮箱:　<span style="color:#409EFF">1888888888@163.com</span> </p>
            <p style="height:3rem"></p>
          </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
         text:"加国环球快递，是国内外有深度的一家快递企业，至今已有70年的发展历史，常年代购、代发，优质花旗参、海参奶粉、水奶、服饰鞋帽、保健品化妆品、手表、生活用品。为您提供便捷的代购生活，为您的快递保驾护航。加国环球快递，值得您信赖的快递"
        }
    },
    methods:{

    },
    components:{
      
    }
}
</script>

<style scoped>
h2{
    font-size: 1.5rem;
}
.img{
  display: block;
  margin:0 auto;
  width: 100vw;
  height:80vh;
}
.intr{
  width: 60vw;
  margin: 0 auto;
}
.intr p{
  margin:2rem 0 0 2rem;
  font-size:1.2rem;
  letter-spacing: 1px;
}
.intr >>> .van-notice-bar{
  font-size: 2rem;
  height: 55px;
  line-height: 33px;
  color: #fff;
  background-color: transparent; 
}
.intr >>> .van-notice-bar__wrap{
  height: 33px;
}
</style>