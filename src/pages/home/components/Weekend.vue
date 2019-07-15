<template>
  <div class="recommend">
    <div class="title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
        <div class="item-img-wrapper">
          <img class="item-img" :src="item.imgUrl" />
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeWeekend',
  data () {
    return {
      recommendList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1811/52/b6776b49d27025.jpg_r_640x214_35ae205c.jpg',
        title: '美丽普陀山',
        desc: '人间仙境杭州，佛教圣地普陀山等你来玩！在这里静心接收佛家的洗礼，用心感受佛文化'
      }, {
        id: '0002',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1505/4e/3e87ee62e59cdb.jpg_r_640x214_fe6cc902.jpg',
        title: '杭州必打卡',
        desc: '杭州，前世今生与你有一场美丽约会'
      }, {
        id: '0003',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1505/c1/1178c5696fcf57.jpg_r_640x214_a69542c6.jpg',
        title: '杭州江南古镇',
        desc: '古镇岂只有新叶？悠闲出游杭州古镇'
      }]
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '@~styles/mixins.styl';
.recommend
  background: #fff
  .title
    margin-top: .2rem
    line-height: .4rem
    padding: .2rem
    font-size: .32rem
  .item-img-wrapper
    height: 0
    overflow: hidden
    padding-bottom: 33.9%
    .item-img
      width: 100%
  .item-info
    padding: .14rem .2rem
    .item-title
      line-height: .48rem
      font-size: .28rem
      ellipsis()
    .item-desc
      line-height: .42rem
      font-size: .24rem
      color: #616161
      ellipsis()
</style>
