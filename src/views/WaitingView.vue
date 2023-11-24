<script setup>
import Antrian from '../components/Antrian.vue'
import KartuAntrian from '../components/KartuAntrian.vue'
import About from '../components/About.vue'
import Loading from '../components/Loading.vue'
</script>

<template>
    <div v-if="this.$store.state.loadingAbout || this.$store.state.loadingAntrian || this.$store.state.loadingHeader">
        <Loading />
    </div>
    <div class="text-xs text-white mt-5">
        <p class="text-center text-sm"><span class="font-bold">Berhasil</span> Ambil Nomor Antrian,</p>
        <KartuAntrian />
        <div class="w-11/12 mx-auto mt-5">
            <p class="text-white">Anda telah <span class="font-bold"> berhasil </span>mendapat nomor antrian,
                silahkan tunjukkan pe petugas yang
                ada.
            </p>
        </div>
        <div class="min-h-content bg-white rounded-t-3xl pt-2 mt-5 pb-5">
            <Antrian />
            <div class="w-11/12 mx-auto mt-5">
                <p class="text-green-dark">Nomor antrian yang telah didapatkan akan dihapus dalam <span class="font-bold">
                        1 x 24 jam </span>
                </p>
            </div>

            <div class="w-11/12 mx-auto mt-5">
                <About />
            </div>
        </div>
    </div>
</template>