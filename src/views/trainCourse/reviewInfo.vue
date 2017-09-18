<template>
  <div class="reviewInfo">
    <div class="header">
      <span>{{reviewInfo.title}}</span>
      <span>发布时间:{{reviewInfo.releaseDate}}</span>
    </div>
    <div class="content">
      <div class="desc" v-html="reviewInfo.content">
        {{reviewInfo.content}}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods: {
          getReviewInfo(){
            let _this = this,
              info = {};
            if(_this.$route.query.articleId){
              info = _this.$route.query;
            }else{
              info = _this.$store.state.reviewParams;
            }
            let url = '/api/article/detail',
              param = {
                articleId:info.articleId,
                releasePosition:info.releasePosition
              };
            _this.$post(url,param).then(response=>{
              _this.reviewInfo = response;
            })
          }
        },
        created(){
            document.setTitle = function(t) {
              document.title = t;
              var i = document.createElement('iframe');
              i.src = '//m.baidu.com/favicon.ico';
              i.style.display = 'none';
              i.onload = function() {
                setTimeout(function(){
                  i.remove();
                }, 9)
              }
              document.body.appendChild(i);
            }

            setTimeout(function(){
              document.setTitle('回顾详情');
            }, 1);
          this.getReviewInfo();
        },
      mounted(){
        console.log(this.$route.query.courseId);
      },
        data () {
            return {
              reviewInfo:{}
            }
        }
    }
</script>

<style lang="scss">
  .reviewInfo{
    width: 100%;
    .header{
      width: 100%;
      background: white;
      padding: 10px 0 0 15px;
      font-size: 1.6rem;
      box-sizing: border-box;
      box-shadow: 0 2px 1px #E0DFE3;
      span:nth-child(2){
        font-size: 1.3rem;
        line-height: 30px;
        display: block;
      }
    }
    .content{
      width: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      background:white;
      .desc {
        width:100%;
        margin-bottom: 10px;
        img{
          width:100%;
          margin-top:10px;
        }
        .img-container {
          width: 100%;
          img{
            width: 100%;
          }
        }
      }
      .viewCourse{
        display: flex;
        padding:5px 0;
        div{
          width: calc(100% - 60px);
          padding-left: 10px;
          color: #09AEFB;
          line-height: 20px;
        }
      }
    }
  }
</style>
