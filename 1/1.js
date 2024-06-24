// Fungsi drawSikuSiku => ini untuk melakukan validasi input dengan hitung jumlah bilangan prima 
//                        yang diperlukan, dan mencetak segitiga terbalik menggunakan bilangan prima. 
function drawSikuSiku(n) {
    // Fungsi "isPrime" => ini untuk mengecek/memeriksa apakah suatu angka adalah bilangan prima
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false; // menggunakan sebuah operator % (sisa bagi) dan || (or)
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }

     // Fungsi "generatePrimes" => ini untuk menghasilkan deret sejumlah bilangan prima sebanyak yang dibutuhkan / yang cukup untuk mengisi segitiga
    function generatePrimes(limit) {
        let primes = [];
        let num = 2; // Bilangan prima dimulai dari 2
        while (primes.length < limit) {
            if (isPrime(num)) {
                primes.push(num);
            }
            num++;
        }
        return primes;
    }

    // Melakukan sebuah validasi input
    if (n <= 0 || n >= 10) {  // operator || (or) -> Boolean yang dimana bisa true || false 
        console.log("Input harus lebih besar dari 0 dan kurang dari 10.");
        return;
    }

    // Melakukan sebuah perhitungan jumlah bilangan prima yang dibutuhkan dalam segitiga
    let totalNumbers = (n * (n + 1)) / 2;
    let primes = generatePrimes(totalNumbers);

    // Melakukan pengkondisian untuk melakukan cetak segitiga terbalik
    let index = 0;
    for (let i = 0; i < n; i++) {
        let line = "";
        for (let j = 0; j <= i; j++) {
            line += primes[index] + "\t";
            index++;
        }
        console.log(line.trim());
    }
}

// Contoh penggunaan dengan menjalankan "drawSikuSiku(7)" yang nantinya akan mencetak output dengan sesuai
drawSikuSiku(7);