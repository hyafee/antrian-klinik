<script setup>
import Antrian from '../components/Antrian.vue'
import About from '../components/About.vue'
import Loading from '../components/Loading.vue'
</script>

<template>
  <div v-if="this.$store.state.loadingAbout || this.$store.state.loadingAntrian || this.$store.state.loadingHeader">
    <Loading />
  </div>
  <div class="flex flex-col h-screen pt-5">
    <div class="flex-none">
      <p class="text-white text-sm text-center">Selamat <span class="font-bold"> Datang,</span></p>
      <Antrian />
    </div>
    <div class="mt-10 grow bg-white rounded-t-3xl pt-5">
      <p class="text-green-dark font-bold text-center text-sm">AMBIL NOMOR ANTRIAN</p>
      <div class="bg-green-light rounded flex mt-5 p-5 py-7 items-center mx-5">
        <div class="w-5/12 flex justify-center"><img src="@/assets/images/antrian.svg" alt=""></div>
        <router-link to="/register" class="w-7/12 flex justify-center">
          <button class="w-10/12 p-2 bg-white rounded text-green-light font-bold text-xs">
            Daftar Sekarang
          </button>
        </router-link>
      </div>
      <hr class="text-green-dark opacity-50 mt-5">
      <div class="w-full px-5 mt-5">
        <About />
      </div>
    </div>
  </div>
</template>
