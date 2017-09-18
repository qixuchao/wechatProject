<template>
  <div class="signReserve">
    <!-- 签订-->
    <div class="header">
      <div class="header_title">{{title}}</div>
    </div>
    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>客户</div>
      <input class="right" placeholder="请选择" v-model="customName" @click="goCustom"/>
      <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
    </div>
    <div class="whole">
      <div class="left">保单订单编号</div>
      <group class="right_one">
        <x-textarea  placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize v-model="policyNumber"></x-textarea>
      </group>
      <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode1"></popup-radio>
      </group>
      <input class="right" placeholder="请输入" v-model="contactPhone"/>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>深圳过境关口</div>
      <group style="min-height: 3rem">
        <popup-radio :options="sekiguchiList" v-model="sekiguchi" placeholder="请选择"></popup-radio>
      </group>
    </div>

    <div class="whole">
      <div class="left">团队签订价格</div>
      <div class="right_new">{{price}}</div>
    </div>

    <div class="whole_new">
      <div class="left"><span style="color:#f63636 ">*</span>预约过境时间</div>
      <group style="min-height: 3rem">
        <datetime v-model="time" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>
      </group>
    </div>

    <!--<group>-->
      <!--<datetime v-model="time" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>-->
    <!--</group>-->

    <div class="touristImformation">
      <div class="imformation_left">L签游客信息</div>
      <div class="btn_left">样例示意</div>
        <div class="btn_right" @click="seeExample">查看样例</div>
    </div>
    <div class="touristImformation" v-for="(item,index) in customerList" v-if="customerList.length!==0">
      <div class="imformation_left"></div>
      <div class="btn_left">{{item.name}}</div>
        <div class="btn_right" @click="edit(index)">编辑样例</div>
    </div>
    <div class="whole_btn">
        <div class="new_btn" @click="addUser">添加游客</div>
    </div>

    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
      <input class="right" placeholder="请输入" v-model="reservePerson"/>
    </div>


    <div class="whole">
      <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
      <group  class="middle">
        <popup-radio :options="phoneCodeList" v-model="phoneCode2"></popup-radio>
      </group>
      <input class="right" placeholder="请输入预约对接人电话" v-model="reservePersonPhone"/>
    </div>


      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <input class="bottom" v-model="comment" />



    <div class="warmPrompt">
      <div class="warmPrompt_up">温馨提示：</div>
      <div class="warmPrompt_down">1.本服务为免费服务，若客户购买任何保险产品，单张保单年缴保费≥10万美金或趸交保费≥50万美金
        ，我司免费提供以上两次专车服务，超出两次专车接送另行收费。同一投保人两张及两张以上保单累计达以上金额不享受该免费服务。申请免费服务请务必在备注栏填写投保信息。
      </div>
      <div class="warmPrompt_dowm">2.如已享受以上专车服务的客户因各种原因未能投保成功及退保，我司将会补收该费用。</div>
      <div class="warmPrompt_dowm">3.所有增值服务以预约时信息为准，由于无预约、信息错误等产生的费用由客户承担，且过后不可以补办和报销。</div>
      <div class="warmPrompt_dowm">4.使用L签访港的旅客需要持旅行社提供的文件一同过关方可进入香港；离港时无需旅行社文件，亦无需一同过关，请根据客户签证类型选择此项服务。</div>

    </div>

    <div class="button">
      <div class="button_left" @click="goBack">取消</div>
      <div class="button_right" @click="goApply">确认预约</div>
    </div>

    <!-- 查看样例-->
    <div v-transfer-dom>
      <x-dialog v-model="showExample" hide-on-blur :dialog-style="{'max-width': '100%'}" class="example" :scroll="false">
        <!--关闭示例按钮-->
        <div @click="closeExample">
          <span class="vux-close"></span>
        </div>
        <div class="new">
          <div class="left">姓名</div>
          <input class="right"  v-model="exampleList.name" disabled="disabled" />
        </div>
        <div class="new">
          <div class="left">性别</div>
          <input class="right"  v-model="exampleList.sex" disabled="disabled" />
        </div>
        <div class="new">
          <div class="left">出生年月</div>
          <input class="right"  v-model="exampleList.birthDate" disabled="disabled"  />
        </div>
        <div class="new">
          <div class="left">签发地点</div>
          <input class="right"  v-model="exampleList.signAddress" disabled="disabled" />
        </div>
        <div class="new">
          <div class="left">港澳通行证号</div>
          <input class="right"  v-model="exampleList.macaoPermit" disabled="disabled"/>
        </div>
        <div class="name">
          <div class="name_left">签注附件</div>
        </div>
        <div>
          <img :src="item.src" v-for="(item,index) in exampleList.list" class="img" @click="show(index)" />
        </div>
      </x-dialog>
    </div>


    <!-- 增加游客信息-->
    <div v-transfer-dom>
      <x-dialog v-model="showUser"  hide-on-blur :dialog-style="{'max-width': '100%'}" class="example" :scroll="false">
        <!--关闭示例按钮-->
        <div @click="closeUser">
          <span class="vux-close"></span>
        </div>
        <div class="new">
          <div class="left">姓名</div>
          <input class="right"  v-model="customerExample.name" />
        </div>

        <div class="radio">
          <div class="radio_title">性别</div>
          <div class="labelValue">
            <div class="Radio1">
              <img :src="disagree" v-if="!customerExample.sex" alt="" @click="click3">
              <img :src="agree" v-if="customerExample.sex" alt="">
              <span>男</span>
            </div>
            <div class="Radio2">
              <img :src="disagree" v-if="customerExample.sex" alt="" @click="click4">
              <img :src="agree"  v-if="!customerExample.sex" alt="">
              <span>女</span>
            </div>
          </div>
        </div>
        <group>
          <datetime v-model="customerExample.birthDate" format="YYYY/MM/DD"  :title="start1"></datetime>
        </group>
        <div class="new">
          <div class="left">签发地点</div>
          <input class="right"  v-model="customerExample.signAddress"  />
        </div>
        <div class="new">
          <div class="left">港澳通行证号</div>
          <input class="right"  v-model="customerExample.passNumber" />
        </div>

        <div class="name">
          <div class="name_left">签注附件</div>
        </div>
        <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd" :maxSize=100000 accept="img/jpg,img/png,img/jpeg,img/bmp"  :capture="false" @click.native="chooseImg"  placeholder="+" @onChange="getImg"></VueImgInputer>-->
        <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd" :maxSize=100000 accept="img/jpg,img/png,img/jpeg,img/bmp"  :capture="false" @click.native="chooseImg"  placeholder="+"></VueImgInputer>-->
        <div class="chooseImage_1"  @click="chooseImg" v-if="showAdd" >+</div>
        <div v-if="showImg">
          <span class="vux-close" @click="deleteImg"></span>
          <img :src="item.src" v-for="(item,index) in customerExample.list"  class="img" @click="show(index)" />
        </div>
        <div :class="{addBtn:(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!==''),addBtnNew:!(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!=='')}" @click="save">保存</div>
      </x-dialog>
    </div>


    <!-- 编辑游客信息-->
    <div v-transfer-dom>
      <x-dialog v-model="showEdit"  hide-on-blur :dialog-style="{'max-width': '100%'}" class="example" :scroll="false">
        <!--关闭示例按钮-->
        <div @click="closeEdit">
          <span class="vux-close"></span>
        </div>
        <div class="new">
          <div class="left">姓名</div>
          <input class="right"  v-model="customerExample.name" />
        </div>
        <div class="radio">
          <div class="radio_title">性别</div>
          <div class="labelValue">
            <div class="Radio1">
              <img :src="disagree" v-if="!customerExample.sex" alt="" @click="click3">
              <img :src="agree" v-if="customerExample.sex" alt="">
              <span>男</span>
            </div>
            <div class="Radio2">
              <img :src="disagree" v-if="customerExample.sex" alt="" @click="click4">
              <img :src="agree"  v-if="!customerExample.sex" alt="">
              <span>女</span>
            </div>
          </div>
        </div>

        <group>
          <datetime v-model="customerExample.birthDate" format="YYYY/MM/DD"  :title="start1"></datetime>
        </group>
        <div class="new">
          <div class="left">签发地点</div>
          <input class="right"  v-model="customerExample.signAddress"  />
        </div>
        <div class="new">
          <div class="left">港澳通行证号</div>
          <input class="right"  v-model="customerExample.passNumber" />
        </div>

        <div class="name">
          <div class="name_left">签注附件</div>
        </div>
        <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd" :maxSize=100000 @click.native="chooseImg" accept="img/jpg,img/png,img/jpeg,img/bmp" :capture="false"  placeholder="+" @onChange="getImg" readonly></VueImgInputer>-->
        <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd" :maxSize=100000 accept="img/jpg,img/png,img/jpeg,img/bmp"  :capture="false" @click.native="chooseImg"  placeholder="+"></VueImgInputer>-->
        <div class="chooseImage_1"  @click="chooseImg" v-if="showAdd" >+</div>
        <div v-if="showImg">
          <span class="vux-close" @click="deleteImg"></span>
          <img :src="item.src" v-for="(item,index) in customerExample.list"  class="img" @click="show(index)" />
        </div>
        <div  :class="{addBtn:(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!==''),addBtnNew:!(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!=='')}" @click="saveEdit" >保存</div>
      </x-dialog>
    </div>

      <!-- 弹出超出6条警告-->
    <div v-transfer-dom>
      <alert v-model="showAlert" :title="title1">
      </alert>
    </div>
    <!--点击图片放大-->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-close="close"></previewer>
    </div>

    <div v-transfer-dom>
      <confirm v-model="show1" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
      </confirm>
    </div>

    <div v-transfer-dom>
      <confirm v-model="show2" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
      </confirm>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">
  import { Datetime,XTextarea, Group, XDialog,Alert,PopupRadio,Previewer,TransferDomDirective as TransferDom,Confirm } from 'vux';
  import Vue from 'vue';


  export default {
    directives: {
      TransferDom
    },
    components: {
      Datetime,
      Alert,
      Group,
      XDialog,
      PopupRadio,
      Previewer,
      VueImgInputer,
      XTextarea,
      Confirm
    },
    data(){
    return {
      title: "团队签订-预约资料填写",
      show1:false,
      show2:false,
      title1:"是否确认取消？",
      title2:"是否确认提交申请？",
      customName: null,
      policyNumber: null,
      icon: require("../../assets/img/query.png"),
      disagree: require('../../assets/register/icon_unselect@3x.png'),
      agree: require('../../assets/register/icon_select@3x.png'),
      addImage:require('../../assets/img/addProduct.png'),
      phoneCodeList:[],
      phoneCodes:[],
      phoneCode1:"",
      phoneCode2:"",
      price:"￥0.00",
      price1:null,
      contactPhone: null,
      pay: "",
      time:null,
      start: "",
      start1:"出生年月",
      sekiguchi: null,
      sekiguchiList: [],
      sexList:['男','女'],
      reservePerson: null,
      reservePersonPhone: null,
      comment: null,      //备注
      editIndex:null,   //保存编辑游客信息index
      showIndex:null,    //保存显示附件内容的index
      showExample: false,   //显示样例
      showUser:false,     //显示游客添加信息页面
      showImg:false,      //显示图片
      showAdd:true,      //上传游客图片
      showEdit:false,   //游客信息编辑页面
      showAlert:false,   //是否显示游客信息添加超出6条
      title1:"访客信息最多为6条",
      sublineId:null,
      channelId:null,
      orderId:null,
      customId:null,
      channelId:null,
      exampleList:{   //游客信息例子
        name: "样例示意",
        sex: '男',
        signAddress: '广东省广州市',
        birthDate: '1998-12-03',
        macaoPermit: '7239201398',
        list:[{
          src:require("../../assets/img/example.jpg")
        }]
      },
      customerList:[],   //添加的游客总信息
      customerExample:{    // 单个添加的游客信息
        name: "",
        sex: true,
        signAddress: '',
        birthDate: '',
        passNumber: '',
        list:[{src:""}],
        file:null,
        fileId:null,
        number:null,
        type:'update',
        __status:'add'
    },
      file:[],
      list:[],   //preview插件绑定的图片list
      options: {    //preview插件获取的屏幕大小来控制图片的宽高
        getThumbBoundsFn (index) {
      // find thumbnail element
      let thumbnail = document.querySelectorAll('.img')[index]
      // get window scroll Y
      let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      // optionally get horizontal scroll
      // get position of element relative to viewport
      let rect = thumbnail.getBoundingClientRect()
      // w = width
      return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      // Good guide on how to get element coordinates:
      // http://javascript.info/tutorial/coordinates
    }
  },
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
      document.setTitle('团队签订预约');
    }, 1);
    var vm=this;
    var url=window.location.href.split('#')[0];
    vm.$configWx(url,['chooseImage','getLocalImgData']);
  },
  mounted:function () {
    var vm = this;
    vm.channelId=JSON.parse(window.localStorage.userInfo).user.relatedPartyId;
    vm.reservePerson=JSON.parse(window.localStorage.userInfo).user.userName;
    vm.phoneCode2=JSON.parse(window.localStorage.userInfo).user.phoneCode;
    vm.reservePersonPhone=JSON.parse(window.localStorage.userInfo).user.phone;
    vm.$post('/api/clb/common/clbCode',{
      "phoneCodes": "PUB.PHONE_CODE"
    }).then(function(response){
      vm.phoneCodes=JSON.parse(response).phoneCodes;
      for (let i in vm.phoneCodes) {
        vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
      }
      vm.phoneCode1=vm.phoneCodeList[0];
      vm.phoneCode2=vm.phoneCodeList[0];
    },function(response){
      console.log('接口出错了');
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
    function isEmptyObject(e) {
      var t;
      for (t in e)
        return true;
      return false;
    };
    var customList=vm.$store.getters.getCustomerList;
    var policyList=vm.$store.getters.getPolicyList;
    if(isEmptyObject(customList)){
      vm.customName=customList.chineseName;
      vm.customId=customList.customerId;
      for(let i in vm.phoneCodes){
        if(customList.phoneCode===vm.phoneCodes[i].value){
          vm.phoneCode1=vm.phoneCodes[i].meaning;
        }
      }
      vm.contactPhone=customList.phone;


    }
    if(isEmptyObject(policyList)){
      vm.policyNumber=policyList.orderNumber;
      vm.orderId=policyList.orderId;
    }
    vm.detail=vm.$store.getters.getProduct;
    for (let i in vm.detail.prdItemSublineList) {
      vm.sekiguchiList.push(vm.detail.prdItemSublineList[i].sublineItemName);
    }


  },
  watch:{
    sekiguchi:function(newVal,oldVal) {
      var vm=this;
      for(let i in vm.detail.prdItemSublineList){
        if (newVal === vm.detail.prdItemSublineList[i].sublineItemName) {
          vm.price1=vm.detail.prdItemSublineList[i].price;
          if(vm.price1!="实时报价"){
            vm.price="￥"+vm.price1;
          }else{
            vm.price=vm.price1;
          }
        }
      }
    }

  },
  methods:{
    goBack:function(){
      var vm=this;
      vm.show1=true;

    },
    goApply:function(){
      var vm=this;
      vm.show2=true;
    },
    onCancel1:function(){
      var vm=this;
      vm.show1=false;
    },
    onCancel2:function(){
      var vm=this;
      vm.show2=false;
    },
  chooseImg(){
      var vm=this;
      vm.$wechat.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds; // localData是图片的base64数据，可以用img标签显示
//          if (window.__wxjs_is_wkwebview) {
          vm.$wechat.getLocalImgData({
            localId: localIds[0],
            success: function (res) {
              var localData = res.localData.replace('jgp', 'jpeg');
              vm.customerExample.list[0].src = localData;
              vm.$post('/api/wx/exchange', {
                "base64Img":localData
              }).then(function (response) {
                var responseData=JSON.parse(response);
                vm.file = [];
                vm.file[0] = localData;
                vm.file[0].response = responseData;
                vm.customerExample.file = vm.file;
                vm.customerExample.fileId = responseData.file.fileId;
              }, function (response) {
                this.$vux.toast.show({text:response.status});
              });
              vm.showAdd = false;
              vm.showImg = true;

//          } else {
//            vm.customerExample.list[0].src = localIds[0];
//            let heard = {
//              headers: {
//                'Content-Type': 'application/text',
//                'Authorization': 'Bearer '+window.localStorage.wxToken
//              }
//            };
//            Vue.http.post('http://melting-ice.com/api/wx/exchange',localIds[0],heard).then(function (response) {
//              var response=JSON.parse(response);
//              alert(response);
//              vm.file = [];
//              vm.file[0] = localIds[0];
//              vm.file[0].response = response;
//              vm.customerExample.file = vm.file;
//              vm.customerExample.fileId = response.file.fileId;
//            }, function (response) {
//              console.log("接口出错了");
//
//            });
//            vm.showAdd = false;
//            vm.showImg = true;
//          }

            }

          });

        }
      })
    },
    goCustom:function () {  //去用户信息页面
      var vm = this;
      vm.$router.push({path: '/customer'});
    }
  ,
    goPolicy:function () {  //去保单信息页面
      var vm = this;
      vm.$router.push({path: '/policy'});
    }
  ,
    onConfirm1:function () {
      var vm = this;
      vm.$store.commit('assignmentCustomerList',{param:{}});
      vm.$store.commit('assignmentPolicyList',{param:{}});
      vm.$router.go(-1);
    }
  ,
    seeExample(){   //查看样例
      var vm=this;
      vm.showExample=true;
      vm.list=vm.exampleList.list;
      vm.showIndex=1;
      console.log(vm.showIndex);
    },
    show(index){  //点击图片显示放大的图片
      var vm=this;
      console.log(vm.showIndex);
      if(vm.showIndex===1){
        vm.showExample=false;
        vm.$refs.previewer.show(index);
      }
      if(vm.showIndex===2){
        vm.showUser=false;
        vm.$refs.previewer.show(index);
      }
      if(vm.showIndex===3){
        vm.showEdit=false;
        vm.$refs.previewer.show(index);
      }

    },
    closeExample(){     //关闭显示样例
      this.showExample=false;
      this.exampleList={
        name: "样例示意",
          sex: '男',
          signAddress: '广东省广州市',
          birthDate: '1998-12-03',
          macaoPermit: '7239201398',
          list:[{
          src:require("../../assets/img/example.jpg")
        }]
      }
    },
    closeUser(){   //关闭显示添加游客信息页面
      this.showUser=false;
      this.customerExample={
        name: "",
        sex: true,
        signAddress: '',
        birthDate: '',
        passNumber: '',
        list:[{src:""}],
        file:null,
        fileId:null,
        number:null,
        type:'update',
        __status:'add'
      };
    },
    closeEdit(){   //关闭显示编辑游客信息页面
      this.showEdit=false;
      this.customerExample={
        name: "",
        sex: true,
        signAddress: '',
        birthDate: '',
        passNumber: '',
        list:[{src:""}],
        file:null,
        fileId:null,
        number:null,
        type:'update',
        __status:'add'
      };
    },
    close(){    //关闭查看放大的图片页面
     var vm=this;
      if(vm.showIndex===1){
        vm.showExample=true;
      }
      if(vm.showIndex===2){
        vm.showUser=true;
      }
      if(vm.showIndex===3){
        vm.showEdit=true;
      }
    },

    addUser(){    //显示添加游客信息
      var vm=this;
      if(vm.customerList.length<6){
        vm.list=vm.customerExample.list;
        vm.showIndex=2;
        vm.showAdd=true;
        vm.showUser=true;
        vm.showImg=false;
        vm.showEdit=false;
      }else{
        vm.showAlert=true;
      }

    },
    getImg(file,filePath){    //获取上传的图片及base64
      var vm=this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        vm.customerExample.list[0].src= this.result;
        }
      console.log(file);
      var formData=new FormData();
      formData.append('file',file);
      formData.append('maxSize',200000);
      formData.append('modularName','CNL');
      formData.append('allowType','jpg;png');
      vm.$post('/api/commons/attach',formData).then(function(response){
        vm.file=[];
        vm.file[0]=file;
        console.log(vm.file);
        vm.file[0].response=response;
        vm.customerExample.file=vm.file;
        vm.customerExample.fileId=response.file.fileId;
      },function(response){
        console.log("接口出错了");

      });
      vm.showAdd=false;
      vm.showImg=true;
    },
    save(){    //保存上传信息
      var vm=this;
      vm.customerList.push(vm.customerExample);
      console.log(vm.customerList);
      vm.showUser=false;
      vm.customerExample={
        name: "",
        sex: true,
        signAddress: '',
        birthDate: '',
        passNumber: '',
        list:[{src:""}],
        file:null,
        fileId:null,
        number:null,
        type:'update',
        __status:'add'

      };
    },
    saveEdit(){   //保存编辑后的游客信息
      var vm=this;
      vm.customerList[vm.editIndex]=vm.customerExample;
      console.log(vm.customerExample.file instanceof  Blob);
      console.log(vm.customerList);
      vm.showEdit=false;
      vm.customerExample={
        name: "",
        sex: true,
        signAddress: '',
        birthDate: '',
        passNumber: '',
        list:[{src:""}],
        file:null,
        fileId:null,
        number:null,
        type:'update',
        __status:'add'
      };
    },
    edit(index){   //进入编辑游客信息页面
      var vm=this;
      vm.editIndex=index;
      vm.showIndex=3;
      vm.customerExample=vm.customerList[index];
      if(vm.customerExample.file===null){
        vm.showEdit=true;
        vm.showAdd=true;
        vm.showImg=false;
      }else{
        vm.list=vm.customerExample.list;
        vm.showEdit=true;
        vm.showAdd=false;
        vm.showImg=true;
      }
    },
    deleteImg(){   //删除用户上传的图片
      var vm=this;
      vm.customerExample.file=null;
      vm.customerExample.list[0].src="";
      vm.showImg=false;
      vm.showAdd=true;
    },
    click3:function(){
      var vm=this;
      vm.customerExample.sex=!vm.customerExample.sex;
    },
    click4:function(){
      var vm=this;
      vm.customerExample.sex=!vm.customerExample.sex;
    },
    onConfirm2(){
      var vm=this;
      var phoneCode1=null;
      var phoneCode2=null;
      for(let i in vm.phoneCodes){
        if(vm.phoneCode1===vm.phoneCodes[i].meaning){
          phoneCode1=vm.phoneCodes[i].value;
        }
        if(vm.phoneCode2===vm.phoneCodes[i].meaning){
          phoneCode2=vm.phoneCodes[i].value;
        }
      }

      if(vm.customName===null||vm.customName===''){
        vm.$vux.toast.show({text:'客户名不能为空'});
      }else if(vm.contactPhone===null||vm.contactPhone===''){
        vm.$vux.toast.show({text:'联系电话不能为空'});
      }else if(vm.sekiguchi===null||vm.sekiguchi===''){
        vm.$vux.toast.show({text:'深圳过境关口不能为空'});
      }else if(vm.time===null||vm.time==='') {
        vm.$vux.toast.show({text:'预约过境时间不能为空'});
      }else if(new Date(vm.time).getTime()<new Date().getTime()){
        vm.$vux.toast.show({text:'预约过境时间不能早于当前时间'});
      } else if(vm.reservePerson===null||vm.reservePerson===''){
        vm.$vux.toast.show({text:'预约对接人不能为空'});
      }else if(vm.reservePersonPhone===null||vm.reservePersonPhone===''){
        vm.$vux.toast.show({text:'预约对接人电话不能为空'});
      }else if(vm.customerList.length<1) {
        vm.$vux.toast.show({text:'至少添加一条游客信息'});
      }else
       {
        if(phoneCode1==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.contactPhone)))) {
          vm.$vux.toast.show({text:'联系电话有误'});
        }else if(phoneCode1==='00852'&&(vm.contactPhone.length!=8)) {
          vm.$vux.toast.show({text:'联系电话有误'});
        }else if(phoneCode1==='00853'&&(vm.contactPhone.length!=8)) {
          vm.$vux.toast.show({text:'联系电话有误'});
        }else if(phoneCode1==='00886'&&(vm.contactPhone.length!=9)) {
          vm.$vux.toast.show({text:'联系电话有误'});
        }else  if(phoneCode2==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reservePersonPhone)))) {
          vm.$vux.toast.show({text:'预约对接人电话有误'});
        }else if(phoneCode2==='00852'&&(vm.reservePersonPhone.length!=8)) {
          vm.$vux.toast.show({text:'预约对接人电话有误'});
        }else if(phoneCode2==='00853'&&(vm.reservePersonPhone.length!=8)) {
          vm.$vux.toast.show({text:'预约对接人电话有误'});
        }else if(phoneCode2==='00886'&&(vm.reservePersonPhone.length!=9)) {
          vm.$vux.toast.show({text:'预约对接人电话有误'});
        }else{
          vm.$store.commit('assignmentCustomerList',{param:{}});
          vm.$store.commit('assignmentPolicyList',{param:{}});
          var date=new Date();
          date=date.format('yyyy-MM-dd hh:mm:ss');
          var time=new Date(vm.time);
          var time=time.format('yyyy-MM-dd hh:mm:ss');

          if(vm.price1==='实时报价'){
            vm.price1=null;
          }
          for(let i in vm.detail.prdItemSublineList){
            if(vm.sekiguchi===vm.detail.prdItemSublineList[i].sublineItemName){
              vm.sublineId=vm.detail.prdItemSublineList[i].sublineId;
            }
          }
          for(let i in vm.customerList){
            vm.customerList[i].number=Number(i)+1;
            let time=new Date(vm.customerList[i].birthDate);
            vm.customerList[i].birthDate=time.format('yyyy-MM-dd hh:mm:ss');
            if(vm.customerList[i].sex===true){
              vm.customerList[i].sex='M';
            }else{
              vm.customerList[i].sex='F';
            }
          }
          vm.$post('/api/ordOrder/submit', [{
            'applicantCustomerId': vm.customId,
            'channelId': vm.channelId,
            'customerPhone': vm.contactPhone,
            'customerPhoneCode': phoneCode1,
            'customerType': "APPLICANT",
            "file":vm.file,
            'hisDesc': "预约资料审核中",
            'hisStatus': "DATA_APPROVING",
            'itemId': vm.detail.itemId,
            'ordTeamVisitor':vm.customerList,
            'orderType': "VALUEADD",
            'price':vm.price1,
            'relatedOrderId': vm.orderId,
            'reserveComment':vm.comment,
            'reserveContactPerson': vm.reservePerson,
            'reserveContactPhone': vm.reservePersonPhone,
            'reserveContactPhoneCode': phoneCode2,
            'reserveDate': time,
            'signDate': time,
            'status': "DATA_APPROVING",
            'sublineId': vm.sublineId,
            'submitDate': date,
            'valueaddType':vm.detail.midClass,
            '__status': "add"
          }]).then(function(response){
            if(response.success){
              vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
              setTimeout(function () {
                vm.$router.go(-1);
              }, 3000);
            }else{
              vm.$vux.toast.show({text:'提交失败'})
            }



          }, function (response) {
            console.log("接口出错了");
          })


        }


      }

    }


  }
  }
