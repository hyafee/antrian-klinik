import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';

// Fetch data from the API endpoint
axios.get('http://127.0.0.1:8000/api/clinic/detail')
    .then(response => {
        // Update the document title with the fetched data
        document.title = response.data.data.name_app;
    })
    .catch(error => {
        console.error('Error fetching app title:', error);
    });


const app = createApp(App)

app.use(store);

app.use(router)

app.mount('#app')
