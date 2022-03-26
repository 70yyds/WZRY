import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
import './globle.less'
import 'ant-design-vue/dist/antd.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
