// store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            loadingAbout: false,
            loadingAntrian: false,
            loadingHeader: false,
        };
    },
    mutations: {
        setLoadingAbout(state, value) {
            state.loadingAbout = value;
        },
        setLoadingAntrian(state, value) {
            state.loadingAntrian = value;
        },
        setLoadingHeader(state, value) {
            state.loadingHeader = value;
        },
    },
});

export default store;
