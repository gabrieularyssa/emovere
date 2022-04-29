/************ Importando funções do carrinho ***************/
import {
	AddCarrinho,
	apagarItem,
	calcularValor,
	limparCarrinho,
	printarCarrinho,
	verificaLocalStorage,
} from "../modules/cartFunctions.js";

/************ Importando funções das 'páginas' ***************/
import { store, prod, myAccount, cart, logout } from "../modules/onPageLoadFunctions.js";

/************ Importando funções forms ***************/
// import { funcFormUpdt, funcFormLogin, funcFormCadastro } from "../modules/formsFunctions.js";

const btnSignin = document.querySelector("#signin");
const btnSignup = document.querySelector("#signup");
const body = document.querySelector("body");

// /****************** FUNÇÕES *****************/

/****************** FUNÇÕES *****************/

let accessToken;
let user_name;
let userId;

export function fillFormUpdt(userData) {
	formUpdt.name.value = `${userData.user_name}`;
	formUpdt.cpf.value = `${userData.user_cpf}`;
	formUpdt.identificador.value = `${userData.user_identificador}`;
	formUpdt.email.value = `${userData.user_email}`;
	userId = `${userData.user_id}`;
}

const formUpdt = {
	name: document.getElementById("nameUpdt"),
	cpf: document.getElementById("cpfUpdt"),
	identificador: document.getElementById("identificadorUpdt"),
	email: document.getElementById("emailUpdt"),
	password: document.getElementById("passwordUpdt"),
	submit: document.getElementById("btnUpdt"),
};

let button3 = formUpdt.submit.addEventListener("click", (e) => {
	e.preventDefault();
	const update = "http://localhost:8080/api/user/update";

	fetch(update, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			name: formUpdt.name.value,
			cpf: formUpdt.cpf.value,
			identificador: formUpdt.identificador.value,
			email: formUpdt.email.value,
			password: formUpdt.password.value,
			id: userId,
		}),
	})
		.then((response) => response.json())
		.then((data) => console.log("data do fetch do formUpdt: ", data))
		.catch((err) => {
			console.log(err);
		});
});

const formLogin = {
	email: document.getElementById("email2"),
	password: document.getElementById("password2"),
	submit: document.getElementById("btnLogin"),
};

let button1 = formLogin.submit.addEventListener("click", async (e) => {
	e.preventDefault();
	const login = "http://localhost:8080/api/auth/login";

	await fetch(login, {
		method: "POST",
		credentials: "include",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: formLogin.email.value,
			password: formLogin.password.value,
		}),
	})
		.then((response) => response.json())
		.then(async (data) => {
			ifErrorFromBack(data);
			accessToken = data.accessToken;
			// console.log("(se testando erro de login) accessToken q nao eh pra aparecer: ", accessToken);
			await window.cookieStore.get("refresh_token").then((obj) => {
				const t = obj.value;
				user_name = JSON.parse(window.atob(t.split(".")[1])).user_name;
			});
			loginRender();
		})
		.catch((error) => {
			console.log("error é: ", error);
		});
	navigate("/");
});

function logarComCookie() {
	// if (document.cookie) console.log("o cookie armazenado é: ", document.cookie);
	document.cookie ? loginRender() : console.log("sem cookie de acesso");
}

function loginRender() {
	document.getElementById("user_name").innerHTML = user_name;
	document.getElementById("inscreva-se-btn").innerHTML = "Sair";
	document.getElementById("inscreva-se-btn").attributes.href.value = "/";
	document.getElementById("inscreva-se-btn").setAttribute("data-link", "");
	document.getElementById("inscreva-se-btn").addEventListener("click", sair);
}

// replace(searchValue:
// 		{ [Symbol.replace](string: string, replaceValue: string): string; },
// 		replaceValue: string
// 		): string

function sair() {
	document.cookie.replace(["refresh_token"], "");
	document.getElementById("user_name").innerHTML = "";
	document.getElementById("inscreva-se-btn").innerHTML = "Login";
	document.getElementById("inscreva-se-btn").attributes.href.value = "/criarconta";
}

///////////////////////////CRIAR FUNÇÃO QUE VAI MANIPULAR OS ELEMENTOS DE ACORDO COM O LOGIN FEITO

const node = document.createElement("div");
node.style.display = "none";
node.innerHTML = "[X]";
node.addEventListener("click", () => (popup.style.display = "none"));

const formCadastro = {
	name: document.getElementById("nome"),
	cpf: document.getElementById("CPF"),
	identificador: document.getElementById("identificador"),
	email: document.getElementById("email1"),
	password: document.getElementById("password1"),
	submit: document.getElementById("btnCadastro"),
};

let button2 = formCadastro.submit.addEventListener("click", (e) => {
	e.preventDefault();
	const cadastro = "http://localhost:8080/api/users";

	fetch(cadastro, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: formCadastro.name.value,
			cpf: formCadastro.cpf.value,
			identificador: formCadastro.identificador.value,
			email: formCadastro.email.value,
			password: formCadastro.password.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("resposta do servidor: ", data);
			if (data.newUser) {
				popup1.style.display = "flex";
				document.getElementById("btnfecharpopup1").addEventListener("click", () => (popup1.style.display = "none"));
				console.log("responser ok: ", response);
				document.getElementById("fzrLogin").addEventListener("click", navigate("/login")).setAttribute("data-link", "");
			} else if (data.error) {
				popup.innerHTML = "Cadastro rejeitado, tente novamente!";
				popup.style.display = "flex";
				document.getElementById("btnfecharpopup1").addEventListener("click", () => (popup1.style.display = "none"));
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

let popup1 = document.getElementById("popupCadastro");
let popup2 = document.getElementById("popupSenha");

////////////////////////////////COLOCAR CONFIRMAÇÃO VISUAL QUANDO USUARIO FOR CRIADO
/////////////// quando criar o usuario, ja logar automaticamente

//TODO algum comentario

/****************** Função de verificação de token *****************/

//pra receber o true ou o erro, chamar a função assim:
// await verificarLogin();
async function verificarLogin() {
	let fetchReturn;
	fetchReturn = await fetch("http://localhost:8080/api/users", {
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
	return fetchReturn === true ? true : false;
}

/****************** Funções de tratamento de erros *****************/
export function ifErrorFromBack(data) {
	if (data.error) {
		console.log(data.error);
		popup2.style.display = "flex";
		popup2.innerHTML += `Seu erro foi: ${data.error}"`;
		document.getElementById("btnfecharpopup2").addEventListener("click", () => (popup2.style.display = "none"));
	}
}

export function ifErrorFromFront(err) {}

/****************** Pop-ups *****************/
//aqui vc identifica algum botao que ative o popUp
// document.querySelector("#show-login").addEventListener("click", function () {
// 	document.querySelector(".popup").classList.add("active");
// });

document.querySelector(".close-btn").addEventListener("click", function () {
	document.querySelector(".popup").classList.remove("active");
});

document.querySelector(".acesso").addEventListener("click", function () {
	document.querySelector(".popup").classList.remove("active");
});

/****************** CADASTRO INTERATIVO  *****************/

btnSignin.addEventListener("click", function () {
	body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
	body.className = "sign-up-js";
});

export { accessToken, logarComCookie, loginRender };
navigate("/");
