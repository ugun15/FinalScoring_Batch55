// Mengimpor modul-modul yang diperlukan
const express = require("express"); // Mengimpor framework Express untuk membuat aplikasi web
const hbs = require("hbs"); // Mengimpor Handlebars untuk template engine
const path = require("path"); // Mengimpor path untuk mengelola direktori dan path file
const { Sequelize, QueryTypes } = require("sequelize"); // Mengimpor Sequelize untuk ORM dan QueryTypes untuk tipe query
const multer = require("multer"); // Mengimpor Multer untuk manajemen unggahan file
const upload = multer({ dest: "./src/uploads" }); // Mengatur destinasi penyimpanan file unggahan
const app = express(); // Membuat instance aplikasi Express
const port = 5000; // Menentukan port tempat aplikasi akan berjalan
const config = require("./config/config.json"); // Mengimpor konfigurasi untuk koneksi database
const sequelize = new Sequelize(config.development); // Membuat instance Sequelize dengan konfigurasi yang diberikan

// Mengatur view engine menjadi Handlebars (hbs)
app.set("view engine", "hbs"); // Menetapkan view engine sebagai Handlebars
app.set("views", path.join(__dirname, "src", "views")); // Menetapkan direktori views

// Menentukan direktori untuk aset statis dan unggahan
app.use("/assets", express.static(path.join(__dirname, "src", "assets"))); // Menyajikan file statis dari direktori assets
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads"))); // Menyajikan file unggahan dari direktori uploads
app.use(express.urlencoded({ extended: true })); // Mengaktifkan parsing URL-encoded untuk menangani data form

// Membuat helper untuk Handlebars
hbs.registerHelper("isTheSame", function (x, y) {
  return x == y ? "selected" : ""; // Helper untuk memeriksa kesamaan dua nilai dan mengembalikan "selected" jika sama
});

// Rute untuk halaman utama
app.get("/", async (req, res) => {
  try {
    const data = await sequelize.query(
      `SELECT h.name AS name, t.name AS type, h.photo AS picture, h.id 
       FROM "heroes_tb" h 
       LEFT JOIN "type_tb" t ON h.type_id = t.id`,
      { type: QueryTypes.SELECT }
    ); // Mengambil data hero dan tipe mereka dari database
    res.render("index", { title: "Home Page", data }); // Merender halaman utama dengan data yang diambil
  } catch (error) {
    console.error(error); // Menangani kesalahan jika ada
    res.status(500).send("Internal Server Error"); // Mengirimkan respon kesalahan
  }
});

// Rute untuk halaman membuat hero baru
app.get("/create", async (req, res) => {
  try {
    const types = await sequelize.query('SELECT id, name FROM "type_tb"', {
      type: QueryTypes.SELECT,
    }); // Mengambil data tipe hero dari database
    res.render("create", { title: "Create New Hero", types }); // Merender halaman untuk membuat hero baru dengan data tipe yang diambil
  } catch (error) {
    console.error(error); // Menangani kesalahan jika ada
    res.status(500).send("Internal Server Error"); // Mengirimkan respon kesalahan
  }
});

// Rute untuk menangani pembuatan hero baru
app.post("/create", upload.single("picture"), async (req, res) => {
  try {
    const { name, type } = req.body; // Mengambil data nama dan tipe dari form
    const picture = req.file ? req.file.filename : null; // Mengambil nama file gambar jika ada

    const result = await sequelize.query(
      `INSERT INTO "heroes_tb" (name, photo, type_id) 
       VALUES (:name, :picture, :type_id) RETURNING id`,
      {
        replacements: { name, picture, type_id: type },
        type: QueryTypes.INSERT,
      }
    ); // Menyisipkan data hero baru ke dalam database
    const newHeroId = result[0][0].id; // Mengambil ID hero baru yang dibuat
    res.redirect("/"); // Mengarahkan kembali ke halaman utama
  } catch (error) {
    console.error(error); // Menangani kesalahan jika ada
    res.status(500).send("Internal Server Error"); // Mengirimkan respon kesalahan
  }
});

// Rute untuk menghapus hero berdasarkan ID
app.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id; // Mengambil ID hero dari parameter URL
    await sequelize.query(
      `DELETE FROM "heroes_tb" WHERE id = :id`,
      { replacements: { id }, type: QueryTypes.DELETE }
    ); // Menghapus hero dari database berdasarkan ID
    res.redirect("/"); // Mengarahkan kembali ke halaman utama
  } catch (error) {
    console.error(error); // Menangani kesalahan jika ada
    res.status(500).send("Internal Server Error"); // Mengirimkan respon kesalahan
  }
});

// Rute untuk mendapatkan halaman pengeditan hero berdasarkan ID
app.get("/update/:id", async (req, res) => {
  try {
    const id = req.params.id; // Mengambil ID hero dari parameter URL
    const heroQuery = `SELECT h.name AS name, t.name AS class, h.photo AS picture, t.id AS type_id, h.id 
                       FROM "heroes_tb" h 
                       LEFT JOIN "type_tb" t ON h.type_id = t.id 
                       WHERE h.id = :id`;
    const typeQuery = 'SELECT id, name FROM "type_tb"';
    
    const [hero] = await sequelize.query(heroQuery, {
      replacements: { id },
      type: QueryTypes.SELECT,
    }); // Mengambil data hero berdasarkan ID
    const types = await sequelize.query(typeQuery, {
      type: QueryTypes.SELECT,
    }); // Mengambil data tipe hero dari database

    res.render("update", { title: "Edit Hero", data: { hero }, types }); // Merender halaman pengeditan hero dengan data yang diambil
  } catch (error) {
    console.error(error); // Menangani kesalahan jika ada
    res.status(500).send("Internal Server Error"); // Mengirimkan respon kesalahan
  }
});

// Rute untuk menangani pembaruan data hero
app.post("/update/:id", upload.single("picture"), async (req, res) => {
  try {
    const { name, type } = req.body; // Mengambil data nama dan tipe dari form
    const id = req.params.id; // Mengambil ID hero dari parameter URL
    const picture = req.file ? req.file.filename : null; // Mengambil nama file gambar jika ada
    const query = picture
      ? `UPDATE "heroes_tb" SET name = :name, photo = :picture, type_id = :type_id WHERE id = :id`
      : `UPDATE "heroes_tb" SET name = :name, type_id = :type_id WHERE id = :id`;

    await sequelize.query(query, {
      replacements: { name, picture, type_id: type, id },
      type: QueryTypes.UPDATE,
    }); // Memperbarui data hero di database

    res.redirect("/"); // Mengarahkan kembali ke halaman utama
  } catch (error) {
    console.error(error); // Menangani kesalahan jika ada
    res.status(500).send("Internal Server Error"); // Mengirimkan respon kesalahan
  }
});

// Rute untuk mendapatkan detail hero berdasarkan ID
app.get("/detail/:id", async (req, res) => {
  try {
    const id = req.params.id; // Mengambil ID hero dari parameter URL
    const data = await sequelize.query(
      `SELECT h.name AS hero, t.name AS class, h.photo AS picture, t.id AS type_id, h.id 
       FROM "heroes_tb" h 
       LEFT JOIN "type_tb" t ON h.type_id = t.id 
       WHERE h.id = :id`,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    ); // Mengambil data detail hero berdasarkan ID
    res.render("detail", { title: "Detail Page", data: data[0] }); // Merender halaman detail hero dengan data yang diambil
  } catch (error) {
    console.error(error); // Menangani kesalahan jika ada
    res.status(500).send("Internal Server Error"); // Mengirimkan respon kesalahan
  }
});

// Memulai server pada port yang ditentukan
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
