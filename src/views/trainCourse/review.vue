<template>
  <div class="review">
    <div class="header" style="display: none">
      <input type="search" placeholder="请输入课程关键字">
      <div class="search">搜索</div>
    </div>
    <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" ref="scroller"  v-model="pullUpValue">
      <div>
      <div class="courseList">
        <div class="courseDesc" @click="goPage('reviewInfo',review)" v-for="review in reviewList">
          <div class="imgDiv"><img :src="review.coverFilePath" alt=""></div>
          <div class="descText">
            <div class="title">{{review.title}}</div>
            <div class="content" style="-webkit-box-orient: vertical">{{review.introduce}}</div>
            <span>发布时间:{{review.releaseDate}}</span>
          </div>
        </div>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
             style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <span v-show="pullUpValue.pullupStatus === 'loading'"></span>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Scroller} from 'vux';
  export default {
    components:{
      Scroller
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
        document.setTitle('回顾列表');
      }, 1);
      this.getReviewList();
    },
    methods: {
      goPage(page,param){
        let params = {
          "articleId":param.articleId,
          "releasePosition":param.releasePosition
        };
        this.$store.commit('setParam',params);
        this.$router.push({name:page});
      },
      loadMore(){
        this.getReviewList();
      },
      getReviewList(){
        let _this = this;
        _this.page +=1;
        let  url = `/api/article/list?page=${_this.page}&pageSize=10`,
          param = {
            page:_this.page,
            pageSize:10,
            releasePosition:'WQHG'
          };
        _this.$vux.loading.show({text:'loading'});
        _this.$post(url,param).then(response=>{
          _this.$vux.loading.hide();
          if(response.success) {
            response.rows.forEach(value=>{
              value.coverFilePath = value.coverFilePath?`${_this.$store.getters.getPictureUrl}${value.coverFilePath}`:_this.defaultImg;
              _this.reviewList.push(value);
            });
            if (response.rows.length < 10) {
              _this.$nextTick(() => {
                _this.$refs.scroller.reset();
              });
              _this.$nextTick(() => {
                _this.$refs.scroller.disablePullup();
              });
              _this.$vux.toast.show('无更多数据！', 'center');
              setTimeout(_this.$vux.toast.hide(), 1500);
              _this.loadMoreFlag = false;
            } else {
              _this.loadMoreFlag = true;
              _this.pullUpValue.pullupStatus = 'default';
              _this.$nextTick(() => {
                _this.$refs.scroller.reset();
              })
            }
          }
        })
      }
    },
    data () {
        return {
          reviewList:[],
          page:0,
          loadMoreFlag:false,
          pullUpValue: {
            pullupStatus: 'default'
          },
          defaultImg:require('../../assets/img/productFace.jpg')
        }
    }
  }
</script>

<style lang="scss">
  /*@import "../../assets/css/common.scss";*/
  .review{
    position:absolute;
    width:100%;
    min-height:100%;
    background:white;
    .header{
      width: 100%;
      line-height: 50px;
      padding-left: 15px;
      box-sizing: border-box;
      box-shadow: 0 2px 1px gainsboro;
      position: fixed;
      background: white;
      top: 0;
      input{
        width: 85%;
        height: 35px;
        border: none;
        outline: none;
        background: gainsboro;
        border-radius: 15px;
        padding-left: 15px;
      }
      .search{
        width: 13%;
        text-align: center;
        font-size: 1.6rem;
        color: #E6A914;
      }
    }
    .courseList{
      padding: 5px 15px;
      width: 100%;
      box-sizing: border-box;
      /*margin-top: 60px;*/
      .courseDesc{
        display:flex;
        align-items: center;
        padding: 10px 0 10px;
        border-bottom: 1px solid gainsboro;
        .imgDiv{
          width:35vw;
          height:25vw;
          img{
            width:100%;
            height:100%;
          }
        }
        .descText{
          width: calc(65% - 10px);
          padding-left: 10px;
          box-sizing: border-box;
          .title{
             font-size: 1.6rem;
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
             width: 100%;
           }
          .content{
             font-size: 1.3rem;
             line-height: 15px;
             color: #666;
             word-break: break-all;
             display: -webkit-box;
             -webkit-line-clamp: 3;
             overflow: hidden;
             margin: 5px 0;
             -webkit-box-orient: vertical;
           }
        }
      }
    }
  }
</style>
