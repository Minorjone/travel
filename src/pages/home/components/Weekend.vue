<template>
  <div class="recommend">
    <div class="title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for="item of list" :key="item.id">
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
  props: {
    list: Array
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
