<template>
    <div class="w-11/12 bg-white rounded text-green-dark font-bold mx-auto mt-5 shadow">
        <div class="p-5 bg-green-light rounded-t">
            <p class="text-base text-center text-white">NOMOR ANTRIAN ANDA</p>
        </div>
        <hr class="opacity-50">
        <p class="p-10 text-7xl text-center">{{ nomorAntrian }}</p>
        <hr class="opacity-50">
        <div class="flex justify-between px-5 py-2.5">
            <p v-if="selisih > 0" class=" text-xs text-center font-normal">Menunggu <span class="font-bold">{{ selisih
            }}</span> Pasien</p>
            <p v-if="selisih == 0" class="text-xs text-center font-normal">Sekarang adalah giliran <span
                    class="font-bold">Anda</span> untuk diperiksa</p>
            <button @click="showDetail" class="underline">Detail ></button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            nama: '',
            alamat: '',
            umur: '',
            jenis_kelamin: '',
            nomorAntrian: null,
            nomorAntrianNow: null,
            detail: false,
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
        },
    },
    methods: {
        showDetail() {
            this.$swal.fire({
                title: 'Data Pasien',
                html: `<div class="px-5 my-2 flex flex-col gap-1 font-bold text-sm">
                <div class="flex justify-between py-1">
                    <p>Nama Lengkap: </p>
                    <p>${this.nama}</p>
                </div>
                <hr class="opacity-20">
                <div class="flex justify-between py-1">
                    <p>Alamat: </p>
                    <p>${this.alamat}</p>
                </div>
                <hr class="opacity-20">
                <div class="flex justify-between py-1">
                    <p>Umur: </p>
                    <p>${this.umur}</p>
                </div>
                <hr class="opacity-20">

                <div class="flex justify-between py-1">
                    <p>Jenis Kelamin: </p>
                    <p>${this.jenis_kelamin}</p>
                </div>
                <hr class="opacity-20">

                <div class="flex justify-between py-1">
                    <p>No. Antrian: </p>
                    <p>${this.nomorAntrian}</p>
                </div>
                <hr class="opacity-20">

            </div>`,
                icon: 'info',
                iconColor: '#337F89',
                confirmButtonColor: '#009688',
                timerProgressBar: true,
                allowOutsideClick: true,
            })
        },
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
                    if (response.status == 200) {
                        if (response.data.data.status_pemeriksaan == "Sudah Diperiksa") {
                            localStorage.removeItem('antrianData');
                        } else {
                            this.nama = response.data.data.name;
                            this.alamat = response.data.data.address;
                            this.umur = response.data.data.old;
                            this.jenis_kelamin = response.data.data.gender;
                            this.nomorAntrian = response.data.data.queue_number;
                        }
                    } else {
                        localStorage.removeItem('antrianData');
                    }
                })
                .catch(error => {
                    localStorage.removeItem('antrianData');
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
