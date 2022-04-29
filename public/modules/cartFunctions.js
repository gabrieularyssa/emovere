/****************** Carrinho *****************/

export function AddCarrinho(produto) {
	if (localStorage.getItem(`${produto}`)) {
		alert("O produto já foi adicionado ao carrinho");
	} else {
		localStorage.setItem(`${produto}`, produto);
		printarCarrinho(produto, "carrinho1");
		calcularValor();
	}
}
export function apagarItem(produto) {
	let remover = document.getElementById(`${produto}`);
	remover.remove();
	localStorage.removeItem(`${produto}`);
	calcularValor();
}
export function calcularValor() {
	let aLength = localStorage.length;
	let total = aLength * 1000;
	// console.log(total);
	document.getElementById("valorTotal").innerHTML = `${total},00`;
}
export function limparCarrinho() {
	localStorage.clear();
	document.getElementById("carrinho").innerHTML = " ";
	calcularValor();
}
export function printarCarrinho(produto, idDiv) {
	document.getElementById(`${idDiv}`).innerHTML += `
	<div id="${produto}" class="divProdutos">
		<img src= "./imagens/produtos/${produto}.png" class="pagCarrinho">
	<div class="titulo">
		<h1 class="preco">${produto}</h1>
	</div>
	<div id="subitem1">
		<button class="btn btn-compra" href="/finalizada" data-link>Comprar Agora</button>
		<button class="btnCar" __param="${produto}">Excluir do Carrinho</button>
	</div>
	</div>
	`;
	$(".btnCar").click(function () {
		apagarItem($(this).attr("__param"));
	});
	addFBuyBtn();
}

let userId;
let accessToken;

function addFBuyBtn() {
	document.querySelectorAll(".btn-compra").forEach((x) => {
		x.addEventListener("click", async (e) => {
			e.preventDefault();
			await window.cookieStore.get("refresh_token").then((obj) => {
				let token = obj.value;
				accessToken = token;
				userId = JSON.parse(window.atob(token.split(".")[1])).user_id;
			});
			await fetch("http://localhost:8080/api/delLST", {
				method: "POST",
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
					authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					id: userId,
					history: Object.keys(localStorage),
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.compra == "realizada") {
						console.log(data.compra);
					}
				})
				.catch((error) => console.log("erro foi: ", error));
		});
	});
}

export function verificaLocalStorage(idDiv) {
	const quantidade = localStorage.length;

	for (let i = 0; i < quantidade; i++) {
		const produtoId = localStorage.key(i);
		// const nomeProduto = localStorage.getItem(produtoId);

		printarCarrinho(produtoId, idDiv);
	}
}
