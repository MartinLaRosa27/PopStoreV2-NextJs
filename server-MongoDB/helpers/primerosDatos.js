const Banner = require("../models/Banner");
const Product = require("../models/Product");
const Category = require("../models/Category");

module.exports.primerasCategorias = async () => {
  let categoriasAlmacenadas = [];
  categoriasAlmacenadas = await Category.find({});
  if (categoriasAlmacenadas.length === 0) {
    try {
      const marvel = new Category({
        name: "MARVEL",
        bannerImage:
          "https://m.media-amazon.com/images/S/abs-image-upload-na/e/AmazonStores/A1AM78C64UM0Y8/1a6e1dae3daf6180cb47eb21d2c41675.w1500.h300.png",
      });
      const starwars = new Category({
        name: "STARWARS",
        bannerImage:
          "https://w0.peakpx.com/wallpaper/710/102/HD-wallpaper-star-wars-9-banner.jpg",
      });
      const wwe = new Category({
        name: "WWE",
        bannerImage:
          "https://s3.superluchas.com/2022/08/Banner-de-Superestrellas-WWE-en-WWE.com_.jpg",
      });
      await marvel.save();
      await starwars.save();
      await wwe.save();
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports.primerosBanners = async () => {
  let bannersAlmacenados = [];
  bannersAlmacenados = await Banner.find({});
  if (bannersAlmacenados.length === 0) {
    try {
      const primero = new Banner({
        image:
          "https://cdn.shopify.com/s/files/1/1113/5514/files/funkopopbanner_8512dfaf-9903-45bf-9c9a-f177a7eaf934_1400x600_crop_center.jpg?v=1660263774",
        description: "Welcome to our Site",
        position: "main",
      });
      const segundo = new Banner({
        image:
          "https://media.pop-busters.com/media/mgs/fbuilder/images/f/u/funko_top_banner.jpg",
        description: "Home of your Favorites Characters",
        position: "main",
      });
      const tercero = new Banner({
        image: "https://cache.tradeinn.com/images/brand-page/banner_5340.jpg",
        description: "Home of Pop",
        position: "footer",
      });
      await primero.save();
      await segundo.save();
      await tercero.save();
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports.primerosProductos = async () => {
  const productosAlmacenados = await Product.find({});
  const marvel = await Category.findOne({ name: "MARVEL" });
  const starwars = await Category.findOne({ name: "STARWARS" });
  const wwe = await Category.findOne({ name: "WWE" });
  if (productosAlmacenados.length === 0) {
    try {
      const primero = new Product({
        name: "Funko Pop! Marvel: Ms. Marvel - Ms. Marvel",
        image: [
          "https://m.media-amazon.com/images/I/51DN54ce1GL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71lt3eQTQjL._AC_SX679_.jpg",
        ],
        priceUSD: 8.39,
        categoryId: marvel._id,
        description:
          "Cuando una fan de superhéroes se convierte en una superhéroe, las posibilidades parecen infinitas para Kamala Khan Ayuda a Kamala (también conocido como la señora Marvel) a unirse a sus ídolos de superhéroes y descubrir sus poderes en tu colección Marvel Ms. Marvel como un Pop! ¡Ms. Marvel!.",
        quantity: 0,
        stock: 2,
        release: new Date("2022-06-30"),
      });

      const segundo = new Product({
        name: "Funko POP! WWE: Roman Reigns with Title",
        image: [
          "https://m.media-amazon.com/images/I/71XRohBT1FL._AC_SY879_.jpg",
          "https://m.media-amazon.com/images/I/81+3hHC4j4L._AC_SX679_.jpg",
        ],
        priceUSD: 20.0,
        categoryId: wwe._id,
        details:
          'Funko Pop! Roman Reigns sostiene uno de los títulos del Campeonato de la WWE y está aquí para "arruinar a todos" en tu colección.',
        quantity: 0,
        stock: 0,
        release: new Date("2021-12-01"),
      });

      const tercero = new Product({
        name: "Funko POP! Marvel: Avengers Endgame - Iron Man",
        image: [
          "https://m.media-amazon.com/images/I/71dHETvKOPL._AC_SY879_.jpg",
          "https://m.media-amazon.com/images/I/81ttp5BdXaL._AC_SY879_.jpg",
        ],
        priceUSD: 7.99,
        categoryId: marvel._id,
        details:
          "De Avengers Endgame, Iron Man, como un estilizado vinilo POP de Funko.",
        quantity: 0,
        stock: 11,
        release: new Date("2019-04-25"),
      });

      const cuarto = new Product({
        name: "Funko POP! Marvel: Backyard Griller Deadpool",
        image: [
          "https://m.media-amazon.com/images/I/61W6YssxEIL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71LksyIROuL._AC_SX679_.jpg",
        ],
        priceUSD: 10.89,
        categoryId: marvel._id,
        details:
          "Colecciona y muestra todos los Pop de Deadpool Playtime Viniloso.",
        quantity: 0,
        stock: 1,
        release: new Date("2015-12-01"),
      });

      const quinto = new Product({
        name: "Funko POP! WWE: Becky Lynch with Two Titles",
        image: [
          "https://m.media-amazon.com/images/I/6183Lfu5sPL._AC_SY879_.jpg",
          "https://m.media-amazon.com/images/I/61GYUiTzBKL._AC_SY879_.jpg",
        ],
        priceUSD: 13.88,
        categoryId: wwe._id,
        details:
          "Con uno de los mayores personalidades y campeones de la WWE, esta audaz y colorido figura viene listo para causar estragos sacarlo de la caja.",
        quantity: 0,
        stock: 5,
        release: new Date("2019-06-20"),
      });

      const sexto = new Product({
        name: "Funko Pop! Star Wars: The Mandalorian - The Child",
        image: [
          "https://m.media-amazon.com/images/I/510GfbgM02L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61DxXAXFx7L._AC_SX679_.jpg",
        ],
        priceUSD: 8.78,
        categoryId: starwars._id,
        details:
          "Colecciona Pop! Grogu con galleta para tu colección de Star Wars The Mandalorian..",
        quantity: 0,
        stock: 15,
        release: new Date("2020-02-04"),
      });

      const septimo = new Product({
        name: "Funko Pop! Star Wars: The Mandalorian - Mandalorian",
        image: [
          "https://http2.mlstatic.com/D_NQ_NP_705241-MLA44900541687_022021-O.jpg",
          "https://m.media-amazon.com/images/I/71teBePvDwL._AC_SX679_.jpg",
        ],
        priceUSD: 8.99,
        categoryId: starwars._id,
        details:
          "Figura estilizada de vinilo de The Mandalorian, Mandalorian (Chrome), exclusivo, al estilo de Funko POP..",
        quantity: 0,
        stock: 30,
        release: new Date("2020-02-04"),
      });

      await primero.save();
      await segundo.save();
      await tercero.save();
      await cuarto.save();
      await quinto.save();
      await sexto.save();
      await septimo.save();
    } catch (e) {
      console.log(e);
    }
  }
};
