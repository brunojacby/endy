import express from "express";
import exphbs from "express-handlebars";
import { fileURLToPath } from "url";
import path from "path";
import handlebars from "handlebars";

const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
});

handlebars.registerHelper("uppercase", function (text) {
  if (typeof text === "string") {
    return text.toUpperCase();
  } else {
    return "Texto inválido";
  }
});

handlebars.registerHelper("formatPriceBRL", function (price) {
  if (typeof price === "number") {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "";
  }
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

const categories = () => {
  return [
    {
      categoryName: "brincos",
      categoryProducts: [
        {
          name: "Brinco de Ouro",
          price: 550,
          image: "/images/brincoteste.jpg",
        },
        {
          name: "Brinco de Prata",
          price: 556,
          image: "/images/brincoteste.jpg",
        },
      ],
    },
    {
      categoryName: "colares",
      categoryProducts: [
        {
          name: "colar de perolas",
          price: 880,
          image: "/images/brincoteste.jpg",
        },
        {
          name: "colar azul",
          price: 1250,
          image: "/images/brincoteste.jpg",
        },
      ],
    },
  ];
};

const menuItems = ["home", "produtos", "carrinho", "login"];
app.get("/", (req, res) => {
  res.render("index", {
    layout: "main",
    categories: categories,
    menuItems: menuItems,
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    layout: "main",
  });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro", {
    layout: "main",
  });
});

app.get("/carrinho", (req, res) => {
  res.render("carrinho", {
    layout: "main",
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
