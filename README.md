# Vue仿去哪儿H5项目
> 借着每天零碎的时间，终于跟着某课网的视频完成了vue仿去哪儿的小项目，通过这个项目的练手，对vue和组件化开发有了更深入的理解，本文就来梳理下整个项目开发中那些值得思考和学习的知识。

<!--more-->

项目启动流程
-------------
![Alt text][01]
[01]: ../assets/20190916/vue-start.jpg

多页应用 vs 单页应用
-------------
### 多页应用
+ 解释：页面跳转，返回一个新的HTML文件
+ 优点：首屏时间快，SEO效果好
+ 缺点：页面切换慢

### 单页应用
+ 解释：页面跳转，通过JS动态删除页面内容，再重新渲染
+ 优点：页面切换快
+ 缺点：首屏时间慢，SEO差

Fast Click 
-------------
### 作用
解决移动端点击300ms延迟的问题。

### 产生原因
移动浏览器上支持的双击缩放操作，以及IOS Safari 上的双击滚动操作，是导致300ms的点击延迟主要原因。

### 原理
FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。

### 使用
```
npm install fastclick --save

//main.js
import fastClick from 'fastclisk'
fastClick.attach(document.body)
```

### 不需要使用FastClick的情况
+ FastClick是不会对PC浏览器添加监听事件
+ Android版Chrome 32+浏览器，如果设置viewport meta的值为`width=device-width`，这种情况下浏览器会马上出发点击事件，不会延迟300毫秒。
+ 所有版本的Android Chrome浏览器，如果设置viewport meta的值有user-scalable=no，浏览器也是会马上出发点击事件。
+ IE11+浏览器设置了css的属性`touch-action: manipulation`，它会在某些标签（a，button等）禁止双击事件，IE10的为-ms-touch-action: manipulation

Stylus 依赖包 
-------------
### 使用方式
```
npm install stylus --save
npm install stylus-loader --save

<style lang="stylus" scoped></style>
```

### 优点
+ 可以使用缩进实现样式嵌套
+ 可以使用变量
+ 可以使用混合

vue-awesome-swiper 依赖包 
-------------
### 安装
```
npm install vue-awesome-swiper@2.6.7 --save
```

### 使用
```
//main.js
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
```

### 常用参数
|    Parameter   |    Type   |    Default   |    Description   |
|:-------|:------------|:-----------|:-----------|
|   direction  |     string    |    'horizontal'   |    Could be 'horizontal' or 'vertical' (for vertical slider)   |
|   speed  |     number    |    300   |    Duration of transition between slides (in ms)   |
|   loop  |     boolean    |    false   |    Set to true to enable continuous loop mode   |

### 常用组件
```
pagination: {
  el: '.swiper-pagination',
  type: 'bullets' 
  //Can be "bullets", "fraction", "progressbar" or "custom"
}
```

### 优化
+ 当 swiper 包裹的元素为图片时，为了防止图片加载较慢导致的回流 (reflow) 现象，建议在 swiper 外加一层 div ，并提前为其设置宽高。
+ 为了防止渲染的顺序与请求返回的数组顺序不一致，可以添加 `v-if` 条件，设置请求获得返回值时再进行页面渲染。

```
<div class="wrapper">
  <swiper :options="swiperOption" v-if="showSwiper">
    <!-- slides -->
    <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" />
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</div>

.wrapper
  width: 100%
  height: 0
  overflow: hidden
  padding-bottom: 26.5%
```

### 注意点
当 `swpier` 包裹元素几期父元素存在隐藏后显示情况时，会导致 swiper 计算出错，为了解决这一问题可以在 `swiperOptions` 里添加两个属性。
```
swiperOption: {
  pagination: '.swiper-pagination',
  paginationType: 'fraction',
  observeParents: true,
  observer: true
}
```
只要监听到该元素或其父元素DOM发生了变化，就会刷新页面，重新计算。

Axios 获取数据
-------------
### 安装
```
npm install axios --save
```

### 使用方法
```
import axios from 'axios'

data () {
  return {
    lastCity: '',
    swiperList: [],
    iconList: [],
    recommendList: [],
    weekendList: []
  }
},
methods: {
    getHomeInfo () {
      axios.get('/api/index.json').then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
      console.log(res)
    }
  },
  mounted () {
    this.getHomeInfo()
  }
```

在开发环境，可以模拟从后端返回的json数据，在 `static/mock/` 目录下放模拟的 JSON 文件。并在 `config/index.js -> ProxyTable` 中配置映射路径。

```
proxyTable: {
  '/api': {
    target: 'http://localhost:8080',
    pathRewrite: {
      '^/api': '/static/mock'
    }
  }
}
```

vue-router
-------------
### 解释
单页面复应用 (SPA) 的核心就是前端路由。路由切换时，切换的是 `<router-view>` 挂载的组件，其他内容不会变化。

