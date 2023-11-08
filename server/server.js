const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path");

// Configuración de MercadoPago
// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "<ACCESS_TOKEN>",
});

// Middleware para datos de formulario y JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sirviendo archivos estáticos del subdirectorio 'media' dentro de 'client'

app.use(express.static(path.join(__dirname, "../client")));
// Habilitar CORS
app.use(cors());

// Ruta específica para 'index.html'

app.get("/", function (req, res) {
	res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
  });
  


app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080",
			"failure": "http://localhost:8080",
			"pending": "",
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(8080, () => {
	console.log("Server is running on http://localhost:8080");
});
