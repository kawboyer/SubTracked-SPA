import Vue from 'vue'
import Router from 'vue-router'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Signup from '@/components/auth/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/footer',
    //   name: 'Footer',
    //   component: Footer
    // },
    {
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Navbar',
      component: Navbar
    }
  ]
})
