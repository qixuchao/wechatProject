<template>
  <div class="orderDetail">
    <div class="first">
      <div class="title">订单详情</div>
      <div class="other"><span>订单编号：</span><span>{{orderList.orderNumber}}</span></div>
      <div class="other"><span>保单编号：</span><span>{{orderList.policyNumber}}</span></div>
      <div class="other"><span>产品（年期）：</span><span>{{orderList.itemName}}({{orderList.sublineItemName}}年)</span></div>
      <div class="other"><span>投保人：</span><span>{{orderList.applicant}}</span></div>
      <div class="other"><span>受保人：</span><span>{{orderList.insurant}}</span></div>
      <div class="other"><span>渠道：</span><span>{{orderList.channelName}}</span></div>
      <div class="other"><span>预约时间：</span><span>{{orderList.reserveDate}}</span></div>
      <div class="other"><span>状态：</span><span>{{orderList.statusDesc}}</span></div>

      <div v-if="type==='personal'">
        <div class="left_new" @click="goBack" v-if="pendingList.length===0&&showCan">取消</div>
        <div class="left" @click="goBack" v-if="pendingList.length>0&&showCan">取消</div>
        <div class="right" @click="goPending" v-if="pendingList.length>0&&showCan">pending</div>
        <div class="left_new_other" @click="goPending" v-if="pendingList.length>0&&!showCan">pending</div>
      </div>

      <div v-if="type==='team'">
        <div class="left_new_other" @click="goPending" v-if="pendingList.length>0">pending</div>
      </div>

    </div>

    <div class="productDetail">产品详情</div>
    <div class="two" @click="showCompany =!showCompany;">
      <img :src="icon1" class="two_left"/>
      <span class="two_middle">产品信息</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showCompany" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showCompany" class="two_right"></x-icon></span>
    </div>

    <div class="product" v-if="showCompany">
      <div class="header">产品信息</div>
      <div class="other"><span>保险公司：</span><span>{{orderList.productSupplierName}}</span></div>
      <div class="other"><span>产品：</span><span>{{orderList.itemName}}</span></div>
      <div class="other"><span>供款年期：</span><span>{{orderList.sublineItemName}}年</span></div>
      <div class="other"><span>缴费方式：</span><span>{{orderList.payMethod}}</span></div>
      <div class="other"><span>币种：</span><span>{{orderList.currency}}</span></div>
      <div class="other"><span>年缴保费：</span><span>{{orderList.yearPayAmount}}</span></div>
      <div class="other"><span>保额：</span><span>{{orderList.policyAmount}}</span></div>
      <div class="other"><span>预约时间：</span><span>{{orderList.reserveDate}}</span></div>
      <!--<div class="other"><span>附件：</span><span>{{production.itemName}}</span></div>-->

      <div class="header">保单信息</div>
      <div class="other"><span>赴港联系人：</span><span>{{orderList.hkContactPerson}}</span></div>
      <div class="other"><span>联系电话：</span><span>{{orderList.hkContactPhoneCode}}</span><span style="margin-left: 5px">{{orderList.hkContactPhone}}</span>
      </div>
      <div class="other"><span>保费递增：</span><span>{{orderList.increaseFlag}}</span></div>
      <div class="other"><span>首期供款方式：</span><span>{{orderList.firstPaymentMethod}}</span></div>
      <div class="other"><span>续期供款方式：</span><span>{{orderList.renewalPaymentMethod}}</span></div>
      <div class="other"><span>是否有附加险：</span><span>{{add}}</span></div>
      <div v-for="item in addList" v-if="add==='是'">
        <div class="other"><span>产品：</span><span>{{item.itemName}}</span></div>
        <div class="other"><span>缴费方式：</span><span>{{item.payMethodDesc}}</span></div>
        <div class="other"><span>年缴保费：</span><span>{{item.yearPayAmount}}</span></div>
        <div class="other"><span>保额：</span><span>{{item.policyAmount}}</span></div>
      </div>
    </div>


    <div class="two" @click="showCustomer =!showCustomer;">
      <img :src="icon2" class="two_left"/>
      <span class="two_middle">用户信息</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showCustomer" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showCustomer" class="two_right"></x-icon></span>
    </div>

    <div class="customer" v-if="showCustomer">

      <div v-if="beneficiaryList.length>0" v-for="item in beneficiaryList">
        <div class="header">受益人信息</div>
        <div class="other"><span>中文姓名：</span><span>{{item.chineseName}}</span></div>
        <div class="other"><span>英文拼音姓名：</span><span>{{item.englishName}}</span></div>
        <div class="other"><span>年龄：</span><span>{{item.age}}</span></div>
        <div class="other"><span>身份证/护照号码：</span><span>{{item.identityNumber}}</span></div>
        <div class="other"><span>与被保人关系：</span><span>{{item.relationship}}</span></div>
        <div class="other"><span>分配比率(100%)：</span><span>{{item.rate}}%</span></div>
      </div>

      <div v-for="(item,index) in insurantList">
        <div class="header">受保人信息</div>
        <div class="other"><span>中文姓名：</span><span>{{item.chineseName}}</span></div>
        <div class="other"><span>英文拼音姓名：</span><span>{{item.englishName}}</span></div>
        <div class="other"><span>出生日期：</span><span>{{item.birthDate}}</span></div>
        <div class="other"><span>性别：</span><span>{{item.sex}}</span></div>
        <div class="other"><span>国籍：</span><span>{{item.nationality}}</span></div>
        <div class="other"><span>身高(cm)：</span><span>{{item.height}}</span></div>
        <div class="other"><span>体重(kg)：</span><span>{{item.weight}}</span></div>
        <div class="other"><span>教育程度：</span><span>{{item.education}}</span></div>
        <div class="other"><span>婚姻状况：</span><span>{{item.marriageStatus}}</span></div>
        <div class="other"><span>是否美国公民或税务居民：</span><span>{{item.americanCitizenFlag}}</span></div>
        <div class="other"><span>身份证号：</span><span>{{item.identityNumber}}</span></div>
        <div class="other"><span>身份证有效期：</span><span>{{item.identityEffectiveDate}}</span></div>
        <div class="other"><span>其他证件：</span><span>{{item.certificateType}}</span></div>
        <div class="other"><span>证件号码：</span><span>{{item.certificateNumber}}</span></div>
        <div class="other"><span>证件有效期：</span><span>{{item.certificateEffectiveDate}}</span></div>
        <div class="other"><span>身份证地址：</span><span>{{item.identityNation}} {{item.identityProvince}} {{item.identityCity}}</span>
        </div>
        <div class="other"><span>是否以身份证作为地址证明：</span><span>{{item.identityFlag}}</span></div>
        <div class="other"><span>邮寄通讯地址：</span><span>{{item.postNation}} {{item.postProvince}} {{item.postCity}}</span>
        </div>
        <div class="other"><span>详细地址：</span><span>{{item.postAddress}}</span></div>
        <div class="other"><span>联系电话：</span><span>{{item.phoneCode}}</span><span style="margin-left: 5px">{{item.phone}}</span></div>
        <div class="other"><span>电子邮箱：</span><span>{{item.email}}</span></div>
        <div class="other"><span>公司名称：</span><span>{{item.companyName}}</span></div>
        <div class="other"><span>公司业务性质(行业)：</span><span>{{item.industry}}</span></div>
        <div class="other"><span>公司地址：</span><span>{{item.companyNation}} {{item.companyProvince}} {{item.companyCity}}</span></div>
        <div class="other"><span>详细地址：</span><span>{{item.companyAddress}}</span></div>
        <div class="other"><span>职位：</span><span>{{item.job}}</span></div>
        <div class="other"><span>职务：</span><span>{{item.position}}</span></div>
        <div class="other"><span>月收入水平(港币)：</span><span>{{item.income}}</span></div>
        <div class="other"><span>保费资金来源：</span><span>{{item.premiumSource}}</span></div>
        <div class="other"><span>每月支出约多少：</span><span>{{item.amountPerMonth}}</span></div>
        <div class="other"><span>您持有多少流动资产：</span><span>{{item.currentAssets}}</span></div>
        <div class="other"><span>年持有不动资产的总值：</span><span>{{item.fixedAssets}}</span></div>
        <div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span class="right1">{{item.premiumRate}}</span></div>
        <div class="other"><span>您现时负债大约多少：</span><span>{{item.liabilities}}</span></div>
        <!--<div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span class="right1">{{item.premiumSource}}</span></div>-->
        <div class="other"><span class="left1">您是否曾被保险公司拒保、推迟承保、增加保费或更改受保条件?</span><span class="right1">{{item.badFlag}}</span></div>
        <div class="other" v-if="item.badFlag==='是'"><span>承保保险公司：</span><span>{{item.badInsuranceName}}</span></div>
        <div class="other" v-if="item.badFlag==='是'"><span>保险种类：</span><span>{{item.badInsuranceType}}</span></div>
        <div class="other" v-if="item.badFlag==='是'"><span>保险生效年月：</span><span>{{item.badEffactiveDate}}</span></div>
        <div class="other"><span class="left1">您是否因意外、伤病或健康理由而申请社会福利或社会赔偿?</span><span class="right1">{{item.compensateFlag}}</span></div>
        <div class="other" v-if="item.compensateFlag==='是'"><span>承保保险公司：</span><span>{{item.compensateInsuranceName}}</span></div>
        <div class="other" v-if="item.compensateFlag==='是'"><span>保险种类：</span><span>{{item.compensateInsuranceType}}</span></div>
        <div class="other" v-if="item.compensateFlag==='是'"><span>保险生效年月：</span><span>{{item.compensateEffactiveDate}}</span></div>
      </div>

      <div v-for="(item,index) in applicantList" v-if="showTwo">
        <div class="header">投保人信息</div>
        <div class="other"><span>中文姓名：</span><span>{{item.chineseName}}</span></div>
        <div class="other"><span>英文拼音姓名：</span><span>{{item.englishName}}</span></div>
        <div class="other"><span>出生日期：</span><span>{{item.birthDate}}</span></div>
        <div class="other"><span>性别：</span><span>{{item.sex}}</span></div>
        <div class="other"><span>国籍：</span><span>{{item.nationality}}</span></div>
        <div class="other"><span>身高(cm)：</span><span>{{item.height}}</span></div>
        <div class="other"><span>体重(kg)：</span><span>{{item.weight}}</span></div>
        <div class="other"><span>教育程度：</span><span>{{item.education}}</span></div>
        <div class="other"><span>婚姻状况：</span><span>{{item.marriageStatus}}</span></div>
        <div class="other"><span>是否美国公民或税务居民：</span><span>{{item.americanCitizenFlag}}</span></div>
        <div class="other"><span>身份证号：</span><span>{{item.identityNumber}}</span></div>
        <div class="other"><span>身份证有效期：</span><span>{{item.identityEffectiveDate}}</span></div>
        <div class="other"><span>其他证件：</span><span>{{item.certificateType}}</span></div>
        <div class="other"><span>证件号码：</span><span>{{item.certificateNumber}}</span></div>
        <div class="other"><span>证件有效期：</span><span>{{item.certificateEffectiveDate}}</span></div>
        <div class="other"><span>身份证地址：</span><span>{{item.identityNation}} {{item.identityProvince}} {{item.identityCity}}</span>
        </div>
        <div class="other"><span>是否以身份证作为地址证明：</span><span>{{item.identityFlag}}</span></div>
        <div class="other"><span>邮寄通讯地址：</span><span>{{item.postNation}} {{item.postProvince}} {{item.postCity}}</span>
        </div>
        <div class="other"><span>详细地址：</span><span>{{item.postAddress}}</span></div>
        <div class="other"><span>联系电话：</span><span>{{item.phoneCode}}</span><span style="margin-left: 5px">{{item.phone}}</span></div>
        <div class="other"><span>电子邮箱：</span><span>{{item.email}}</span></div>
        <div class="other"><span>公司名称：</span><span>{{item.companyName}}</span></div>
        <div class="other"><span>公司业务性质(行业)：</span><span>{{item.industry}}</span></div>
        <div class="other"><span>公司地址：</span><span>{{item.companyNation}} {{item.companyProvince}} {{item.companyCity}}</span></div>
        <div class="other"><span>详细地址：</span><span>{{item.companyAddress}}</span></div>
        <div class="other"><span>职位：</span><span>{{item.job}}</span></div>
        <div class="other"><span>职务：</span><span>{{item.position}}</span></div>
        <div class="other"><span>月收入水平(港币)：</span><span>{{item.income}}</span></div>
        <div class="other"><span>保费资金来源：</span><span>{{item.premiumSource}}</span></div>
        <div class="other"><span>每月支出约多少：</span><span>{{item.amountPerMonth}}</span></div>
        <div class="other"><span>您持有多少流动资产：</span><span>{{item.currentAssets}}</span></div>
        <div class="other"><span>年持有不动资产的总值：</span><span>{{item.fixedAssets}}</span></div>
        <div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span class="right1">{{item.premiumRate}}</span></div>
        <div class="other"><span>您现时负债大约多少：</span><span>{{item.liabilities}}</span></div>
        <!--<div class="other"><span class="left1">您每年承担的保费占您个人收入比例约为多少：</span><span class="right1">{{item.premiumSource}}</span></div>-->
        <div class="other"><span class="left1">您是否曾被保险公司拒保、推迟承保、增加保费或更改受保条件?</span><span class="right1">{{item.badFlag}}</span></div>
        <div class="other" v-if="item.badFlag==='是'"><span>承保保险公司：</span><span>{{item.badInsuranceName}}</span></div>
        <div class="other" v-if="item.badFlag==='是'"><span>保险种类：</span><span>{{item.badInsuranceType}}</span></div>
        <div class="other" v-if="item.badFlag==='是'"><span>保险生效年月：</span><span>{{item.badEffactiveDate}}</span></div>
        <div class="other"><span class="left1">您是否因意外、伤病或健康理由而申请社会福利或社会赔偿?</span><span class="right1">{{item.compensateFlag}}</span></div>
        <div class="other" v-if="item.compensateFlag==='是'"><span>承保保险公司：</span><span>{{item.compensateInsuranceName}}</span></div>
        <div class="other" v-if="item.compensateFlag==='是'"><span>保险种类：</span><span>{{item.compensateInsuranceType}}</span></div>
        <div class="other" v-if="item.compensateFlag==='是'"><span>保险生效年月：</span><span>{{item.compensateEffactiveDate}}</span></div>
      </div>
    </div>

    <div class="two" @click="showHealthy =!showHealthy;">
      <img :src="icon3" class="two_left"/>
      <span class="two_middle">健康信息</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showHealthy" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showHealthy" class="two_right"></x-icon></span>
    </div>

    <div class="healthy" v-if="showHealthy">
      <div class="healthy_detail">
        <div class="healthy_title">1.是否吸烟?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].smokeFlag==='N'">
            <img :src="agree" v-if="insurantList[0].smokeFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].smokeFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].smokeFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].smokeDesc" v-if="insurantList[0].smokeFlag==='Y'" disabled />

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].smokeFlag==='N'">
            <img :src="agree" v-if="applicantList[0].smokeFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].smokeFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].smokeFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].smokeDesc" v-if="applicantList[0].smokeFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">2.是否饮酒?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].drinkFlag==='N'">
            <img :src="agree" v-if="insurantList[0].drinkFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].drinkFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].drinkFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].drinkDesc" v-if="insurantList[0].drinkFlag==='Y'" disabled />

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].drinkFlag==='N'">
            <img :src="agree" v-if="applicantList[0].drinkFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].drinkFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].drinkFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].drinkDesc" v-if="applicantList[0].drinkFlag==='Y'" disabled/>
        <img class="line" :src="line"/>


        <div class="healthy_title">3.您是否服用任何成瘾药物或毒品?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].drugFlag==='N'">
            <img :src="agree" v-if="insurantList[0].drugFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].drugFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].drugFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].drugDesc" v-if="insurantList[0].drugFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].drugFlag==='N'">
            <img :src="agree" v-if="applicantList[0].drugFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].drugFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].drugFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].drugDesc" v-if="applicantList[0].drugFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">4.您是否处于因工作或娱乐目的，参与或计划参与任何危险性活动?例如潜水、赛车、飞行(以乘客身份搭乘商业性民航客机除外)</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].dangerousFlag==='N'">
            <img :src="agree" v-if="insurantList[0].dangerousFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].dangerousFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].dangerousFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].dangerousDesc" v-if="insurantList[0].dangerousFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].dangerousFlag==='N'">
            <img :src="agree" v-if="applicantList[0].dangerousFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].dangerousFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].dangerousFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].dangerousDesc" v-if="applicantList[0].dangerousFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">5.过去12个月内，您是否曾在居住地址以外的国家逗留?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].abroadFlag==='N'">
            <img :src="agree" v-if="insurantList[0].abroadFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].abroadFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].abroadFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].abroadDesc" v-if="insurantList[0].abroadFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].abroadFlag==='N'">
            <img :src="agree" v-if="applicantList[0].abroadFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].abroadFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].abroadFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].abroadDesc" v-if="applicantList[0].abroadFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">6.是否有任何缺陷、断肢、先天及/或后天的身体残疾?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].disabilityFlag==='N'">
            <img :src="agree" v-if="insurantList[0].disabilityFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].disabilityFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].disabilityFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].disabilityDesc" v-if="insurantList[0].disabilityFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].disabilityFlag==='N'">
            <img :src="agree" v-if="applicantList[0].disabilityFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].disabilityFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].disabilityFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].disabilityDesc" v-if="applicantList[0].disabilityFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">7.是否有大脑性麻痹、癫痫、中风、抑郁或其他精神失常?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].spiritFlag==='N'">
            <img :src="agree" v-if="insurantList[0].spiritFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].spiritFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].spiritFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].spiritDesc" v-if="insurantList[0].spiritFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].spiritFlag==='N'">
            <img :src="agree" v-if="applicantList[0].spiritFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].spiritFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].spiritFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].spiritDesc" v-if="applicantList[0].spiritFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">8.是否糖尿病、甲状腺或其他内分泌失调?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].endocrineFlag==='N'">
            <img :src="agree" v-if="insurantList[0].endocrineFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].endocrineFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].endocrineFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].endocrineDesc" v-if="insurantList[0].endocrineFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].endocrineFlag==='N'">
            <img :src="agree" v-if="applicantList[0].endocrineFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].endocrineFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].endocrineFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].endocrineDesc" v-if="applicantList[0].endocrineFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">9.是否有眼睛、鼻子、喉或耳朵之疾病/功能失常?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].faceFlag==='N'">
            <img :src="agree" v-if="insurantList[0].faceFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].faceFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].faceFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].faceDesc" v-if="insurantList[0].faceFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].faceFlag==='N'">
            <img :src="agree" v-if="applicantList[0].faceFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].faceFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].faceFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].faceDesc" v-if="applicantList[0].faceFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">10.是否有哮喘、肺炎、肺结核或呼吸系统疾病?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].respirationFlag==='N'">
            <img :src="agree" v-if="insurantList[0].respirationFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].respirationFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].respirationFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].respirationDesc" v-if="insurantList[0].respirationFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].respirationFlag==='N'">
            <img :src="agree" v-if="applicantList[0].respirationFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].respirationFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].respirationFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].respirationDesc	" v-if="applicantList[0].respirationFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">11.是否有血脂高或高血压?三高症状?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].threeFlag==='N'">
            <img :src="agree" v-if="insurantList[0].threeFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].threeFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].threeFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].threeDesc" v-if="insurantList[0].threeFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].threeFlag==='N'">
            <img :src="agree" v-if="applicantList[0].threeFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].threeFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].threeFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].threeDesc" v-if="applicantList[0].threeFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">12.是否有胸痛、心悸、心脏血管或循环系统疾病?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].cycleFlag==='N'">
            <img :src="agree" v-if="insurantList[0].cycleFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].cycleFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].cycleFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].cycleDesc" v-if="insurantList[0].cycleFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].cycleFlag==='N'">
            <img :src="agree" v-if="applicantList[0].cycleFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].cycleFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].cycleFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].cycleDesc" v-if="applicantList[0].cycleFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">13.是否有溃疡、疝气、痔疮、肠胃不适或消化系统疾病?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].digestionFlag==='N'">
            <img :src="agree" v-if="insurantList[0].digestionFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].digestionFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].digestionFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].digestionDesc" v-if="insurantList[0].digestionFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].digestionFlag==='N'">
            <img :src="agree" v-if="applicantList[0].digestionFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].digestionFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].digestionFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].digestionDesc" v-if="applicantList[0].digestionFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">14.是否有肝炎或带菌、胆囊、胆管及其他肝脏之疾病/功能失常?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].liverFlag==='N'">
            <img :src="agree" v-if="insurantList[0].liverFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].liverFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].liverFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].liverDesc" v-if="insurantList[0].liverFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].liverFlag==='N'">
            <img :src="agree" v-if="applicantList[0].liverFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].liverFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].liverFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].liverDesc" v-if="applicantList[0].liverFlag==='Y'" disabled/>
        <img class="line" :src="line"/>


        <div class="healthy_title">15.是否有肾脏、膀胱、前列腺或生殖系统之疾病/功能失常或结石?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].reproductionFlag==='N'">
            <img :src="agree" v-if="insurantList[0].reproductionFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].reproductionFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].reproductionFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].reproductionDesc" v-if="insurantList[0].reproductionFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].reproductionFlag==='N'">
            <img :src="agree" v-if="applicantList[0].reproductionFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].reproductionFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].reproductionFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].reproductionDesc" v-if="applicantList[0].reproductionFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>


        <div class="healthy_title">16.是否有神经炎、关节炎、通风症、脊柱裂、其他肢体关节、脊柱或肌肉骨骼疾病?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].jointFlag==='N'">
            <img :src="agree" v-if="insurantList[0].jointFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].jointFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].jointFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].jointDesc" v-if="insurantList[0].jointFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].jointFlag==='N'">
            <img :src="agree" v-if="applicantList[0].jointFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].jointFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].jointFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].jointDesc" v-if="applicantList[0].jointFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">17.是否有任何囊肿、肿瘤或癌症?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].tumorFlag==='N'">
            <img :src="agree" v-if="insurantList[0].tumorFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].tumorFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].tumorFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].tumorDesc" v-if="insurantList[0].tumorFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].tumorFlag==='N'">
            <img :src="agree" v-if="applicantList[0].tumorFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].tumorFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].tumorFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].tumorDesc" v-if="applicantList[0].tumorFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">18.是否有任何种类之贫血症或血友病或其他有关血液之疾病?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].bloodFlag==='N'">
            <img :src="agree" v-if="insurantList[0].bloodFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].bloodFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].bloodFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].bloodDesc" v-if="insurantList[0].bloodFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].bloodFlag==='N'">
            <img :src="agree" v-if="applicantList[0].bloodFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].bloodFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].bloodFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].bloodDesc" v-if="applicantList[0].bloodFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">19.您曾否接受/想接受爱滋病有关或任何性传染病的医药建议辅导或治疗?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].aidsFlag==='N'">
            <img :src="agree" v-if="insurantList[0].aidsFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].aidsFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].aidsFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].aidsDesc" v-if="insurantList[0].aidsFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].aidsFlag==='N'">
            <img :src="agree" v-if="applicantList[0].aidsFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].aidsFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].aidsFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].aidsDesc" v-if="applicantList[0].aidsFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">20.您曾否接受艾滋病抗体测试?如有，请注明日期及原因。</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].aidsTestFlag==='N'">
            <img :src="agree" v-if="insurantList[0].aidsTestFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].aidsTestFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].aidsTestFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].aidsTestDesc" v-if="insurantList[0].aidsTestFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].aidsTestFlag==='N'">
            <img :src="agree" v-if="applicantList[0].aidsTestFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].aidsTestFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].aidsTestFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].aidsTestDesc" v-if="applicantList[0].aidsTestFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">21.过去三个月内有否连续一星期以上出现疲倦、体重下降、腹泻、淋巴肿大或不正常的皮肤破损?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].skinFlag==='N'">
            <img :src="agree" v-if="insurantList[0].skinFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].skinFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].skinFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].skinDesc" v-if="insurantList[0].skinFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].skinFlag==='N'">
            <img :src="agree" v-if="applicantList[0].skinFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].skinFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].skinFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].skinDesc" v-if="applicantList[0].skinFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">22.您是否患有任何上文未有提及的心理或生理疾病、或意外?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].otherFlag==='N'">
            <img :src="agree" v-if="insurantList[0].otherFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].otherFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].otherFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].otherDesc" v-if="insurantList[0].otherFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].otherFlag==='N'">
            <img :src="agree" v-if="applicantList[0].otherFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].otherFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].otherFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].otherDesc" v-if="applicantList[0].otherFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">23.您有否因上述疾病及/或意外而正在接受诊治或药物治疗?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].otherTreatFlag==='N'">
            <img :src="agree" v-if="insurantList[0].otherTreatFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].otherTreatFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].otherTreatFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].otherTreatDesc" v-if="insurantList[0].otherTreatFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].otherTreatFlag==='N'">
            <img :src="agree" v-if="applicantList[0].otherTreatFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].otherTreatFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].otherTreatFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].otherTreatDesc" v-if="applicantList[0].otherTreatFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">24.在过去五年内您曾否因疾病或不适而接受X光、超声波检查、磁力共振、电脑扫描、细胞组织化验、心电图、血液或小便检查?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].examinationFlag==='N'">
            <img :src="agree" v-if="insurantList[0].examinationFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].examinationFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].examinationFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].examinationDesc" v-if="insurantList[0].examinationFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].examinationFlag==='N'">
            <img :src="agree" v-if="applicantList[0].examinationFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].examinationFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].examinationFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].examinationDesc" v-if="applicantList[0].examinationFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">
          25.您的父母、兄弟姊妹或子女曾否被诊断患有心脏病、中风、高血压、糖尿病、肝病、肾病、精神病、肿瘤或癌症、唐氏综合症、脊柱裂、系统性红斑狼疮、先天的身体残疾或任何遗传疾病?
        </div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].hereditaryFlag==='N'">
            <img :src="agree" v-if="insurantList[0].hereditaryFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].hereditaryFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].hereditaryFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].hereditaryDesc" v-if="insurantList[0].hereditaryFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].hereditaryFlag==='N'">
            <img :src="agree" v-if="applicantList[0].hereditaryFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].hereditaryFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].hereditaryFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].hereditaryDesc" v-if="applicantList[0].hereditaryFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">26.您现在是否怀孕?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].pregnancyFlag==='N'">
            <img :src="agree" v-if="insurantList[0].pregnancyFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].pregnancyFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].pregnancyFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].pregnancyDesc" v-if="insurantList[0].pregnancyFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].pregnancyFlag==='N'">
            <img :src="agree" v-if="applicantList[0].pregnancyFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].pregnancyFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].pregnancyFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].pregnancyDesc" v-if="applicantList[0].pregnancyFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">27.曾否或将接受唐氏综合症的测试?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].downTestFlag==='N'">
            <img :src="agree" v-if="insurantList[0].downTestFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].downTestFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].downTestFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].downTestDesc" v-if="insurantList[0].downTestFlag==='Y'" disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].downTestFlag==='N'">
            <img :src="agree" v-if="applicantList[0].downTestFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].downTestFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].downTestFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].downTestDesc" v-if="applicantList[0].downTestFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">28.您曾否因为妇科问题而看医生，例如：两次经期间之出血、盆腔炎疾病、子宫颈部或乳房异常?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].gynecologyFlag==='N'">
            <img :src="agree" v-if="insurantList[0].gynecologyFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].gynecologyFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].gynecologyFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].gynecologyDesc" v-if="insurantList[0].gynecologyFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].gynecologyFlag==='N'">
            <img :src="agree" v-if="applicantList[0].gynecologyFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].gynecologyFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].gynecologyFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].gynecologyDesc" v-if="applicantList[0].gynecologyFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">29.在过去十年内，您曾否在怀孕期间患有并发症(例如：宫外孕、弥漫性血管内凝血、糖尿病或高血压等)?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].complicationFlag==='N'">
            <img :src="agree" v-if="insurantList[0].complicationFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].complicationFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].complicationFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].complicationDesc" v-if="insurantList[0].complicationFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].complicationFlag==='N'">
            <img :src="agree" v-if="applicantList[0].complicationFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].complicationFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].complicationFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].complicationDesc" v-if="applicantList[0].complicationFlag==='Y'"
               disabled/>
        <img class="line" :src="line"/>

        <div class="healthy_title">30.您曾否接受或被建议接受或打算接受乳房X光像、乳房或盆腔超声波检查、子宫颈细胞涂片检查、锥形切片检查或阴道镜检查?</div>
        <div class="out">
          <div class="healthy_left">受保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="insurantList[0].gynecologyOthFlag==='N'">
            <img :src="agree" v-if="insurantList[0].gynecologyOthFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="insurantList[0].gynecologyOthFlag==='Y'">
            <img :src="agree" v-if="insurantList[0].gynecologyOthFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="insurantList[0].gynecologyOthDesc" v-if="insurantList[0].gynecologyOthFlag==='Y'"
               disabled/>

        <div class="out">
          <div class="healthy_left">投保人</div>
          <div class="healthy_middle">
            <img :src="disagree" v-if="applicantList[0].gynecologyOthFlag==='N'">
            <img :src="agree" v-if="applicantList[0].gynecologyOthFlag==='Y'">
            <span>是</span>
          </div>
          <div class="healthy_right">
            <img :src="disagree" v-if="applicantList[0].gynecologyOthFlag==='Y'">
            <img :src="agree" v-if="applicantList[0].gynecologyOthFlag==='N'">
            <span>否</span>
          </div>
        </div>
        <input class="input" v-model="applicantList[0].gynecologyOthDesc"
               v-if="applicantList[0].gynecologyOthFlag==='Y'" disabled/>
        <img class="line" :src="line"/>

      </div>
    </div>

    <div class="two" @click="showFuJian =!showFuJian;">
      <img :src="icon4" class="two_left"/>
      <span class="two_middle">附件信息</span>
      <span><x-icon type="ios-arrow-up" size="30" v-if="showFuJian" class="two_right"></x-icon></span>
      <span><x-icon type="ios-arrow-down" size="30" v-if="!showFuJian" class="two_right"></x-icon></span>
    </div>

    <div class="fujian" v-if="showFuJian">
      <div class="whole_new">
        <span class="product_left_new">身份证正面照片：</span>
        <span class="img"  v-if="length1-1>=0">{{fuJian[0].fileName}}</span>
      </div>
      <div class="whole_new">
        <span class="product_left_new">身份证反面照片：</span>
        <span class="img"  v-if="length1-2>=0">{{fuJian[1].fileName}}</span>
      </div>
      <div class="whole_new_other">
        <span class="product_left_new">住址证明扫描件：</span>
        <span class="img"  v-if="length1-3>=0">{{fuJian[2].fileName}}</span>
      </div>
      <div class="whole_new_other">
        <span class="product_left_new">信用卡扫描件：</span>
        <span class="img"  v-if="length1-4>=0">{{fuJian[3].fileName}}</span>
      </div>
      <div class="whole_new_other">
        <span class="product_left_new">护照扫描件：</span>
        <span class="img"   v-if="length1-5>=0">{{fuJian[4].fileName}}</span>
      </div>
      <div class="whole_new_other">
        <span class="product_left_new">通行证扫描件：</span>
        <span class="img"  v-if="length1-6>=0">{{fuJian[5].fileName}}</span>
      </div>
      <div class="whole_new_other">
        <span class="product_left_new">出生证扫描件：</span>
        <span class="img"   v-if="length1-7>=0">{{fuJian[6].fileName}}</span>
      </div>
      <div class="whole_new_other">
        <span class="product_left_new">户口本扫描件：</span>
        <span class="img"  v-if="length1-8>=0">{{fuJian[7].fileName}}</span>
      </div>

    </div>


    <div v-transfer-dom>
      <confirm v-model="showBack" :title="title1" @on-cancel="onCancel" @on-confirm="onConfirm">
      </confirm>
    </div>

    <!--&lt;!&ndash;点击图片放大&ndash;&gt;-->
    <!--<div v-transfer-dom>-->
      <!--<previewer :list="list" ref="previewer" :options="options" @on-close="close"></previewer>-->
    <!--</div>-->



  </div>

