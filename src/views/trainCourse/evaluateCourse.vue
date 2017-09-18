<template>
  <div class="evaluateCourse">
    <divider>课程评价</divider>
    <group>
      <cell title="内容:">
        <rater v-model="courseContent" slot="value"></rater>
      </cell>
      <cell title="适应性:">
        <rater v-model="courseUsability" slot="value"></rater>
      </cell>
      <cell title="环境:">
        <rater v-model="courseEnvironment" slot="value"></rater>
      </cell>
    </group>
    <divider>讲师评价</divider>
    <group>
      <cell title="表达能力:">
        <rater v-model="lecturerPresentation" slot="value"></rater>
      </cell>
      <cell title="专业度:">
        <rater v-model="lecturerProfessional" slot="value"></rater>
      </cell>
      <cell title="亲和力:">
        <rater v-model="lecturerAppetency" slot="value"></rater>
      </cell>
    </group>
    <divider>其他评价</divider>
    <textarea rows="5" placeholder="多行输入" v-model="evaluateContent"></textarea>
    <div class="footBar" @click="showConfirm()">提交评价</div>
    <div class="confirm">
      <confirm v-model="show"
               :title="title"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">{{content}}</p>
      </confirm>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Divider,Group,Rater,Cell,Confirm} from 'vux';
    export default {
      components:{
        Divider,Group,Rater,Cell,Confirm
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
      document.setTitle('课程评价');
    }, 1);
  },
      methods: {
        submitEvaluate:function(){
          let _this = this;
          let url = '/api/course/evaluate',
              params = {
                channelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId,
                courseContent:_this.courseContent,
                courseEnvironment:_this.courseEnvironment,
                courseId:_this.$route.query.courseId,
                courseUsability:_this.courseUsability,
                evaluateContent:_this.evaluateContent,
                lecturerAppetency:_this.lecturerAppetency,
                lecturerPresentation:_this.lecturerPresentation,
                lecturerProfessional:_this.lecturerProfessional,
                mobile:JSON.parse(window.localStorage.userInfo).user.phone,
                phoneCode:JSON.parse(window.localStorage.userInfo).user.phoneCode
              };
          _this.$post(url,params).then(response =>{
            if(response) {
              if (response.success) {
                _this.$vux.toast.show({text:'评价成功!'});
                _this.$router.go(-1);
              }else{
                _this.$vux.toast.show({text:response.message});
              }
            }
          });
        },
        onCancel(){
           this.show =false;
        },
        showConfirm(){
          this.show = true;
        },
        onConfirm(){
          this.submitEvaluate();
        }
      },
      data () {
          return {
            code:'',
            title:'小财提醒',
            content:'是否提交评价?',
            show:false,
            msg: 'Welcome to Your Vue.js App',
            courseContent:1,
            courseEnvironment:1,
            courseUsability:1,
            evaluateContent:'',
            lecturerAppetency:1,
            lecturerPresentation:1,
            lecturerProfessional:1

          }
      }
    }
</script>

<style lang="scss">
  .evaluateCourse{
    position:absolute;
    width:100%;
    min-height:100%;
    background:white;
    .vux-divider{
      font-size: 1.6rem;
      color: #333;
    }
    .vux-divider:before{
      background-size: 55% 5px;
      background-image: linear-gradient(to left, #E6A914, #fff);
    }
    .vux-divider:after{
      background-size: 55% 5px;
      background-image: linear-gradient(to right, #E6A914, #fff);
    }
    .weui-cells{
      width: 60vw;
      margin-left: 20vw;
      margin-top:0;
    }
    .weui-cells:before{
      border-top:none;
    }
    .weui-cells:after{
      border-bottom:none;
    }
    .weui-cell:before{
      border-top:none;
    }
    .weui-cell:before{
      border-bottom:none;
    }
    .weui-cell{
      padding:0;
    }
    .vux-cell-primary{
      width: 40%;
      flex: inherit;
    }
    p{
      -webkit-margin-before: 0.5em;
      -webkit-margin-after: 0.5em;
    }
    .vux-label {
      display: block;
      word-wrap: break-word;
      word-break: break-all;
      text-align: justify;
      text-align-last: justify;
      color: #999;
    }
    .weui-cell__ft {
      text-align: right;
      color: #999999;
      width: 75%;
    }
    textarea{
      border: none;
      outline: none;
      width: 90%;
      background: #F3F3F3;
      color: #333;
      margin-left: 5%;
      font-size: 1.6rem;
      padding: 15px;
      box-sizing: border-box;
    }
    .footBar{
      width: 90%;
      text-align: center;
      border: 1px solid #E6A914;
      margin-left: 5%;
      line-height: 40px;
      font-size: 1.6rem;
      margin-top: 30px;
      color: #E6A914;
    }
  }
</style>
