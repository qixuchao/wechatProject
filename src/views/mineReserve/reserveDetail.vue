<template>
  <div  v-if="edit">
    <div class="hotelReserve" v-if="hotel">
      <!-- 酒店预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <input class="right" placeholder="请选择" v-model="data.applicant" @click="goCustom"/>
        <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber"></x-textarea>
        </group>
        <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>入住客户姓名</div>
        <input class="right" placeholder="请输入" v-model="data.lodgerName"
               onkeyup="value=value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5\s]/g,'')"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>入住客户姓名拼音</div>
        <input class="right" placeholder="请输入" v-model="data.lodgerPinyin"
               onkeyup="value=value.replace(/[^\a-\z\A-\Z\s]/g,'')"/>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.customerPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入" v-model="data.customerPhone"/>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>酒店所在地区</div>
        <group style="min-height: 3rem">
          <popup-radio :options="hotelList" v-model="data.sublineItemName" placeholder="请选择"></popup-radio>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>价格区间(每晚)</div>
        <group style="min-height: 3rem">
          <popup-radio :options="costList" v-model="data.priceInterval" placeholder="请选择"></popup-radio>
        </group>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>入住人数</div>
        <input class="right" placeholder="请输入" v-model="data.peopleCount"/>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>入住时间</div>
        <group>
          <datetime v-model="data.checkinDate" format="YYYY/MM/DD HH:mm" :title="startTime" placeholder="请选择"></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>退房时间</div>
        <group>
          <datetime v-model="data.checkoutDate" format="YYYY/MM/DD HH:mm" :title="endTime" placeholder="请选择"></datetime>
        </group>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>房间数</div>
        <input class="right" placeholder="请输入" v-model="data.roomCount"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>房型</div>
        <input class="right" placeholder="如：标准房、大床房等" v-model="data.roomType"/>
      </div>

      <div class="whole">
        <div class="left">指定酒店名称或地段</div>
        <input class="right" placeholder="如无则不填" v-model="data.hotelName"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <input class="right" placeholder="请输入" v-model="data.reserveContactPerson"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入" v-model="data.reserveContactPhone"/>
      </div>

      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <input class="bottom" placeholder="可为空" v-model="data.reserveComment"/>

      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.请填写详细客房需求（例：双床房2间/大床房1间）。</div>
        <div class="warmPrompt_dowm">2.香港酒店价格在不同日期价格波动极大，客户服务部会提供即时报价。</div>
      </div>

      <div style="display: flex;display: -webkit-flex">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="submit">提交</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
      </div>

    </div>

    <div class="hotelReserve" v-if="club">
      <!-- 会所预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <input class="right" placeholder="请选择" v-model="data.applicant" @click="goCustom"/>
        <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber"></x-textarea>
        </group>
        <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>会所位置</div>
        <group style="min-height: 3rem">
          <popup-radio  :options="clubList" v-model="data.sublineItemName" placeholder="请选择" @on-change="changeAddress"></popup-radio>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>使用时长</div>
        <group style="min-height: 3rem">
          <popup-radio  :options="timeList" v-model="data.userHour" @on-change="changeAddress"></popup-radio>
        </group>
      </div>

      <div class="whole"><div class="left">价格</div>
        <div class="right_new" >￥{{data.price}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约时间</div>
        <group style="min-height: 3rem">
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm"  :title="start"></datetime>
        </group>
      </div>

      <!--<group>-->
        <!--<datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm"  :title="start"></datetime>-->
      <!--</group>-->

      <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>人数</div>
        <input class="right" placeholder="请输入" v-model="data.peopleCount" />
      </div>
      <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <input class="right" placeholder="请输入" v-model="data.reserveContactPerson" />
      </div>


      <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入"  v-model="data.reserveContactPhone" />
      </div>


      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <input class="bottom" placeholder="可为空" v-model="data.reserveComment" />

      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.会所的预定使用时长2h起订，使用时间低于2h，均按2h的收费标准计算。</div>
        <div class="warmPrompt_dowm">2.预定会所的收费标准：会议室 300/h VIP室 150/h。</div>
      </div>

      <div style="display: flex;display: -webkit-flex">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="submit">提交</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
      </div>
    </div>


    <div class="hotelReserve" v-if="car">
      <!-- 专车预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <input class="right" placeholder="请选择" v-model="data.applicant" @click="goCustom"/>
        <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber"></x-textarea>
        </group>
        <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约路线</div>
        <group style="min-height: 3rem">
          <popup-radio  :options="pathList" v-model="data.sublineItemName" placeholder="请选择" @on-change="changePath"></popup-radio>
        </group>
      </div>
      <div class="whole">
        <div class="left">预计价格</div>
        <div class="right_new">{{data.price}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约时间</div>
        <group style="min-height: 3rem">
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>
        </group>
      </div>
      <!--<group>-->
        <!--<datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start"></datetime>-->
      <!--</group>-->
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>出发地</div>
        <input class="right" placeholder="请输入详细地址" v-model="data.departure" />
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>目的地</div>
        <input class="right" placeholder="请输入详细地址" v-model="data.destination"/>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>乘车总人数</div>
        <input class="right" placeholder="请输入" v-model="data.peopleCount"/>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>乘车联系人</div>
        <input class="right" placeholder="请输入" v-model="data.reserveContactPerson"/>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>乘车联系人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入" v-model="data.reserveContactPhone"/>
      </div>

      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <input class="bottom" v-model="data.reserveComment" />

      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.本服务为免费服务，若客户购买任何保险产品，单张保单年缴保费≥10万美金或趸交保费≥50万美金
          ，我司免费提供以上两次专车服务，超出两次专车接送另行收费。同一投保人两张及两张以上保单累计达以上金额不享受该免费服务。申请免费服务请务必在备注栏填写投保信息。
        </div>
        <div class="warmPrompt_dowm">2.如已享受以上专车服务的客户因各种原因未能投保成功及退保，我司将会补收该费用。</div>
        <div class="warmPrompt_dowm">3.所有增值服务以预约时信息为准，由于无预约、信息错误等产生的费用由客户承担，且过后不可以补办和报销。</div>
        <div class="warmPrompt_dowm">4.接送机自机场公布的航班到达时间接机，免费等60分钟，关口/酒店/码头等地点免费等30分钟，超出时间收费200-300/小时。</div>
        <div class="warmPrompt_dowm">5.节假日价格会有涨幅。</div>
      </div>


      <div style="display: flex;display: -webkit-flex">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="submit">提交</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
      </div>
    </div>

    <div class="hotelReserve" v-if="HPV">
      <!-- HPV预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <input class="right" placeholder="请选择" v-model="data.applicant" @click="goCustom"/>
        <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber"></x-textarea>
        </group>
        <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>年龄</div>
        <input class="right" placeholder="请输入年龄" v-model="data.vaccineCustomerAge"/>
      </div>

      <div class="radio">
        <div class="radio_title">性别</div>
        <div class="labelValue">
          <div class="Radio1">
            <img :src="disagree" v-if="!male" alt="" @click="click3">
            <img :src="agree" v-if="male" alt="">
            <span>男</span>
          </div>
          <div class="Radio2">
            <img :src="disagree" v-if="male" alt="" @click="click4">
            <img :src="agree"  v-if="!male" alt="">
            <span>女</span>
          </div>
        </div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.customerPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入联系电话" v-model="data.customerPhone"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>通行证号码</div>
        <input class="right" placeholder="请输入通行证号码" v-model="data.vaccineCustomerPass"/>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>第几次注射疫苗</div>
        <group style="min-height: 3rem">
          <popup-radio :options="degreeList" v-model="data.vaccineCustomerTimes" placeholder="请选择第几次注射疫苗" ></popup-radio>
        </group>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>疫苗种类</div>
        <group style="min-height: 3rem">
          <popup-radio :options="typeList" v-model="data.sublineItemName" placeholder="请选择疫苗种类"></popup-radio>
        </group>
      </div>


      <div class="whole" v-if="first">
        <div class="left">价格</div>
        <div class="right_new">{{data.price}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>给客户的报价</div>
        <input class="right" placeholder="请输入给客户的报价" v-model="data.customerPrice"/>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约疫苗注射时间</div>
        <group>
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>
        </group>
      </div>


      <!--<group>-->
        <!--<datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择预约疫苗注射时间"></datetime>-->
      <!--</group>-->



      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <input class="right" placeholder="请输入预约对接人" v-model="data.reserveContactPerson"/>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入预约对接人电话" v-model="data.reserveContactPhone"/>
      </div>

      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <input class="bottom" v-model="data.reserveComment" />


      <div style="display: flex;display: -webkit-flex">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="submit">提交</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
      </div>

    </div>

    <div class="signReserve" v-if="sign">
      <!-- 签订-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <input class="right" placeholder="请选择" v-model="data.applicant" @click="goCustom"/>
        <x-icon type="ios-arrow-right" size="35" @click="goCustom"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber"></x-textarea>
        </group>
        <x-icon type="ios-search" size="35" @click="goPolicy"></x-icon>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.customerPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入" v-model="data.customerPhone" />
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>深圳过境关口</div>
        <group style="min-height: 3rem">
          <popup-radio :options="sekiguchiList" v-model="data.sublineItemName" placeholder="请选择" @on-change="changeSign"></popup-radio>
        </group>
      </div>

      <div class="whole">
        <div class="left">团队签订价格</div>
        <div class="right_new">{{data.price}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约过境时间</div>
        <group style="min-height: 3rem">
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>
        </group>
      </div>

      <!--<group>-->
        <!--<datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择"></datetime>-->
      <!--</group>-->

      <div class="touristImformation">
        <div class="imformation_left">L签游客信息</div>
        <div class="btn_left">样例示意</div>
        <div class="btn_right" @click="seeExample">查看样例</div>
      </div>
      <div class="touristImformation" v-for="(item,index) in customerList" v-if="customerList.length!==0">
        <div class="imformation_left"></div>
        <div class="btn_left">{{item.name}}</div>
        <div class="btn_right" @click="edit1(index)">编辑样例</div>
      </div>
      <div class="whole_btn">
        <div class="new_btn" @click="addUser">添加游客</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <input class="right" placeholder="请输入" v-model="data.reserveContactPerson"/>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入预约对接人电话" v-model="data.reserveContactPhone"/>
      </div>


      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <input class="bottom" v-model="data.reserveComment" />




      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.本服务为免费服务，若客户购买任何保险产品，单张保单年缴保费≥10万美金或趸交保费≥50万美金
          ，我司免费提供以上两次专车服务，超出两次专车接送另行收费。同一投保人两张及两张以上保单累计达以上金额不享受该免费服务。申请免费服务请务必在备注栏填写投保信息。
        </div>
        <div class="warmPrompt_dowm">2.如已享受以上专车服务的客户因各种原因未能投保成功及退保，我司将会补收该费用。</div>
        <div class="warmPrompt_dowm">3.所有增值服务以预约时信息为准，由于无预约、信息错误等产生的费用由客户承担，且过后不可以补办和报销。</div>
        <div class="warmPrompt_dowm">4.使用L签访港的旅客需要持旅行社提供的文件一同过关方可进入香港；离港时无需旅行社文件，亦无需一同过关，请根据客户签证类型选择此项服务。</div>
      </div>

      <div style="display: flex;display: -webkit-flex">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="submit">提交</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
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
                <img :src="disagree" v-if="!customerExample.sex" alt="" @click="click1">
                <img :src="agree" v-if="customerExample.sex" alt="">
                <span>男</span>
              </div>
              <div class="Radio2">
                <img :src="disagree" v-if="customerExample.sex" alt="" @click="click2">
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
          <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd"  accept="img/jpg,img/png,img/jpeg,img/bmp" :capture="false"  placeholder="+" @onChange="getImg"></VueImgInputer>-->
          <div class="chooseImage_1"  @click="chooseImg" v-if="showAdd" >+</div>
          <div v-if="showImg">
            <span class="vux-close" @click="deleteImg"></span>
            <img :src="item.src" v-for="(item,index) in  customerExample.list" class="img" @click="show(index)" />
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
          <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd" accept="img/jpg,img/png,img/jpeg,img/bmp" :capture="false"   placeholder="+" @onChange="getImg"></VueImgInputer>-->
          <div class="chooseImage_1"  @click="chooseImg" v-if="showAdd" >+</div>
          <div v-if="showImg">
            <span class="vux-close" @click="deleteImg"></span>
            <img :src="item.src" v-for="(item,index)  in  customerExample.list" class="img" @click="show(index)" />
          </div>
          <div  :class="{addBtn:(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!==''),addBtnNew:!(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!=='')}" @click="saveEdit" >保存</div>
        </x-dialog>
      </div>

      <!-- 弹出超出6条警告-->
      <div v-transfer-dom>
        <alert v-model="showAlert" :title="title3">
        </alert>
      </div>
      <!--点击图片放大-->
      <div v-transfer-dom>
        <previewer :list="list" ref="previewer" :options="options" @on-close="close"></previewer>
      </div>

    </div>

  </div>

  <div v-else-if="unEdit">

    <div class="hotelReserve" v-if="hotel">
      <!-- 酒店预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right_new" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <div class="right_new">{{data.applicant}}</div>
        <x-icon type="ios-arrow-right" size="35"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber" readonly ></x-textarea>
        </group>
        <x-icon type="ios-search" size="35"></x-icon>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>入住客户姓名</div>
        <div class="right_new">{{data.lodgerName}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>入住客户姓名拼音</div>
        <div class="right_new">{{data.lodgerPinyin}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.customerPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new" >{{data.customerPhone}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>酒店所在地区</div>
        <div class="right_new">{{data.sublineItemName}}</div>
        <!--<group style="min-height: 3rem">-->
          <!--<popup-radio :options="hotelList" v-model="data.sublineItemName" placeholder="请选择" readonly></popup-radio>-->
        <!--</group>-->
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>价格区间(每晚)</div>
        <group style="min-height: 3rem">
          <popup-radio :options="costList" v-model="data.priceInterval" placeholder="请选择" readonly ></popup-radio>
        </group>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>入住人数</div>
        <div class="right_new">{{data.peopleCount}}</div>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>入住时间</div>
        <group>
          <datetime v-model="data.checkinDate" format="YYYY/MM/DD HH:mm" :title="startTime" placeholder="请选择" readonly></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>退房时间</div>
        <group>
          <datetime v-model="data.checkoutDate" format="YYYY/MM/DD HH:mm" :title="endTime" placeholder="请选择" readonly></datetime>
        </group>
      </div>



      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>房间数</div>
        <div class="right_new">{{data.roomCount}} </div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>房型</div>
        <div class="right_new">{{data.roomType}}</div>
      </div>

      <div class="whole">
        <div class="left">指定酒店名称或地段</div>
        <div class="right_new" >{{data.hotelName}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <div class="right_new"  >{{data.reserveContactPerson}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new">{{data.reserveContactPhone}}</div>
      </div>

      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <div class="bottom" >{{data.reserveComment}}</div>

      <div class="btnClass2" v-if="data.status==='DATA_APPROVING'" @click="cancel">取消预约</div>

      <div v-if="data.commonName!==null&&data.commonName!==''">
        <div class="cardList">
          <div class="cardTitle">
            <span>预约确认信息</span>
          </div>
          </div>
          <div class="whole">
          <div class="left">酒店名称</div>
          <div class="right_new">{{data.commonName}}</div>
        </div>
        <div class="whole">
          <div class="left">酒店电话</div>
          <group  class="middle">
            <popup-radio :options="phoneCodeList" v-model="data.commonPhoneCode" readonly></popup-radio>
          </group>
          <div class="right_new" >{{data.commonPhone}}</div>
        </div>
        <div class="whole">
          <div class="left">酒店地址</div>
          <div class="right_new">{{data.commonAddr}}</div>
        </div>
        <div class="whole">
          <div class="left">备注</div>
          <div class="right_new">{{data.commonRemark}}</div>
        </div>
      </div>

      <div style="display: flex;display: -webkit-flex" v-if="data.status==='WAIT_PAY'">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="goPay">立即支付</div>
      </div>


      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.请填写详细客房需求（例：双床房2间/大床房1间）。</div>
        <div class="warmPrompt_dowm">2.香港酒店价格在不同日期价格波动极大，客户服务部会提供即时报价。</div>
      </div>




      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel3" @on-confirm="onConfirm3">
        </confirm>
      </div>

    </div>

    <div class="hotelReserve" v-if="club">
      <!-- 会所预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right_new" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <div class="right_new"  >{{data.applicant}}</div>
        <x-icon type="ios-arrow-right" size="35"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber" readonly ></x-textarea>
        </group>
        <x-icon type="ios-search" size="35"></x-icon>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会所位置</div>
        <div class="right_new">{{data.sublineItemName}}</div>
        <!--<group style="min-height: 3rem">-->
          <!--<popup-radio options="clubList" v-model="data.sublineItemName" placeholder="请选择" @on-change="changeAddress" readonly></popup-radio>-->
        <!--</group>-->
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>使用时长</div>
        <group style="min-height: 3rem">
          <popup-radio  :options="timeList" v-model="data.userHour"  readonly></popup-radio>
        </group>
      </div>

      <div class="whole"><div class="left">价格</div>
        <div class="right_new" >¥{{data.price}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约时间</div>
        <group style="min-height: 3rem">
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm"  :title="start" readonly></datetime>
        </group>
      </div>


      <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>人数</div>
        <div class="right_new" >{{data.peopleCount}}</div>
      </div>
      <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <div class="right_new"  >{{data.reserveContactPerson}}</div>
      </div>


      <div class="whole"><div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new">{{data.reserveContactPhone}}</div>
      </div>


      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <div class="bottom" >{{data.reserveComment}}</div>



      <div class="btnClass2" v-if="data.status==='DATA_APPROVING'" @click="cancel">取消预约</div>

      <div style="display: flex;display: -webkit-flex" v-if="data.status==='WAIT_PAY'">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="goPay">立即支付</div>
      </div>

      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.会所的预定使用时长2h起订，使用时间低于2h，均按2h的收费标准计算。</div>
        <div class="warmPrompt_dowm">2.预定会所的收费标准：会议室 300/h VIP室 150/h。</div>
      </div>



      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel3" @on-confirm="onConfirm3">
        </confirm>
      </div>

      <!--<div style="display: flex;display: -webkit-flex">-->
        <!--<div class="btnClass1"  @click="cancel">取消预约</div>-->
        <!--<div class="btnClass1"  @click="submit">提交</div>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">-->
        <!--</confirm>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">-->
        <!--</confirm>-->
      <!--</div>-->
    </div>


    <div class="hotelReserve" v-if="car">
      <!-- 专车预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right_new" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <div class="right_new" >{{data.applicant}}</div>
        <x-icon type="ios-arrow-right" size="35" ></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber" readonly ></x-textarea>
        </group>
        <x-icon type="ios-search" size="35" ></x-icon>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约路线</div>
        <div class="right_new">{{data.sublineItemName}}</div>
        <!--<group style="min-height: 3rem">-->
          <!--<popup-radio  :options="pathList" v-model="data.sublineItemName" placeholder="请选择" readonly></popup-radio>-->
        <!--</group>-->
      </div>
      <div class="whole">
        <div class="left">预计价格</div>
        <div class="right_new">{{data.price}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约时间</div>
        <group style="min-height: 3rem">
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>
        </group>
      </div>
      <!--<group>-->
        <!--<datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" readonly></datetime>-->
      <!--</group>-->
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>出发地</div>
        <div class="right_new" >{{data.departure}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>目的地</div>
        <div class="right_new" >{{data.destination}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>乘车总人数</div>
        <div class="right_new">{{data.peopleCount}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>乘车联系人</div>
        <div class="right_new">{{data.reserveContactPerson}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>乘车联系人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new" >{{data.reserveContactPhone}}</div>
      </div>

      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <div class="bottom">{{data.reserveComment}}</div>



      <div class="btnClass2" v-if="data.status==='DATA_APPROVING'" @click="cancel">取消预约</div>


      <div style="display: flex;display: -webkit-flex" v-if="data.status==='WAIT_PAY'">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="goPay">立即支付</div>
      </div>

      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.本服务为免费服务，若客户购买任何保险产品，单张保单年缴保费≥10万美金或趸交保费≥50万美金
          ，我司免费提供以上两次专车服务，超出两次专车接送另行收费。同一投保人两张及两张以上保单累计达以上金额不享受该免费服务。申请免费服务请务必在备注栏填写投保信息。
        </div>
        <div class="warmPrompt_dowm">2.如已享受以上专车服务的客户因各种原因未能投保成功及退保，我司将会补收该费用。</div>
        <div class="warmPrompt_dowm">3.所有增值服务以预约时信息为准，由于无预约、信息错误等产生的费用由客户承担，且过后不可以补办和报销。</div>
        <div class="warmPrompt_dowm">4.接送机自机场公布的航班到达时间接机，免费等60分钟，关口/酒店/码头等地点免费等30分钟，超出时间收费200-300/小时。</div>
        <div class="warmPrompt_dowm">5.节假日价格会有涨幅。</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel3" @on-confirm="onConfirm3">
        </confirm>
      </div>


      <!--<div style="display: flex;display: -webkit-flex">-->
        <!--<div class="btnClass1"  @click="cancel">取消预约</div>-->
        <!--<div class="btnClass1"  @click="submit">提交</div>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">-->
        <!--</confirm>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">-->
        <!--</confirm>-->
      <!--</div>-->
    </div>

    <div class="hotelReserve" v-if="HPV">
      <!-- HPV预定-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right_new" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <div class="right_new" >{{data.applicant}}</div>
        <x-icon type="ios-arrow-right" size="35" ></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber" readonly ></x-textarea>
        </group>
        <x-icon type="ios-search" size="35"></x-icon>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>年龄</div>
        <div class="right_new" >{{data.vaccineCustomerAge}}</div>
      </div>

      <div class="radio">
        <div class="radio_title">性别</div>
        <div class="labelValue">
          <div class="Radio1">
            <img :src="disagree" v-if="!male">
            <img :src="agree" v-if="male" >
            <span>男</span>
          </div>
          <div class="Radio2">
            <img :src="disagree" v-if="male" >
            <img :src="agree"  v-if="!male" >
            <span>女</span>
          </div>
        </div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.customerPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new" >{{data.customerPhone}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>通行证号码</div>
        <div class="right_new" >{{data.vaccineCustomerPass}}</div>
      </div>


      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>第几次注射疫苗</div>
        <group style="min-height: 3rem">
          <popup-radio :options="degreeList" v-model="data.vaccineCustomerTimes" placeholder="请选择第几次注射疫苗" readonly></popup-radio>
        </group>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>疫苗种类</div>
        <div class="right_new">{{data.sublineItemName}}</div>
        <!--<group style="min-height: 3rem">-->
          <!--<popup-radio :options="typeList" v-model="data.sublineItemName" placeholder="请选择疫苗种类" readonly></popup-radio>-->
        <!--</group>-->
      </div>


      <div class="whole" v-if="first">
        <div class="left">价格</div>
        <div class="right_new">{{data.price}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>给客户的报价</div>
        <div class="right_new" >{{data.customerPrice}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约疫苗注射时间</div>
        <group>
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>
        </group>
      </div>


      <!--<group>-->
        <!--<datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择预约疫苗注射时间" readonly></datetime>-->
      <!--</group>-->



      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <div class="right_new" >{{data.reserveContactPerson}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new" >{{data.reserveContactPhone}}</div>
      </div>

      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <div class="bottom">{{data.reserveComment}}</div>

      <div class="btnClass2" v-if="data.status==='DATA_APPROVING'" @click="cancel">取消预约</div>


      <div v-if="data.commonName!==null&&data.commonName!==''">
        <div class="cardList">
          <div class="cardTitle">
            <span>预约确认信息</span>
          </div>
        </div>
        <div class="whole">
          <div class="left">诊所名称</div>
          <div class="right_new">{{data.commonName}}</div>
        </div>
        <div class="whole">
          <div class="left">诊所电话</div>
          <group  class="middle">
            <popup-radio :options="phoneCodeList" v-model="data.commonPhoneCode" readonly></popup-radio>
          </group>
          <div class="right_new" >{{data.commonPhone}}</div>
        </div>
        <div class="whole">
          <div class="left">诊所地址</div>
          <div class="right_new">{{data.commonAddr}}</div>
        </div>
        <div class="whole">
          <div class="left">备注</div>
          <div class="right_new">{{data.commonRemark}}</div>
        </div>
      </div>

      <div style="display: flex;display: -webkit-flex" v-if="data.status==='WAIT_PAY'">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="goPay">立即支付</div>
      </div>


      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel3" @on-confirm="onConfirm3">
        </confirm>
      </div>


      <!--<div style="display: flex;display: -webkit-flex">-->
        <!--<div class="btnClass1"  @click="cancel">取消预约</div>-->
        <!--<div class="btnClass1"  @click="submit">提交</div>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">-->
        <!--</confirm>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">-->
        <!--</confirm>-->
      <!--</div>-->

    </div>

    <div class="signReserve" v-if="sign">
      <!-- 签订-->
      <div class="whole">
        <div class="left">订单状态</div>
        <div class="right_new" style="color:#E5B33E">{{data.statusDesc}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>客户</div>
        <div class="right_new">{{data.applicant}}</div>
        <x-icon type="ios-arrow-right" size="35"></x-icon>
      </div>
      <div class="whole">
        <div class="left">保单订单编号</div>
        <group class="right_one">
          <x-textarea placeholder="如果客户当天也预定了赴港签单，请输入订单编号，方便工作人员合理安排行程。" :show-counter="false" :rows="1" autosize
                      v-model="data.relatedOrderNumber" readonly ></x-textarea>
        </group>
        <x-icon type="ios-search" size="35" ></x-icon>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.customerPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new" >{{data.customerPhone}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>深圳过境关口</div>
        <div class="right_new">{{data.sublineItemName}}</div>
        <!--<group style="min-height: 3rem">-->
          <!--<popup-radio :options="sekiguchiList" v-model="data.sublineItemName" placeholder="请选择" readonly></popup-radio>-->
        <!--</group>-->
      </div>

      <div class="whole">
        <div class="left">团队签订价格</div>
        <div class="right_new">{{data.price}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>预约过境时间</div>
        <group style="min-height: 3rem">
          <datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>
        </group>
      </div>

      <!--<group>-->
        <!--<datetime v-model="data.reserveDate" format="YYYY/MM/DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>-->
      <!--</group>-->

      <div class="touristImformation">
        <div class="imformation_left">L签游客信息</div>
        <div class="btn_left">样例示意</div>
        <div class="btn_right" @click="seeExample">查看样例</div>
      </div>
      <div class="touristImformation" v-for="(item,index) in customerList" v-if="customerList.length!==0">
        <div class="imformation_left"></div>
        <div class="btn_left">{{item.name}}</div>
        <div class="btn_right" @click="edit1(index)">编辑样例</div>
      </div>
      <div class="whole_btn">
        <div class="new_btn">添加游客</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人</div>
        <div class="right_new">{{data.reserveContactPerson}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预约对接人电话</div>
        <group  class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.reserveContactPhoneCode" readonly></popup-radio>
        </group>
        <div class="right_new">{{data.reserveContactPhone}}</div>
      </div>


      <div class="comment_up">备注</div>
      <div class="comment_up_new">申请免费服务需填写投保信息，否则可不填</div>
      <div class="bottom">{{data.reserveComment}}</div>





      <div class="btnClass2" v-if="data.status==='DATA_APPROVING'" @click="cancel">取消预约</div>

      <div style="display: flex;display: -webkit-flex" v-if="data.status==='WAIT_PAY'">
        <div class="btnClass1"  @click="cancel">取消预约</div>
        <div class="btnClass1"  @click="goPay">立即支付</div>
      </div>


      <div class="warmPrompt">
        <div class="warmPrompt_up">温馨提示：</div>
        <div class="warmPrompt_down">1.本服务为免费服务，若客户购买任何保险产品，单张保单年缴保费≥10万美金或趸交保费≥50万美金
          ，我司免费提供以上两次专车服务，超出两次专车接送另行收费。同一投保人两张及两张以上保单累计达以上金额不享受该免费服务。申请免费服务请务必在备注栏填写投保信息。
        </div>
        <div class="warmPrompt_dowm">2.如已享受以上专车服务的客户因各种原因未能投保成功及退保，我司将会补收该费用。</div>
        <div class="warmPrompt_dowm">3.所有增值服务以预约时信息为准，由于无预约、信息错误等产生的费用由客户承担，且过后不可以补办和报销。</div>
        <div class="warmPrompt_dowm">4.使用L签访港的旅客需要持旅行社提供的文件一同过关方可进入香港；离港时无需旅行社文件，亦无需一同过关，请根据客户签证类型选择此项服务。</div>
      </div>


      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel3" @on-confirm="onConfirm3">
        </confirm>
      </div>
      <!--<div style="display: flex;display: -webkit-flex">-->
        <!--<div class="btnClass1"  @click="cancel">取消预约</div>-->
        <!--<div class="btnClass1"  @click="submit">提交</div>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">-->
        <!--</confirm>-->
      <!--</div>-->

      <!--<div v-transfer-dom>-->
        <!--<confirm v-model="showSubmit" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">-->
        <!--</confirm>-->
      <!--</div>-->



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


      <!--&lt;!&ndash; 增加游客信息&ndash;&gt;-->
      <!--<div v-transfer-dom>-->
        <!--<x-dialog v-model="showUser"  hide-on-blur :dialog-style="{'max-width': '100%'}" class="example" :scroll="false">-->
          <!--&lt;!&ndash;关闭示例按钮&ndash;&gt;-->
          <!--<div @click="closeUser">-->
            <!--<span class="vux-close"></span>-->
          <!--</div>-->
          <!--<div class="new">-->
            <!--<div class="left">姓名</div>-->
            <!--<input class="right"  v-model="customerExample.name" readonly />-->
          <!--</div>-->

          <!--<div class="radio">-->
            <!--<div class="radio_title">性别</div>-->
            <!--<div class="labelValue">-->
              <!--<div class="Radio1">-->
                <!--<img :src="disagree" v-if="!customerExample.sex" >-->
                <!--<img :src="agree" v-if="customerExample.sex">-->
                <!--<span>男</span>-->
              <!--</div>-->
              <!--<div class="Radio2">-->
                <!--<img :src="disagree" v-if="customerExample.sex">-->
                <!--<img :src="agree"  v-if="!customerExample.sex" >-->
                <!--<span>女</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<group>-->
            <!--<datetime v-model="customerExample.birthDate" format="YYYY/MM/DD"  :title="start1" readonly></datetime>-->
          <!--</group>-->
          <!--<div class="new">-->
            <!--<div class="left">签发地点</div>-->
            <!--<input class="right"  v-model="customerExample.signAddress" readonly />-->
          <!--</div>-->
          <!--<div class="new">-->
            <!--<div class="left">港澳通行证号</div>-->
            <!--<input class="right"  v-model="customerExample.passNumber" readonly />-->
          <!--</div>-->

          <!--<div class="name">-->
            <!--<div class="name_left">签注附件</div>-->
          <!--</div>-->
          <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd" multiple accept="img/jpg,img/png,img/jpeg,img/bmp"  placeholder="+"></VueImgInputer>-->
          <!--<div v-if="showImg">-->
            <!--<span class="vux-close" ></span>-->
            <!--<img :src="item.src" v-for="(item,index) in  customerExample.list" class="img" @click="show(index)" />-->
          <!--</div>-->
          <!--<div :class="{addBtn:(customerExample.name!==''&&customerExample.sex!==''-->
        <!--&&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!==''),addBtnNew:!(customerExample.name!==''&&customerExample.sex!==''-->
        <!--&&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!=='')}">保存</div>-->
        <!--</x-dialog>-->
      <!--</div>-->


      <!-- 编辑游客信息-->
      <div v-transfer-dom>
        <x-dialog v-model="showEdit"  hide-on-blur :dialog-style="{'max-width': '100%'}" class="example" :scroll="false">
          <!--关闭示例按钮-->
          <div @click="closeEdit">
            <span class="vux-close"></span>
          </div>
          <div class="new">
            <div class="left">姓名</div>
            <input class="right"  v-model="customerExample.name"  readonly />
          </div>
          <div class="radio">
            <div class="radio_title">性别</div>
            <div class="labelValue">
              <div class="Radio1">
                <img :src="disagree" v-if="!customerExample.sex">
                <img :src="agree" v-if="customerExample.sex">
                <span>男</span>
              </div>
              <div class="Radio2">
                <img :src="disagree" v-if="customerExample.sex">
                <img :src="agree"  v-if="!customerExample.sex">
                <span>女</span>
              </div>
            </div>
          </div>

          <group>
            <datetime v-model="customerExample.birthDate" format="YYYY/MM/DD"  :title="start1" readonly></datetime>
          </group>
          <div class="new">
            <div class="left">签发地点</div>
            <input class="right"  v-model="customerExample.signAddress" readonly />
          </div>
          <div class="new">
            <div class="left">港澳通行证号</div>
            <input class="right"  v-model="customerExample.passNumber" readonly />
          </div>

          <div class="name">
            <div class="name_left">签注附件</div>
          </div>
          <!--<VueImgInputer v-model="customerExample.file"  v-if="showAdd" multiple accept="img/jpg,img/png,img/jpeg,img/bmp"  placeholder="+"  readonly></VueImgInputer>-->
          <div v-if="showImg">
            <span class="vux-close"></span>
            <img :src="item.src" v-for="(item,index)  in  customerExample.list" class="img" @click="show(index)" />
          </div>
          <div  :class="{addBtn:(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!==''),addBtnNew:!(customerExample.name!==''&&customerExample.sex!==''
        &&customerExample.birthDate!==''&&customerExample.macaoPermit!==''&&customerExample.signAddress!==''&&customerExample.list[0].src!=='')}" readonly>保存</div>
        </x-dialog>
      </div>

      <!-- 弹出超出6条警告-->
      <div v-transfer-dom>
        <alert v-model="showAlert" :title="title3">
        </alert>
      </div>
      <!--点击图片放大-->
      <div v-transfer-dom>
        <previewer :list="list" ref="previewer" :options="options" @on-close="close"></previewer>
      </div>

    </div>

</div>

</template>

<script type="text/ecmascript-6">
  import { Datetime, XTextarea,Group,Confirm, XDialog,Alert,PopupRadio,Previewer,TransferDomDirective as TransferDom  } from 'vux';
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
      XTextarea,
      Confirm
    },
    data(){
    return {
      data:{},
      truePrice:null,
      edit:false,
      unEdit:false,
      hotel:false,
      club:false,
      sign:false,
      HPV:false,
      car:false,
      statusList:[],
      phoneCodes:[],
      phoneCodeList:[],
      orderId:'',
      //酒店
      detail:{},
      hotelList:[],
      costList: ['300元以下', '300-600元', '600-1000元', '1000元以上'],
      startTime: "",
      endTime: "",
      showCancel:false,
      showSubmit:false,
      title1:"是否确认取消预约？",
      title2:"是否确认提交？",
      //会所
      timeList:['2h','3h','4h','5h','6h'],
      clubList:[],
      //专车
      pathList: [],
      start: "",
      //HPV
      degreeList:['1','2','3'],
      disagree: require('../../assets/register/icon_unselect@3x.png'),
      agree: require('../../assets/register/icon_select@3x.png'),
      icon:require("../../assets/img/query.png"),
      typeList:[],
      male:false,
      first:false,
      type1:false,
      //团队签订
      start1:"出生年月",
      sekiguchiList: [],
      editIndex:null,   //保存编辑游客信息index
      showIndex:null,    //保存显示附件内容的index
      showExample: false,   //显示样例
      showUser:false,     //显示游客添加信息页面
      showImg:false,      //显示图片
      showAdd:true,      //上传游客图片
      showEdit:false,   //游客信息编辑页面
      showAlert:false,   //是否显示游客信息添加超出6条
      title3:"访客信息最多为6条",
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
        document.setTitle('增值服务');
      }, 1);
      var vm=this;
      var url=window.location.href.split('#')[0];
      vm.$configWx(url,['chooseImage','getLocalImgData']);
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

    function isEmptyObject(e) {
      var t;
      for (t in e)
        return true;
      return false;
    };

    vm.$vux.loading.show({text:'loading'});
    vm.$post('/api/clb/common/clbCode',{
      "statusList": "ORD.VALUEADD_STATUS",
      "phoneCodes": "PUB.PHONE_CODE"
    }).then(function (response) {
      vm.statusList=JSON.parse(response).statusList;
      vm.phoneCodes=JSON.parse(response).phoneCodes;
      var orderId=vm.$route.query.orderId;
      vm.$post('/api/ordOrder/query',{
        "orderId":orderId
      }).then(function (response) {
        vm.$vux.loading.hide();
        vm.data=response.rows[0];
        vm.truePrice=vm.data.price;
        if(vm.data.status==="NEED_REVIEW"){
          vm.edit=true;
          var customList = vm.$store.getters.getCustomerList;
          var policyList = vm.$store.getters.getPolicyList;
          for (let i in vm.phoneCodes) {
            vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
            if (vm.data.customerPhoneCode === vm.phoneCodes[i].value) {
              vm.data.customerPhoneCode = vm.phoneCodes[i].meaning;
            }
            if (vm.data.reserveContactPhoneCode === vm.phoneCodes[i].value) {
              vm.data.reserveContactPhoneCode = vm.phoneCodes[i].meaning;
            }
          }
          if(vm.data.valueaddType==="ZCFW"){
            vm.car=true;
            if (isEmptyObject(customList)) {
              vm.data.applicant = customList.chineseName;
              vm.data.applicantCustomerId=customList.customerId;
            }
            if (isEmptyObject(policyList)) {
              vm.data.relatedOrderNumber = policyList.orderNumber;
              vm.data.relatedOrderId=policyList.orderId;
            }
            vm.data.price1=vm.data.price;
            var date=new Date(vm.data.reserveDate.replace(/-/g,'/'));
            vm.data.reserveDate=date.format('yyyy/MM/dd hh:mm');
            if(vm.data.price===null){
              vm.data.price="实时报价";
            }else{
              vm.data.price="￥"+vm.data.price;
            }
            vm.$post('/api/production/detail',{
              "itemId":vm.data.itemId
            }).then(function(response){
              vm.detail=response.rows[0];
              for (let i in vm.detail.prdItemSublineList) {
                vm.pathList.push(vm.detail.prdItemSublineList[i].sublineItemName);
              }

            },function(response){
              vm.$vux.loading.hide();
              vm.$vux.toast.show({text:'接口出错了'});
            })
          }
          if(vm.data.valueaddType==="HPV"){
            vm.HPV=true;
            if(vm.data.vaccineCustomerSex==='M'){
              vm.male=true;
            }else{
              vm.male=false;
            }
            if (isEmptyObject(customList)) {
              vm.data.applicant = customList.chineseName;
              vm.data.applicantCustomerId=customList.customerId;
              if(customList.sex==='M'){
                vm.male=true;
              }
              if(customList.sex==='F'){
                vm.male=false;
              }
              for(let i in vm.phoneCodes){
                if(customList.phoneCode===vm.phoneCodes[i].value){
                  vm.data.customerPhoneCode=vm.phoneCodes[i].meaning;
                }
              }
              vm.data.customerPhone=customList.phone;
            }
            if (isEmptyObject(policyList)) {
              vm.data.relatedOrderNumber = policyList.orderNumber;
              vm.data.relatedOrderId=policyList.orderId;
            }
            vm.data.price1=vm.data.price;
            vm.data.price='￥'+vm.data.price;
            vm.$post('/api/production/detail',{
              "itemId":vm.data.itemId
            }).then(function(response){
              vm.detail=response.rows[0];
              for (let i in vm.detail.prdItemSublineList) {
                vm.typeList.push(vm.detail.prdItemSublineList[i].sublineItemName);
              }
              if(vm.data.vaccineCustomerTimes==='1'){
                vm.first=true;
                for(let i in vm.detail.prdItemSublineList) {
                  if (vm.detail.prdItemSublineList[i].onlinePaymentFlag === 'N') {
                    vm.type1=true;
                    vm.data.price = vm.data.price + '(需现场支付)';
                    return;
                  }
                }
              }else{
                vm.first=false;
                vm.data.price=null;
              }

            },function(response){
              vm.$vux.toast.show({text:'接口出错了'});
            })
          }
          if(vm.data.valueaddType==="TTQZ"){
            vm.sign=true;
            var date=new Date(vm.data.reserveDate.replace(/-/g,'/'));
            vm.data.reserveDate=date.format('yyyy/MM/dd hh:mm');
            if (isEmptyObject(customList)) {
              vm.data.applicant = customList.chineseName;
              vm.data.applicantCustomerId=customList.customerId;
              for(let i in vm.phoneCodes){
                if(customList.phoneCode===vm.phoneCodes[i].value){
                  vm.data.customerPhoneCode=vm.phoneCodes[i].meaning;
                }
              }
              vm.data.customerPhone=customList.phone;
            }
            if (isEmptyObject(policyList)) {
              vm.data.relatedOrderNumber = policyList.orderNumber;
              vm.data.relatedOrderId=policyList.orderId;
            }
           vm.data.price1=vm.data.price;
            if(vm.data.price===null){
              vm.data.price='实时报价';
            }
            vm.$post('/api/ordTeamVisitor/query',{
              "orderId":orderId
            }).then(function(response){
              vm.customerList=response.rows;
              for(let i in vm.customerList){
                vm.$set(vm.customerList[i],'list',[{"src":vm.$store.getters.getPictureUrl+vm.customerList[i].filePath}]);
                if(vm.customerList[i].sex==='M'){
                  vm.customerList[i].sex=true;
                }
                if(vm.customerList[i].sex==='F'){
                  vm.customerList[i].sex=false;
                }
                var date=new Date(vm.customerList[i].birthDate.replace(/-/g,'/'));
                vm.customerList[i].birthDate=date.format('yyyy/MM/hh');
              }
              vm.$post('/api/production/detail',{
                "itemId":vm.data.itemId
              }).then(function (response) {
                vm.detail=response.rows[0];
                for (let i in vm.detail.prdItemSublineList) {
                  vm.sekiguchiList.push(vm.detail.prdItemSublineList[i].sublineItemName);
                }

              },function(response){
                vm.$vux.toast.show({text:'接口出错了'});
              })

            },function(response){
              vm.$vux.toast.show({text:'接口出错了'});

            })

          }
          if(vm.data.valueaddType==="JDYD"){
            vm.hotel=true;
            if (isEmptyObject(customList)) {
              vm.data.applicant = customList.chineseName;
              vm.data.applicantCustomerId=customList.customerId;
            }
            if (isEmptyObject(policyList)) {
              vm.data.relatedOrderNumber = policyList.orderNumber;
              vm.data.relatedOrderId=policyList.orderId;
            }
            var date=new Date(vm.data.checkinDate.replace(/-/g,'/'));
            vm.data.checkinDate=date.format('yyyy/MM/dd hh:mm');
            date=new Date(vm.data.checkoutDate.replace(/-/g,'/'));
            vm.data.checkoutDate=date.format('yyyy/MM/dd hh:mm');
            vm.$post('/api/production/detail',{
              "itemId":vm.data.itemId
            }).then(function(response){
              vm.detail=response.rows[0];
              for (let i in vm.detail.prdItemSublineList) {
                vm.hotelList.push(vm.detail.prdItemSublineList[i].sublineItemName);
              }

            },function(response){
              vm.$vux.toast.show({text:'接口出错了'});
            })

          }
          if(vm.data.valueaddType==="HSYD"){
            vm.club=true;
            if (isEmptyObject(customList)) {
              vm.data.applicant = customList.chineseName;
              vm.data.applicantCustomerId=customList.customerId;
            }
            if (isEmptyObject(policyList)) {
              vm.data.relatedOrderNumber = policyList.orderNumber;
              vm.data.relatedOrderId=policyList.orderId;
            }
            var date=new Date(vm.data.reserveDate.replace(/-/g,'/'));
            vm.data.reserveDate=date.format('yyyy/MM/dd hh:mm');
            if(vm.data.userHour==='2'){
              vm.data.userHour='2h';
            }
            if(vm.data.userHour==='3'){
              vm.data.userHour='3h';
            }
            if(vm.data.userHour==='4'){
              vm.data.userHour='4h';
            }
            if(vm.data.userHour==='5'){
              vm.data.userHour='5h';
            }
            if(vm.data.userHour==='6'){
              vm.data.userHour='6h';
            }
            vm.$post('/api/production/detail',{
              "itemId":vm.data.itemId
            }).then(function(response){
              vm.detail=response.rows[0];
              for (let i in vm.detail.prdItemSublineList) {
                vm.clubList.push(vm.detail.prdItemSublineList[i].sublineItemName);
              }

            },function(response){
              vm.$vux.toast.show({text:'接口出错了'});
            })


          }


        }else{
          vm.unEdit=true;
          console.log(vm.data.sublineItemName);
          for (let i in vm.phoneCodes) {
            vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
            if (vm.data.commonPhoneCode === vm.phoneCodes[i].value) {
              vm.data.commonPhoneCode = vm.phoneCodes[i].meaning;
            }
            if (vm.data.customerPhoneCode === vm.phoneCodes[i].value) {
              vm.data.customerPhoneCode = vm.phoneCodes[i].meaning;
            }
            if (vm.data.reserveContactPhoneCode === vm.phoneCodes[i].value) {
              vm.data.reserveContactPhoneCode = vm.phoneCodes[i].meaning;
            }
          }
          if(vm.data.valueaddType==="ZCFW"){
            vm.car=true;
//            if(vm.data.status==='WAIT_PAY'){
//              for (let i in vm.phoneCodes) {
//                if (vm.data.commonPhoneCode === vm.phoneCodes[i].value) {
//                  vm.data.commonPhoneCode = vm.phoneCodes[i].meaning;
//                }
//              }
//            }
            vm.data.price1=vm.data.price;
            var date=new Date(vm.data.reserveDate.replace(/-/g,'/'));
            vm.data.reserveDate=date.format('yyyy/MM/dd hh:mm');
            if(vm.data.price===null){
              vm.data.price="实时报价";
            }else{
              vm.data.price="￥"+vm.data.price;
            }

          }
          if(vm.data.valueaddType==="HPV"){
            vm.HPV=true;
//            if(vm.data.status==='WAIT_PAY'){
//              for (let i in vm.phoneCodes) {
//                if (vm.data.commonPhoneCode === vm.phoneCodes[i].value) {
//                  vm.data.commonPhoneCode = vm.phoneCodes[i].meaning;
//                }
//              }
//            }
            if(vm.data.vaccineCustomerSex==='M'){
              vm.male=true;
            }else{
              vm.male=false;
            }
            vm.data.price1=vm.data.price;
            vm.data.price='￥'+vm.data.price;
            vm.$post('/api/production/detail',{
              "itemId":vm.data.itemId
            }).then(function(response){
              vm.detail=response.rows[0];
              for (let i in vm.detail.prdItemSublineList) {
                vm.typeList.push(vm.detail.prdItemSublineList[i].sublineItemName);
              }
                if(vm.data.vaccineCustomerTimes==='1'){
                  vm.first=true;
                  for(let i in vm.detail.prdItemSublineList) {
                    if (vm.detail.prdItemSublineList[i].onlinePaymentFlag === 'N') {
                      vm.type1=true;
                      vm.data.price = vm.data.price + '(需现场支付)';
                      return;
                    }
                  }
                }else{
                  vm.first=false;
                  vm.data.price=null;
                }

            },function(response){
              vm.$vux.toast.show({text:'接口出错了'});
            })
          }
          if(vm.data.valueaddType==="TTQZ"){
            vm.sign=true;
            var date=new Date(vm.data.reserveDate.replace(/-/g,'/'));
            vm.data.reserveDate=date.format('yyyy/MM/dd hh:mm');
            vm.data.price1=vm.data.price;
            if(vm.data.price===null){
              vm.data.price='实时报价';
            }
            vm.$post('/api/ordTeamVisitor/query',{
              "orderId":orderId
            }).then(function(response){
              vm.customerList=response.rows;
              for(let i in vm.customerList){
                vm.$set(vm.customerList[i],'list',[{"src":vm.$store.getters.getPictureUrl+vm.customerList[i].filePath}]);
                if(vm.customerList[i].sex==='M'){
                  vm.customerList[i].sex=true;
                }
                if(vm.customerList[i].sex==='F'){
                  vm.customerList[i].sex=false;
                }
                var date=new Date(vm.customerList[i].birthDate.replace(/-/g,'/'));
                vm.customerList[i].birthDate=date.format('yyyy/MM/hh');
              }
            },function(response){
              vm.$vux.toast.show({text:'接口出错了'});

            })
          }
          if(vm.data.valueaddType==="JDYD"){
            vm.hotel=true;
//            if(vm.data.status==='WAIT_PAY'){
//              for (let i in vm.phoneCodes) {
//                if (vm.data.commonPhoneCode === vm.phoneCodes[i].value) {
//                  vm.data.commonPhoneCode = vm.phoneCodes[i].meaning;
//                }
//              }
//            }
            var date=new Date(vm.data.checkinDate.replace(/-/g,'/'));
            vm.data.checkinDate=date.format('yyyy/MM/dd hh:mm');
            date=new Date(vm.data.checkoutDate.replace(/-/g,'/'));
            vm.data.checkoutDate=date.format('yyyy/MM/dd hh:mm');
          }
          if(vm.data.valueaddType==="HSYD"){
            vm.club=true;
            var date=new Date(vm.data.reserveDate.replace(/-/g,'/'));
            vm.data.reserveDate=date.format('yyyy/MM/dd hh:mm');
            if(vm.data.userHour==='2'){
              vm.data.userHour='2h';
            }
            if(vm.data.userHour==='3'){
              vm.data.userHour='3h';
            }
            if(vm.data.userHour==='4'){
              vm.data.userHour='4h';
            }
            if(vm.data.userHour==='5'){
              vm.data.userHour='5h';
            }
            if(vm.data.userHour==='6'){
              vm.data.userHour='6h';
            }
          }
        }


      },function(response){
        vm.$vux.toast.show({text:'接口出错了'});
      })


    },function(response){
      vm.$vux.toast.show({text:'接口出错了'});

    })




  },
  methods:{
      goCustom: function () {
        var vm = this;
        vm.$router.push({path: '/customer'});
      },
      goPolicy: function () {
        var vm = this;
        vm.$router.push({path: '/policy'});
      },
    cancel:function(){
      var vm=this;
      vm.showCancel=true;
    },
    submit:function(){
      var vm=this;
      vm.showSubmit=true;
    },
      onCancel1:function(){   //取消
        var vm=this;
        vm.showCancel=false;
      },
     onConfirm1:function(){
      var vm=this;
       vm.$store.commit('assignmentCustomerList',{param:{}});
       vm.$store.commit('assignmentPolicyList',{param:{}});
       if(vm.hotel){
         var phoneCode1=null;
         var phoneCode2=null;
         for(let i in vm.phoneCodes){
           if(vm.data.customerPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode1=vm.phoneCodes[i].value;
           }
           if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode2=vm.phoneCodes[i].value;
           }
         }
         if(vm.data.applicant===null||vm.data.applicant===''){
           vm.$vux.toast.show({text:'客户名不能为空'});
         }else if(vm.data.lodgerName===null||vm.data.lodgerName===''){
           vm.$vux.toast.show({text:'入住客户姓名不能为空'});
         }else if(vm.lodgerPinyin===null||vm.lodgerPinyin===''){
           vm.$vux.toast.show({text:'入住客户拼音名不能为空'});
         }else if(vm.data.contactPhone===null||vm.data.contactPhone===''){
           vm.$vux.toast.show({text:'联系电话不能为空'});
         }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
           vm.$vux.toast.show({text:'酒店所在地址不能为空'});
         }else if(vm.data.priceInterval===null||vm.data.priceInterval===''){
           vm.$vux.toast.show({text:'价格区间不能为空'});
         }else if(vm.data.peopleCount===null||vm.data.peopleCount===''){
           vm.$vux.toast.show({text:"入住人数不能为空"});
         }else if(vm.data.roomCount===null||vm.data.roomCount===''){
           vm.$vux.toast.show({text:'房间数不能为空'});
         }else if(vm.data.roomType===null||vm.data.roomType===''){
           vm.$vux.toast.show({text:'房型不能为空'});
         }else if(new Date(vm.data.checkinDate).getTime()<new Date().getTime()){
           vm.$vux.toast.show({text:'入住日期不能早于当前时间'});
         }else if(new Date(vm.data.checkoutDate).getTime()<new Date(vm.data.checkinDate).getTime()){
           vm.$vux.toast.show({text:'退房日期不能早于入住日期'});
         }else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
           vm.$vux.toast.show({text:'预约对接人不能为空'});
         }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
           vm.$vux.toast.show({text:'预约对接人电话不能为空'});
         }else {
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
             var date=new Date();
             vm.data.submitDate=date.format('yyyy-MM-dd hh:mm:ss')
             var time=new Date(vm.data.checkinDate);
             vm.data.checkinDate=time.format('yyyy-MM-dd hh:mm:ss');
             time=new Date(vm.data.checkoutDate);
             vm.data.checkoutDate=time.format('yyyy-MM-dd hh:mm:ss');
             for(let i in vm.detail.prdItemSublineList){
               if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                 vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
               }
             }
             vm.data.customerPhoneCode=phoneCode1;
             vm.data.reserveContactPhoneCode=phoneCode2;
             vm.data.status="RESERVE_CANCELLED";
             vm.data.__status="update";
             vm.$post('/api/ordOrder/submit', [vm.data]).then(function(response){
               vm.$vux.toast.show({text:"已提交"},3000);
               setTimeout(function () {
                 vm.$router.go(-1);
               }, 3000)
             }, function (response) {
               console.log("接口出错了");
             })
           }
         }
       }

       if(vm.club){
         var phoneCode=null;
         for(let i in vm.phoneCodes){
           if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode=vm.phoneCodes[i].value;
           }
         }
         if(vm.data.applicant===null||vm.data.applicant===''){
           vm.$vux.toast.show({text:'客户名不能为空'});
         }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
           vm.$vux.toast.show({text:'会所位置不能为空'});
         }else if(vm.data.userHour===null||vm.data.userHour===''){
           vm.$vux.toast.show({text:'使用时长不能为空'});
         }else if(vm.data.reserveDate===null||vm.data.reserveDate===''){
           vm.$vux.toast.show({text:'预约时间不能为空'});
         }else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
           vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
         }else if(vm.data.peopleCount===null||vm.data.peopleCount===''){
           vm.$vux.toast.show({text:'入数不能为空'});
         }else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
           vm.$vux.toast.show({text:'预约对接人不能为空'});
         }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
           vm.$vux.toast.show({text:'预约对接人电话不能为空'});
         }else {
           if(phoneCode==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reserveContactPhone)))) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode==='00852'&&(vm.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode==='00853'&&(vm.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode==='00886'&&(vm.reserveContactPhone.length!=9)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else{
             var userHour=null;
             if(vm.data.userHour==='2h'){
               userHour="2";
             }
             if(vm.data.userHour==='3h'){
               userHour="3";
             }
             if(vm.data.userHour==='4h'){
               userHour="4";
             }
             if(vm.data.userHour==='5h'){
               userHour="5";
             }
             if(vm.data.userHour==='6h'){
               userHour="6";
             }
             var date=new Date();
             vm.data.submitDate=date.format('yyyy-MM-dd hh:mm:ss');
             var time=new Date(vm.data.reserveDate);
             vm.data.reserveDate=time.format('yyyy-MM-dd hh:mm:ss');
             for(let i in vm.detail.prdItemSublineList){
               if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                 vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
               }
             }
             vm.data.reserveContactPhoneCode=phoneCode;
             if(vm.data.price1==='实时报价'){
               vm.data.price1=null;
             }
             vm.data.price=vm.data.price1;
             vm.data.status="RESERVE_CANCELLED";
             vm.data.__status="update";
             vm.data.userHour=userHour;
             vm.$post('/api/ordOrder/submit', [vm.data]).then(function(response){
               vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
               setTimeout(function () {
                 vm.$router.go(-1);
               }, 3000)


             }, function (response) {
               console.log("接口出错了");
             })
           }
         }
       }
       if(vm.car){
         var phoneCode=null;
         for(let i in vm.phoneCodes){
           if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode=vm.phoneCodes[i].value;
           }
         }
         if(vm.data.applicant===null||vm.data.applicant===''){
           vm.$vux.toast.show({text:'客户名不能为空'});
         }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
           vm.$vux.toast.show({text:'预约路线不能为空'});
         }else if(vm.data.reserveDate===null||vm.data.reserveDate===''){
           vm.$vux.toast.show({text:'预约时间不能为空'});
         }else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
           vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
         }else if(vm.data.departure===null||vm.data.departure===''){
           vm.$vux.toast.show({text:'出发地不能为空'});
         }else if(vm.data.destination===null||vm.data.destination===''){
           vm.$vux.toast.show({text:'目的地不能为空'});
         }else if(vm.data.peopleCount===null||vm.data.peopleCount===''){
           vm.$vux.toast.show({text:'乘车总人数不能为空'});
         }else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
           vm.$vux.toast.show({text:'乘车联系人不能为空'});
         }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
           vm.$vux.toast.show({text:'乘车联系人电话不能为空'});
         }else{
           if(phoneCode==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reserveContactPhone)))) {
             vm.$vux.toast.show({text:'手机号码有误'});
           }else if(phoneCode==='00852'&&(vm.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'手机号码有误'});
           }else if(phoneCode==='00853'&&(vm.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'手机号码有误'});
           }else if(phoneCode==='00886'&&(vm.reserveContactPhone.length!=9)) {
             vm.$vux.toast.show({text:'手机号码有误'});
           }else {
             var date=new Date();
             vm.data.submitDate=date.format('yyyy-MM-dd hh:mm:ss');
             var time=new Date(vm.data.reserveDate);
             vm.data.reserveDate=time.format('yyyy-MM-dd hh:mm:ss');
             vm.data.price=vm.data.price1;
             if(vm.data.price==='实时报价'){
               vm.data.price=null;
             }
             for(let i in vm.detail.prdItemSublineList){
               if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                 vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
               }
             }
             vm.data.status="RESERVE_CANCELLED";
             vm.data.__status="update";
             vm.$post('/api/ordOrder/submit', [vm.data]).then(function(response){
               vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
               setTimeout(function () {
                 vm.$router.go(-1);
               }, 3000)
             }, function (response) {
               console.log("接口出错了");
             })
           }
         }

       }

       if(vm.HPV){
         var vm = this;
         var phoneCode1=null;
         var phoneCode2=null;
         for(let i in vm.phoneCodes){
           if(vm.data.customerPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode1=vm.phoneCodes[i].value;
           }
           if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode2=vm.phoneCodes[i].value;
           }
         }
         if(vm.data.applicant===null||vm.data.applicant===''){
           vm.$vux.toast.show({text:'客户名不能为空'});
         }else if(vm.data.vaccineCustomerAge===null||vm.data.vaccineCustomerAge===''){
           vm.$vux.toast.show({text:'年龄不能为空'});
         }else if(vm.data.customerPhone===null||vm.data.customerPhone===''){
           vm.$vux.toast.show({text:'联系电话不能为空'});
         }else if(vm.data.vaccineCustomerPass===null||vm.data.vaccineCustomerPass===''){
           vm.$vux.toast.show({text:'通行证号码不能为空'});
         }else if(vm.data.vaccineCustomerTimes===null||vm.data.vaccineCustomerTimes===''){
           vm.$vux.toast.show({text:'注射疫苗次数不能为空'});
         }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
           vm.$vux.toast.show({text:'疫苗种类不能为空'});
         }else if(vm.data.customerPrice===null||vm.data.customerPrice===''){
           vm.$vux.toast.show({text:'报价不能为空'})
         }else if(vm.data.reserveDate===null||vm.data.reserveDate===''){
           vm.$vux.toast.show({text:'预约时间不能为空'});
         } else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
           vm.$vux.toast.show({text:'预约时间早于当前时间'});
         } else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
           vm.$vux.toast.show({text:'预约对接人不能为空'});
         }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
           vm.$vux.toast.show({text:'预约对接人电话不能为空'});
         } else {
           if(phoneCode1==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.customerPhone)))) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else if(phoneCode1==='00852'&&(vm.customerPhone.length!=8)) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else if(phoneCode1==='00853'&&(vm.customerPhone.length!=8)) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else if(phoneCode1==='00886'&&(vm.customerPhone.length!=9)) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else  if(phoneCode2==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reserveContactPhone)))) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode2==='00852'&&(vm.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode2==='00853'&&(vm.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode2==='00886'&&(vm.reserveContactPhone.length!=9)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else{
             var sex=null;
             var date=new Date();
             vm.data.submitDate=date.format('yyyy-MM-dd hh:mm:ss');
             if(vm.male){
               vm.data.vaccineCustomerSex="M";
             }else{
               vm.data.vaccineCustomerSex="F";
             }

             for(let i in vm.detail.prdItemSublineList){
               if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                 vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
               }
             }
             var time=new Date(vm.data.reserveDate);
             vm.data.reserveDate=time.format('yyyy-MM-dd hh:mm:ss');
             if(vm.data.price1==='实时报价'){
               vm.data.price1=null;
             }
             if(vm.data.vaccineCustomerTimes!=="1"){
               vm.data.price=null;
             }else{
               vm.data.price=vm.data.price1;
             }

             vm.data.status="RESERVE_CANCELLED";
             vm.data.__status="update";
             vm.$post('/api/ordOrder/submit', [vm.data]).then(function(response){
               vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
               setTimeout(function () {
                 vm.$router.go(-1);
               }, 3000)


             }, function (response) {
               console.log("接口出错了");
             })

           }

         }
       }

       if(vm.sign){
         var vm=this;
         var phoneCode1=null;
         var phoneCode2=null;
         for(let i in vm.phoneCodes){
           if(vm.data.customerPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode1=vm.phoneCodes[i].value;
           }
           if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
             phoneCode2=vm.phoneCodes[i].value;
           }
         }
         if(vm.data.applicant===null||vm.data.applicant===''){
           vm.$vux.toast.show({text:'客户名不能为空'});
         }else if(vm.data.customerPhone===null||vm.data.customerPhone===''){
           vm.$vux.toast.show({text:'联系电话不能为空'});
         }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
           vm.$vux.toast.show({text:'深圳过境关口不能为空'});
         }else if(vm.data.reserveDate===null||vm.data.reserveDate===''){
           vm.$vux.toast.show({text:'预约过境时间不能为空'});
         }else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
           vm.$vux.toast.show({text:'预约过境时间不能早于当前时间'});
         }else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
           vm.$vux.toast.show({text:'预约对接人不能为空'});
         }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
           vm.$vux.toast.show({text:'预约对接人电话不能为空'});
         }else {
           if(phoneCode1==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.data.customerPhone)))) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else if(phoneCode1==='00852'&&(vm.data.customerPhone.length!=8)) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else if(phoneCode1==='00853'&&(vm.data.customerPhone.length!=8)) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else if(phoneCode1==='00886'&&(vm.data.customerPhone.length!=9)) {
             vm.$vux.toast.show({text:'联系电话有误'});
           }else  if(phoneCode2==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.data.reserveContactPhone)))) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode2==='00852'&&(vm.data.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode2==='00853'&&(vm.data.reserveContactPhone.length!=8)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else if(phoneCode2==='00886'&&(vm.data.reserveContactPhone.length!=9)) {
             vm.$vux.toast.show({text:'预约对接人电话有误'});
           }else{
             var date=new Date();
             vm.data.submitDate=date.format('yyyy-MM-dd hh:mm:ss');
             var time=new Date(vm.data.reserveDate);
             vm.data.reserveDate=time.format('yyyy-MM-dd hh:mm:ss');

             if(vm.data.price1==='实时报价'){
               vm.data.price=null;
             }else{
               vm.data.price=vm.data.price1;
             }
             for(let i in vm.detail.prdItemSublineList){
               if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                 vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
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
             vm.data.status="RESERVE_CANCELLED";
             vm.data.__status="update";
             vm.$post('/api/ordOrder/submit', [vm.data]).then(function(response){
               vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
               setTimeout(function () {
                 vm.$router.go(-1);
               }, 3000);
             }, function (response) {
               console.log("接口出错了");
             })
           }
         }
       }

    },
    onCancel2:function(){   //提交
      var vm=this;
      vm.showSubmit=false;
    },
    onConfirm2:function(){
      var vm=this;
      vm.$store.commit('assignmentCustomerList',{param:{}});
      vm.$store.commit('assignmentPolicyList',{param:{}});
      if(vm.hotel){
        var phoneCode1=null;
        var phoneCode2=null;
        for(let i in vm.phoneCodes){
          if(vm.data.customerPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode1=vm.phoneCodes[i].value;
          }
          if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode2=vm.phoneCodes[i].value;
          }
        }
        if(vm.data.applicant===null||vm.data.applicant===''){
          vm.$vux.toast.show({text:'客户名不能为空'});
        }else if(vm.data.lodgerName===null||vm.data.lodgerName===''){
          vm.$vux.toast.show({text:'入住客户姓名不能为空'});
        }else if(vm.lodgerPinyin===null||vm.lodgerPinyin===''){
          vm.$vux.toast.show({text:'入住客户拼音名不能为空'});
        }else if(vm.data.contactPhone===null||vm.data.contactPhone===''){
          vm.$vux.toast.show({text:'联系电话不能为空'});
        }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
          vm.$vux.toast.show({text:'酒店所在地址不能为空'});
        }else if(vm.data.priceInterval===null||vm.data.priceInterval===''){
          vm.$vux.toast.show({text:'价格区间不能为空'});
        }else if(vm.data.peopleCount===null||vm.data.peopleCount===''){
          vm.$vux.toast.show({text:"入住人数不能为空"});
        }else if(vm.data.roomCount===null||vm.data.roomCount===''){
          vm.$vux.toast.show({text:'房间数不能为空'});
        }else if(vm.data.roomType===null||vm.data.roomType===''){
          vm.$vux.toast.show({text:'房型不能为空'});
        }else if(new Date(vm.data.checkinDate).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:'入住日期不能早于当前时间'});
        }else if(new Date(vm.data.checkoutDate).getTime()<new Date(vm.data.checkinDate).getTime()){
          vm.$vux.toast.show({text:'退房日期不能早于入住日期'});
        }else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
          vm.$vux.toast.show({text:'预约对接人不能为空'});
        }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
          vm.$vux.toast.show({text:'预约对接人电话不能为空'});
        }else {
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
            var checkinDate=null;
            var checkoutDate=null;
            var date=new Date();
            date=date.format('yyyy-MM-dd hh:mm:ss');
            var time=new Date(vm.data.checkinDate);
            checkinDate=time.format('yyyy-MM-dd hh:mm:ss');
            time=new Date(vm.data.checkoutDate);
            checkoutDate=time.format('yyyy-MM-dd hh:mm:ss');
            for(let i in vm.detail.prdItemSublineList){
              if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
              }
            }
            vm.$post('/api/ordOrder/submit', [{
              "applicantCustomerId": vm.data.applicantCustomerId,
              "channelId":vm.data.channelId,
              "checkinDate":checkinDate,
              "checkoutDate":checkoutDate,
              "customerPhone":vm.data.customerPhone,
              "customerPhoneCode":phoneCode1,
              "customerType": "APPLICANT",
              "hisDesc": "订单状态变更为预约资料审核中,请耐心等候!",
              "hisStatus": "DATA_APPROVING",
              "itemId":vm.data.itemId,
              "lodgerName":vm.data.lodgerName,
              "lodgerPinyin":vm.data.lodgerPinyin,
              "orderId":vm.data.orderId,
              "orderNumber":vm.data.orderNumber,
              "orderType":vm.data.orderType,
              "peopleCount":vm.data.peopleCount,
              "priceInterval":vm.data.priceInterval,
              "relatedOrderId":vm.data.relatedOrderId,
              "relatedOrderNumber":vm.data.relatedOrderNumber,
              "reserveComment":vm.data.reserveComment,
              "reserveContactPerson":vm.data.reserveContactPerson,
              "reserveContactPhone":vm.data.reserveContactPhone,
              "reserveContactPhoneCode":phoneCode2,
              "reserveDate": checkinDate,
              "roomCount":vm.data.roomCount,
              "roomType":vm.data.roomType,
              "signDate": checkinDate,
              "status": "DATA_APPROVING",
              "sublineId": vm.data.sublineId,
              "submitDate": date,
              "valueaddType": "JDYD",
              "__status": "update"
            }]).then(function(response){
              vm.$vux.toast.show({text:"已提交"},3000);
              setTimeout(function () {
                vm.$router.go(-1);
              }, 3000)
            }, function (response) {
              console.log("接口出错了");
            })
          }
        }
      }

      if(vm.club){
        var phoneCode=null;
        for(let i in vm.phoneCodes){
          if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode=vm.phoneCodes[i].value;
          }
        }
        if(vm.data.applicant===null||vm.data.applicant===''){
          vm.$vux.toast.show({text:'客户名不能为空'});
        }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
          vm.$vux.toast.show({text:'会所位置不能为空'});
        }else if(vm.data.userHour===null||vm.data.userHour===''){
          vm.$vux.toast.show({text:'使用时长不能为空'});
        }else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
        }else if(vm.data.peopleCount===null||vm.data.peopleCount===''){
          vm.$vux.toast.show({text:'入数不能为空'});
        }else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
          vm.$vux.toast.show({text:'预约对接人不能为空'});
        }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
          vm.$vux.toast.show({text:'预约对接人电话不能为空'});
        }else {
          if(phoneCode==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reserveContactPhone)))) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode==='00852'&&(vm.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode==='00853'&&(vm.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode==='00886'&&(vm.reserveContactPhone.length!=9)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else{
            var userHour=null;
            if(vm.data.userHour==='2h'){
              userHour="2";
            }
            if(vm.data.userHour==='3h'){
              userHour="3";
            }
            if(vm.data.userHour==='4h'){
              userHour="4";
            }
            if(vm.data.userHour==='5h'){
              userHour="5";
            }
            if(vm.data.userHour==='6h'){
              userHour="6";
            }
            var date=new Date();
            date=date.format('yyyy-MM-dd hh:mm:ss');
            var time=new Date(vm.data.reserveDate);
            time=time.format('yyyy-MM-dd hh:mm:ss');
            for(let i in vm.detail.prdItemSublineList){
              if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
              }
            }
            vm.data.reserveContactPhoneCode=phoneCode;
            vm.data.price=vm.data.price1;
            if(vm.data.price==='实时报价'){
              vm.data.price=null;
            }
            vm.$post('/api/ordOrder/submit', [{
              'applicantCustomerId': vm.data.applicantCustomerId,
              'channelId': vm.data.channelId,
              'reserveDate':time,
              'signDate':vm.data.reserveDate,
              "customerType": "APPLICANT",
              "hisDesc": "订单状态变更为预约资料审核中,请耐心等候!",
              "hisStatus": "DATA_APPROVING",
              'itemId': vm.data.itemId,
              'orderType': vm.data.orderType,
              'peopleCount': vm.data.peopleCount,
              'price': vm.data.price,
              'relatedOrderId': vm.data.relatedOrderId,
              'reserveComment':vm.data.reserveComment,
              'reserveContactPerson': vm.data.reserveContactPerson,
              'reserveContactPhone': vm.data.reserveContactPhone,
              'reserveContactPhoneCode': phoneCode,
              'status': "DATA_APPROVING",
              'userHour':userHour,
              'sublineId': vm.data.sublineId,
              'submitDate': date,
              'valueaddType':'HSYD',
              '__status': "update"
            }]).then(function(response){
              vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
              setTimeout(function () {
                vm.$router.go(-1);
              }, 3000)
            }, function (response) {
              console.log("接口出错了");
            })
          }
        }

      }

      if(vm.car){
        var phoneCode=null;
        for(let i in vm.phoneCodes){
          if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode=vm.phoneCodes[i].value;
          }
        }
        if(vm.data.applicant===null||vm.data.applicant===''){
          vm.$vux.toast.show({text:'客户名不能为空'});
        }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
          vm.$vux.toast.show({text:'预约路线不能为空'});
        }else if(vm.data.reserveDate===null||vm.data.reserveDate===''){
          vm.$vux.toast.show({text:'预约时间不能为空'});
        }else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
        }else if(vm.data.departure===null||vm.data.departure===''){
          vm.$vux.toast.show({text:'出发地不能为空'});
        }else if(vm.data.destination===null||vm.data.destination===''){
          vm.$vux.toast.show({text:'目的地不能为空'});
        }else if(vm.data.peopleCount===null||vm.data.peopleCount===''){
          vm.$vux.toast.show({text:'乘车总人数不能为空'});
        }else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
          vm.$vux.toast.show({text:'乘车联系人不能为空'});
        }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
          vm.$vux.toast.show({text:'乘车联系人电话不能为空'});
        }else{
          if(phoneCode==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reserveContactPhone)))) {
            vm.$vux.toast.show({text:'手机号码有误'});
          }else if(phoneCode==='00852'&&(vm.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          }else if(phoneCode==='00853'&&(vm.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          }else if(phoneCode==='00886'&&(vm.reserveContactPhone.length!=9)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          }else {
            var date=new Date();
            date=date.format('yyyy-MM-dd hh:mm:ss');
            var time=new Date(vm.data.reserveDate);
            time=time.format('yyyy-MM-dd hh:mm:ss');
            vm.data.price=vm.data.price1;
            if(vm.data.price==='实时报价'){
              vm.data.price=null;
            }

            for(let i in vm.detail.prdItemSublineList){
              if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
              }
            }

            vm.$post('/api/ordOrder/submit', [{
              'applicantCustomerId':vm.data.applicantCustomerId,
              'channelId':vm.data.channelId,
              "customerType": "APPLICANT",
              "hisDesc": "订单状态变更为预约资料审核中,请耐心等候!",
              "hisStatus": "DATA_APPROVING",
              'itemId': vm.data.itemId,
              'orderType': vm.data.orderType,
              'peopleCount':vm.data.peopleCount,
              "price":vm.data.price,
              'relatedOrderId': vm.data.relatedOrderId,
              'reserveComment':vm.data.reserveComment,
              'reserveContactPerson': vm.data.reserveContactPerson,
              'reserveContactPhone': vm.data.reserveContactPhone,
              'reserveContactPhoneCode': phoneCode,
              'reserveDate': time,
              "departure":vm.data.departure,
              "destination":vm.data.destination,
              'signDate': vm.data.reserveDate,
              'status': "DATA_APPROVING",
              'sublineId': vm.data.sublineId,
              'submitDate': date,
              'valueaddType':"ZCFW",
              '__status': "update"
            }]).then(function(response){
              vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
              setTimeout(function () {
                vm.$router.go(-1);
              }, 3000)
            }, function (response) {
              console.log("接口出错了");
            })
          }
        }

      }

      if(vm.HPV){
        var vm = this;
        var phoneCode1=null;
        var phoneCode2=null;
        for(let i in vm.phoneCodes){
          if(vm.data.customerPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode1=vm.phoneCodes[i].value;
          }
          if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode2=vm.phoneCodes[i].value;
          }
        }
        if(vm.data.applicant===null||vm.data.applicant===''){
          vm.$vux.toast.show({text:'客户名不能为空'});
        }else if(vm.data.vaccineCustomerAge===null||vm.data.vaccineCustomerAge===''){
          vm.$vux.toast.show({text:'年龄不能为空'});
        }else if(vm.data.customerPhone===null||vm.data.customerPhone===''){
          vm.$vux.toast.show({text:'联系电话不能为空'});
        }else if(vm.data.vaccineCustomerPass===null||vm.data.vaccineCustomerPass===''){
          vm.$vux.toast.show({text:'通行证号码不能为空'});
        }else if(vm.data.vaccineCustomerTimes===null||vm.data.vaccineCustomerTimes===''){
          vm.$vux.toast.show({text:'注射疫苗次数不能为空'});
        }else if(vm.data.sublineItemName===null||vm.data.sublineItemName===''){
          vm.$vux.toast.show({text:'疫苗种类不能为空'});
        }else if(vm.data.customerPrice===null||vm.data.customerPrice===''){
          vm.$vux.toast.show({text:'报价不能为空'});
        }else if(vm.data.reserveDate===null||vm.data.reserveDate===''){
          vm.$vux.toast.show({text:'预约时间不能为空'});
        }else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
        } else if(vm.data.reserveContactPerson===null||vm.data.reserveContactPerson===''){
          vm.$vux.toast.show({text:'预约对接人不能为空'});
        }else if(vm.data.reserveContactPhone===null||vm.data.reserveContactPhone===''){
          vm.$vux.toast.show({text:'预约对接人电话不能为空'});
        } else {
          if(phoneCode1==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.customerPhone)))) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00852'&&(vm.customerPhone.length!=8)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00853'&&(vm.customerPhone.length!=8)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00886'&&(vm.customerPhone.length!=9)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else  if(phoneCode2==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.reserveContactPhone)))) {
            vm.$vux.toast.show({tetx:'预约对接人电话有误'});
          }else if(phoneCode2==='00852'&&(vm.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({tetx:'预约对接人电话有误'});
          }else if(phoneCode2==='00853'&&(vm.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({tetx:'预约对接人电话有误'});
          }else if(phoneCode2==='00886'&&(vm.reserveContactPhone.length!=9)) {
            vm.$vux.toast.show({tetx:'预约对接人电话有误'});
          }else{
            var sex=null;
            var date=new Date();
            date=date.format('yyyy-MM-dd hh:mm:ss');
            if(vm.male){
              vm.data.vaccineCustomerSex="M";
            }else{
              vm.data.vaccineCustomerSex="F";
            }

            for(let i in vm.detail.prdItemSublineList){
              if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
              }
            }
            var time=new Date(vm.data.reserveDate);
            time=time.format('yyyy-MM-dd hh:mm:ss');
            if(vm.data.price1==='实时报价'){
              vm.data.price1=null;
            }
            if(vm.data.vaccineCustomerTimes!="1"){
              vm.data.price=null;
            }else{
              vm.data.price=vm.data.price1;
            }
            vm.$post('/api/ordOrder/submit', [{
              'applicantCustomerId': vm.data.applicantCustomerId,
              'channelId':vm.data.channelId,
              'customerPhone': vm.data.customerPhone,
              'customerPhoneCode': phoneCode1,
              'customerPrice':vm.data.customerPrice,
              "customerType": "APPLICANT",
              "hisDesc": "订单状态变更为预约资料审核中,请耐心等候!",
              "hisStatus": "DATA_APPROVING",
              'itemId': vm.data.itemId,
              'orderType': vm.data.orderType,
              "price":vm.data.price,
              'relatedOrderId': vm.data.relatedOrderId,
              'reserveComment':vm.data.reserveComment,
              'reserveContactPerson': vm.data.reserveContactPerson,
              'reserveContactPhone': vm.data.reserveContactPhone,
              'reserveContactPhoneCode': phoneCode2,
              'reserveDate': time,
              'signDate': vm.data.signDate,
              'status': "DATA_APPROVING",
              'sublineId': vm.data.sublineId,
              'submitDate': date,
              'vaccineCustomerAge':vm.data.vaccineCustomerAge,
              'vaccineCustomerPass':vm.data.vaccineCustomerPass,
              'vaccineCustomerSex':vm.data.vaccineCustomerSex,
              'vaccineCustomerTimes':vm.data.vaccineCustomerTimes,
              'valueaddType':vm.data.valueaddType,
              '__status': "update"
            }]).then(function(response){
              vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
              setTimeout(function () {
                vm.$router.go(-1);
              }, 3000)
            }, function (response) {
              console.log("接口出错了");
            })

          }

        }
      }
      if(vm.sign){
        var vm=this;
        var phoneCode1=null;
        var phoneCode2=null;
        for(let i in vm.phoneCodes){
          if(vm.data.customerPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode1=vm.phoneCodes[i].value;
          }
          if(vm.data.reserveContactPhoneCode===vm.phoneCodes[i].meaning){
            phoneCode2=vm.phoneCodes[i].value;
          }
        }
        if(vm.data.applicant===null){
          vm.$vux.toast.show({text:'客户名不能为空'});
        }else if(vm.data.customerPhone===null){
          vm.$vux.toast.show({text:'联系电话不能为空'});
        }else if(vm.data.sublineItemName===null){
          vm.$vux.toast.show({text:'深圳过境关口不能为空'});
        }else if(vm.data.reserveDate===null){
          vm.$vux.toast.show({text:'预约过境时间不能为空'});
        }else if(new Date(vm.data.reserveDate).getTime()<new Date().getTime()){
          vm.$vux.toast.show({text:'预约时间不能早于当前时间'});
        }else if(vm.data.reserveContactPerson===null){
          vm.$vux.toast.show({text:'预约对接人不能为空'});
        }else if(vm.data.reserveContactPhone===null){
          vm.$vux.toast.show({text:'预约对接人电话不能为空'});
        }else {
          if(phoneCode1==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.data.customerPhone)))) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00852'&&(vm.data.customerPhone.length!=8)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00853'&&(vm.data.customerPhone.length!=8)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else if(phoneCode1==='00886'&&(vm.data.customerPhone.length!=9)) {
            vm.$vux.toast.show({text:'联系电话有误'});
          }else  if(phoneCode2==='86'&&(!(/^1(3|4|5|7|8)\d{9}$/.test(vm.data.reserveContactPhone)))) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode2==='00852'&&(vm.data.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode2==='00853'&&(vm.data.reserveContactPhone.length!=8)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else if(phoneCode2==='00886'&&(vm.data.reserveContactPhone.length!=9)) {
            vm.$vux.toast.show({text:'预约对接人电话有误'});
          }else{
            var date=new Date();
            date=date.format('yyyy-MM-dd hh:mm:ss');
            var time=new Date(vm.data.reserveDate);
            time=time.format('yyyy-MM-dd hh:mm:ss');

            if(vm.data.price1==='实时报价'){
              vm.data.price=null;
            }else{
              vm.data.price=vm.data.price1;
            }
            for(let i in vm.detail.prdItemSublineList){
              if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
                vm.data.sublineId=vm.detail.prdItemSublineList[i].sublineId;
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
              'applicantCustomerId': vm.data.applicantCustomerId,
              'channelId': vm.data.channelId,
              'customerPhone': vm.data.customerPhone,
              'customerPhoneCode': phoneCode1,
              'customerType': vm.data.customerType,
              "file":vm.file,
              "hisDesc": "订单状态变更为预约资料审核中,请耐心等候!",
              "hisStatus": "DATA_APPROVING",
              'itemId': vm.data.itemId,
              'orderType': vm.data.orderType,
              'ordTeamVisitor':vm.customerList,
              'price':vm.data.price,
              'relatedOrderId': vm.data.relatedOrderId,
              'reserveComment':vm.data.reserveComment,
              'reserveContactPerson': vm.data.reserveContactPerson,
              'reserveContactPhone': vm.data.reserveContactPhone,
              'reserveContactPhoneCode': phoneCode2,
              'reserveDate': vm.data.reserveDate,
              'signDate': time,
              'status': "DATA_APPROVING",
              'sublineId': vm.data.sublineId,
              'submitDate': date,
              'valueaddType':vm.data.valueaddType,
              '__status': "update"
            }]).then(function(response){
              vm.$vux.toast.show({text:"预约资料已提交，请耐心等待审核"},3000);
              setTimeout(function () {
                vm.$router.go(-1);
              }, 3000);
            }, function (response) {
              console.log("接口出错了");
            })
          }
        }
      }

    },
    onCancel3(){
      var vm=this;
      vm.showCancel=false;

    },
    onConfirm3(){
      var vm=this;
      if(vm.hotel){
        vm.data.status="RESERVE_CANCELLED";
        vm.data.__status='update';
        vm.$post('/api/ordOrder/submit',[vm.data]).then(function(response){
          vm.$vux.toast.show({text:'预约已取消'},3000);
          setTimeout(function(){
            vm.$router.go(-1);
          },3000)

        },function(response){
          vm.$vux.toast.show({text:'接口出错了'});
        })
      }
      if(vm.car){
        vm.data.status="RESERVE_CANCELLED";
        vm.data.__status='update';
        vm.$post('/api/ordOrder/submit',[vm.data]).then(function(response){
          vm.$vux.toast.show({text:'预约已取消'},3000);
          setTimeout(function(){
            vm.$router.go(-1);
          },3000)

        },function(response){
          vm.$vux.toast.show({text:'接口出错了'});
        })
      }
      if(vm.club){
        vm.data.status="RESERVE_CANCELLED";
        vm.data.__status='update';
        vm.$post('/api/ordOrder/submit',[vm.data]).then(function(response){
          vm.$vux.toast.show({text:'预约已取消'},3000);
          setTimeout(function(){
            vm.$router.go(-1);
          },3000)

        },function(response){
          vm.$vux.toast.show({text:'接口出错了'});
        })
      }
      if(vm.HPV){
        vm.data.status="RESERVE_CANCELLED";
        vm.data.__status='update';
        vm.$post('/api/ordOrder/submit',[vm.data]).then(function(response){
          vm.$vux.toast.show({text:'预约已取消'},3000);
          setTimeout(function(){
            vm.$router.go(-1);
          },3000)

        },function(response){
          vm.$vux.toast.show({text:'接口出错了'});
        })
      }
      if(vm.sign){
        vm.data.status="RESERVE_CANCELLED";
        vm.data.__status='update';
        vm.$post('/api/ordOrder/submit',[vm.data]).then(function(response){
          vm.$vux.toast.show({text:'预约已取消'},3000);
          setTimeout(function(){
            vm.$router.go(-1);
          },3000)

        },function(response){
          vm.$vux.toast.show({text:'接口出错了'});
        })
      }
    },
    changeAddress(){
      var vm=this;
      for (let i in vm.detail.prdItemSublineList) {
        if (vm.data.sublineItemName === vm.detail.prdItemSublineList[i].sublineItemName) {
          if (vm.data.userHour === "2h") {
            vm.data.price = 2 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.data.userHour=== "3h") {
            vm.data.price = 3 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.data.userHour === "4h") {
            vm.data.price = 4 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.data.userHour === "5h") {
            vm.data.price = 5 * vm.detail.prdItemSublineList[i].price;
          }
          if (vm.data.userHour === "6h") {
            vm.data.price = 6 * vm.detail.prdItemSublineList[i].price;
          }
        }
      }

    },
    changePath(){
      var vm=this;
      for(let i in vm.detail.prdItemSublineList){
        if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
          vm.data.price=vm.detail.prdItemSublineList[i].price;
          vm.data.price1=vm.data.price;
          if(vm.data.price!=="实时报价"){
            vm.data.price="￥"+vm.data.price;
          }
        }
      }

    },
    changeType(){
      var vm=this;
      if(vm.data.vaccineCustomerTimes==='2'||vm.data.vaccineCustomerTimes==='3'){
        vm.first=false;
        vm.data.price1=null;
      }
      if(vm.data.vaccineCustomerTimes==='1'){
        vm.first=true;
        for(let i in vm.detail.prdItemSublineList ){
          if(vm.data.sublineItemName===vm.detail.prdItemSublineList[i].sublineItemName){
            vm.data.price1=vm.detail.prdItemSublineList[i].price;
            if(vm.type1){
              vm.data.price='￥'+vm.detail.prdItemSublineList[i].price+"(需现场支付)";
            }else{
              vm.data.price='￥'+vm.detail.prdItemSublineList[i].price;
            }
          }
        }
      }
    },
    changeSign(){
      var vm=this;
      for(let i in vm.detail.prdItemSublineList){
        if (vm.data.sublineItemName === vm.detail.prdItemSublineList[i].sublineItemName) {
          vm.data.price=vm.detail.prdItemSublineList[i].price;
          vm.data.price1=vm.detail.prdItemSublineList[i].price;
          if(vm.data.price!=="实时报价"){
            vm.data.price="￥"+vm.data.price;
          }
        }
      }

    },
    click3:function(){
      var vm=this;
      vm.male=!vm.male;
    },
    click4:function(){
      var vm=this;
      vm.male=!vm.male;
    },
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
                vm.showAdd = false;
                vm.showImg = true;
              }, function (response) {
                alert(response.status);
                console.log("接口出错了");

              });

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
    getImg(file,filePath){    //获取上传的图片及base64
      var vm=this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        vm.customerExample.list[0].src= this.result;
      }
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
    edit1(index){   //进入编辑游客信息页面
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
    click1:function(){
      var vm=this;
      vm.customerExample.sex=!vm.customerExample.sex;
    },
    click2:function(){
      var vm=this;
      vm.customerExample.sex=!vm.customerExample.sex;
    },
    goPay:function(){
      var vm=this;
      var list=vm.data;
      let amount =vm.truePrice,
        sourceId = list.orderId;
      var param = {
        amount: amount,
        orderContent: "增值服务订单",
        orderSubject: "增值服务订单",
        sourceId: sourceId,
        sourceType:"ORDER"
      };
      vm.$router.push({path:'/onlinePayment',query:{courseId:list.orderId,payInfo:param}});

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
  .hotelReserve {
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;

  .btnClass2{
    width: 95%;
    height: 3rem;
    margin: 2.5%;
    color: white;
    text-align: center;
    background-color: #E6A913;
    font-size: 1.4rem;
    line-height: 2.5;
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
  }

  .radio_title {
    display: inline-block;
    width: 40%;
    font-size: 1.3rem;
  }

  .radio_right_down {
    display: inline-block;
    position: relative;
    /* margin-bottom: 1rem; */
    margin-top: 0.5rem;
    margin-left: 43%;
    width: 55%;
    /* padding: 0.5rem; */
    background-color: #F4F4F7;
    border: 0px;
    height: 3rem;
  }


  .btnClass1{
    display: inline-block;
    width: 40%;
    height: 3rem;
    margin: 4.8%;
    color: white;
    text-align: center;
    background-color: #E6A913;
    font-size: 1.4rem;
    line-height: 2.5;
  }

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
    border-bottom: 2px solid #D9D9D9;
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

  .whole {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    min-height: 4rem;
    margin: 10px 0px 1rem 1rem;
    border-bottom: 1px solid #D9D9D9;
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
    color: #333333;

  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  .weui-cell {
    padding: 0px;
  }

  .weui-cell_access .weui-cell__ft {
    padding: 0px;
    margin-bottom: 10px;
    font-size: 1.3rem;
  }

  .weui-cell_access .weui-cell__ft:after {
    content: normal;
  }

  }

  .right {
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

  .weui-cells {
    margin-top: 0px;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  }
  .right_new {
    border: 0px;
    display: inline-block;
    width: 70%;
    text-align: right;
    padding-right: 1rem;
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
    width: 70%;
    margin-left: 30%;
    color: #ADADAD;

  }

  .comment_up {
    margin-left: 1rem;
    position: relative;
    color: #333333;
  }

  .comment_up_new {
    margin-left: 1rem;
    color: #999999;
  }

  .bottom {
    border-bottom: solid 1px #e5e5e5;
    border-left: none;
    border-top: none;
    border-right: none;
    width: calc(~"100% - 10px");
    height: 3rem;
    margin-left: 10px;
    outline: none;
    font-size: 1.3rem;
  }
  .cardList {
    width: 100%;
    box-sizing: border-box;

  .cardTitle {
    display: block;
    line-height: 45px;
    font-size: 1.6rem;
    padding-left: 10px;
    background: #F4F4F7;
  }

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

  .signReserve {
    width: 100%;
    background-color: white;
    min-height: 100%;
    position: absolute;

  .btnClass1{
    display: inline-block;
    width: 40%;
    height: 3rem;
    margin: 4.8%;
    color: white;
    text-align: center;
    background-color: #E6A913;
    font-size: 1.4rem;
    line-height: 2.5;
  }

  .btnClass2{
    width: 95%;
    height: 3rem;
    margin: 2.5%;
    color: white;
    text-align: center;
    background-color: #E6A913;
    font-size: 1.4rem;
    line-height: 2.5;
  }

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
    border-bottom: 2px solid #D9D9D9;
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
    line-height: 2.5;
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
    font-size:1.3rem;

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
    width: calc(~"100% - 10px");
    height: 3rem;
    margin-left: 10px;
    outline: none;
    font-size: 1.3rem;
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
    font-size: 1.8rem;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 0px;
  }

  .button_left {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 4rem;
    background-color: white;
    border: solid 1px #D1D1D1;
    color:#666666;
    padding-top: 1.5rem;
  }

  .button_right {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 4rem;
    background-color: #E6A914;
    color: white;
    padding-top: 1.5rem;
    border: solid 1px #E6A914;
  }
  }
  .example {
  .weui-cells:before {
    border-top: none;
  }

  .weui-cells:after {
    left: 10px;
    border-bottom: 2px solid #D9D9D9;
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
    padding-left: 2px;
    font-size: 1.3rem;
  }

  .right {
    border: 0px;
    display: inline-block;
    width: 80%;
    text-align: right;
    padding-right: 1rem;
    height: 3rem;
    background-color: white;
    outline: none;
    font-size: 1.3rem;
  }

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
