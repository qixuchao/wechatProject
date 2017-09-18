<template>
  <div class="mineCourse" v-if="openId">

    <div class="searchBar">
      <div class="searchDev">
        <input type="search" placeholder="请输入课程关键字" v-model="keyWord"/>
        <span @click="screen">搜索</span>
      </div>
    </div>

    <scroller v-model="scrollerStatus" height="-50" style="margin-top: 50px" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="loadMore">
      <div class="list">
        <div class="courseList" v-for="(list,index) in courseList" @click="goDetail1(index)">
          <div class="courseDesc">
            <span style="font-size: 1.4rem;color:#333333">{{list.topic}}</span> <span
            :class="list.class">{{list.state}}</span>

            <div style="font-size: 1.4rem;color:#333333">主讲讲师: {{list.lecturer}}</div>
            <div><span style="font-size: 1rem;color:#999999">课程时间: {{list.courseDate}}-{{list.endTime}}</span><span
              class="type">{{list.trainingMethod}}</span></div>
          </div>
          <div class="courseStatus">
            <div :class="{textButton:list.btn,textButton_new:!list.btn}" @click.stop="goDetail2(index)"><span>{{list.title}}</span></div>

          </div>
        </div>
      </div>
    </scroller>

    <!--左边业务悬浮框-->
    <div class="label">
      <div class="circle" style="background: #44cffe" @click="goPage('/treasureCourse')">
        <span>培训课程</span>
      </div>
      <div class="circle" style="background: #ffce1b" @click="goPage('/operationalSupport')">
        <span>业务支援</span>
      </div>
      <div class="circle" style="background: #ff6868" @click="goPage('/mineCourse')">
        <span>我的课程</span>
      </div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import {Scroller} from 'vux';

  export default {
    components: {
      Scroller
    },
    beforeCreate(){
      this.openId = '';
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
        document.setTitle('我的课程');
      }, 1);
  },
    data()
  {
    return {
      courseList: [],
      channelId: null,
      openId:'',
      keyWord: '',
      screen1:{},
      upobj: {
        content: '',
        pullUpHeight: 60,
        height: 40,
        autoRerefresh: false,
        downContent: '',
        upContent: '',
        loadingContent: '',
        clsPrefix: 'xs-plugin-pullup-'
      },
      showUp: true,
      isbounce: false,
      total: null,
      scrollerStatus: {
        pullupStatus: 'default'
      },
      btn:''

    }
  },
  mounted(){
    if(window.localStorage.wechatOpenid !==window.localStorage.openid){
    }else {
      var vm = this;
      vm.openId = window.localStorage.wechatOpenid;
      vm.channelId = JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
      vm.$vux.loading.show({text: 'loading'});
      console.log(vm.scrollerStatus.pullupStatus);
      vm.$nextTick(() => {
        vm.$refs.scroller.reset()
      })
      Date.prototype.format = function (format) {   //格式化时间
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }
        return format;
      };
      vm.screen1 = {
        "channelId": vm.channelId,
        "page": 1,
        "pageSize": 20
      };
      vm.$post('/api/course/enrollList?page=1&pageSize=20',
        vm.screen1
      ).then(function (response) {
        vm.$vux.loading.hide();
        if (response.total === 0) {
          vm.$vux.toast.show({text: '暂无数据'});
        }
        vm.total = response.total;
        vm.courseList = response.rows;
        vm.scrollerStatus.pullupStatus = 'default'
        vm.$nextTick(() => {
          vm.$refs.scroller.reset()
        })
        if (vm.courseList.length != 0) {

          for (let i in vm.courseList) {
            let start = new Date(vm.courseList[i].courseDate.replace(/-/g, '/')).getTime();
            let time = new Date(vm.courseList[i].duration * 60000 + start);
            vm.courseList[i].courseDate = new Date(vm.courseList[i].courseDate.replace(/-/g, '/')).format('MM-dd hh:mm');
            time = time.format('hh:mm');
            vm.courseList[i].courseDate = vm.courseList[i].courseDate.toLocaleString();
            vm.$set(vm.courseList[i], 'endTime', time.toLocaleString());
            if (vm.courseList[i].status === "NOTSTARTED") {
              if (vm.courseList[i].enrollFlag === 'P') {
                if (vm.courseList[i].price > 0) {
                  vm.$set(vm.courseList[i], 'title', '待支付');
                  vm.$set(vm.courseList[i], 'btn', true);
                } else {
                  vm.$set(vm.courseList[i], 'title', '已报名');
                  vm.$set(vm.courseList[i], 'btn', false);
                }

              } else {
                vm.$set(vm.courseList[i], 'title', '已报名');
                vm.$set(vm.courseList[i], 'btn', false);
              }
            } else if (vm.courseList[i].status === 'COMPLETE' && vm.courseList[i].enrollFlag === 'Y') {
              if (vm.courseList[i].evaluateFlag === 'Y') {
                vm.$set(vm.courseList[i], 'title', '已评价');
                vm.$set(vm.courseList[i], 'btn', false);
              } else {
                vm.$set(vm.courseList[i], 'title', '评价');
                vm.$set(vm.courseList[i], 'btn', true);
              }
            }
            else {
              vm.$set(vm.courseList[i], 'title', '查看');
              vm.$set(vm.courseList[i], 'btn', true);
            }
            if (vm.courseList[i].status === "NOTSTARTED") {
              vm.$set(vm.courseList[i], 'class', 'normal');
              vm.$set(vm.courseList[i], 'state', '未开始');
            }
            if (vm.courseList[i].status === "COMPLETE") {
              vm.$set(vm.courseList[i], 'class', 'end');
              vm.$set(vm.courseList[i], 'state', '已结束');
            }
            if (vm.courseList[i].status === "INPROCESS") {
              vm.$set(vm.courseList[i], 'class', 'active');
              vm.$set(vm.courseList[i], 'state', '进行中');
            }


            if (vm.courseList[i].trainingMethod === 'ONLINE') {
              vm.courseList[i].trainingMethod = "线上";
            }
            if (vm.courseList[i].trainingMethod === 'LINE') {
              vm.courseList[i].trainingMethod = "线下";
            }
            if (vm.courseList[i].trainingMethod === 'ALLLINE') {
              vm.courseList[i].trainingMethod = "线上及线下";
            }

          }
        }
        else {
          vm.$vux.toast.show({text: '无课程信息'});
        }


      }, function (response) {
        console.log("接口出错了");
      })
    }
  },

  methods: {
    goPage(page)
    {
      var vm = this;
      vm.$router.push({path: page});
    }
  ,
    screen:function () {
      var vm = this;
      vm.$vux.loading.show({text:'loading'});
      vm.screen1= {
        'channelId': vm.channelId,
        'topic': vm.keyWord,
        "page":1,
        "pageSize":20
      };
      vm.$post('/api/course/enrollList?page=1&pageSize=20',vm.screen1).then(function (response) {
        vm.$vux.loading.hide();
        if(response.total===0){
          vm.$vux.toast.show({text:'暂无数据'});
        }
        vm.total=response.total;
        vm.courseList = response.rows;
        vm.scrollerStatus.pullupStatus = 'default'
        vm.$nextTick(() => {
          vm.$refs.scroller.reset()
        })
        if (vm.courseList.length != 0) {
          for (let i in vm.courseList) {
            let start = new Date(vm.courseList[i].courseDate.replace(/-/g,'/')).getTime();
            let time = new Date(vm.courseList[i].duration * 60000 + start);
            vm.courseList[i].courseDate = new Date(vm.courseList[i].courseDate.replace(/-/g,'/')).format('MM-dd hh:mm');
            time = time.format('hh:mm');
            vm.$set(vm.courseList[i], 'endTime', time);
            if(vm.courseList[i].status==="NOTSTARTED"){
              if(vm.courseList[i].enrollFlag==='P'){
                if(vm.courseList[i].price>0){
                  vm.$set(vm.courseList[i],'title','待支付');
                  vm.$set(vm.courseList[i],'btn',true);
                }else{
                  vm.$set(vm.courseList[i],'title','已报名');
                  vm.$set(vm.courseList[i],'btn',false);
                }

              }else{
                vm.$set(vm.courseList[i],'title','已报名');
                vm.$set(vm.courseList[i],'btn',false);
              }
            }else if(vm.courseList[i].status ==='COMPLETE' && vm.courseList[i].enrollFlag === 'Y' )
            {
              if( vm.courseList[i].evaluateFlag === 'Y'){
                vm.$set(vm.courseList[i],'title','已评价');
                vm.$set(vm.courseList[i],'btn',false);
              }else{
                vm.$set(vm.courseList[i],'title','评价');
                vm.$set(vm.courseList[i],'btn',true);
              }
            }
            else {
              vm.$set(vm.courseList[i],'title','查看');
              vm.$set(vm.courseList[i],'btn',true);
            }

            if (vm.courseList[i].status === "NOTSTARTED") {
              vm.$set(vm.courseList[i], 'class', 'normal');
              vm.$set(vm.courseList[i], 'state', '未开始');
            }
            if (vm.courseList[i].status === "COMPLETE") {
              vm.$set(vm.courseList[i], 'class', 'end');
              vm.$set(vm.courseList[i], 'state', '已结束');
            }
            if (vm.courseList[i].status === "INPROCESS") {
              vm.$set(vm.courseList[i], 'class', 'active');
              vm.$set(vm.courseList[i], 'state', '进行中');
            }

            if (vm.courseList[i].trainingMethod === 'ONLINE') {
              vm.courseList[i].trainingMethod = "线上";
            }
            if (vm.courseList[i].trainingMethod === 'LINE') {
              vm.courseList[i].trainingMethod = "线下";
            }
            if (vm.courseList[i].trainingMethod === 'ALLLINE') {
              vm.courseList[i].trainingMethod = "线上及线下";
            }
          }
        }
        else{
          vm.$vux.toast.show({text:'无课程信息'});
        }

      }, function (response) {
        console.log('接口出错了');
      })
    }
  ,
    //去课程详情
    goDetail1:function (index) {
      var vm = this;
      vm.$router.push({path: '/courseDetail',query:{courseId:vm.courseList[index].courseId}});
    }
  ,
    //查看课程详情或评价
    goDetail2:function (index) {
      var vm = this;
      console.log(vm.courseList[index].btn);
      if(!vm.courseList[index].btn){
       return;
      }else {
        if (vm.courseList[index].title === "查看") {
          vm.$router.push({path: '/courseDetail',query:{courseId:vm.courseList[index].courseId}});
        }

       if (vm.courseList[index].title === '评价') {
        //去评价
         vm.$router.push({path:'/evaluateCourse',query:{courseId:vm.courseList[index].courseId}});

      }
        if (vm.courseList[index].title === '待支付') {
          //去支付
          var list=vm.courseList[index];
          let amount =list.students.length*list.price,
            sourceId = '';
          list.students.forEach((value,index)=>{
            sourceId += value.lineId+',';
          });
          var param = {
            amount: amount,
            orderContent: "课程支付",
            orderSubject: list.topic,
            sourceId: sourceId.substr(0,sourceId.length-1),
            sourceType: "COURSE"
          };
          vm.$router.push({path:'/onlinePayment',query:{courseId:list.courseId,payInfo:param}});

        }
      }


    },
    loadMore(){
      var vm=this;
      if(vm.total===vm.courseList.length){
        vm.$vux.toast.show({text:'已经到底了'});
      }else{
        vm.$vux.loading.show({text:'loading'});
        var page=++vm.screen1.page;
        vm.$post('/api/course/enrollList?page='+page+'&pageSize=20',vm.screen1).then(function (response) {
          vm.$vux.loading.hide();
          if(response.total===0){
            vm.$vux.toast.show({text:'暂无数据'});
          }
          vm.total=response.total;
          var list=response.rows;
            for (let i in list) {
              let start = new Date(list[i].courseDate.replace(/-/g,'/')).getTime();
              let time = new Date(list[i].duration * 60000 + start);
              list[i].courseDate = new Date(list[i].courseDate.replace(/-/g,'/')).format('MM-dd hh:mm');
              time = time.format('hh:mm');
              vm.$set(list[i], 'endTime', time);
              if(list[i].status==="NOTSTARTED"){
                if(list[i].enrollFlag==='P'){
                  if(list[i].price>0){
                    vm.$set(list[i],'title','待支付');
                    vm.$set(list[i],'btn',true);
                  }else{
                    vm.$set(list[i],'title','已报名');
                    vm.$set(list[i],'btn',false);
                  }

                }else{
                  vm.$set(list[i],'title','已报名');
                  vm.$set(list[i],'btn',false);
                }
              }else if(list[i].status ==='COMPLETE' && list[i].enrollFlag === 'Y' )
              {
                if(list[i].evaluateFlag === 'Y'){
                  vm.$set(list[i],'title','已评价');
                  vm.$set(list[i],'btn',false);
                }else{
                  vm.$set(list[i],'title','评价');
                  vm.$set(list[i],'btn',true);
                }
              }
              else {
                vm.$set(list[i],'title','查看');
                vm.$set(list[i],'btn',true);
              }
              if (list[i].status === "NOTSTARTED") {
                vm.$set(list[i], 'class', 'normal');
                vm.$set(list[i], 'state', '未开始');
              }
              if (list[i].status === "COMPLETE") {
                vm.$set(list[i], 'class', 'end');
                vm.$set(list[i], 'state', '已结束');
              }
              if (list[i].status === "INPROCESS") {
                vm.$set(list[i], 'class', 'active');
                vm.$set(list[i], 'state', '进行中');
              }

              if (list[i].trainingMethod === 'ONLINE') {
                list[i].trainingMethod = "线上";
              }
              if (list[i].trainingMethod === 'LINE') {
                list[i].trainingMethod = "线下";
              }
              if (list[i].trainingMethod === 'ALLLINE') {
                list[i].trainingMethod = "线上及线下";
              }
            }
            vm.courseList=vm.courseList.concat(list);
            vm.scrollerStatus.pullupStatus = 'default'
            vm.$nextTick(() => {
              vm.$refs.scroller.reset()
            })
        },function(response){
          vm.$vux.toast.show({text:'接口出错了'});
        })
      }


    }
  },
    destroyed(){
      this.$vux.loading.hide();
    }

  }

