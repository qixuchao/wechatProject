<template>
  <div class="bondDetail">
    <div class="first">
      <div class="bondTitle">{{detail.itemName}}</div>
      <div class="bondCode">(股票代码：{{detail.attribute50}})</div>
      <div  class="middle_forth">
      <img class="img" :src="detail.pictureFilePath" />
      <div class="middle_sixth"> <div class="middle_fifth">债券年期：</div><div class="middle_tenth">{{detail.attribute51}}</div></div>
      <div class="middle_sixth"> <div class="middle_fifth">派息周期： </div><div class="middle_tenth">{{detail.attribute53}}</div></div>
      <div class="middle_sixth"> <div class="middle_fifth">年利息：</div><div class="middle_tenth">{{detail.attribute52}}</div></div>
      <div class="middle_sixth"> <div class="middle_fifth">市值：</div><div class="middle_tenth"> {{detail.attribute54}}</div></div>
      <div class="middle_sixth"> <div class="middle_fifth">认购费： </div><div class="middle_tenth">{{detail.attribute56}}</div></div>
      <div class="middle_sixth"> <div class="middle_fifth">托管费： </div><div class="middle_tenth"> {{detail.attribute55}}</div></div>
      </div>
    </div>

    <div class="second">
      <div class="second_left"></div><div class="second_right">产品亮点</div>
    </div>
    <div class="detail" v-for="item in attGroupList">
      <span style="letter-spacing: 2px">{{item.attName}}：{{detail1[item.fieldCode.toLowerCase()]}}</span>
    </div>
    <!--<div class="detail" v-for="item in attGroupList">-->
      <!--<span class="detail_left">{{item.attName}}：</span><span class="detail_right">{{detail1[item.fieldCode.toLowerCase()]}}</span>-->
    <!--</div>-->

    <div style="position: fixed;height: 5rem;background-color: white;bottom: 0;width: 100%">
      <div class="footer" @click="goPage">产品资料</div>
    </div>
    <!--<div class="footer" @click="goPage">产品资料</div>-->

</div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        detail:{},
        detail1:{},
        attGroupList:[],
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
      document.setTitle('债券详情');
    }, 1);
  },
  mounted(){
    var vm=this;
    vm.detail=vm.$store.getters.getProduct;
    vm.$vux.loading.show({text: 'loading'});
    vm.$post('/api/production/detail',{
      "itemId":vm.detail.itemId
    }).then(function(response) {
      vm.$vux.loading.hide();
      vm.detail1 = response.rows[0];
      for(let i in vm.detail1.prdAttributeSetLine){
        if(vm.detail1.prdAttributeSetLine[i].displayFlag==="Y"&&vm.detail1[vm.detail1.prdAttributeSetLine[i].fieldCode.toLowerCase()]!=null&&vm.detail1[vm.detail1.prdAttributeSetLine[i].fieldCode.toLowerCase()]!=''){
          vm.attGroupList.push(vm.detail1.prdAttributeSetLine[i]);
        }
      }
    }, function (response) {

    });



  },
  methods:{

    goPage:function(){
      var vm=this;
      vm.$router.push({path:'/productImformation'});
    }
  },
  destroyed(){
    this.$vux.loading.hide();
  }



  }

</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }

  .bondDetail{
    width: 100%;
    position:absolute;
    min-height: 100%;
    background-color: white;
    margin-bottom:5rem;

.first{
  min-height: 30%;
  margin-top: 12px;

}

  .bondTitle{
    display: inline-block;
    position: relative;
    font-size: 1.6rem;
    margin-left:10px;
  }
  .bondCode{
    position: relative;
    font-size: 1.3rem;
    margin-left: 10px;
    margin-top: 2px;

  }
.middle_forth{
  text-align:justify;
  /*text-align-last:justify;*/
  display: inline-block;
  width:100%;
  min-height:10rem;
  margin-top: 12px;
  font-size: 1.3rem;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.16);

}

.img {
  position: absolute;
  margin-left: 10px;
  /*margin-top: 12px;*/
  height: 90px;
  width: 90px;
}
.middle_sixth {
  display: flex;
  display: -webkit-flex;
  padding-top: 5px;
}

.middle_fifth {
  position: relative;
  display: inline-block;
  margin-left: 110px;
  text-align-last: justify;
  font-size: 1.3rem;
  color: #666666;
  min-width: 7rem;
}


.middle_tenth {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.3rem;
  color: #666666;
  width: calc(~"100% - 6rem - 110px");
  word-wrap: break-word;
}

  .shadow{
    width: 100%;
    height:0.5rem;
    background-color: #F4F4F7;
  }
  .second{
    display: flex;
    display: -webkit-flex;
    width: 100%;
    margin-top: 5px;
  }
  .second_left{
    display: inline-block;
    position: relative;
    width: 0.5rem;
    height:3rem;
    background:#E5B33E ;
    margin-left: 1rem;
  }
  .second_right{
    display: inline-block;
    position: relative;
    font-size: 1.7rem;
    margin-top: 0.5rem;
    margin-left: 1rem;
    height:2rem;
  }
  .detail {
    background-color: white;
    display: flex;
    display: -webkit-flex;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .detail_left {
    background-color: white;
    display: inline-block;
    position: relative;
    font-size: 1.3rem;
    min-width: 6rem;
    text-align-last: justify;
    margin-left: 1rem;
    line-height: 2;

  }

  .detail_right {
    background-color: white;
    display: inline-block;
    position: relative;
    font-size: 1.3rem;
    line-height: 2;
  }
  /*.footer{*/
    /*position: fixed;*/
    /*font-size:1.3rem ;*/
    /*color:#E5B33E;*/
    /*height:2rem;*/
    /*border:solid 1px #E5B33E;*/
    /*text-align: center;*/
    /*width:90%;*/
    /*bottom:0;*/
    /*padding: 0.5rem;*/
    /*line-height: 2;*/
    /*margin-left: 1rem;*/
  /*}*/
  .footer{
    margin: 1rem;
    border-radius: 5px;
    height: 2rem;
    text-align: center;
    padding-top: 1rem;
    color: #E5B33E;
    border:solid 1px #E5B33E;
    font-size: 1.7rem;
    position: fixed;
    bottom:0;
    width:93%;
    line-height: 1;
    background-color: white;
  }
}

</style>