</template>

<script type="text/ecmascript-6">

  import {Confirm,TransferDomDirective as TransferDom,Previewer } from 'vux';

  export default {
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Previewer
    },
    data(){
    return {
      orderList: {},
      payMethodList: [],
      prdItemPaymode: [],
      phoneCodeList: [],
      renewalStatus: [],
      certificateList: [],
      cityList: [],
      diplomaList: [],
      firstPayMethodList: [],
      genderList: [],
      marryList: [],
      nationalList: [],
      provinceList: [],
      relationshipList: [],
      renewalPayMethodList: [],
      title1: "确认取消预约该订单吗？",
      beneficiaryList: [],
      insurantList: [],
      applicantList: [],
      fuJian: [],
      addList: [],
      pendingList:[],
      add: '',
      icon1: require("../../assets/img/icon_product@2x.png"),
      icon2: require("../../assets/img/icon_user@2x.png"),
      icon3: require("../../assets/img/icon_healthy@2x.png"),
      icon4: require("../../assets/img/icon_atthment@2x.png"),
      disagree: require('../../assets/register/icon_unselect@3x.png'),
      agree: require('../../assets/register/icon_select@3x.png'),
      line: require('../../assets/img/line.png'),
      showCompany: false,
      showCustomer: false,
      showHealthy: false,
      showFuJian: false,
      showBack: false,
      orderId: '',
      length1:'',
      type:'',
      showCan:true,
      showTwo:true,


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
      document.setTitle('订单详情');
    }, 1);
  },
  mounted(){
    var vm = this;
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
    var orderId = vm.$route.query.orderId;
    vm.orderId=orderId;
    vm.type=vm.$route.query.type;
      vm.$post('/api/clb/common/clbCode', {
        "payMethodList": "CMN.PAY_METHOD",   //缴费方式（如月缴）
        "prdItemPaymode": "PUB.CURRENCY",
        "phoneCodeList": "PUB.PHONE_CODE",
        "renewalStatus": "ORD.RENEWAL_STATUS",
        "certificateList": "CTM.CERTIFICATE_TYPE",  //证件类型
        "cityList": "PUB.CITY",
        "diplomaList": "CTM.DIPLOMA_TYPE",   //客户文凭
        "firstPayMethodList": "ORD.FIRST_PAYMENT_METHOD",  //第一次支付方式
        "genderList": "HR.EMPLOYEE_GENDER",  //性别
        "marryList": "CTM.MARITAL_STATUS",  //是否已婚
        "nationalList": "PUB.NATION",
        "provinceList": "PUB.PROVICE",
        "relationshipList": "ORD.RELATIONSHIP", //用户关系
        "renewalPayMethodList": "ORD.RENEWAL_PAYMENT_METHOD"  //续期支付方式
      }).then(function (response) {
        vm.payMethodList = JSON.parse(response).payMethodList;
        vm.prdItemPaymode = JSON.parse(response).prdItemPaymode;
        vm.phoneCodeList = JSON.parse(response).phoneCodeList;
        vm.renewalStatus = JSON.parse(response).renewalStatus;
        vm.certificateList = JSON.parse(response).certificateList;
        vm.cityList = JSON.parse(response).cityList;
        vm.diplomaList = JSON.parse(response).diplomaList;
        vm.firstPayMethodList = JSON.parse(response).firstPayMethodList;
        vm.genderList = JSON.parse(response).genderList;
        vm.marryList = JSON.parse(response).marryList;
        vm.nationalList = JSON.parse(response).nationalList;
        vm.provinceList = JSON.parse(response).provinceList;
        vm.relationshipList = JSON.parse(response).relationshipList;
        vm.renewalPayMethodList = JSON.parse(response).renewalPayMethodList;
        console.log(vm.marryList);
        console.log(vm.diplomaList);
        second();
        three();
        forth();
        fifth();
        sixth();
        eight();
        nine();
      }, function (response) {
        console.log("接口出错了");
      })

    function second(){
      vm.$post('/api/ordOrder/query', {
        "orderId": orderId
      }).then(function (response) {
        vm.orderList = response.rows[0];
          if(vm.orderList.sameFlag==="SELF"){
            vm.showTwo=false;
            vm.orderList.sameFlag="本人";
          }else{
            for(let i in vm.relationshipList){
              if(vm.orderList.sameFlag===vm.relationshipList[i].value){
                vm.orderList.sameFlag=vm.relationshipList[i].meaning;
              }
            }
          }
        if(vm.orderList.statusDesc==='已签单'||vm.orderList.statusDesc==='离开会所'||vm.orderList.statusDesc==='退保处理中'||vm.orderList.statusDesc==='已退保'||vm.orderList.statusDesc==='批核中'||vm.orderList.statusDesc==='保单生效'||vm.orderList.statusDesc==='保单失效'||vm.orderList.statusDesc==='搁置受保'||vm.orderList.statusDesc==='保险公司拒保'||vm.orderList.statusDesc==='已取消'){
          vm.showCan=false;
        }
        if (vm.orderList.increaseFlag === 'N') {
          vm.orderList.increaseFlag = "否";
        }
        if (vm.orderList.increaseFlag === 'Y') {
          vm.orderList.increaseFlag = "是";
        }
        for (let i in vm.payMethodList) {  //缴费方式
          if (vm.payMethodList[i].value === vm.orderList.payMethod) {
            vm.orderList.payMethod = vm.payMethodList[i].meaning;
          }
        }
        for (let i in vm.prdItemPaymode) {    //币种
          if (vm.prdItemPaymode[i].value === vm.orderList.currency) {
            vm.orderList.currency = vm.prdItemPaymode[i].meaning;
          }
        }
        for (let i in vm.firstPayMethodList) {  //第一次支付方式
          if (vm.firstPayMethodList[i].value = vm.orderList.firstPaymentMethod) {
            vm.orderList.firstPaymentMethod = vm.firstPayMethodList[i].meaning;
          }
        }
        for (let i in vm.renewalPayMethodList) {  //续期支付
          if (vm.renewalPayMethodList[i].value = vm.orderList.renewalPaymentMethod) {
            vm.orderList.renewalPaymentMethod = vm.renewalPayMethodList[i].meaning;
          }
        }
        for (let i in vm.phoneCodeList) {   //电话类型
          if (vm.phoneCodeList[i].value === vm.orderList.hkContactPhoneCode) {
            vm.orderList.hkContactPhoneCode = vm.phoneCodeList[i].meaning;
          }
        }
        let date=new Date(vm.orderList.reserveDate.replace(/-/g,'/'));
        vm.orderList.reserveDate=date.format('yyyy/MM/dd');
      }, function (response) {
        console.log("接口出错了");
      })
    }
    function three(){
      vm.$post('/api/ordAddition/query', {
        "orderId": orderId
      }).then(function (response) {
        console.log('3');
        vm.addList = response.rows;
        if (vm.addList.length > 0) {
          vm.add = "是";
        } else {
          vm.add = "否";
        }
      }, function () {
        console.log('接口出错了');
      })
    }
    function forth(){
      vm.$post('/api/ordBeneficiary/query', {
        "orderId": orderId
      }).then(function (response) {
        vm.beneficiaryList = response.rows;
        for(let i in vm.beneficiaryList){
          //关系
          for (let j in vm.relationshipList) {
            if (vm.relationshipList[j].value === vm.beneficiaryList[i].relationship) {
              vm.beneficiaryList[i].relationship = vm.relationshipList[j].meaning;
            }
          }
        }
      }, function (response) {
        console.log("接口出错了");
      })
    }
    function fifth(){
      vm.$post('/api/ordCustomer/query', {
        "orderId": orderId,
        "customerType": "APPLICANT"
      }).then(function (response) {
        vm.applicantList = response.rows;
        for (let i in vm.applicantList) {
          for (let j in vm.genderList) {   //性别
            if (vm.applicantList[i].sex === vm.genderList[j].value) {
              vm.applicantList[i].sex = vm.genderList[j].meaning;
            }
          }
          for (let j in vm.nationalList) {  //国籍
            if (vm.applicantList[i].nationality === vm.nationalList[j].value) {
              vm.applicantList[i].nationality = vm.nationalList[j].meaning;
            }
            if (vm.applicantList[i].identityNation === vm.nationalList[j].value) {
              vm.applicantList[i].identityNation = vm.nationalList[j].meaning;
            }
            if (vm.applicantList[i].postNation === vm.nationalList[j].value) {
              vm.applicantList[i].postNation = vm.nationalList[j].meaning;
            }
            if (vm.applicantList[i].companyNation === vm.nationalList[j].value) {
              vm.applicantList[i].companyNation = vm.nationalList[j].meaning;
            }
          }
          for (let j in vm.cityList) {   //身份证市的详细地址
            if (vm.cityList[j].value === vm.applicantList[i].identityCity) {
              vm.applicantList[i].identityCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.applicantList[i].postCity) {
              vm.applicantList[i].postCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.applicantList[i].companyCity) {
              vm.applicantList[i].companyCity = vm.cityList[j].meaning;
            }

          }
          for (let j in vm.provinceList) {   //身份证省的详细地址
            if (vm.provinceList[j].value === vm.applicantList[i].identityProvince) {
              vm.applicantList[i].identityProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.applicantList[i].postProvince) {
              vm.applicantList[i].postProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.applicantList[i].companyProvince) {
              vm.applicantList[i].companyProvince = vm.provinceList[j].meaning;
            }
          }
          for (let j in vm.phoneCodeList) {   //电话类型
            if (vm.phoneCodeList[j].value === vm.applicantList[i].phoneCode) {
              vm.applicantList[i].phoneCode = vm.phoneCodeList[j].meaning;
            }
          }
          for (let j in vm.certificateList) {   //证件类型
            if (vm.certificateList[j].value === vm.applicantList[i].certificateType) {
              vm.applicantList[i].certificateType = vm.certificateList[j].meaning;
            }
          }
          for (let j in vm.marryList) {   //婚姻状态
            if (vm.marryList[j].value === vm.applicantList[i].marriageStatus) {
              vm.applicantList[i].marriageStatus = vm.marryList[j].meaning;
            }
          }
          for (let j in vm.diplomaList) {   //教育状态
            if (vm.diplomaList[j].value === vm.applicantList[i].education) {
              vm.applicantList[i].education = vm.diplomaList[j].meaning;
            }
          }
          if (vm.applicantList[i].americanCitizenFlag === 'N') {
            vm.applicantList[i].americanCitizenFlag = "否";
          }
          if (vm.applicantList[i].americanCitizenFlag === 'Y') {
            vm.applicantList[i].americanCitizenFlag = "是";
          }
          if (vm.applicantList[i].identityFlag === 'N') {
            vm.applicantList[i].identityFlag = "否";
          }
          if (vm.applicantList[i].identityFlag === 'Y') {
            vm.applicantList[i].identityFlag = "是";
          }
          let date = new Date(vm.applicantList[i].certificateEffectiveDate.replace(/-/g,'/'));
          vm.applicantList[i].certificateEffectiveDate = date.format('yyyy/MM/dd');
          date = new Date(vm.applicantList[i].birthDate.replace(/-/g,'/'));
          vm.applicantList[i].birthDate = date.format('yyyy/MM/dd');
          date = new Date(vm.applicantList[i].identityEffectiveDate.replace(/-/g,'/'));
          vm.applicantList[i].identityEffectiveDate = date.format('yyyy/MM/dd');
          if(vm.applicantList[i].badFlag==='Y'){
            let date=new Date(vm.applicantList[i].badEffactiveDate.replace(/-/g,'/'));
            vm.applicantList[i].badEffactiveDate=date.format('yyyy/MM/dd');
            vm.applicantList[i].badFlag='是';
          }
          if(vm.applicantList[i].badFlag==='N'){
            vm.applicantList[i].badFlag='否';
          }
          if(vm.applicantList[i].compensateFlag==='Y'){
            let date=new Date(vm.applicantList[i].compensateEffactiveDate.replace(/-/g,'/'));
            vm.applicantList[i].compensateEffactiveDate=date.format('yyyy/MM/dd');
            vm.applicantList[i].compensateFlag='是';
          }
          if(vm.applicantList[i].compensateFlag==='N'){
            vm.applicantList[i].compensateFlag='否';
          }

          vm.applicantList[i].premiumRate=Number(vm.applicantList[i].premiumRate*100).toFixed(2)+'%';

        }

      }, function (response) {
        console.log('接口出错了');
      })
    }
    function sixth(){
      vm.$post('/api/ordCustomer/query', {
        "orderId": orderId,
        "customerType": "INSURANT"
      }).then(function (response) {
        vm.insurantList = response.rows;
        for (let i in vm.insurantList) {
          for (let j in vm.genderList) {   //性别
            if (vm.insurantList[i].sex === vm.genderList[j].value) {
              vm.insurantList[i].sex = vm.genderList[j].meaning;
            }
          }
          for (let j in vm.nationalList) {  //国籍
            if (vm.insurantList[i].nationality === vm.nationalList[j].value) {
              vm.insurantList[i].nationality = vm.nationalList[j].meaning;
            }
            if (vm.insurantList[i].identityNation === vm.nationalList[j].value) {
              vm.insurantList[i].identityNation = vm.nationalList[j].meaning;
            }
            if (vm.insurantList[i].postNation === vm.nationalList[j].value) {
              vm.insurantList[i].postNation = vm.nationalList[j].meaning;
            }
            if (vm.insurantList[i].companyNation === vm.nationalList[j].value) {
              vm.insurantList[i].companyNation = vm.nationalList[j].meaning;
            }
          }
          for (let j in vm.diplomaList) {  //文凭
            if (vm.insurantList[i].identityNation === vm.diplomaList[j].value) {
              vm.insurantList[i].identityNation = vm.diplomaList[j].meaning;
            }
          }
          for (let j in vm.cityList) {   //身份证市的详细地址
            if (vm.cityList[j].value === vm.insurantList[i].identityCity) {
              vm.insurantList[i].identityCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.insurantList[i].postCity) {
              vm.insurantList[i].postCity = vm.cityList[j].meaning;
            }
            if (vm.cityList[j].value === vm.insurantList[i].companyCity) {
              vm.insurantList[i].companyCity = vm.cityList[j].meaning;
            }

          }
          for (let j in vm.provinceList) {   //身份证省的详细地址
            if (vm.provinceList[j].value === vm.insurantList[i].identityProvince) {
              vm.insurantList[i].identityProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.insurantList[i].postProvince) {
              vm.insurantList[i].postProvince = vm.provinceList[j].meaning;
            }
            if (vm.provinceList[j].value === vm.insurantList[i].companyProvince) {
              vm.insurantList[i].companyProvince = vm.provinceList[j].meaning;
            }
          }
          for (let j in vm.phoneCodeList) {   //电话类型
            if (vm.phoneCodeList[j].value === vm.insurantList[i].phoneCode) {
              vm.insurantList[i].phoneCode = vm.phoneCodeList[j].meaning;
            }
          }
          for (let j in vm.certificateList) {   //证件类型
            if (vm.certificateList[j].value === vm.insurantList[i].certificateType) {
              vm.insurantList[i].certificateType = vm.certificateList[j].meaning;
            }
          }
          for (let j in vm.marryList) {   //婚姻状态
            if (vm.marryList[j].value === vm.insurantList[i].marriageStatus) {
              vm.insurantList[i].marriageStatus = vm.marryList[j].meaning;
            }
          }
          for (let j in vm.diplomaList) {   //教育状态
            if (vm.diplomaList[j].value === vm.insurantList[i].education) {
              vm.insurantList[i].education = vm.diplomaList[j].meaning;
            }
          }
          if (vm.insurantList[i].americanCitizenFlag === 'N') {
            vm.insurantList[i].americanCitizenFlag = "否";
          }
          if (vm.insurantList[i].americanCitizenFlag === 'Y') {
            vm.insurantList[i].americanCitizenFlag = "是";
          }
          if (vm.insurantList[i].identityFlag === 'N') {
            vm.insurantList[i].identityFlag = "否";
          }
          if (vm.insurantList[i].identityFlag === 'Y') {
            vm.insurantList[i].identityFlag = "是";
          }
          let date = new Date(vm.insurantList[i].certificateEffectiveDate.replace(/-/g,'/'));
          vm.insurantList[i].certificateEffectiveDate = date.format('yyyy/MM/dd');
          date = new Date(vm.insurantList[i].birthDate.replace(/-/g,'/'));
          vm.insurantList[i].birthDate = date.format('yyyy/MM/dd');
          date = new Date(vm.insurantList[i].identityEffectiveDate.replace(/-/g,'/'));
          vm.insurantList[i].identityEffectiveDate = date.format('yyyy/MM/dd');
          if(vm.insurantList[i].badFlag==='Y'){
            let date=new Date(vm.insurantList[i].badEffactiveDate.replace(/-/g,'/'));
            vm.insurantList[i].badEffactiveDate=date.format('yyyy/MM/dd');
            vm.insurantList[i].badFlag='是';
          }
          if(vm.insurantList[i].badFlag==='N'){
            vm.insurantList[i].badFlag='否';
          }
          if(vm.insurantList[i].compensateFlag==='Y'){
            let date=new Date(vm.insurantList[i].compensateEffactiveDate.replace(/-/g,'/'));
            vm.insurantList[i].compensateEffactiveDate=date.format('yyyy/MM/dd');
            vm.insurantList[i].compensateFlag='是';
          }
          if(vm.insurantList[i].compensateFlag==='N'){
            vm.insurantList[i].compensateFlag='否';
          }

          vm.insurantList[i].premiumRate=Number(vm.insurantList[i].premiumRate*100).toFixed(2)+'%';


        }
      }, function (response) {
        console.log("接口出错了");
      })
    }
    function eight(){      //附件信息
      vm.$post('/api/ordOrderFileList/query', {
        "orderId": orderId
      }).then(function (response) {
        vm.fuJian = response.rows;
        vm.length1=vm.fuJian.length;
      }, function (response) {
        console.log("接口出错了");
      })
    }
    function nine(){
      vm.$post('/api/ordPending/query',{
        "orderId":orderId
      }).then(function(response){
        vm.pendingList=response.rows;
      },function(response){
        console.log('接口出错了')
      })
    }
  },



  methods:{
    goBack:function () {
      var vm = this;
      vm.showBack = true;
    }
  ,
    onCancel:function () {
      var vm = this;
      vm.showBack = false;
    }
  ,
    onConfirm:function () {
      var vm=this;
      vm.$post('/api/ordOrder/updateStatus',[{
        "orderId":vm.orderId,
        "status":"CANCELLED"
      }]).then(function(response){
          vm.$vux.toast.show({text:'提交已成功'});
      },function(response){
        vm.$vux.toast.show({text:'接口出错了'});

      })
    },

    goPending(){
      var vm=this;
//      vm.$router.push({path:'/pendingList'});
      vm.$router.push({path: '/pendingList',query:{orderId:vm.orderId}});

    },

  }
  }
