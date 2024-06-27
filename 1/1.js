// Fungsi drawSikuSiku => ini untuk melakukan validasi input dengan hitung jumlah bilangan prima 
// yang diperlukan, dan mencetak segitiga terbalik menggunakan bilangan prima.
function drawSikuSiku(n) {
    // Fungsi "isPrime" => ini untuk mengecek/memeriksa apakah suatu angka adalah bilangan prima
    function isPrime(num) {
        // Bilangan kurang dari atau sama dengan 1 bukan bilangan prima
        if (num <= 1) return false;
        // Bilangan 2 dan 3 adalah bilangan prima
        if (num <= 3) return true;
        // Bilangan yang habis dibagi 2 atau 3 bukan bilangan prima
        if (num % 2 === 0 || num % 3 === 0) return false; 
        // Menggunakan loop untuk memeriksa faktor dari bilangan prima
        for (let i = 5; i * i <= num; i += 6) {
            // Jika bilangan habis dibagi i atau (i + 2) maka bukan bilangan prima
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        // Jika tidak ada faktor yang ditemukan, maka bilangan adalah prima
        return true;
    }

    // Fungsi "generatePrimes" => ini untuk menghasilkan deret sejumlah bilangan prima sebanyak yang dibutuhkan / yang cukup untuk mengisi segitiga
    function generatePrimes(limit) {
        let primes = []; // Array untuk menyimpan bilangan prima
        let num = 2; // Bilangan prima dimulai dari 2
        while (primes.length < limit) {
            // Jika bilangan adalah prima, tambahkan ke array
            if (isPrime(num)) {
                primes.push(num);
            }
            num++; // Periksa bilangan berikutnya
        }
        return primes; // Kembalikan array bilangan prima
    }

    // Melakukan sebuah validasi input
    if (n <= 0 || n >= 10) { // operator || (or) -> Boolean yang dimana bisa true || false 
        console.log("Input harus lebih besar dari 0 dan kurang dari 10.");
        return; // Hentikan eksekusi jika input tidak valid
    }

    // Melakukan sebuah perhitungan jumlah bilangan prima yang dibutuhkan dalam segitiga
    let totalNumbers = (n * (n + 1)) / 2; // Rumus untuk jumlah elemen dalam segitiga
    let primes = generatePrimes(totalNumbers); // Menghasilkan bilangan prima yang cukup

    // Melakukan pengkondisian untuk melakukan cetak segitiga terbalik
    let index = 0; // Indeks untuk melacak bilangan prima
    for (let i = 0; i < n; i++) { // Loop untuk setiap baris
        let line = ""; // Inisialisasi baris
        for (let j = 0; j <= i; j++) { // Loop untuk setiap elemen dalam baris
            line += primes[index] + "\t"; // Tambahkan bilangan prima ke baris
            index++; // Pindah ke bilangan prima berikutnya
        }
        console.log(line.trim()); // Cetak baris dan hapus spasi di akhir
    }
}

// Contoh penggunaan dengan menjalankan "drawSikuSiku(7)" yang nantinya akan mencetak output dengan sesuai
drawSikuSiku(7);
