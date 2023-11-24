<script>
import axios from 'axios';

export default {
    data() {
        return {
            nomorAntrian: null,
            totalAntri: null,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.$store.commit('setLoadingAntrian', true);

            try {
                await this.fetchNomorAntrian();
                await this.fetchTotalAntri();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            this.$store.commit('setLoadingAntrian', false);
        },
        async fetchNomorAntrian() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/antrian/now');
                this.nomorAntrian = response.data.data.queue_number_now;
            } catch (error) {
                this.nomorAntrian = 0;
                console.error('Error fetching nomorAntrian:', error);
            }
        },
        async fetchTotalAntri() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/antrian/total');
                this.totalAntri = response.data.data.total_patients;
            } catch (error) {
                console.error('Error fetching totalAntri:', error);
            }
        }
    }
};
</script>

<template>
    <div class="w-11/12 bg-white rounded text-green-dark font-bold mx-auto mt-5 shadow">
        <div class="p-5 bg-green-light rounded-t">
            <p class="text-base text-center text-white">ANTRIAN SAAT INI</p>
        </div>
        <hr class="opacity-50">
        <p class="p-10 text-7xl text-center">{{ nomorAntrian }}</p>
        <hr class="opacity-50">
        <p class="p-2.5 text-xs text-center">{{ totalAntri }} <span class="font-normal"> Pasien sudah mendaftar</span></p>
    </div>
</template>
