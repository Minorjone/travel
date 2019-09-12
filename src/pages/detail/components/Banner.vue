<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" src="//img1.qunarzz.com/sight/p0/1412/79/522273acf9c21ad5083144b4985771df.water.jpg_600x330_4cbe1f7a.jpg" />
      <div class="banner-info">
        <div class="banner-tittle">西溪国家湿地公园·周家村(AAAAA景区)</div>
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe674;</span>11
        </div>
      </div>
    </div>
    <common-gallary :imgs="imgs" v-show="showGallary" @close="handleGallaryClose"></common-gallary>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
export default {
  name: 'Banner',
  data () {
    return {
      imgs: ['http://img1.qunarzz.com/sight/p0/1907/aa/aa4500ed427eee05a3.img.jpg_r_800x800_262436e7.jpg', 'http://img1.qunarzz.com/sight/p0/1907/a3/a3db37eabbca5e08a3.img.jpg_r_800x800_9825d978.jpg'],
      showGallary: false
    }
  },
  components: {
    CommonGallary
  },
  methods: {
    handleBannerClick () {
      this.showGallary = true
    },
    handleGallaryClose () {
      this.showGallary = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.banner
  overflow: hidden
  height: 0
  padding-bottom: 50%
  position: relative
  .banner-img
    width: 100%
  .banner-info
    display: flex
    position: absolute
    left: 0
    right: 0
    bottom: 0
    line-height: .6rem
    color: #fff
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
    .banner-tittle
      flex: 1
      font-size: .32rem
      padding: 0 .2rem
    .banner-number
      margin-top: .14rem
      padding: 0 .4rem
      line-height: .32rem
      height: .32rem
      font-size: .24rem
      border-radius: .2rem
      background: rgba(0, 0, 0, .8)
      .banner-icon
        font-size: .24rem
</style>
