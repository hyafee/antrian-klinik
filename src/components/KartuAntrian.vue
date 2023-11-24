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
            // Calculate the difference between nomorAntrian and nomorAntrianNow
            const hasil = this.nomorAntrian - this.nomorAntrianNow;
            return hasil;
        }
    },
    methods: {
        async loadAntrianData() {
            // Retrieve data from local storage
            const antrianData = localStorage.getItem('antrianData');

            if (antrianData) {
                // Parse the JSON data
                const parsedData = JSON.parse(antrianData);

                // Update component data
                this.nomorAntrian = parsedData.data.queue_number;
            } else {
                // Handle the case when 'antrianData' is not present in local storage
                console.error('Error: Data not found in local storage');
            }
        },
        async loadAntrianNow() {
            try {
                // Fetch the latest queue number from the API
                const response = await fetch('http://127.0.0.1:8000/api/antrian/now');
                const responseData = await response.json();

                // Update component data
                this.nomorAntrianNow = responseData.data.queue_number_now;
            } catch (error) {
                console.error('Error fetching latest queue number:', error);
                // Handle errors as needed
            }
        }
    }
};
</script>