### 安装
```
npm install vue-router --save

import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

### 基本使用
```
<router-link to="/">Go to Home</router-link>

routes: [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  }
]
```

### 动态路由匹配
我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。
```
routes: [
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }
],
```
一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`
```
params: {
  id: this.$route.params.id
}
```
当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，原来的组件实例会被复用，这意味着组件的生命周期钩子不会再被调用。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象。
```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

### 编程式的导航
除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。
+ router.push(location, onComplete?, onAbort?)
+ router.replace(location, onComplete?, onAbort?)
+ router.go(n)

### 导航守卫
导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
#### 全局前置守卫
当一个导航触发时，全局前置守卫按照创建顺序调用。
```
//main.js
router.beforeEach((to, from, next) => {
  // ...
})
```
每个守卫方法接收三个参数：
+ to: Route: 即将要进入的目标 路由对象
+ from: Route: 当前导航正要离开的路由
+ next: Function: 一定要调用该方法来 resolve 这个钩子。

#### 全局后置钩子
```
router.afterEach((to, from) => {
  // ...
})
```

#### 路由独享的守卫
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

#### 组件内的守卫
+ beforeRouteEnter
+ beforeRouteUpdate (2.2 新增)
+ beforeRouteLeave 

#### 完整的导航解析流程
- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 离开守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

### 滚动行为
使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
```
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

better-scroll 依赖包
-------------
### 安装使用
```
npm install better-scroll --save

import BScroll from 'better-scroll'
mounted () {
  this.scroll = new Bscroll(this.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
}
```

### 常用参数
+ startX: 0 (默认值:0) 表示X轴滚动的起始值
+ startY: 0 (默认值:0) 表示Y轴滚动的起始值
+ scrollY: false (默认值:false) 表示延Y轴滚动
+ scrollX: true (默认值:true) 表示延X轴滚动
+ freeScroll: false (默认值:false) 自由方向滚动
+ scrollbar: false (默认值:false) 滚动条
+ click: false (默认值:false) better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
+ tap: false (默认值:false) better-scroll 会阻止原生的 click 事件，我们可以设置 tap 为 true，它会在区域被点击的时候派发一个 tap 事件
+ mouseWheel: false (默认值:false) 这个配置用于 PC 端的鼠标滚轮，默认为 false 。当设置为 true 或者是一个 Object 的时候，可以开启鼠标滚轮

### 常用方法
#### refresh() 
重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
#### scrollTo(x, y, time, easing)
滚动到指定的位置;
+ x: X轴位置;
+ y: Y轴位置;
+ time: 到达指定位置所需时间，单位ms; 
+ easing: 动画函数(一般不建议修改)

#### scrollBy(x, y, time, easing)
相对于当前位置偏移滚动 x,y 的距离；
+ x: 当前位置偏移X轴的距离
+ y: 当前位置偏移Y轴的距离
+ time: 到达偏移位置所需时间，单位ms; 
+ easing: 动画函数(一般不建议修改)

#### scrollToElement(el, time, offsetX, offsetY, easing)
滚动到指定的目标元素
+ el: 目标元素;
+ time: 到达目标元素所需时间，单位ms; 
+ offsetX: 距离目标元素所偏移X轴的距离;设置为true时，到达目标元素中心位置
+ offsetY: 距离目标元素所偏移Y轴的距离;设置为true时，到达目标元素中心位置
+ easing: 动画函数(一般不建议修改)

vuex 实现数据共享
-------------
### 安装配置
```
npm install vuex --save

//main.js
import Vuex from 'vuex'
Vue.use(Vuex)
```

### 解释
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
Vuex 解决了以下问题：
+ 多个视图依赖于同一状态。
+ 来自不同视图的行为需要变更同一状态。

下图为 vuex 工作流程:

![Alt text][02]
[02]: ../assets/20190916/vuex.png

### 使用
每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

### 核心概念
#### State
由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态。每当 `this.$store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
```
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
可以使用 `mapState` 辅助函数帮助我们生成计算属性。
```
import { mapState } from 'vuex'

computed: {
  ...mapState(['city'])
}
```

#### Getter
Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

store.getters.doneTodos 
// -> [{ id: 1, text: '...', done: true }]
```
`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
```
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
    ])
  }
}
```

#### Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 `事件类型` (type) 和 一个 `回调函数` (handler)。
```
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}

store.commit('increment', {
  amount: 10
})
```
你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 store.commit 调用。
```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', 
      // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ])
  }
```

#### Action
Action 类似于 mutation，不同在于：
+ Action 提交的是 mutation，而不是直接变更状态。
+ Action 可以包含任意异步操作。

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

store.dispatch('increment')
```
我们可以在 action 内部执行异步操作。
```
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}

