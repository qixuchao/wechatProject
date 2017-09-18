<template>
  <div class="addProduct">
    <div class="imgRow">
      <div class="product" @click="addProduct(1)">
        <img :src="product1" alt="">
        <div v-if="name1!=='添加产品1'" @click.stop="deleteProduct('product1')">
         <img  class="delete" :src="delet" alt="">
        </div>
        <span>{{name1}}</span>
      </div>
      <div class="compare">
        <img :src="product" alt="">
      </div>
      <div class="product" style="left: 4vw;" @click="addProduct(2)">
        <img :src="product2" alt="">
        <div v-if="name2!=='添加产品2'" @click.stop="deleteProduct('product2')">
          <img class="delete" :src="delet" alt="">
        </div>
        <span>{{name2}}</span>
      </div>
    </div>
    <div class="footBar" :style="isShowBar?'background: #E6A914':'background: #f7e5b8;pointer-events: none'" @click="goPage('reference')">
      下一步
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default{
    data(){
      return{
        product1:require('../../assets/img/addProduct.png'),
        product2:require('../../assets/img/addProduct.png'),
        product:require('../../assets/img/VS_addProduct@3x.png'),
        delet:require('../../assets/img/delete.png'),
        name1:'添加产品1',
        name2:'添加产品2',
        attSetId1:null,
        attSetId2:null,
        isProduct:this.$store.state.passParam
      }
    },
    methods:{
      addProduct:function(type){
        let itemId ='';
        if(type ===1&&this.$store.state.passParam.product2&&this.$store.state.passParam.product2.itemId){
          itemId = this.$store.state.passParam.product2.itemId
        }else if(type ===2&&this.$store.state.passParam.product1&&this.$store.state.passParam.product1.itemId){
          itemId = this.$store.state.passParam.product1.itemId;
        }
        let attSetId = null;
        if(this.attSetId1 === null&&this.attSetId2 === null){
          attSetId = null;
        }else{
          attSetId = this.attSetId2 === null?this.attSetId1:this.attSetId2;
        }
        this.$router.push({name:'addCompare',query:{type:type,attSetId:attSetId,itemId:itemId}});
      },
      deleteProduct(product){
        if(product ==='product1'){
          this.product1 = require('../../assets/img/addProduct.png');
          this.name1 = '添加产品1';
          this.attSetId1 = null;
          this.$store.commit('passParam',{product1:{},product2:this.$store.state.passParam.product2});
        }else{
          this.product2 = require('../../assets/img/addProduct.png');
          this.name2 = '添加产品2';
          this.attSetId2 = null;
          this.$store.commit('passParam',{product1:this.$store.state.passParam.product1,product2:{}});
        }
      },
      goPage(page){
        this.$router.push({name:page});
      }
    },
    computed:{
      isShowBar(){
        return (this.$store.state.passParam.product1&&this.$store.state.passParam.product1.img)&&(this.$store.state.passParam.product2&&this.$store.state.passParam.product2.img);
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
      };
      document.body.appendChild(i);
    };

    setTimeout(function(){
      document.setTitle('产品对比');
    }, 1);
      if (window.localStorage.wechatOpenid !==window.localStorage.openid) {
      } else {
        if (this.$store.state.passParam.product1&&this.$store.state.passParam.product1.img!==undefined) {
          this.product1 = this.$store.state.passParam.product1.img;
          this.name1 = this.$store.state.passParam.product1.itemName;
          this.attSetId1 = this.$store.state.passParam.product1.attSetId;
        }
        if (this.$store.state.passParam.product2&&this.$store.state.passParam.product2.img!==undefined) {
          this.product2 = this.$store.state.passParam.product2.img;
          this.name2 = this.$store.state.passParam.product2.itemName;
          this.attSetId2 = this.$store.state.passParam.product2.attSetId;
        }
      }
    }
  }
</script>

<style lang="scss">
    /*@import "../../assets/css/common.scss";*/
    .addProduct{
      width: 100%;
      position: absolute;
      background: white;
      min-height: 100%;
      div{
        display: inline-block;
      }
      .imgRow{
        width: 80%;
        position: relative;
        margin-left: 10%;
        margin-top: 35%;
        display: flex;
        align-items: center;
        .product{
          position: relative;
          width: 30vw;
          height: 30vw;
          text-align: center;
          img{
            width: 90%;
            height: 90%;
          }
          .delete{
            position: absolute;
            width: 30px;
            height: 30px;
            margin-left: -5vw;
            margin-top: -31vw;
          }
          span{
            display: block;
          }
        }
        .compare{
          width: 15vw;
          img{
            width:100%
          }
        }
      }
    .footBar{
      width: 90%;
      text-align: center;
      margin-left: 5%;
      margin-top: 90px;
      line-height: 45px;
      font-size: 1.6rem;
      color: white;
      border-radius: 5px;
    }
    }
</style>
