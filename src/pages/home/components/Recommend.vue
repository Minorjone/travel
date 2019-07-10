<template>
  <div class="recommend">
    <div class="title">热销推荐</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
        <img class="item-img" :src="item.imgUrl" />
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommend',
  data () {
    return {
      recommendList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1907/40/401b7b735008f7f4a3.img.jpg_200x200_10ce515e.jpg',
        title: '西溪国家湿地公园',
        desc: '美若仙境，《非诚勿扰》取景地'
      }, {
        id: '0002',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1603/e6/e646f4221574cc2a90.water.jpg_200x200_d9b6cabd.jpg',
        title: '双溪竹海漂流',
        desc: '江南惊险漂流，水清、竹多、落差大'
      }, {
        id: '0003',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1907/f7/f79edee59782fc4ba3.water.jpg_200x200_dece4a5d.jpg',
        title: '宋城千古情',
        desc: '世界三大名秀之一，杭州宋城的灵魂'
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
  .item
    display: flex
    height: 1.9rem
    overflow: hidden
    .item-img
      width: 1.7rem
      height: 1.7rem
      padding: .1rem
    .item-info
      flex: 1
      padding: .1rem
      min-width: 0
      .item-title
        line-height: .54rem
        font-size: .32rem
        ellipsis()
      .item-desc
        line-height: .4rem
        color: #ccc
        ellipsis()
      .item-button
        line-height: .44rem
        margin-top: .16rem
        background: #ff9300
        padding: 0 .1rem
        border-radius: .06rem
        color: #fff
</style>
