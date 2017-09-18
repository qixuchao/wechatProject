<template>
  <div class="events">
    <div v-html="detail.content">
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  data(){
  return{
    detail:{}

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
    document.setTitle('优惠详情');
  }, 1);
},
mounted(){
  var vm=this;
  var detail=vm.$store.getters.getDiscount;
  vm.$post('/api/article/detail',{
    'articleId':detail.noticeId
  }).then(function(response){
    vm.detail=response;

  },function(response){
    console.log("接口出错了");
  })


},
methods:{

}

}
</script>

<style lang="less">
  * {
    padding: 0px;
    margin:0px;
  }

  .events{
  min-height: 100%;
  position: absolute;
  width: 100%;
  padding:1rem;
  box-sizing:border-box;

  img{
    width: 100%;
    height:200px;
  }

}
</style>
