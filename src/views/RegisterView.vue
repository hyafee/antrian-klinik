<script setup>
import Loading from '../components/Loading.vue'

</script>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loading: false,
            status: null
        };
    },
    methods: {
        async daftarPasien() {
            this.loading = true;
            if (
                !this.$refs.nama.value.trim() ||
                !this.$refs.alamat.value.trim() ||
                !this.$refs.umur.value.trim() ||
                !document.querySelector('input[name="jenis_kelamin"]:checked')
            ) {
                this.loading = false;
                return;
            }

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/antrian/take', {
                    name: this.$refs.nama.value,
                    address: this.$refs.alamat.value,
                    old: this.$refs.umur.value,
                    gender: document.querySelector('input[name="jenis_kelamin"]:checked').value
                });

                localStorage.setItem('antrianData', JSON.stringify(response.data));

                this.$swal.fire({
                    title: 'Berhasil!',
                    text: 'Pendaftaran berhasil, nomor antrian anda ' + response.data.data.queue_number,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    allowOutsideClick: true,
                    isConfirmed: this.$router.push({ path: '/waiting' })
                })

            } catch (error) {
                this.$swal.fire({
                    title: 'Gagal!',
                    text: 'Maaf saat ini klinik sedang tutup',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    allowOutsideClick: true,
                    isConfirmed: this.$router.push({ path: '/' })
                })
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>


<template>
    <div v-if="loading">
        <Loading />
    </div>
    <div v-if="status == 'success'"
        class="absolute z-10 top-0 left-0 w-screen h-screen bg-white flex justify-center items-center">
        <div class="flex flex-col items-center gap-16">
            <img src="@/assets/images/success.svg" alt="" class="w-8/12">
            <div class="text-center">
                <p class="text-green-dark text-xl font-bold">PENDAFTARAN BERHASIL</p>
                <p class=" mt-3 text-sm text-green-dark">Pendaftaran telah berhasil dilakukan, silahkan datang ke klinik
                    untuk diperiksa</p>
            </div>
            <router-link to="/waiting" class="w-full flex justify-center">
                <button class="w-1/2 py-2 bg-green-light text-white rounded">Selanjutnya</button>
            </router-link>
        </div>
    </div>
    <div class="bg-green-dark text-green-dark">
        <div class="bg-white min-h-screen mt-10 relative rounded-t-3xl pt-20">
            <div class="w-28 h-28 absolute -top-10 left-1/2 -translate-x-1/2">
                <img class="rounded-full bg-green-light" src="@/assets/images/antrian-rounded.svg" alt="">
            </div>
            <p class="text-sm text-center">DAFTAR NOMOR <span class="font-bold">ANTRIAN</span></p>
            <form @submit.prevent="daftarPasien()" class="text-xs mt-10 px-5" autocomplete="false">
                <div class="flex flex-col">
                    <label for="nama" class="font-bold">Nama Lengkap :</label>
                    <input autocomplete="false" required ref="nama" id="nama" type="text"
                        class="mt-2 border input-field rounded p-2 border-green-light outline-green-dark">
                </div>
                <div class="flex flex-col mt-2">
                    <label for="alamat" class="font-bold">Alamat :</label>
                    <input autocomplete="false" required ref="alamat" id="alamat" type="text"
                        class="mt-2 border input-field rounded p-2 border-green-light outline-green-dark">
                </div>
                <div class="flex flex-col mt-2">
                    <label for="umur" class="font-bold">Umur :</label>
                    <input autocomplete="false" required ref="umur" id="umur" type="number"
                        class="mt-2 border input-field rounded p-2 border-green-light outline-green-dark">
                </div>
                <div class="flex mt-4 items-center">
                    <p class="font-bold">Jenis Kelamin :</p>
                    <input required ref="jenis_kelamin" value="Laki-Laki" name="jenis_kelamin" id="pria" type="radio"
                        class="peer/pria ml-4 border accent-green-dark">
                    <label for="pria" class="ml-2 peer-checked/pria:font-bold">Pria</label>
                    <input name="jenis_kelamin" value="Perempuan" ref="jenis_kelamin" id="wanita" type="radio"
                        class="peer/wanita ml-6 border accent-green-dark">
                    <label for="wanita" class="ml-2 peer-checked/wanita:font-bold">Wanita</label>
                </div>
                <div class="mt-10">
                    <button class="w-full bg-green-light text-white py-3 rounded font-bold" type="submit">DAFTAR
                        SEKARANG</button>
                    <router-link to="/">
                        <button
                            class=" mt-2 w-full border border-green-lightt text-green-light py-3 rounded font-bold">KEMBALI</button>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>
