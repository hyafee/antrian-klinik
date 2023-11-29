<template>
    <div class="w-11/12 bg-white rounded text-green-dark font-bold mx-auto mt-5 shadow">
        <div class="p-5 bg-green-light rounded-t">
            <p class="text-base text-center text-white">NOMOR ANTRIAN ANDA</p>
        </div>
        <hr class="opacity-50">
        <p class="p-10 text-7xl text-center">{{ nomorAntrian }}</p>
        <hr class="opacity-50">
        <p v-if="selisih > 0" class="p-2.5 text-xs text-center font-normal">Menunggu <span class="font-bold">{{ selisih
        }}</span> Pasien</p>
        <p v-if="selisih == 0" class="p-2.5 text-xs text-center font-normal">Sekarang adalah giliran <span
                class="font-bold">Anda</span> untuk diperiksa</p>
        <p v-if="selisih < 0" class="p-2.5 text-xs text-center font-normal">Giliran anda sudah <span
                class="font-bold">Terlewat,</span> apabila anda belum diperiksa <span class="font-bold"> Segera
                Konfirmasi</span> ke petugas yang ada</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            nomorAntrian: null,
            nomorAntrianNow: null
        };
    },
    mounted() {
        this.loadAntrianData();
        this.loadAntrianNow();
    },
    computed: {
        selisih() {
            const hasil = this.nomorAntrian - this.nomorAntrianNow;
            return hasil;
        }
    },
    methods: {
        async loadAntrianData() {
            const apiUrl = 'http://127.0.0.1:8000/api/pasien/search';

            const patientData = localStorage.getItem('antrianData');
            const parsedData = JSON.parse(patientData);

            axios.get(apiUrl, {
                params: {
                    id: parsedData.data.id,
                },
            })
                .then(response => {
                    console.log(response.data.data.queue_number);
                    if (response.status == 200) {
                        this.nomorAntrian = response.data.data.queue_number;
                        if (response.data.data.status_pemeriksaan == "Sudah Diperiksa") {
                            localStorage.removeItem('antrianData');
                        }
                    }
                })
                .catch(error => {
                    this.errorMessage = error.response ? error.response.data.message : error.message;
                });
        },
        async loadAntrianNow() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/antrian/now');
                const responseData = await response.json();

                this.nomorAntrianNow = responseData.data.queue_number_now;
            } catch (error) {
                console.error('Error fetching latest queue number:', error);
            }
        },
    }
};
</script>
