import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/home/Home'
import City from '@/pages/city/City'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/city',
      name: 'City',
      component: City
    }
  ]
})
