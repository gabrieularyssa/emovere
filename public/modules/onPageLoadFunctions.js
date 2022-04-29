import {
	AddCarrinho,
	apagarItem,
	calcularValor,
	limparCarrinho,
	printarCarrinho,
	verificaLocalStorage,
} from "./cartFunctions.js";

import { accessToken, fillFormUpdt } from "../src/script.js";

let userId;

/****************** FUNÇÕES NO CARREGAMENTO DE CADA 'PÁGINA' *****************/

onPageLoad["/store"] = store;
async function store() {
	await fetch("http://localhost:8080/api/store/products")
		.then((response) => response.json())
		.then((products) => {
			document.getElementById("loja").innerHTML = products
				.map(
					(x) =>
						`<div id="produto${x.prod_id}" class="divProdutos">
				<p>${x.prod_name}</p>
				<div class="img">
				<img src="./imagens/produtos/${x.prod_image}.png" data-link href="/store/:${x.prod_id}"/>
				</div>
				<p>₿ ${x.prod_price}</p>
				<button __param="${x.prod_image}" class="btnCar1">Adicionar ao Carrinho</button>
				</div>`
				)
				// onclick="AddCarrinho('${x.prod_image}')"
				.join("");

			document.getElementById("loja").innerHTML += `
			<div id="carrinho1">
				<h2 id="tituloCarrinho">CARRINHO</h2>
			<div id="tituloValorTotal">Total:<span id="valorTotal"></span></div>
			</div>
			`;
		});
	$(".btnCar1").click(function () {
		AddCarrinho($(this).attr("__param"));
	});
	verificaLocalStorage("carrinho1");
	calcularValor();
}

onPageLoad["/store/$"] = prod;
function prod(productId) {
	fetch(`http://localhost:8080/api/product?id=${productId}`)
		.then((response) => response.json())
		.then((product) => {
			document.getElementById("espaçoProduto").innerHTML = `
			<h2 id="tituloProduto">PRODUTO</h2>
		<div id="produto">
			<div id="img">
				<img src="./imagens/produtos/${product.prod_image}.png" />
			</div>
			<div id="txtProduto">
				<h2 id="paragrafoIdProduto">${product.prod_name}</h2>
				<p>${product.prod_char}</p>
				<h2 id="precoProduto">₿ ${product.prod_price}</h2>
				<div id="botao">
					<button id="btnProduto" type="button">COMPRAR AGORA</button>
				</div>
			</div>
		</div>
			`;
		});
}

onPageLoad["/minhaconta"] = myAccount;
async function myAccount() {
	userId = await window.cookieStore.get("refresh_token").then((obj) => {
		const t = obj.value;
		return JSON.parse(window.atob(t.split(".")[1])).user_id;
	});

	console.log("userId: ", userId);

	await fetch(`http://localhost:8080/api/user/update?id=${userId}`, {
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
	})
		.then((response) => response.json())
		.then((userData) => {
			console.log("data recebida do back", userData);
			fillFormUpdt(userData);
		})
		.catch((error) => console.log(error));
}

onPageLoad["/carrinho"] = cart;
function cart() {
	document.getElementById("pageCarrinho").innerHTML = `
			<div id="carrinho2"></div>
	`;
	verificaLocalStorage("carrinho2");
}

onPageLoad["/logout"] = logout;
function logout() {
	fetch("http://localhost:8080/api/auth/refresh_token", {
		method: "DELETE",
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
	})
		.then((response) => response.json())
		.then((data) => console.log("data q veio do delete: ", data));
}

export { store, prod, myAccount, cart, logout };
