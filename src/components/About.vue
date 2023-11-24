<script>
import axios from 'axios';

export default {
    data() {
        return {
            hariBuka: '',
            jamBuka: '',
            alamat: '',
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.$store.commit('setLoadingAbout', true);

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/clinic/detail');
                // Assuming response.data.data contains the required information
                this.hariBuka = response.data.data.days_operational;
                this.jamBuka = response.data.data.hours_operational;
                this.alamat = response.data.data.address;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            this.$store.commit('setLoadingAbout', false);
        },
    },
};
</script>

<template>
    <div>
        <div class="w-full rounded bg-green-dark text-white text-center text-xs">
            <p class="font-bold text-sm pt-5">INFORMASI KLINIK</p>
            <div class="mt-5">
                <p>Buka Hari <span class="font-bold">{{ hariBuka }}</span></p>
                <p>Pukul <span class="font-bold">{{ jamBuka }}</span> WIB</p>
            </div>
            <p class="py-5">{{ alamat }}</p>
        </div>
    </div>
</template>
