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

    <div v-show="detail" @click="closeDetail"
        class="absolute top-0 left-0 w-screen min-h-screen bg-black/70 flex justify-center items-center z-20 overflow-hidden">
        <div id="detailCard" class="bg-white text-green-dark h-fit rounded w-11/12">
            <div class="header font-bold text-sm rounded-t bg-green-light p-5 text-white text-center">INFORMASI DATA
                PASIEN
            </div>
            <div class="px-5 my-2 flex flex-col gap-1 font-bold">
                <div class="flex justify-between py-1">
                    <p>Nama Lengkap: </p>
                    <p>{{ nama }}</p>
                </div>
                <hr class="opacity-20">
                <div class="flex justify-between py-1">
                    <p>Alamat: </p>
                    <p>{{ alamat }}</p>
                </div>
                <hr class="opacity-20">
                <div class="flex justify-between py-1">
                    <p>Umur: </p>
                    <p>{{ umur }}</p>
                </div>
                <hr class="opacity-20">

                <div class="flex justify-between py-1">
                    <p>Jenis Kelamin: </p>
                    <p>{{ jenis_kelamin }}</p>
                </div>
                <hr class="opacity-20">

                <div class="flex justify-between py-1">
                    <p>No. Antrian: </p>
                    <p>{{ nomorAntrian }}</p>
                </div>
            </div>
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
            this.detail = true;
            this.disableScroll();
            this.scrollToTop();
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        closeDetail() {
            this.detail = false;

            this.enableScroll();

        }, disableScroll() {
            document.body.style.overflow = 'hidden';
        },

        enableScroll() {
            document.body.style.overflow = 'auto';
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
                    console.log(response.data.data.queue_number);
                    if (response.status == 200) {
                        this.nama = response.data.data.name;
                        this.alamat = response.data.data.address;
                        this.umur = response.data.data.old;
                        this.jenis_kelamin = response.data.data.gender;
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
