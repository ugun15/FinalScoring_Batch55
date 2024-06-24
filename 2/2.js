function hitungVoucher(voucher, totalBelanja, uangDibayar) {
    // Inisialisasi variabel diskon, uang yang harus dibayar, dan kembalian
    let diskon = 0;
    let uangYangHarusDibayar = totalBelanja;
    let kembalian = 0;

    // Periksa jenis voucher yang digunakan
    if (voucher === "DumbWaysJos") {
        // Jika total belanja memenuhi syarat minimal untuk DumbWaysJos
        if (totalBelanja >= 50000) { // Melakukan perhitungan diskon untuk "DubwaysJos"
            // Hitung diskon sebesar 21,1% dari total belanja
            diskon = totalBelanja * 0.211;
            // Jika diskon melebihi batas maksimal, batasi diskon ke 20000
            if (diskon > 20000) {
                diskon = 20000;
            }
        }
    } else if (voucher === "DumbWaysMantap") {
        // Jika total belanja memenuhi syarat minimal untuk DumbWaysMantap
        if (totalBelanja >= 80000) { // Melakukan perhitungan diskon untuk "DumbWaysMantap"
            // Hitung diskon sebesar 30% dari total belanja
            diskon = totalBelanja * 0.30;
            // Jika diskon melebihi batas maksimal, batasi diskon ke 40000
            if (diskon > 40000) {
                diskon = 40000;
            }
        }
    }

    // Hitung uang yang harus dibayar setelah diskon
    uangYangHarusDibayar = totalBelanja - diskon;

    // Periksa apakah uang yang dibayar cukup
    if (uangDibayar >= uangYangHarusDibayar) {
        // Hitung kembalian jika uang yang dibayar lebih dari atau sama dengan uang yang harus dibayar
        kembalian = uangDibayar - uangYangHarusDibayar;
    } else {
        // Jika uang yang dibayar tidak cukup, kembalikan pesan kesalahan
        return "Uang yang dibayar tidak cukup.";
    }

    // Cetak hasil perhitungan dalam format yang diinginkan
    console.log(`- Uang yang harus dibayar : ${uangYangHarusDibayar}`);
    console.log(`- Diskon : ${diskon}`);
    console.log(`- Kembalian : ${kembalian}`);
}

// Contoh penggunaan fungsi hitungVoucher untuk menghasilkan output yang sesuai dengan soal
hitungVoucher("DumbWaysJos", 100000, 100000);