store.dispatch('actionA').then(() => {
  // ...
})
```

#### Module
Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

LocalStorage 使用
-------------
```
let defaultCity = '杭州'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}
```

Keep-alive
-------------
### 简介
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

### 用法
```
<keep-alive>
  <router-view>
    <!-- 该组件将被缓存！ -->
  </router-view>
</keep-alive>
```

### 参数
+ include - 字符串或正则表达，只有匹配的组件会被缓存
+ exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存

### 使用
```
export default {
  name: 'a',
  data () {
    return {}
  }
}

<keep-alive exclude="a">
  <router-view>
    <!-- 除了 name 为 a 的组件都将被缓存！ -->
  </router-view>
</keep-alive>可以保留它的状态或避免重新渲染
```

### 钩子函数
当组件中 `<router-view>` 内被切换，它的 `activatied` 和`deactivated` 这两个生命周期钩子函数将会被执行，同时，被缓存的页面， `mounted` 钩子将只在第一次请求时被执行。
+ activated：keep-alive 组件激活时调用。
+ deactivated：keep-alive 组件停用时调用。

递归组件的使用
-------------
```
<div>
  <div class="item" v-for="(item, index) of list" :key="index">
    <div class="item-title border-bottom">
      <span class="item-title-icon"></span>
      {{item.title}}
    </div>
    <div v-if="item.children" class="item-children">
      <detail-list :list="item.children"></detail-list>
    </div>
  </div>
</div>
```

添加动画效果
-------------
```
<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'Fade'
}
</script>

<style lang="stylus" scoped>
.v-enter, .v-leave-to
  opacity: 0
.v-enter-active, .v-leave-active
  transition: opacity .5s
</style>
```

项目打包上线
-------------
```
npm run build
```
`dist` 目录为打包好的文件。

项目目录解读
-------------
```
├── index.html
├── main.js
├── static
│   └── mock             # 模拟JSON数据
├── assets               # 静态资源
│   ├── style 
│   └── pic 
├── common               # 共用全局组件
│   ├── fade 
│   └── gallary
├── pages                # 每个页面划分成一个组件
│   ├── city             # 页面内部再划分小组件
│   │   ├── component
│   │   └── City.vue
│   ├── detail  
│   │   ├── component
│   │   └── Detail.vue
│   └── home
│       ├── component
│       └── Home.vue
├── router   
│   └── index.js          # 路由配置
└── store
    ├── index.js          # 组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       
        └── products.js   
```

CSS技巧
-------------
### 垂直居中
```
//单个元素
line-height == height

//父元素内子元素居中
display: flex
flex-direction: column
justify-content: center
```

### 响应式大小
在静态CSS文件中设置 `font-size` 对应的像素值，使用 `rem` 动态获得实际像素。

### 元素间距
`inline-block` 显示的元素之间，会存在2px的间距，为了取消这个间距，可以设置父元素的 `font-size` 为 0 。

### stylus变量
```
// assets/styles -> varibles.styl
$bgColor = #00bcd4
$darkTextColor = #333
$headerHeight = .86rem

//xxx.vue
@import '~styles/varibles'

line-height: $headerHeight
background: $bgColor
```

### stylus混合
```
// assets/styles -> mixins.styl
ellipsis()
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

//xxx.vue
@import '@~styles/mixins.styl';

.item-title
  line-height: .54rem
  font-size: .32rem
  ellipsis()
```

代码优化
-------------
### 路径别名
有时候路径名过长，在引入的过程较为不便，所以我们可以通过更改配置项，为路径添加别名。
```
//build -> webpack.base.config.js
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    'styles': resolve('src/assets/styles'),
    'common': resolve('src/common'),
  }
}

@import '@~styles/mixins.styl';
```

### 函数节流
对于某些高频事件，我们可以通过函数节流的方法，限制频率，从而达到节约性能的效果。
```
keyword () {
  if (this.timer) {
    clearTimeout(this.timer)
  }
  if (!this.keyword) {
    this.list = []
    return
  }
  this.timer = setTimeout(() => {
    const result = []
    for (let i in this.cities) {
      this.cities[i].forEach((value) => {
        if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
          result.push(value)
        }
      })
    }
    this.list = result
  }, 100)
}
```

### 全局事件的绑定与解绑
有时我们会在子组件里对全局事件做绑定，但是为了不影响到其它页面，我们应该在合适的时间取消对全局事件的绑定，该操作分为两种情况。
+ 在使用keep-alive对页面做缓存时：在 `activated` 钩子函数里绑定 全局事件，在 `deactivated` 函数里解绑。
+ 在不使用keep-alive对页面做缓存时：在 `mounted` 钩子函数里绑定 全局事件，在 `beforeDestory` 函数里解绑。

总结
-------------
至此，vue仿去哪儿项目的学习总结就结束了。写一百个项目，不如深入理解学习一个项目，并从中吸取经验，项目虽小，但收获颇多。有关项目的更深入理解，等我研究了vue的源码后再继续补充。