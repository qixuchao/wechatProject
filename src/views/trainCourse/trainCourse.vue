<template>
  <div class="trainCourse">
    <div class="searchBar">
      <div class="filterImg" @click="filter()">
        <img :src="filtrate" alt=""/>
      </div>
      <div class="searchDev">
        <input type="search" v-model="inputValue" placeholder="请输入课程关键字"/>
        <span @click="searchCourse()">搜索</span>
      </div>
    </div>
    <div v-if="isShowFilter" class="filter">
      <div class="information">
        <group>
          <popup-radio title="产品公司" :options="productList" placehoder="请选择" v-model="option1"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="产品大分类" :options="bigClassList" placehoder="请选择" v-model="bigClass"></popup-radio>
        </group>
      </div>
      <div class="information">
        <group>
          <popup-radio title="产品中分类" :options="midClassList" placehoder="请选择" v-model="midClass"></popup-radio>
        </group>
      </div>
      <div class="button">
        <div @click="clear()"><span>清空</span></div>
        <div style="background: #E6A914;color: #ffffff;"  @click="searchCourse()"><span>确认</span></div>
      </div>
    </div>
    <div class="bgDrag" v-if="isShowFilter" @click="hiddenDrag()"></div>
    <scroller lock-x scrollbar-y use-pullup @on-pullup-loading="loadMore" ref="scroller"  v-model="pullUpValue">
      <div class="list">
        <div class="courseList" v-for="list in courseList" @click="goDetail(list.courseId)">
          <div class="courseDesc">
            <div>{{list.topic}}</div>
            <div>主讲讲师: {{list.lecturer}}</div>
            <div><span>课程时间: {{list.courseDate}}</span></div>
          </div>
          <div class="courseStatus">
            <div class="textButton" :class="list.param.other==='Y'?'YClass':'NClass'" @click.stop="goPage(list)">
              <span>{{list.param.desc}}</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullUpValue.pullupStatus === 'default'" v-if="loadMoreFlag">上拉加载更多数据</span>
          <span v-show="pullUpValue.pullupStatus === 'loading'"><spinner
            type="ios-small"></spinner></span>
      </div>
    </scroller>
  </div>
</template>

<script  type="text/ecmascript-6">
  import {Group,PopupRadio,Scroller,Spinner} from 'vux'
  const courseList = [{
    desc:'保诚[携升]储蓄保障计划',
    teacher:'Lily',
    date:'05-17 10:00-12:00'
  },{
    desc:'保诚[携升]储蓄保障计划',
    teacher:'Lily',
    date:'05-17 10:00-12:00'
  },{
    desc:'保诚[携升]储蓄保障计划',
    teacher:'Lily',
    date:'05-17 10:00-12:00'
  },{
    desc:'保诚[携升]储蓄保障计划',
    teacher:'Lily',
    date:'05-17 10:00-12:00'
  }];
  let isShowFilter = false;