</script>

<style lang="less">
  * {
    /*touch-action: none;*/
    padding: 0px;
    margin:0px;
  }
  .orderDetail {
    min-height: 100%;
    width: 100%;
    background-color: #F4F4F7;
    position: absolute;

  .whole {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
  }

  .whole_new {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 1px 0px 1rem 1rem;
    /*border-bottom: 1px solid #D9D9D9*/
  }

  .first {
    min-height: 10rem;
    background-color: white;
    margin: 0px;
  }

  .title {
    display: inline-block;
    margin-left: 15px;
    margin-top: 15px;
    border-left: 3px solid #E6A914;
    font-size: 1.6rem;
    padding-left: 5px;
  }

  .other {
    margin-left: 15px;
    margin-top: 10px;

  span {
    font-size: 1.3rem;
    color: #333333;
  }
  .left1{
    display: inline-block;
    vertical-align: middle;
    width: 80%;
    line-height: 1.5;
  }
  .right1{
    display: inline-block;
    width: 20%;
    text-align: center;
  }

  }

  .left {
    display: inline-block;
    width: 40%;
    margin-top: 20px;
    border: solid 1px #F4F4F7;
    /*color:#F4F4F7;*/
    height: 3rem;
    text-align: center;
    line-height: 2.5;
    margin-bottom: 20px;
    margin-left: 10px;
    border-radius: 4px;
  }
  .left_new{
    display: inline-block;
    width: 94%;
    margin-top: 20px;
    border: solid 1px #F4F4F7;
    color:gray;
    height: 3rem;
    text-align: center;
    line-height: 2.5;
    margin-bottom: 20px;
    margin-left: 10px;
    border-radius: 4px;
  }
  .left_new_other{
    display: inline-block;
    margin-top: 20px;
    /*border: solid 1px #F4F4F7;*/
    background-color:#E6A914;
    color:white;
    height: 3rem;
    text-align: center;
    line-height: 2.5;
    margin-bottom: 20px;
    margin-left: 10px;
    border-radius: 4px;
    width:94%;
  }

  .right {
    display: inline-block;
    width: 40%;
    margin-top: 20px;
    margin-left: 23px;
    background-color: #E6A914;
    color: white;
    height: 3rem;
    text-align: center;
    line-height: 2.5;
    margin-bottom: 20px;
    border-radius: 4px;
  }

  .productDetail {
    margin-left: 10px;
    height: 30px;
    font-size: 1.6rem;
    line-height: 2.5;
  }

  .two {
    height: 50px;
    background-color: white;
    margin-top: 10px;
  }

  .two_left {
    position: absolute;
    height: 30px;
    width: 30px;
    margin-left: 15.5px;
    padding-top: 1rem;
  }

  .two_middle {
    margin-top: 1.6rem;
    margin-left: 55.5px;
    position: absolute;
  }

  .two_right {
    margin-left: 85%;
    display: inline-block;
    margin-top: 1rem;
  }

  .product {
    background-color: white;
    margin-top: 2px;
    line-height: 2;
    padding-bottom: 0.5rem;
  }

  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    left: 10px;
  }

  .weui-cells {
    font-size: 1.3rem;
  }

  .weui-cell_access .weui-cell__ft {
    padding-right: 23px;
  }

  .weui-cell_access .weui-cell__ft:after {
    height: 10px;
    width: 10px;
  }

  .header {
    margin-left: 1rem;
    font-size: 1.7rem;
  }

  .product_left {
    display: inline-block;
    width: 40%;
    /*padding-left: 1rem ;*/
    /*height: 3rem;*/
    align-items: center;
  }

  .product_left_new {
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    line-height: 1.5;
  }

  .product_right_one {
    display: inline-block;
    width: 80%;
    /* background-color: #F4F4F7; */
    height: 3rem;
    border: 0px;
    text-align: right;
    padding-right: 1rem;
    outline: none;
  }

  .img {
    display: inline-block;
    width: 60%;
    text-align: center;
    word-break: break-all;
  }


  .img-inputer {
    position: relative;
    display: inline-block;
    width: 20%;
    height: 2rem;
    border-radius: 0px;
    background: white;
    box-shadow: none;
    transition: none;
  }

  .img-inputer__label {
    position: absolute;
    top: 0;
    left: 1rem;
    bottom: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    margin-bottom: 0;
    width: 100%;
  }

  .img-inputer-- {
    position: relative;
    display: inline-block;
    width: 20%;
    height: 2rem;
    border-radius: 0px;
    background: white;
    box-shadow: none;
    transition: none;
    margin-top: 0.5rem;
  }

  .img-inputer:hover {
    -webkit-transform: scale(1.015);
    transform: scale(1.015);
    box-shadow: none;
  }

  .product_btn {
    display: inline-block;
    width: 20%;
    color: blue;
    height: 2rem;
    border: 0px;

  i {
    display: none;
  }

  div {
    display: none;
  }

  /*label{*/
  /*display: none;*/
  /*}*/
  img {
    display: none;
  }

  .img-inputer__label:hover ~ .img-inputer__mask {
    display: none;
  }

  .img-inputer__placeholder {
    position: absolute;
    margin-left: 1rem;
    font-size: 14px;
    width: 100%;
    color: blue;
    margin-top: -1.6rem;
    text-align: center;

  }

  }

  .table {
    margin: 1rem;
    text-align: center;

  .supplierOne {
    background-color: #FFFBEE;
  }

  .supplierTwo {
    background-color: #FBFBFB;
  }

  th {
    border: solid #E5E2DA;
    border-width: 0px 1px 0px 0px;
    font-weight: normal;
  }

  td {
    border: solid #E5E2DA;
    border-width: 0px 1px 0px 0px;
  }

  }
  .product_btn_new {
    margin: 1rem;
    height: 3rem;
    line-height: 2;
    background-color: #E6A913;
    color: white;
    width: calc(~ "100% - 3rem");
    text-align: center;
    font-size: 1.7rem;

  }

  .customer {
    background-color: white;
    margin-top: 2px;
    line-height: 2;
    padding-bottom: 0.5rem;

  .header {
    margin-left: 1rem;
    font-size: 1.7rem;
  }

  .vux-cell-box:before {
    border-top: none;
  }

  .vux-label {
    width: 60%;
  }

  .customer_left {
    display: inline-block;
    width: 40%;
    /*margin:0rem 0px 1rem 1rem;*/
    align-items: center;

  }

  .customer_right {
    display: inline-block;
    width: 80%;
    /* background-color: #F4F4F7; */
    height: 3rem;
    border: 0px;
    text-align: right;
    padding-right: 1rem;
    outline: none;
  }

  .customer_btn {
    margin: 1rem;
    border: solid 1px #E6A913;
    color: #E6A913;
    font-size: 1.7rem;
    height: 3rem;
    line-height: 2;
    width: calc(~ "100% - 3rem");
    text-align: center;
    border-radius: 5px;
  }

  .date {
    margin-top: 0;
    height: 3rem;
    width: 100%;
  }

  .time_up {
    display: inline-block;
    position: absolute;
    width: 2rem;
    height: 2rem;
    /*background-color: #F4F4F7;*/
    margin-left: 85%;

  }

  .time_flex {
    display: flex;
    display: -webkit-flex;
  }

  .time_flex_left {
    display: inline-block;
    width: 100%;
    text-align: right;
    padding-right: 5rem;
  }

  .weui-cells {

    font-size: 1.3rem;
  }

  .weui-cells:after {
    height: 0px;
  }

  .weui-cell:after {
    border: 0px;
  }

  .weui-cell:before {
    border: 0px;
  }

  .weui-cell_ft {
    /*text-align: left;*/
  }

  a {
    text-decoration: none;
    border: 0px;
  }

  .group {
    display: inline-block;
    width: calc(~ "60% + 1rem");
    /*margin-left: -0.5rem;*/
    margin-top: -1rem;
  }

  }
  .healthy {
    background-color: white;
    margin-top: 2px;
  }

  .healthy_detail {

  .healthy_title {
    margin-left: 1rem;
    line-height: 2;
  }

  .out {
    display: flex;
    display: -webkit-flex;
    margin: 1rem;
    align-items: center;
  }

  .healthy_left {
    display: inline-block;
    width: 20%;
    border: 0px;

  }

  .healthy_middle {
    display: inline-block;
    width: 40%;

  }

  .healthy_right {
    display: inline-block;
    width: 40%;
  }

  .input {
    width: 70%;
    height: 3rem;
    padding-left: 1rem;
    margin-left: 20%;
    background-color: #F4F4F7;
    border: 0px;
    outline: none;
  }

  .line {
    width: 100%;
    height: 1px;
  }

  img {
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  }
  .fujian {
    margin-top: 3px;
    background-color: white;
    padding-bottom: 0.5rem;

  .whole_new {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 1px 0px 1rem 1rem;
    padding-top: 0.5rem;
    /*border-bottom: 1px solid #D9D9D9*/
  }

  .whole_new_other {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 3rem;
    margin: 1px 0px 1rem 1rem;
    padding-top: 0.5rem;

  .img-inputer__label {
    width: 15rem;
    border: dotted 1px gray;
  }

  .img-inputer__placeholder {
    text-align: center;
    width: 15rem;
    color: gray;
  }

  }
  .img-inputer__placeholder {
    position: absolute;
    margin-left: 1rem;
    font-size: 14px;
    color: blue;
    margin-top: -1.3rem;

  }

  .fujian_btn {
    margin: 1rem;
    height: 3rem;
    line-height: 2;
    background-color: #E6A913;
    color: white;
    width: calc(~ "100% - 3rem");
    text-align: center;
    font-size: 1.7rem;

  }

  }
  }
</style>