</script>
<style rel="stylesheet/scss" lang="scss">
  * {
    /*touch-action: none;*/
    padding: 0px;
    margin: 0px;
  }
  .mineCourse {
    min-height: 100%;
    width:100%;
    background-color:white;
    position:absolute;

  .searchBar {
    line-height: 50px;
    box-sizing: border-box;
    box-shadow: 0 1px 4px #E1E0E3;
    position: absolute;
    width: 100%;
    z-index: 11;
    top: 0;
    background-color: white;
  }

  .searchDev {
    display: inline-block;
    width: 100%;

  input[type="search"] {
    outline: none;
    border-radius: 20px;
    -webkit-appearance: none;
    background: #F3F3F3;
    height: 35px;
    padding-left: 10px;
    border: 1px solid gainsboro;
    width: 75%;
    margin-left: 2rem;
    font-size: 1.3rem;
    color: #999999;
  }

  span {
    color: #E6A914;
    display: inline-block;
    position: absolute;
    margin-left: 2rem;
    font-size: 1.4rem;
  }

  }

  .list {
    margin: 0px 15px 0;


  .courseList {
    position: relative;
    line-height: 25px;
    display: flex;
    border-bottom: 1px solid gainsboro;
    padding: 10px 0 10px;
    min-height:8rem;

  .courseDesc {
    display: inline-block;
    width: 80%;

  span {
    font-size: 10px;
    color: #A3A3A3;
  }

  .type {
    margin-left: 2px;
    border-left: 2px solid rgb(211, 211, 211);
    padding-left: 2px;
    font-size: 1rem;
    color: #999999;
  }

  .active {
    /*display: inline-block;*/
    background-color: #82CCF7;
    border: 0px;
    padding: 0px 10px 0px 10px;
    border-radius: 15px;
    color: white;
    font-size: 1rem;
    margin-left: 5px;
  }

  .normal {
    /*display: inline-block;*/
    background-color: #F38A85;
    border: 0px;
    padding: 0px 10px 0px 10px;
    border-radius: 15px;
    color: white;
    font-size: 1rem;
    margin-left: 5px;
  }

  .end {
    /*display: inline-block;*/
    background-color: #F3F3F3;
    border: 0px;
    padding: 0px 10px 0px 10px;
    border-radius: 15px;
    font-size: 1rem;
    margin-left: 5px;
  }

  }

  .courseStatus {
    display: flex;
    width: 20%;
    position: relative;
    justify-content: flex-end;
    align-items: center;

  .textButton {
    display: flex;
    justify-content: center;
    background: #E6A914;
    border-radius: 15px;
    color:white;
    width: 80px;
    height: 35px;
    font-size: 1.4rem;
    line-height: 2.6;
    /*line-height: 30px;*/
  }
  .textButton_new {
    display: flex;
    justify-content: center;
    background:#F3F3F3;
    /*color: white;*/
    border-radius: 15px;
    width: 80px;
    height: 35px;
    font-size: 1.4rem;
    line-height:2.6;

  }

  .evaluted {
    background-color: #F4F3F8;
    pointer-events: none;
  }

  }
  }
  }
    .label {
      position: fixed;
      height: auto;
      bottom: 50px;
      text-align: center;
      margin-left:20px;

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
