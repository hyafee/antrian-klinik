<script>
import axios from 'axios';

export default {
    data() {
        return {
            imgDokter: '',
            namaDokter: '',
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                this.$store.commit('setLoadingHeader', true);

                const response = await axios.get('http://127.0.0.1:8000/api/dokter/detail');

                // Assuming your API response structure has a 'number' property
                this.namaDokter = response.data.data.name;
                this.imgDokter = response.data.data.profile_image;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            this.$store.commit('setLoadingHeader', false);
        }
    }
};
</script>
<template>
    <div class="sticky top-0 flex justify-between items-center text-white font-bold text-xs">
        <div class="flex items-center">
            <div class="w-11 h-11">
                <img class="rounded-full bg-green-light w-full h-full" :src="imgDokter" alt="">
            </div>
            <p class="ml-2">{{ namaDokter }}</p>
        </div>
        <div>
            <p>Dokter Umum</p>
        </div>
    </div>
</template>
