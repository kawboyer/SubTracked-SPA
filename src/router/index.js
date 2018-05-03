import Vue from 'vue'
import Router from 'vue-router'
import Footer from '@/components/layout/Footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Footer',
      component: Footer
    }
  ]
})
