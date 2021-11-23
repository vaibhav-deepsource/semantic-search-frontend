import Vue from 'vue';
import App from './App.vue';
import { Input, Button, Field } from 'buefy';
import 'buefy/dist/buefy.css';

import 'windi.css';
import router from './router';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Input);
Vue.use(Button);
Vue.use(Field);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
