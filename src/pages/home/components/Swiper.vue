<template>
  <div class="wrapper">
    <swiper :options="swiperOption" >
        <!-- slides -->
        <swiper-slide v-for="item of swiperList" :key="item.id">
            <img class="swiper-img" :src="item.url" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      swiperList: [{
        id: '0001',
        url: 'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/d7bbc21db442366a882e04ddc984669a.jpg_750x200_85e640d9.jpg'
      }, {
        id: '0002',
        url: 'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20197/f4168ba20e0f5218ed83e743efd802b2.jpg_750x200_53edd3a0.jpg'
      }]
    }
  }
}
</script>
<style lang='stylus' scoped>
.wrapper >>> .swiper-pagination-bullet-active
    background: #fff !important
.wrapper
    width: 100%
    height: 0
    overflow: hidden
    padding-bottom: 26.5%
    background: #eee
    .swiper-img
        width: 100%
</style>
