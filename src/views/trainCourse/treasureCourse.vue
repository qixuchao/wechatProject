<template>
  <div class="course" v-if="openId">
    <div class="header">课程精选</div>
    <swiper :list="imgList" v-model="demo01_index" :loop="true" :auto="true" :interval="5000" @click.native="imgGo(demo01_index)" @on-index-change="demo01_onIndexChange"></swiper>
    <div class="header">最新课程
      <div class="imgIcon" @click="goPage('trainCourse')">
        <img class="img" :src="logo" alt=""/>
      </div>
    </div>
    <div v-for="(item,index) in newCourseList" class="courseList" @click="goCourseInfo(item)">
      <div>
        <div class="left">{{index+1}}. {{item.topic}}</div>
        <div class="right">{{item.courseDate}}开课
          <img class="arrows" :src="logo1" alt=""/></div>
      </div>
    </div>
    <div class="header">往期回顾
      <div class="imgIcon" @click="goPage('review')">
        <img class="img" :src="logo" alt=""/>
      </div>
    </div>
    <panel :list="list" :type="type" on-item-click></panel>
    <div class="label">
      <div class="circle" style="background: #44cffe" @click="goPage('trainCourse')">
        <span>培训课程</span>
      </div>
      <div class="circle" style="background: #ffce1b" @click="goPage('operationalSupport')">
        <span>业务支援</span>
      </div>
      <div class="circle" style="background: #ff6868" @click="goPage('mineCourse')">
        <span>我的课程</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import {Swiper,Panel} from 'vux'
  export default {
    components:{Swiper,Panel},
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
      document.setTitle('财课堂');
    }, 1);
  },
    beforeRouteEnter(to, from, next){
      next(vm=>{
        if(window.localStorage.wechatOpenid !==window.localStorage.openid){

        }else {
          vm.openId = window.localStorage.wechatOpenid;
          vm.getBoutique().then(response=> {
            vm.getNewCourseList().then(response=> {
              vm.getReviewList();
            })
          });
        }
      })
    },
    mounted(){

    },
    beforeCreate(){
      this.openId = '';
    },
    methods:{
      goCourseInfo(item){
        this.$router.push({name:'courseDetail',query:{courseId:item.courseId}});
      },
      imgGo(demo01_index){
        console.log(demo01_index);
        this.$router.push({name:'courseDetail',query:{courseId:this.imgList[demo01_index].dataSourceId}});
      },
      stringSplit(string,a){
        let date1 = string.split(' ')[0];
        return date1.split(a)[1]+'月'+ date1.split(a)[2]+'日';
      },
      demo01_onIndexChange (index) {

      },
      goPage(page){
        this.$router.push({name:page})
      },
      getBoutique(){
        return new Promise(resolve=>{
          let _this = this;
          let url = '/api/article/LBT';
          _this.$vux.loading.show({text:'loading'});
          let params = {
            page:1,
            pageSize:20,
            dataSource:'COURSE',
            wechatFlag:'Y'
          };
          _this.$post(`${url}?page=1&pageSize=20`,params).then(response=>{
            if(response.success){
              response.rows.forEach(value=>{
                let obj = {
                  url:'javascript',
                  img:_this.$store.getters.getPictureUrl+value.wechatFileSrc,
                  title:value.dataSourceContent
                };
                _this.imgList.push(obj);
              });
              resolve(response.success);
            }else{
              _this.$vux.loading.hide();
              _this.$vux.toast.show({text:response.message})
            }
          })
        })
      },
      getNewCourseList(){
        return new Promise(resolve=>{
          let _this = this;
          let url = '/api/course/list';
          let params = {
            page:1,
            pageSize:5,
            wechatFlag:'Y'
          };
          _this.$post(`${url}?page=1&pageSize=5`,params).then(response=>{
            if(response.success){
              response.rows.forEach((value,item)=>{
                if(item<5){
                  value.courseDate = _this.stringSplit(value.courseDate,'-');
                  _this.newCourseList.push(value);
                }
              });
              resolve(response.success);
            }else{
              _this.$vux.loading.hide();
              _this.$vux.toast.show({text:response.message})
            }
          })
        })
      },
      getReviewList(){
        let _this = this,
          params = {
            page:1,
            pagesize:3,
            releasePosition:'WQHG'
          },
          url = '/api/article/list?page=1&pageSize=3';
        _this.$post(url,params).then(response=>{
          _this.$vux.loading.hide();
          if(response.success){
            response.rows.forEach((value,item)=>{
              let listObj = {
                src: `${_this.$store.getters.getPictureUrl}${value.coverFilePath}`,
                title: value.title,
                desc: value.releaseDate,
                url: {
                  name:'reviewInfo',
                  query:{articleId:value.articleId,releasePosition:value.releasePosition},
                  replace:false
                }
              };
              _this.list.push(listObj);
            })
          }else{
            _this.$vux.toast.show({text:response.message})
          }
        });
      }
    },
    data(){
      return{
        demo01_index: 0,
        imgList:[],
        newCourseList:[],
        openId:'',
        logo:require('../../assets/course/icon_more@3x.png'),
        type: '1',
        list: [],
        logo1:require('../../assets/course/icon_right@3x.png')
      }
    }
  }
</script>
<style lang="scss">
  .course {
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    background: white;
    padding:0 15px;
    min-height: 100px;
    p {
      margin: 0;
    }
    div{
      display: block;
    }
    .header {
      margin: 20px 0 13px;
      font-size: 16px;
      color: #53595f;
      border-left: 3px solid burlywood;
      padding-left: 10px;
      line-height: 21px;
      .imgIcon{
        display: inline-block;
        float: right;
        .img {
          height: 7px;
        }
      }
    }
    .vux-slider > .vux-swiper {
      border-radius: 5px;
    }

    .courseList {
      padding: 5px 0;
      line-height: 20px;

    div {
      display: inline;

    .left {
      width: 65%;
      font-size: 16px;
      color: #333333;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .right {
      float: right;
      font-size: 12px;
      color: #999999;
      margin-top: 1px;

    .arrows {
      height: 15px;
      top: 3px;
      position: relative;
      margin-left: 10px;
    }

    }
    }
    }
    a.weui-media-box {
      color: #000000;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      text-decoration: none;
      padding: 10px 0;
      &:before{
         left:0;
       }
    }
    .weui-media-box_appmsg .weui-media-box__hd {
      margin-right: .8em;
      width: 22vw;
       height: auto;
      line-height: 60px;
      text-align: center;
    }
  .weui-media-box__bd{
      padding: 0 0 5px;
    }
    .weui-media-box__title {
      font-weight: 400;
      margin: 0;
      font-size: 16px;
      width: auto;
      /*overflow: hidden;*/
      /*text-overflow: ellipsis;*/
      /*/!* white-space: nowrap; *!/*/
      /*word-wrap: normal;*/
      /*word-break: break-all;*/
    }

    .label {
      position: fixed;
      height: auto;
      bottom: 50px;
      text-align: center;
      margin-left:5px;

      .circle {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-top: 20px;
        padding: 5px;
        opacity: 0.9;
        line-height:18px;
        display:flex;
        align-items:center;
        span {
          font-size: 14px;
          letter-spacing: 2px;
          color: white;
          padding-left: 2px;
        }
      }
    }
  }
</style>