</script>


<style lang="less">
  @import '~vux/src/styles/close';
  * {
    padding: 0px;
    margin:0px;
  }

  .signReserve {
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;
    font-size:1.3rem;

  .header {
    background-color: #F4F4F7;
    height: 3rem;
    width: 100%;
    font-size: 1.7rem;
  }

  .header_title {
    padding-left: 1rem;
    padding-top: 0.5rem;
  }


  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    left: 10px;
  }

  .vux-x-icon {
    fill: #999999;
    padding-right: 10px;
  }

  .weui-cell_access .weui-cell__ft {
    padding-right: 23px;
  }

  .weui-cells {
    font-size: 1.3rem;
    margin-top: 0px;
  }

  .weui-cell_access .weui-cell__ft:after {
    height: 10px;
    width: 10px;
  }

  a {
    text-decoration: none;
  }

  .whole {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 4rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
    font-size: 1.3rem;
  }

  .left {
    display: inline-block;
    width: 50%;
    align-items: center;
    color: #333333;
    font-size: 1.3rem;
  }

  .middle {
    display: inline-block;
    width: 40%;
    margin-top: -10px;
    color:#333333;

  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  .weui-cell {
    padding: 0px;
  }
  .weui-cell_access .weui-cell__ft{
    padding: 0px;
    padding-top: 10px;
    font-size:1.3rem;
  }
  .weui-cell_access .weui-cell__ft:after{
    content: normal;
  }

  }
  .right{
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    outline: none;
    font-size: 1.3rem;
  }
  .right_one {
    border: 0px;
    display: inline-block;
    width: 70%;
    padding-right: 15px;
    font-size: 1.3rem;
    color: #999999;
    line-height: 19px;
    outline: none;
    padding-bottom: 5px;

  .vux-x-textarea.weui-cell {
    -ms-flex-align: start;
    align-items: flex-start;
    display: inline-block;
    align-items: center;
    padding: 0px;
  }
  .weui-cells:after{
    border-bottom: none;
  }

  }
  .right_new {
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
    outline: none;
    font-size: 1.3rem;

  }


  .whole_new {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;

  .left {
    display: inline-block;
    align-items: center;
    padding-top: 10px;
    color: #333333;
    font-size: 1.3rem;
  }

  .weui-cells {
    width: 18rem;
    display: inline-block;
    float: right;
    margin-top:0px;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  }
  .policy_down {
    position: relative;
    width: 68%;
    margin-left: 30%;
    color: #ADADAD;


  }

  .touristImformation {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  .imformation_left {
    display: inline-block;
    position: relative;
    width: 30%;
  }



  .btn_left {
    display: inline-block;
    position: relative;
    width: 30%;
    color:#999999;
  }

  .btn_right {
    display: inline-block;
    position: relative;
    margin-left: 15%;
    border: solid 1px #00abfb;
    color: #00abfb;
    font-size: 1.3rem;
    padding: 2px 4px;
    border-radius: 2px;
  }
  .whole_btn{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 0rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .new_btn{
    width:100%;
    border: dotted 1px #999999;
    height: 3rem;
    text-align: center;
    line-height: 2.5;
    color:#333333;
    margin: 10px 10px 1rem 1rem;
  }



  .comment_up {
    margin-left: 1rem;
    position: relative;
    color:#333333;
  }
  .comment_up_new{
    margin-left: 1rem;
    color:#999999;
  }
  .bottom{
    border-bottom: solid 1px #e5e5e5 ;
    border-left: none;
    border-top: none;
    border-right: none;
    width:calc(~"100% - 10px") ;
    height: 3.15rem;
    margin-left: 10px;
    outline: none;
    font-size:1.3rem;

  }

  .warmPrompt {
    font-size: 1.3rem;
    color: #999999;
    margin: 1rem;
    line-height: 19px;
  }

  .warmPrompt_up {
  }

  .warmPrompt_dowm {

  }

  .button {
    display: flex;
    display: -webkit-flex;
    font-size: 1.7rem;
    margin: 1rem;
  }

  .button_left {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 4rem;
    background-color: white;
    border: solid 1px #D1D1D1;
    padding-top: 1.5rem;
    border-radius: 5px;
    margin: 1rem;
  }

  .button_right {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 4rem;
    background-color: #E6A913;
    color: white;
    padding-top: 1.5rem;
    border: solid 1px #E6A913;
    border-radius: 5px;
    margin: 1rem;
  }
  }
  .example {
  .weui-cells:before {
    border-top: none;
  }




  .chooseImage_1{
    /*width:90%;*/
    border: dotted 1px #999999;
    height: 10rem;
    text-align: center;
    line-height: 2.5;
    font-size: 4rem;
    color:#333333;
    margin: 10px 10px 1rem 1rem;
  }


  .weui-cells:after {
    left: 10px;
  }

  .vux-x-icon {
    fill: #999999;
    padding-right: 10px;
  }

  .weui-cell_access .weui-cell__ft {
    padding-right: 23px;
  }

  .weui-cells {
    font-size: 1.3rem;
  }

  .weui-cell_access .weui-cell__ft:after {
    height: 10px;
    width: 10px;
  }

  a {
    text-decoration: none;
  }

  .weui-dialog {
    height: 90%;
    width: 90%;

  }
  .vux-close {
    margin-top: 8px;
    /*margin-bottom: 8px;*/
    margin-left: 90%;
  }
  .new {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;

  .left {
    display: inline-block;
    width: 50%;
    align-items: center;
    text-align: left;
    margin-left: 3px;
    font-size: 1.3rem;
    padding-left: 3px;
  }

  .right {
    border: 0px;
    display: inline-block;
    width: 80%;
    text-align: right;
    padding-right: 1rem;
    height: 3.5rem;
    background-color: white;
    outline: none;
    font-size: 1.3rem;
  }

  }

  .name {
    display: flex;
    display: -webkit-flex;
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-left: 1rem;

  }

  .name_left {
    display: inline-block;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 3px;
  }
  .img{
    width: 90%;
    height:6rem;
  }
  i{
    display: none;
  }
  .img-inputer{
    background-color: white;
    box-shadow: none;
    border:dotted 1px gray;
    height:8rem;
    width: 85%;
  }
  .img-inputer__placeholder{
    font-size: 8rem;
    color: gray;
    line-height: 1;
    margin-top: -5rem;
  }
  .addImg{
    border: dotted 1px gray;
    height:8rem;
    width: 85%;
    border: dotted 1px gray;
    height: 8rem;
    width: 85%;
    font-size: 8rem;
    color: gray;
    line-height: 1;
    margin: 1rem;
  }
  .addBtn{
    height: 3rem;
    line-height: 2.5;
    margin:1rem;
    text-align: center;
    background-color:  #E6A913;
    color:white;
  }
  .addBtnNew{
    height: 3rem;
    line-height: 2.5;
    margin:1rem;
    text-align: center;
    background-color:  #D9D9D9;
    pointer-events:none;

  }
  .labelValue {
    width: 60%;
    display: inline-block;

  .Radio1 {
    width: 40%;
    display: inline-block;
  }

  .Radio2 {
    width: 55%;
    display: inline-block;
  }

  img {
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  span {
    position: relative;
    top: 1px;
  }

  }

  .radio {
    display: flex;
    display: -webkit-flex;
    margin-left: 1rem;
    margin-top: 1rem;
    border-bottom: 1px solid #D9D9D9;
    min-height: 2.5rem;
  }

  .radio_title {
    display: inline-block;
    width: 40%;
    text-align: left;
    font-size: 1.3rem;
    padding-left: 3px;
  }
  .weui-cells{
    margin-top:0px;
  }

  }

</style>
