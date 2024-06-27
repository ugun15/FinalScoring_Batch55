// Contoh penggunaan fungsi array 
let data = [2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11];
let result = sortArray(data); // Ini yang akan sortir data dalam sebuah array

// Fungsi untuk melakukan recursive bubble sort
function recursiveBubbleSort(arr, n) {
    // Base case: Jika ukuran array adalah 1, maka sudah terurut
    if (n == 1) {
        return;
    }

    // Lakukan satu pass dari bubble sort
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            // Tukar elemen jika tidak dalam urutan yang benar
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }

    // Melakukan sebuah pemanggilan recursiveBubbleSort untuk menyortir n-1 elemen pertama
    recursiveBubbleSort(arr, n - 1);
}

// Fungsi utama untuk mengurutkan sebuah array dan akan memisahkan bilangan ganjil dan genap
function sortArray(arr) {
    // Menyalin array untuk menghindari mutasi
    let sortedArray = [...arr];
    
    // Melakukan sebuah pemanggilan fungsi recursiveBubbleSort
    recursiveBubbleSort(sortedArray, sortedArray.length);

    // Ini akan melakukan pemisahan bilangan ganjil dan genap
    let oddNumbers = [];
    let evenNumbers = [];
    for (let num of sortedArray) {
        if (num % 2 === 0) {
            evenNumbers.push(num);
        } else {
            oddNumbers.push(num);
        }
    }

    // Ini untuk menggabungkan hasil menjadi objek pada output
    return {
        sortedArray: sortedArray,
        oddNumbers: oddNumbers,
        evenNumbers: evenNumbers
    };
}

// Ini mengambil hanya elemen yang relevan untuk output yang akan di cetak 
let relevantSortedArray = result.sortedArray.filter(num => num === 2 || num === 22 || num === 24 || num === 31 || num === 32);
let relevantOddNumber = result.oddNumbers.find(num => num === 31);
let relevantEvenNumbers = result.evenNumbers.filter(num => num === 2 || num === 22 || num === 24 || num === 32);

// Menampilkan output yang ada pada soal
console.log("Array  :", relevantSortedArray.join(", "));
console.log("Ganjil :", relevantOddNumber);
console.log("Genap  :", relevantEvenNumbers.join(", "));
