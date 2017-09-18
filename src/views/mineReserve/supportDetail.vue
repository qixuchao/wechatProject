<template>
  <div v-if="edit">
    <!-- 培训-->
    <div class="trainApply" v-if="train">
      <div class="whole">
        <div class="left">申请状态:</div>
        <div class="right_new" style="color: red">{{data.status}}</div>
      </div>
      <div class="whole" v-if="data.status==='取消申请'">
        <div class="left">取消时间:</div>
        <div class="right_new" style="color:red">{{data.lastUpdateDate}}</div>
      </div>
      <div class="whole" v-if="data.status==='申请失败'">
        <div class="left">失败原因:</div>
        <div class="right_new" style="color:red">{{data.trainContent}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请人</div>
        <input class="right" placeholder="请输入" v-model="data.createrName"/>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
        <group class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.phoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入" v-model="data.contactPhone" />
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
        <input class="right" placeholder="请输入" v-model="data.contactEmail"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请培训内容</div>
        <input class="right" placeholder="请输入" v-model="data.trainContent"/>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训开始时间</div>
        <group>
          <datetime v-model="data.trainStartDate" format="YYYY-MM-DD HH:mm" :title="start"
                    placeholder="请选择"></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训结束时间</div>
        <group>
          <datetime v-model="data.trainEndDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择"></datetime>
        </group>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>参与人性质</div>
        <input class="right" placeholder="请输入" v-model="data.trainMainType"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预期参与人数</div>
        <input class="right" placeholder="请输入" v-model="data.trainPeopleNum"/>
      </div>

      <div class="whole">
        <div class="left">指定培训讲师</div>
        <input class="right" placeholder="请输入" v-model="data.trainTeacher"/>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>详细地址</div>
        <group>
          <x-address :title="start" v-model="data.detailedAddress" row-value :list="addressData"
                     hide-district></x-address>
        </group>
      </div>


      <div class="whole">
        <div class="left"></div>
        <input class="right" placeholder="请输入详细地址" v-model="data.trainAddress"/>
      </div>

      <div class="comment_up">其他要求</div>
      <input class="bottom" v-model="data.trainOther"/>

      <div class="btnClass" @click="submit">{{btn}}</div>
    </div>


    <!-- 会销-->
    <div class="trainApply" v-if="cost">
      <div class="whole">
        <div class="left">申请状态:</div>
        <div class="right_new" style="color: red">{{data.status}}</div>
      </div>
      <div class="whole" v-if="data.status==='取消申请'">
        <div class="left">取消时间:</div>
        <div class="right_new" style="color:red">{{data.lastUpdateDate}}</div>
      </div>
      <div class="whole" v-if="data.status==='申请失败'">
        <div class="left">失败原因:</div>
        <div class="right_new" style="color:red">{{data.costContent}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请人</div>
        <input class="right" placeholder="请输入" v-model="data.createrName"/>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
        <group class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.phoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入" v-model="data.contactPhone"/>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
        <input class="right" placeholder="请输入" v-model="data.contactEmail"/>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会销主题</div>
        <input class="right" placeholder="请输入" v-model="data.costTopic"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>参与人群主要类型</div>
        <input class="right" placeholder="请输入" v-model="data.costParType"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>参与人数</div>
        <input class="right" placeholder="请输入" v-model="data.costParTotal"/>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训开始时间</div>
        <group>
          <datetime v-model="data.costStartDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择"></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训结束时间</div>
        <group>
          <datetime v-model="data.costEndDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择"></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>会销地点</div>
        <group>
          <x-address :title="start" v-model="data.detailedAddress" row-value :list="addressData"
                     hide-district></x-address>
        </group>
      </div>


      <div class="whole">
        <div class="left"></div>
        <input class="right" placeholder="请输入详细地址" v-model="data.costAddress"/>
      </div>

      <div class="whole">
        <div class="left">指定培训讲师</div>
        <input class="right" placeholder="请输入" v-model="data.costTeacher"/>
      </div>


      <div class="comment_up"><span style="color:#f63636 ">*</span>会销目标</div>
      <input class="bottom" v-model="data.costTarget"/>

      <div class="comment_up">其他要求</div>
      <input class="bottom" v-model="data.other"/>

      <div class="btnClass" @click="submit">{{btn}}</div>


    </div>

    <div class="trainApply" v-if="guest">
      <div class="whole">
        <div class="left">申请状态:</div>
        <div class="right_new" style="color: red">{{data.status}}</div>
      </div>
      <div class="whole" v-if="data.status==='取消申请'">
        <div class="left">取消时间:</div>
        <div class="right_new" style="color:red">{{data.lastUpdateDate}}</div>
      </div>
      <div class="whole" v-if="data.status==='申请失败'">
        <div class="left">失败原因:</div>
        <div class="right_new" style="color:red">{{data.guestContent}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请人</div>
        <input class="right" placeholder="请输入" v-model="data.createrName"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
        <group class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.phoneCode"></popup-radio>
        </group>
        <input class="right" placeholder="请输入" v-model="data.contactPhone"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
        <input class="right" placeholder="请输入" v-model="data.contactEmail"/>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会客人数</div>
        <input class="right" placeholder="请输入" v-model="data.guestParTotal"/>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>会客时间</div>
        <group>
          <datetime v-model="data.guestDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择"></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>会客地点</div>
        <group>
          <x-address :title="start" v-model="data.detailedAddress" row-value :list="addressData"
                     hide-district></x-address>
        </group>
      </div>
      <div class="whole">
        <div class="left"></div>
        <input class="right" placeholder="请输入详细地址" v-model="data.guestAddress"/>
      </div>

      <div class="whole">
        <div class="left">指定培训讲师</div>
        <input class="right" placeholder="请输入" v-model="data.guestTeacher"/>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会客洽谈内容</div>
        <input class="right" placeholder="请输入" v-model="data.guestDiscussContent"/>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>愿意提取佣金比例</div>
        <input class="right" v-model="data.guestPercent"/><span style="padding-right: 10px">%</span>
      </div>

      <div class="comment_up"><span style="color:#f63636 ">*</span>客户背景简单描述</div>
      <input class="bottom" v-model="data.guestBackground"/>

      <div class="comment_up">其他要求</div>
      <input class="bottom" v-model="data.other"/>

      <div class="btnClass" @click="submit">{{btn}}</div>

    </div>

    <div v-transfer-dom>
      <confirm v-model="showSubmit" :title="title3" @on-cancel="onCancel3" @on-confirm="onConfirm3">
      </confirm>
    </div>

  </div>

  <div v-else-if="unEdit">
    <!-- 培训-->
    <div class="trainApply" v-if="train">
      <div class="whole">
        <div class="left">申请状态:</div>
        <div class="right_new" style="color: red">{{data.status}}</div>
      </div>
      <div class="whole" v-if="data.status==='取消申请'">
        <div class="left">取消时间:</div>
        <div class="right_new" style="color:red">{{data.lastUpdateDate}}</div>
      </div>
      <div class="whole" v-if="data.status==='已支付'||data.status==='待支付'">
        <div class="left">支付价格:</div>
        <div class="right_new" style="color:red">{{data.amount}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请人</div>
        <div class="right_new">{{data.createrName}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
        <group class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.phoneCode" readonly></popup-radio>
        </group>
        <div class="right">{{data.contactPhone}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
        <div class="right_new" >{{data.contactEmail}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请培训内容</div>
        <div class="right_new"  >{{data.trainContent}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训开始时间</div>
        <group>
          <datetime v-model="data.trainStartDate" format="YYYY-MM-DD HH:mm" :title="start"
                    placeholder="请选择" readonly></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训结束时间</div>
        <group>
          <datetime v-model="data.trainEndDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>
        </group>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>参与人性质</div>
        <div class="right_new">{{data.trainMainType}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>预期参与人数</div>
        <div class="right_new">{{data.trainPeopleNum}}</div>
      </div>

      <div class="whole">
        <div class="left">指定培训讲师</div>
        <div class="right_new">{{data.trainTeacher}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>详细地址</div>
        <div class="right_new">{{data.province}}/{{data.city}}</div>
      </div>


      <div class="whole">
        <div class="left"></div>
        <div class="right_new">{{data.trainAddress}}</div>
      </div>

      <div class="comment_up">其他要求</div>
      <div class="bottom" >{{data.trainOther}}</div>

      <!--讲师信息-->
    <div v-for="(item,index) in data.teacherList" v-if="data.teacherList.length>0">
      <div class="two" @click="item.showTeacher =!item.showTeacher;">
        <span class="two_middle">讲师{{index+1}}安排信息</span>
        <span><x-icon type="ios-arrow-up" size="30" v-if="item.showTeacher" class="two_right"></x-icon></span>
        <span><x-icon type="ios-arrow-down" size="30" v-if="!item.showTeacher" class="two_right"></x-icon></span>
      </div>

      <div class="product" v-if="item.showTeacher">
        <div class="other"><span>安排讲师：</span><span>{{item.name}}</span></div>
        <div class="other"><span>讲师性别：</span><span>{{item.gender}}</span></div>
        <div class="other"><span>联系方式：</span><span>{{item.phone}}</span></div>
        <div class="other"><span>到达时间：</span><span>{{item.arriveTime}}</span></div>
        <div class="other"><span>交通方式：</span><span>{{item.transprotType}}</span></div>
        <div class="other"><span>到达地点：</span><span>{{item.arrivePlace}}</span></div>
        <div class="other"><span>离开时间：</span><span>{{item.leaveTime}}</span></div>
        <div class="other"><span>收费标准：</span><span>{{item.tollStandard}}</span></div>
        <div class="other"><span>备注：</span><span>{{item.remarks}}</span></div>
      </div>
    </div>

      <div class="btnClass" v-if="data.status!=='待支付'" @click="cancel">{{btn}}</div>
      <div style="display: flex;display: -webkit-flex" v-if="data.status==='待支付'">
        <div class="btnClass1" @click="cancel">{{btn}}</div>
        <div class="btnClass1"  @click="pay">{{btn1}}</div>
      </div>
      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showPay" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
        </div>

    </div>


    <!-- 会销-->
    <div class="trainApply" v-if="cost">
      <div class="whole">
        <div class="left">申请状态:</div>
        <div class="right_new" style="color: red">{{data.status}}</div>
      </div>
      <div class="whole" v-if="data.status==='取消申请'">
        <div class="left">取消时间:</div>
        <div class="right_new" style="color:red">{{data.lastUpdateDate}}</div>
      </div>
      <div class="whole" v-if="data.status==='已支付'||data.status==='待支付'">
        <div class="left">支付价格:</div>
        <div class="right_new" style="color:red">{{data.amount}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请人</div>
        <div class="right_new" >{{data.createrName}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
        <group class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.phoneCode" readonly></popup-radio>
        </group>
        <div class="right" >{{data.contactPhone}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
        <div class="right_new" >{{data.contactEmail}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会销主题</div>
        <div class="right_new">{{data.costTopic}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>参与人群主要类型</div>
        <div class="right_new" >{{data.costParType}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>参与人数</div>
        <div class="right_new" >{{data.costParTotal}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训开始时间</div>
        <group>
          <datetime v-model="data.costStartDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>
        </group>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>培训结束时间</div>
        <group>
          <datetime v-model="data.costEndDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>
        </group>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会销地点</div>
        <div class="right_new">{{data.province}}/{{data.city}}</div>
      </div>


      <div class="whole">
        <div class="left"></div>
        <div class="right_new" >{{data.costAddress}}</div>
      </div>

      <div class="whole">
        <div class="left">指定培训讲师</div>
        <div class="right_new" >{{data.costTeacher}}</div>
      </div>


      <div class="comment_up"><span style="color:#f63636 ">*</span>会销目标</div>
      <div class="bottom">{{data.costTarget}}</div>

      <div class="comment_up">其他要求</div>
      <div class="bottom" >{{data.other}}</div>


      <div v-for="(item,index) in data.teacherList" v-if="data.teacherList.length>0">
        <div class="two" @click="item.showTeacher =!item.showTeacher;">
          <span class="two_middle">讲师{{index+1}}安排信息</span>
          <span><x-icon type="ios-arrow-up" size="30" v-if="item.showTeacher" class="two_right"></x-icon></span>
          <span><x-icon type="ios-arrow-down" size="30" v-if="!item.showTeacher" class="two_right"></x-icon></span>
        </div>

        <div class="product" v-if="item.showTeacher">
          <div class="other"><span>安排讲师：</span><span>{{item.name}}</span></div>
          <div class="other"><span>讲师性别：</span><span>{{item.gender}}</span></div>
          <div class="other"><span>联系方式：</span><span>{{item.phone}}</span></div>
          <div class="other"><span>到达时间：</span><span>{{item.arriveTime}}</span></div>
          <div class="other"><span>交通方式：</span><span>{{item.transprotType}}</span></div>
          <div class="other"><span>到达地点：</span><span>{{item.arrivePlace}}</span></div>
          <div class="other"><span>离开时间：</span><span>{{item.leaveTime}}</span></div>
          <div class="other"><span>收费标准：</span><span>{{item.tollStandard}}</span></div>
          <div class="other"><span>备注：</span><span>{{item.remarks}}</span></div>
        </div>
      </div>


      <div class="btnClass" v-if="data.status!=='待支付'" @click="cancel">{{btn}}</div>
      <div style="display: flex;display: -webkit-flex" v-if="data.status==='待支付'">
        <div class="btnClass1" @click="cancel">{{btn}}</div>
        <div class="btnClass1"  @click="pay">{{btn1}}</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showPay" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
        </div>


    </div>

    <div class="trainApply" v-if="guest">
      <div class="whole">
        <div class="left">申请状态:</div>
        <div class="right_new" style="color: red">{{data.status}}</div>
      </div>
      <div class="whole" v-if="data.status==='取消申请'">
        <div class="left">取消时间:</div>
        <div class="right_new" style="color:red">{{data.lastUpdateDate}}</div>
      </div>
      <div class="whole" v-if="data.status==='已支付'||data.status==='待支付'">
        <div class="left">支付价格:</div>
        <div class="right_new" style="color:red">{{data.amount}}</div>
      </div>
      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>申请人</div>
        <div class="right_new">{{data.createrName}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人手机</div>
        <group class="middle">
          <popup-radio :options="phoneCodeList" v-model="data.phoneCode" readonly></popup-radio>
        </group>
        <div class="right" >{{data.contactPhone}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>联系人邮箱</div>
        <div class="right_new">{{data.contactEmail}}</div>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会客人数</div>
        <div class="right_new" >{{data.guestParTotal}}</div>
      </div>

      <div class="whole_new">
        <div class="left"><span style="color:#f63636 ">*</span>会客时间</div>
        <group>
          <datetime v-model="data.guestDate" format="YYYY-MM-DD HH:mm" :title="start" placeholder="请选择" readonly></datetime>
        </group>
      </div>

      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会客地点</div>
        <div class="right_new">{{data.province}}/{{data.city}}</div>
      </div>
      <div class="whole">
        <div class="left"></div>
        <div class="right_new">{{data.guestAddress}}</div>
      </div>

      <div class="whole">
        <div class="left">指定培训讲师</div>
        <div class="right_new" >{{data.guestTeacher}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>会客洽谈内容</div>
        <div class="right_new" >{{data.guestDiscussContent}}</div>
      </div>


      <div class="whole">
        <div class="left"><span style="color:#f63636 ">*</span>愿意提取佣金比例</div>
        <div class="right_new"  >{{data.guestPercent}}%</div>
      </div>

      <div class="comment_up"><span style="color:#f63636 ">*</span>客户背景简单描述</div>
      <div class="bottom" >{{data.guestBackground}}</div>

      <div class="comment_up">其他要求</div>
      <div class="bottom" >{{data.other}}</div>

      <div v-for="(item,index) in data.teacherList" v-if="data.teacherList.length>0">
        <div class="two" @click="item.showTeacher =!item.showTeacher;">
          <span class="two_middle">讲师{{index+1}}安排信息</span>
          <span><x-icon type="ios-arrow-up" size="30" v-if="item.showTeacher" class="two_right"></x-icon></span>
          <span><x-icon type="ios-arrow-down" size="30" v-if="!item.showTeacher" class="two_right"></x-icon></span>
        </div>

        <div class="product" v-if="item.showTeacher">
          <div class="other"><span>安排讲师：</span><span>{{item.name}}</span></div>
          <div class="other"><span>讲师性别：</span><span>{{item.gender}}</span></div>
          <div class="other"><span>联系方式：</span><span>{{item.phone}}</span></div>
          <div class="other"><span>到达时间：</span><span>{{item.arriveTime}}</span></div>
          <div class="other"><span>交通方式：</span><span>{{item.transprotType}}</span></div>
          <div class="other"><span>到达地点：</span><span>{{item.arrivePlace}}</span></div>
          <div class="other"><span>离开时间：</span><span>{{item.leaveTime}}</span></div>
          <div class="other"><span>收费标准：</span><span>{{item.tollStandard}}</span></div>
          <div class="other"><span>备注：</span><span>{{item.remarks}}</span></div>
        </div>
      </div>


      <div class="btnClass" v-if="data.status!=='待支付'" @click="cancel">{{btn}}</div>
      <div style="display: flex;display: -webkit-flex" v-if="data.status==='待支付'">
        <div class="btnClass1"  @click="cancel">{{btn}}</div>
        <div class="btnClass1"  @click="pay">{{btn1}}</div>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showCancel" :title="title1" @on-cancel="onCancel1" @on-confirm="onConfirm1">
        </confirm>
      </div>

      <div v-transfer-dom>
        <confirm v-model="showPay" :title="title2" @on-cancel="onCancel2" @on-confirm="onConfirm2">
        </confirm>
      </div>

    </div>


  </div>

</template>

<script type="text/ecmascript-6">
  import { Group,Datetime,Confirm,XAddress,PopupRadio,TransferDomDirective as TransferDom } from 'vux';
  export default{
    directives: {
      TransferDom
    },
    components: {
      Group,
      Datetime,
      Confirm,
      XAddress,
      PopupRadio
    },
    data(){
    return {
      supportId: '',
      status: [],
      supportType: [],
      cityList: [],
      cityList: [],
      nationalList: [],
      phoneCodes: [],
      phoneCodeList: [],
      provinceList: [],
      data: {},
      edit: false,
      unEdit: false,
      guest: false,
      cost: false,
      train: false,
      btn: '',
      btn1: '',
      detailedAddress: [],
      addressData: [],
      start: '',
      showCancel: false,
      showPay: false,
      showSubmit: false,
      title1: '是否确认取消申请？',
      title2: "是否确认前往支付？",
      title3: "是否确认重新提交申请？",

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
      document.setTitle('业务支援');
    }, 1);
  },
  mounted(){
    var vm = this;
    var supportId = vm.$route.query.supportId;
    vm.supportId = supportId;
    console.log(supportId);
    vm.$vux.loading.show({text:'loading'});
    vm.$post('/api/clb/common/clbCode', {
      "status": "COURSE.SUPPORT_STATUS",
      "supportType": "COURSE.SUPPORT_TYPE",
      "cityList": "PUB.CITY",
      "nationalList": "PUB.NATION",
      "phoneCodes": "PUB.PHONE_CODE",
      "provinceList": "PUB.PROVICE"
    }).then(function (response) {
      vm.status = JSON.parse(response).status;
      vm.supportType = JSON.parse(response).supportType;
      vm.cityList = JSON.parse(response).cityList;
      vm.nationalList = JSON.parse(response).nationalList;
      vm.phoneCodes = JSON.parse(response).phoneCodes;
      vm.provinceList = JSON.parse(response).provinceList;
      vm.$post('/api/support/query', {
        "supportId": vm.supportId
      }).then(function (response) {
        vm.$vux.loading.hide();
        vm.data = response.rows[0];
        var detailedAddress = [];
        detailedAddress.push(vm.data.province);
        detailedAddress.push(vm.data.city);
        vm.$set(vm.data, 'detailedAddress', detailedAddress);
        for (let i in vm.provinceList) {
          let example = {};
          example.name = vm.provinceList[i].meaning;
          example.value = vm.provinceList[i].value;
          example.codeValueId = vm.provinceList[i].codeValueId;
          vm.addressData.push(example);
        }
        for (let i in vm.cityList) {
          let example = {};
          example.name = vm.cityList[i].meaning;
          example.value = vm.cityList[i].value;
          example.parent = vm.cityList[i].parentValue;
          example.codeValueId = vm.cityList[i].codeValueId;
          vm.addressData.push(example);
        }
        for (let i in vm.phoneCodes) {
          vm.phoneCodeList.push(vm.phoneCodes[i].meaning);
          if (vm.data.phoneCode === vm.phoneCodes[i].value) {
            vm.data.phoneCode = vm.phoneCodes[i].meaning;
          }
        }
        if(vm.data.teacherList.length>0){
          for(let i in vm.data.teacherList){
            vm.$set(vm.data.teacherList[i],'showTeacher',false);
            if(vm.data.teacherList[i].gender==='F'){
              vm.data.teacherList[i].gender='女';
            }
            if(vm.data.teacherList[i].gender==='M'){
              vm.data.teacherList[i].gender='男';
            }
          }
        }
        if (vm.data.status === 'CANCEL' || vm.data.status === 'FAIL') {  //业务支援为取消申请或失败则内容可编辑
          for (let i in vm.status) {
            if (vm.data.status === vm.status[i].value) {
              vm.data.status = vm.status[i].meaning;
            }
          }
          vm.btn = '重新申请';
          vm.edit = true;
          if (vm.data.supportType === 'GUEST') {   //会客支援
            vm.guest = true;
            vm.data.guestPercent = (vm.data.guestPercent).toFixed(2)*100;
          }
          if (vm.data.supportType === 'TRAIN') {  //培训支援
            vm.train = true;

          }
          if (vm.data.supportType == 'COST') {  //会销支援
            vm.cost = true;
          }

        } else {              //其余为不可编辑
          vm.unEdit = true;
          if (vm.data.status === 'APPROVAL' || vm.data.status === 'SUCCESS' || vm.data.status === 'AMOUNT') {
            vm.btn = '取消申请';
          }
          if (vm.data.status === 'PAYMENT') {   //待支付
            vm.btn = "取消申请";
            vm.btn1 = "去支付";
          }
          for (let i in vm.status) {
            if (vm.data.status === vm.status[i].value) {
              vm.data.status = vm.status[i].meaning;
            }
          }
          //转换不可编辑的地址
          for (let i in vm.addressData) {
            if (vm.data.province === vm.addressData[i].value) {
              vm.data.province = vm.addressData[i].name;
            }
            if (vm.data.city === vm.addressData[i].value) {
              vm.data.city = vm.addressData[i].name;
            }

          }
          for (let i in vm.cityList) {
            let example = {};
            example.name = vm.cityList[i].meaning;
            example.value = vm.cityList[i].value;
            example.parent = vm.cityList[i].parentValue;
            example.codeValueId = vm.cityList[i].codeValueId;
            vm.addressData.push(example);
          }

          if (vm.data.supportType === 'GUEST') {   //会客支援
            vm.guest = true;
            vm.data.guestPercent = (vm.data.guestPercent).toFixed(2)*100;

          }
          if (vm.data.supportType === 'TRAIN') {  //培训支援
            vm.train = true;

          }
          if (vm.data.supportType == 'COST') {  //会销支援
            vm.cost = true;

          }

        }

      }, function (response) {
        console.log('接口出错了');
      })


    }, function (response) {
      console.log('接口出错了');
    })
  },
  methods:{
    cancel()
    {
      var vm = this;
      vm.showCancel = true;
    }
  ,
    pay()
    {
      var vm = this;
      vm.showPay = true;
    }
  ,
    submit()
    {
      var vm = this;
      vm.showSubmit = true;
    }
  ,
    onCancel1()
    {
      var vm = this;
      vm.showCancel = false;
    }
  ,
    onCancel2()
    {
      var vm = this;
      vm.showPay = false;
    }
  ,
    onCancel3()
    {
      var vm = this;
      vm.showSubmit = false;
    }
  ,
    onConfirm1()
    {   //取消申请
      var vm = this;
      vm.$post('/api/support/cancel', {
        'supportId': vm.supportId
      }).then(function (response) {
        if(response.success){
          vm.$vux.toast.show({text:'取消成功'}, 3000);
          setTimeout(function () {
            vm.$router.go(-1);
          }, 3000);
        }else{
          vm.$vux.toast.show({text:'取消失败'});
        }

      }, function (response) {
        console.log('接口出错了');
      })
    }
  ,
    onConfirm2()
    {   //去支付
      var vm = this;
      var list=vm.data;
      let amount =list.amount,
        sourceId = list.supportId;
      var param = {
        amount: amount,
        orderContent: "支援管理订单",
        orderSubject: "支援管理订单",
        sourceId: sourceId,
        sourceType:"SUPPORT"
      };
      vm.$router.push({path:'/onlinePayment',query:{courseId:list.supportId,payInfo:param}});

    }
  ,
    onConfirm3()
    { //重新申请
      var vm = this;
      var status = null;
      var phoneCode = null;
      for (let i in vm.status) {
        if (vm.data.status === vm.status[i].meaning) {
          status = vm.status[i].value;
        }
      }
      for (let i  in vm.phoneCodes) {
        if (vm.data.phoneCode === vm.phoneCodes[i].meaning) {
          phoneCode = vm.phoneCodes[i].value;
        }
      }
      if (vm.train) {
        if (vm.data.createrName === null || vm.data.createrName === '') {
          vm.$vux.toast.show({text:"申请人不能为空"});
        } else if (vm.data.contactPhone === null || vm.data.contactPhone === '') {
          vm.$vux.toast.show({text:"联系人手机不能为空"});
        } else if (vm.data.contactEmail === null || vm.data.contactEmail === '') {
          vm.$vux.toast.show({text:"联系人邮箱不能为空"});
        } else if (vm.data.trainContent === null || vm.data.trainContent === '') {
          vm.$vux.toast.show({text:"申请培训内容不能为空"});
        } else if (vm.data.trainStartDate === null || vm.data.trainStartDate === '') {
          vm.$vux.toast.show({text:"培训开始时间不能为空"});
        } else if (vm.data.trainEndDate === null || vm.data.trainEndDate === '') {
          vm.$vux.toast.show({text:"培训结束时间不能为空"});
        } else if (new Date(vm.data.trainStartDate).getTime()<new Date().getTime()) {
          vm.$vux.toast.show({text:"培训开始时间不能早于当前时间"});
        } else if (new Date(vm.data.trainEndDate)<new Date(vm.data.trainStartDate)) {
          vm.$vux.toast.show({text:"培训结束时间不能早于培训结束时间"});
        } else if (vm.data.trainMainType === null || vm.data.trainMainType === '') {
          vm.$vux.toast.show({text:"培训人性质不能为空"});
        } else if (vm.data.trainPeopleNum === null || vm.data.trainPeopleNum === '') {
          vm.$vux.toast.show({text:"预期参与人数不能为空"});
        } else if (vm.data.detailedAddress === null || vm.data.detailedAddress === '') {
          vm.$vux.toast.show({text:"省市地址不能为空"});
        } else if (vm.data.trainAddress === null || vm.data.trainAddress === '') {
          vm.$vux.toast.show({text:"详细地址不能为空"});
        } else {
          if (phoneCode === '86' && (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.data.contactPhone)))) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00852' && (vm.data.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00853' && (vm.data.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00886' && (vm.data.contactPhone.length != 9)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vm.data.contactEmail)) {
            vm.$vux.toast.show({text:'联系人邮箱有误'});
          } else {
            var list=[];
            var date=new Date(vm.data.trainStartDate.replace(/-/g,'/'));
            list.push(date.toJSON());
            date=new Date(vm.data.trainEndDate.replace(/-/g,'/'));
            list.push(date.toJSON());

            vm.$post('/api/support/submit', {
              "contactEmail": vm.data.contactEmail,
              "contactPhone": vm.data.contactPhone,
              "createrName": vm.data.createrName,
              "other": vm.data.trainOther,
              "part": vm.data.detailedAddress,
              "phoneCode": phoneCode,
              "status": status,
              "supportId": vm.supportId,
              "trainDate":list,
              "trainAddress": vm.data.trainAddress,
              "trainContent": vm.data.trainContent,
              "trainEndDate": vm.data.trainEndDate,
              "trainMainType": vm.data.trainMainType,
              "trainPeopleNum": vm.data.trainPeopleNum,
              "trainStartDate": vm.data.trainStartDate,
              "trainTeacher": vm.data.trainTeacher
            }).then(function (response) {
              if(response.success){
                vm.$vux.toast.show({text:'申请成功'}, 2000);
                setTimeout(function () {
                  vm.$router.go(-1);
                }, 2000)
              }else{
                vm.$vux.toast.show({text:'申请失败'});
              }

            }, function (response) {

            })
          }
        }
      }
      if (vm.cost) {
        if (vm.data.createrName === null || vm.data.createrName === '') {
          vm.$vux.toast.show({text:"申请人不能为空"});
        } else if (vm.data.contactPhone === null || vm.data.contactPhone === '') {
          vm.$vux.toast.show({text:"联系人手机不能为空"});
        } else if (vm.data.contactEmail === null || vm.data.contactEmail === '') {
          vm.$vux.toast.show({text:"联系人邮箱不能为空"});
        } else if (vm.data.costTopic === null || vm.data.costTopic === '') {
          vm.$vux.toast.show({text:"会销主题不能为空"});
        } else if (vm.data.costParType === null || vm.data.costParType === '') {
          vm.$vux.toast.show({text:"参与人群主要类型不能为空"});
        } else if (vm.data.costStartDate === null || vm.data.costStartDate === '') {
          vm.$vux.toast.show({text:"培训开始时间不能为空"});
        } else if (vm.data.costEndDate === null || vm.data.costEndDate === '') {
          vm.$vux.toast.show({text:"培训结束时间不能为空"});
        } else if (new Date(vm.data.costStartDate).getTime()<new Date().getTime()) {
          vm.$vux.toast.show({text:"培训开始时间不能早于当前时间"});
        } else if (new Date(vm.data.costEndDate).getTime()<new Date(vm.data.costStartDate).getTime()) {
          vm.$vux.toast.show({text:"培训结束时间不能早于培训开始时间"});
        } else if (vm.data.costParTotal === null || vm.data.costParTotal === '') {
          vm.$vux.toast.show({text:"参与人数不能为空"});
        } else if (vm.data.detailedAddress === null || vm.data.detailedAddress === '') {
          vm.$vux.toast.show({text:"会销地点不能为空"});
        } else if (vm.data.costAddress === null || vm.data.costAddress === '') {
          vm.$vux.toast.show({text:"详细地址不能为空"});
        } else if (vm.data.costTarget === null || vm.data.costTarget === '') {
          vm.$vux.toast.show({text:"会销目标不能为空"});
        } else {
          if (phoneCode === '86' && (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.data.contactPhone)))) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00852' && (vm.data.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00853' && (vm.data.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00886' && (vm.data.contactPhone.length != 9)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vm.data.contactEmail)) {
            vm.$vux.toast.show({text:'联系人邮箱有误'});
          } else {
            var list=[];
            var date=new Date(vm.data.costStartDate.replace(/-/g,'/'));
            list.push(date.toJSON());
            date=new Date(vm.data.costEndDate.replace(/-/g,'/'));
            list.push(date.toJSON());
            vm.$post('/api/support/submit', {
              "contactEmail": vm.data.contactEmail,
              "contactPhone": vm.data.contactPhone,
              "costAddress": vm.data.costAddress,
              "costEndDate": vm.data.costEndDate,
              "costDate":list,
              "costParTotal": vm.data.costParTotal,
              "costParType": vm.data.costParType,
              "costStartDate": vm.data.costStartDate,
              "costTarget": vm.data.costTarget,
              "costTeacher": vm.data.costTeacher,
              "costTopic": vm.data.costTopic,
              "createrName": vm.data.createrName,
              "other": vm.data.other,
              "part": vm.data.detailedAddress,
              "phoneCode": phoneCode,
              "status": status,
              "supportId": vm.supportId
            }).then(function (response) {
              if(response.success){
                vm.$vux.toast.show({text:'申请成功'}, 2000);
                setTimeout(function () {
                  vm.$router.go(-1);
                }, 2000)
              }else{
                vm.$vux.toast.show({text:'申请失败'});
              }
            }, function (response) {

            })
          }
        }
      }
      if (vm.guest) {
//        var guestPercent = vm.data.guestPercent / 100;
        if (vm.data.createrName === null || vm.data.createrName === '') {
          vm.$vux.toast.show({text:"申请人不能为空"});
        } else if (vm.data.contactPhone === null || vm.data.contactPhone === '') {
          vm.$vux.toast.show({text:"联系人手机不能为空"});
        } else if (vm.data.contactEmail === null || vm.data.contactEmail === '') {
          vm.$vux.toast.show({text:"联系人邮箱不能为空"});
        } else if (vm.data.guestParTotal === null || vm.data.guestParTotal === '') {
          vm.$vux.toast.show({text:"会客人数不能为空"});
        } else if (vm.data.guestDate === null || vm.data.guestDate === '') {
          vm.$vux.toast.show({text:"会客时间不能为空"});
        } else if (new Date(vm.data.guestDate).getTime()<new Date().getTime()) {
          vm.$vux.toast.show({text:"会客时间不能早于当前时间"});
        } else if (vm.data.detailedAddress === null || vm.data.detailedAddress === '') {
          vm.$vux.toast.show({text:"会客地点不能为空"});
        } else if (vm.data.guestAddress === null || vm.data.guestAddress === '') {
          vm.$vux.toast.show({text:"详细地址不能为空"});
        } else if (vm.data.guestDiscussContent === null || vm.data.guestDiscussContent === '') {
          vm.$vux.toast.show({text:"会客洽谈内容不能为空"});
        } else if (vm.data.guestPercent === null || vm.data.guestPercent === '') {
          vm.$vux.toast.show({text:"愿意提取佣金比例不能为空"});
        }else if(vm.data.guestPercent>100){
          vm.$vux.toast.show({text:"佣金比例最高为100%"});
        } else if (vm.data.guestBackground === null || vm.data.guestBackground === '') {
          vm.$vux.toast.show({text:"客户背景简单描述不能为空"});
        } else {
          if (phoneCode === '86' && (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.data.contactPhone)))) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00852' && (vm.data.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00853' && (vm.data.contactPhone.length != 8)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (phoneCode === '00886' && (vm.data.contactPhone.length != 9)) {
            vm.$vux.toast.show({text:'手机号码有误'});
          } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vm.data.contactEmail)) {
            vm.$vux.toast.show({text:'联系人邮箱有误'});
          } else {
            var guestPercent = vm.data.guestPercent / 100;
            vm.$post('/api/support/submit', {
              "createrName": vm.data.createrName,
              "contactEmail": vm.data.contactEmail,
              "contactPhone": vm.data.contactPhone,
              "guestAddress": vm.data.guestAddress,
              "guestBackground": vm.data.guestBackground,
              "guestDate": vm.data.guestDate,
              "guestDiscussContent": vm.data.guestDiscussContent,
              "guestEndDate": guestPercent,
              "guestOther": vm.data.guestOther,
              "guestParTotal": vm.data.guestParTotal,
              "guestPercent": vm.data.guestPercent,
              "guestTeacher": vm.data.guestTeacher,
              "part": vm.data.detailedAddress,
              "phoneCode": phoneCode,
              "status": status,
              "supportId": vm.supportId
            }).then(function (response) {
              if(response.success){
                vm.$vux.toast.show({text:'申请成功'}, 2000);
                setTimeout(function () {
                  vm.$router.go(-1);
                }, 2000)
              }else{
                vm.$vux.toast.show({text:'申请失败'})
              }
            }, function (response) {

            })
          }
        }


      }

    }
  }
  }
</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }
  .trainApply {
    width: 100%;
    background-color:white;
    min-height:100%;
    position:absolute;

  .btnClass {
    width: 95%;
    height: 3rem;
    margin: 2.5%;
    color: white;
    text-align: center;
    background-color: #E6A913;
    font-size: 1.4rem;
    line-height: 2.5;
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
    color:#333333;
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
    line-height: 3;
    font-size: 1.3rem;

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
    /*padding-top: 10px;*/
    color: #333333;
    font-size: 1.3rem;
  }

  .weui-cells {
    width: 18rem;
    display: inline-block;
    float: right;
    margin-top: 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .weui-cells:after {
    border-bottom: none;
  }

  .vux-cell-box:before {
    border-top: none;
  }
  .vux-popup-picker-value {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 13rem;
  }

  }

  .comment_up {
    margin-left: 1rem;
    position: relative;
    color: #333333;
  }

  .bottom {
    border-bottom: solid 1px #e5e5e5;
    border-left: none;
    border-top: none;
    border-right: none;
    width: calc(~"100% - 10px");
    height: 3.15rem;
    margin-left: 10px;
    outline: none;
    box-sizing: border-box;
    font-size: 1.3rem;
  }

  .two {
    border-bottom: solid 1px #e5e5e5;
    height: 3rem;
    background-color: #fff;
    margin-left: 10px;
    padding-bottom: 1.4rem;
    margin-top: 8px;
  }

  .two_middle {
    margin-top: 1.6rem;
    position: absolute;
    font-size: 1.3rem;

  }

  .two_right {
    margin-left: 88%;
    display: inline-block;
    margin-top: 1rem;
  }

  .product {
    background-color: white;
    margin-top: 2px;
    line-height: 2;
    padding-bottom: 0.5rem;
  }
  .other {
    margin-left: 15px;
    margin-top: 10px;

  span {
    font-size: 1.3rem;
    color: #333333;
  }

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

  .train {

  .other {
    margin-left: 15px;
    margin-top: 10px;

  span {
    font-size: 1.3rem;
    color: #333333;
  }

  }
  }

</style>
