import Vue from 'vue'
import App from './App'
import store from './store'
import request from 'common/request.js'

Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.prototype.$get = request.get
Vue.prototype.$post = request.post
Vue.prototype.$put = request.put

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