export default {
  components:{
    Group,PopupRadio,Scroller,Spinner
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
      document.setTitle('培训课程');
    }, 1);
  },
  mounted(){
    this.getNewCourseList();
    this.getCLBCode();
    this.getProductList();
  },
  methods:{
    filter:function(){
      this.isShowFilter = true;
    },
    goDetail(courseId){
      this.$router.push({name:'courseDetail',query:{courseId:courseId}})
    },
    goPage(list){
      let _this = this,
        param = {};
      if(list.param.other ==='N'){
        return;
      }
      if(list.param.router ==='onlinePayment'){
        let amount = list.students.length*list.price,
          sourceId = '';
        list.students.forEach((value,index)=>{
          sourceId += value.lineId+',';
        });
         param = {
          amount: amount,
          orderContent: "课程支付",
          orderSubject: list.topic,
          sourceId: sourceId.substr(0,sourceId.length-1),
          sourceType: "COURSE"
        };
      }
      _this.$router.push({name:list.param.router,query:{courseId:list.courseId,payInfo:param}})
    },
    checkStatus(enrollFlag,evaluateFlag,status,price){
      let param = {
        desc:'',
        router:'',
        other:''
      };
      if(enrollFlag ==='Y'){
        if(status ==='NOTSTARTED'||status ==='INPROCESS'){
          param = {
            desc:'已报名',
            router:'',
            other:'N'
          };
        }else if(status ==='COMPLETE'&&evaluateFlag ==='Y'){
          param = {
            desc:'已评价',
            router:'',
            other:'N'
          };
        }else{
          param = {
            desc:'评价',
            router:'evaluateCourse',
            other:'Y'
          };
        }
      }
      if(enrollFlag ==='N'||enrollFlag ===''||enrollFlag ===null){
        if(status ==='COMPLETE'||status ==='INPROCESS'){
          param = {
            desc:'查看',
            router:'courseDetail',
            other:'Y'
          };
        }else{
          param = {
            desc:'报名',
            router:'courseRegistration',
            other:'Y'
          };
        }
      }
      if(enrollFlag ==='P'){
        if(price ===0){
          param = {
            desc:'已报名',
            router:'',
            other:'N'
          };
        }else{
          param = {
            desc:'待支付',
            router:'onlinePayment',
            other:'Y'
          };
        }
      }
      return param;
    },
    loadMore(){
      let _this = this;
      _this.getNewCourseList();
    },
    getValueList(array){
      let options1 = [];
      array.forEach((value,item)=>{
        let options = {
          value:value.meaning+"",
          key:value.value
        };
        options1.push(options);
      });
      return options1;
    },
    getCLBCode(){
      let _this = this,
        url = '/api/clb/common/clbCode',
        param = {
          productClass: "PRD.PRODUCT_CLASS",
          productDivision: "PRD.PRODUCT_DIVISION"
        };
      _this.$post(url, param).then(response=> {
        if (response) {
          let listInfo = JSON.parse(response);
           _this.bigClassList = _this.getValueList(listInfo.productClass);
           _this.midClassList = _this.getValueList(listInfo.productDivision);
        }
      })
    },
    getProductList(){
      this.$post('/api/supplier/queryAll',{}).then(response=>{
        if(response.success){
          for(let value of response.rows){
            let list = {
              key:value.supplierId,
              value:value.name
            };
            this.productList.push(list);
          }
        }
      });
    },
    clear(){
      this.inputValue = '';
      this.option1 = '';
      this.midClass = '';
      this.bigClass = '';
      this.searchCourse();
    },
    searchCourse(){
      let _this = this,
        params = {
          prdClass: _this.bigClass,
          prdDivision: _this.midClass,
          supplierId: _this.option1,
          topic: _this.inputValue,
          wechatFlag:'Y'
        };
      _this.param = params;
      _this.page = 0;
      _this.courseList = [];
      _this.isShowFilter = false;
      _this.getNewCourseList();
    },
    getNewCourseList(){
      return new Promise(resolve=>{
        let _this = this;
        let url = '/api/course/list';
        _this.page+=1;

        _this.$vux.loading.show({
          text: 'Loading'
        });
        _this.$post(`${url}?page=${_this.page}&pageSize=10`,_this.param).then(response=>{
          _this.$vux.loading.hide();
          if(response.success){
            response.rows.forEach(value=>{
              value.param = this.checkStatus(value.enrollFlag,value.evaluateFlag,value.status,value.price);
              _this.courseList.push(value);
            });
            if(response.rows.length<10){
              _this.$nextTick(() => {
                _this.$refs.scroller.reset();
              });
              _this.$nextTick(() => {
                _this.$refs.scroller.disablePullup();
              });
              _this.$vux.toast.show('无更多数据！','center');
              setTimeout(_this.$vux.toast.hide(),1500);
              _this.loadMoreFlag = false;
            }else{
              _this.loadMoreFlag = true;
              _this.pullUpValue.pullupStatus = 'default';
              _this.$nextTick(() => {
                _this.$refs.scroller.reset();
              })
            }
            resolve(response.success);
          }
        })
      })
    },
    hiddenDrag:function(){
      this.isShowFilter = false;
    }
  },
  data(){
    return{
      filtrate:require('../../assets/course/icon_filtrate@3x.png'),
      isShowFilter:false,
      loadMoreFlag:false,
      page:0,
      option1:'',
      inputValue:'',
      courseList:[],
      productList:[],
      bigClass:'',
      bigClassList:[],
      midClass:'',
      param:{wechatFlag:'Y'},
      midClassList:[],
      pullUpValue: {
        pullupStatus: 'default'
      },
      options1:[{key:'1',value:'产品1'},{key:'2',value:'产品1'},{key:'3',value:'产品1'}]
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
  .weui-cells_radio{
    width:100%;
    p{
      margin:0.5em;
    }
  }
  .trainCourse {
    position: absolute;
    min-height: 100%;
    background: white;
    width: 100%;
  .searchBar {
    line-height: 50px;
    box-sizing: border-box;
    box-shadow: 0 1px 4px #E1E0E3;
    position: fixed;
    background: white;
    width: 100%;
    z-index: 11;
    top: 0;

  .filterImg {
    display: inline-block;
    width: 14%;
    text-align: center;
    border-right: 1px solid gainsboro;

  img {
    width: 25px;
    display: inline;
    vertical-align: middle;
  }

  }
  .searchDev {
    display: inline-block;
    width: 84%;

  input[type="search"] {
    outline: none;
    border-radius: 20px;
    -webkit-appearance: none;
    background: #F3F3F3;
    height: 35px;
    padding-left: 10px;
    border: 1px solid gainsboro;
    width: 80%;
    margin: 0 10px 0 0;
  }
  span {
    color: #E6A914;
  }

  }
  }
  .filter{
    display: inline-block;
    width: 100%;
    position: absolute;
    background: white;
    z-index: 110;
    top: 51px;
    .information{
      position: relative;
      margin-left: 15px;
      border-bottom: 1px solid rgba(233, 233, 233, 0.8);
      display: flex;
      align-items: center;
      /*padding: 10px 5px 10px 0;*/
      box-sizing: border-box;
      font-size:1.4rem;

      .weui-cells{
        width: calc(100vw - 15px);
        box-sizing: border-box;
        margin-top: 0;
        font-size: 1.4rem;
        line-height: 30px;
        margin-bottom: 0;
        &:before{
           border-top: none;
         }
        &:after{
           border-bottom: none;
         }
      }
      .weui-cell{
        padding-left: 0;
        padding-right: 0;
      }
      p{
        margin:0;
      }
      .weui-cell_access .weui-cell__ft{
        padding-right: 26px;
        margin-left:20px;
        &:after{
           height: 10px;
           width:10px;
           margin-top: -7px;
           right:15px;
        }
      }
      }
  .button{
    /*border-top: 1px solid gainsboro;*/
    display:block;
    div{
      display: inline-block;
      width: calc(50% - 3px);
      text-align: center;
      line-height: 40px;
    }
  }
  }
  .bgDrag{
    position: fixed;
    width: 100%;
    height: 100%;
    background: gainsboro;
    z-index: 11;
    opacity: 0.6;
    top:55px;
  }
  .list {
    margin: 60px 15px 0;
    width: calc(100% - 30px);
    padding-bottom: 50px;
    .courseList {
      position: relative;
      line-height: 25px;
      display: flex;
      border-bottom: 1px solid gainsboro;
      padding: 10px 0;

      .courseDesc {
        display: inline-block;
        width: 75%;
        div{
          color:#333;
          font-size: 1.6rem;
          display: block;
          span{
            color:#666;
            font-size: 1.4rem;
            display: block;
          }
        }
      }

      .courseStatus {
        display: flex;
        width: 30%;
        position: relative;
        justify-content: flex-end;
        align-items: center;
        .YClass{
          background: #E6A914;
          color: white;
        }
        .NClass{
          background: gainsboro;
          color: #666;
        }
        .textButton {
          display: flex;
          justify-content: center;
          border-radius: 15px;
          width: 90%;
          line-height: 35px;
        }
      }
      }
    }
  }
</style>
