<template>
  <div class="channelInfo">
    <div class="block">
      <div class="head">基本信息</div>
      <div class="content">
        <div class="label">渠道编号:</div>
        <div class="text">{{channelInfo.channelCode}}</div>
      </div>
      <div class="content">
        <div class="label">渠道名称:</div>
        <div class="text">{{channelInfo.channelName}}</div>
      </div>
      <div class="content">
        <div class="label">中文全称:</div>
        <div class="text">{{channelInfo.chineseName}}</div>
      </div>
      <div class="content">
        <div class="label">英文全称:</div>
        <div class="text">{{channelInfo.englishName}}</div>
      </div>
      <div class="content">
        <div class="label">证件类型:</div>
        <div class="text">{{channelInfo.certificateNumber}}</div>
      </div>
      <div class="content">
        <div class="label">证件编号:</div>
        <div class="text">{{channelInfo.channelCode}}</div>
      </div>
      <div class="content">
        <div class="label">联系人姓名:</div>
        <div class="text">{{channelInfo.contactPerson}}</div>
      </div>
      <div class="content">
        <div class="label">手机区号:</div>
        <div class="text">{{channelInfo.phoneCode}}</div>
      </div>
      <div class="content">
        <div class="label">手机号:</div>
        <div class="text">{{channelInfo.contactPhone}}</div>
      </div>
      <div class="content">
        <div class="label">电子邮箱:</div>
        <div class="text">{{channelInfo.email}}</div>
      </div>
      <div class="content">
        <div class="label">所在地区:</div>
        <div class="text">{{channelInfo.province}}/{{channelInfo.city}}</div>
      </div>
      <div class="content">
        <div class="label">详细地址:</div>
        <div class="text">{{channelInfo.address}}</div>
      </div>
    </div>
    <div class="block">
      <div class="head">背景信息</div>
      <div class="content">
        <div class="label">渠道类型:</div>
        <div class="text">{{channelInfo.channelTypeCode}}</div>
      </div>
      <div class="content">
        <div class="label">行业背景:</div>
        <div class="text">{{channelInfo.industryBackground}}</div>
      </div>
      <div class="content">
        <div class="label">有无经验:</div>
        <div class="text">{{channelInfo.experienceFlag}}</div>
      </div>
      <div class="content">
        <div class="label">展业模式:</div>
        <div class="text">{{channelInfo.exhibitionMode}}</div>
      </div>
      <div class="content">
        <div class="label">展业范围:</div>
        <div class="text">{{channelInfo.exhibitionRange}}</div>
      </div>
    </div>
    <div class="block">
      <div class="head">资料收集</div>
      <div class="content">
        <div class="label">香港开户行:</div>
        <div class="text">{{channelInfo.hkBank}}</div>
      </div>
      <div class="content">
        <div class="label">帐号名称:</div>
        <div class="text">{{channelInfo.englishName}}</div>
      </div>
      <div class="content">
        <div class="label">帐号号码:</div>
        <div class="text">{{channelInfo.hkBankAccountNum}}</div>
      </div>
      <div class="content">
        <div class="label">内地开户行:</div>
        <div class="text">{{channelInfo.ilBank}}</div>
      </div>
      <div class="content">
        <div class="label">帐号名称:</div>
        <div class="text">{{channelInfo.ilBankAccountName}}</div>
      </div>
      <div class="content">
        <div class="label">帐号号码:</div>
        <div class="text">{{channelInfo.ilBankAccountNum}}</div>
      </div>
      <div class="content">
        <div class="label">公司证明:</div>
        <div class="text">{{information}}</div>
      </div>
      <div class="content">
        <div class="label">身份证明:</div>
        <div class="text">{{information}}</div>
      </div>
    </div>
    <div class="block">
      <div class="head">合约信息</div>
      <div class="content">
        <div class="label">合约编号:</div>
        <div class="text">{{contractInfo.contractCode}}</div>
      </div>
      <div class="content">
        <div class="label">合约类型:</div>
        <div class="text">{{contractInfo.contractTypeCode}}</div>
      </div>
      <div class="content">
        <div class="label">签约主体:</div>
        <div class="text">{{contractInfo.productDivision}}</div>
      </div>
      <div class="content">
        <div class="label">合约主体分类:</div>
        <div class="text">{{contractInfo.partyType}}</div>
      </div>
      <div class="content">
        <div class="label">合约主体名称:</div>
        <div class="text">{{contractInfo.partyName}}</div>
      </div>
      <div class="content">
        <div class="label">渠道分类:</div>
        <div class="text">{{contractInfo.channelTypeCode}}</div>
      </div>
      <div class="content">
        <div class="label">合约开始时间:</div>
        <div class="text">{{contractInfo.startDate}}</div>
      </div>
      <div class="content">
        <div class="label">合约终止时间:</div>
        <div class="text">{{contractInfo.endDate}}</div>
      </div>

      <!--<div class="content">-->
        <!--<div class="btn" @click="goDetail">查看合约详情</div>-->
      <!--</div>-->

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
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
            };
            document.body.appendChild(i);
          };
          setTimeout(function(){
            document.setTitle('渠道详情');
          }, 1);
        },
        mounted(){
          this.getCLBCode().then(response=>{
            Promise.all([this.getChannelInfo(this.$route.query.item+""),this.getContract(this.$route.query.item+""),this.getUserInfo()]).then(val=>{
              if(val[0]&&val[1]&&val[2]){
                this.$vux.loading.hide();
              }
            })
          })
        },
        methods: {
          getValue(array,key1){
            if(key1===null||key1===''||key1===undefined){
              return '';
            }
            return array.filter(a=>{
              return a.value ===key1;
            })[0].meaning;
          },
          getCLBCode(){
            return new Promise((resolve,reject)=> {
              let _this = this,
                url = '/api/clb/common/clbCode',
                param = {
                  certificateTypes: "CNL.CERTIFICATE_TYPE",
                  channelClass: "CNL.CHANNEL_CLASS",
                  channelTypeCodes: "CNL.CHANNEL_TYPE",
                  cityList: "PUB.CITY",
                  contractTypes: "CNL.CONTRACT_TYPE",
                  exhibitionModes: "CNL.EXHIBITION_MODE",
                  exhibitionRanges: "CNL.EXHIBITION_RANGE",
                  experienceFlags: "SYS.YES_NO",
                  hkBanks: "PUB.HK_BANK",
                  ilBanks: "PUB.IL_BANK",
                  industryBackgrounds: "CNL.INDUSTRY_BACKGROUND",
                  nationalList: "PUB.NATION",
                  partyTypes: "CNL.PARTY_TYPE",
                  phoneCodes: "PUB.PHONE_CODE",
                  productDivisions: "PRD.PRODUCT_DIVISION",
                  provinceList: "PUB.PROVICE"
                };
              _this.$vux.loading.show({text:'loading'});
              _this.$post(url, param).then(response=> {
                if (response) {
                  _this.clbCode = JSON.parse(response);
                  resolve('11');
                }
              });
            })
          },
          getChannelInfo(value){
            return new Promise((resolve,reject)=> {
              let _this = this;
              _this.$post('/api/channel/personal/query', {channelId: value}).then(response=> {
                if(response.success){
                  _this.channelInfo = response.rows[0];
                  _this.channelInfo.city = _this.getValue(_this.clbCode.cityList, _this.channelInfo.city);
                  _this.channelInfo.province = _this.getValue(_this.clbCode.provinceList, _this.channelInfo.province);
                  _this.channelInfo.certificateType = _this.getValue(_this.clbCode.certificateTypes, _this.channelInfo.certificateType);
                  _this.channelInfo.channelTypeCode = _this.getValue(_this.clbCode.channelTypeCodes, _this.channelInfo.channelTypeCode);
//                  _this.channelInfo.exhibitionMode = _this.getValue(_this.clbCode.exhibitionModes, _this.channelInfo.exhibitionMode);
                  _this.channelInfo.exhibitionRange = _this.getValue(_this.clbCode.exhibitionRanges, _this.channelInfo.exhibitionRange);
                  _this.channelInfo.experienceFlag = _this.getValue(_this.clbCode.experienceFlags, _this.channelInfo.experienceFlag);
                  _this.channelInfo.hkBank = _this.getValue(_this.clbCode.hkBanks, _this.channelInfo.hkBank);
                  _this.channelInfo.ilBank = _this.getValue(_this.clbCode.ilBanks, _this.channelInfo.ilBank);
                  _this.channelInfo.industryBackground = _this.getValue(_this.clbCode.industryBackgrounds, _this.channelInfo.industryBackground);
//                _this.contractInfo.contractTypeCode = _this.getValue(_this.clbCode.contractTypes, _this.contractInfo.contractTypeCode);
                  _this.contractInfo.partyType = _this.getValue(_this.clbCode.partyTypes, _this.contractInfo.partyType);
                  _this.contractInfo.productDivision = _this.getValue(_this.clbCode.productDivisions, _this.contractInfo.productDivision);
                }else{
                  _this.$vux.loading.hide();
                }
                 resolve(response.success);
              })
            })
          },
          getContract(value){
            return new Promise(resolve=>{
              let _this = this;
              _this.$post('/api/channel/personal/contract',{channelId:value,parentChannelId:JSON.parse(window.localStorage.userInfo).user.relatedPartyId}).then(response=>{
                if(response.success){
                  _this.contractInfo = response.rows[0];
                  _this.contractInfo.contractTypeCode = _this.getValue(_this.clbCode.contractTypes,response.rows[0].contractTypeCode);
                }else{
                  _this.$vux.loading.hide();
                }
                resolve(response.success);
              })
            });
          },
          getUserInfo(){
            return new Promise(resolve=>{
              let _this = this;
              _this.$post('/api/user/queryUserInfo',{userId:JSON.parse(window.localStorage.userInfo).user.userId}).then(response=>{
                if(response.success){
                  _this.userInfo = response.rows[0];
                }else{
                  _this.$vux.loading.hide();
                }
                resolve(response.success);
              })
            });
          },
          goDetail(){
            var vm=this;
            vm.$router.push({path:'/contractDetail',query:{'channelContractId':vm.contractInfo.channelContractId,'channelId':vm.contractInfo.channelId}});
          }
        },
        data () {
            return {
              msg: 'Welcome to Your Vue.js App',
              channelInfo:{},
              information:'',
              clbCode:[],
              contractInfo:{},
              userInfo:{}
            }
        }
    }
</script>

<style lang="scss">
  .channelInfo{
    width:100%;
    .block{
      width:100%;
      background: white;
      .head{
        width: 100%;
        line-height: 45px;
        font-size: 1.6rem;
        color: #000;
        background: #f4f4f4;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .content{
        width: 100%;
        line-height: 30px;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 1.4rem;
        letter-spacing: 1px;
        color:#333;
        .label{
          width: 30%;
          display:inline-block;
          span{
            color: red;
          }
        }
        .text{
          display: inline-block;
        }
      .btn{
        text-align: center;
        border:solid 1px #E5B33E;
        border-radius: 5px;
      }
      }
    }
  }
</style>
