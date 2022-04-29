let page = null;

const onPageLoad = {};

function navigate(url) {
	const fragments = url.split("/"); // ["", "produtos", ":0"]
	const params = [];
	const output = fragments.map((x) => {
		if (x[0] === ":") {
			params.push(x.slice(1)); // ":220" => "220"
			return "$";
		} else {
			return x;
		}
	});
	url = output.join("/");
	if (page !== null) {
		document.querySelector(`[data-page="${page}"]`).style.display = "none";
	}
	page = url;
	document.querySelector(`[data-page="${page}"]`).style.display = "flex";

	if (typeof onPageLoad[url] === "function") {
		onPageLoad[url](...params);
	}
}

document.body.addEventListener("click", (e) => {
	if (e.target.matches("[data-link]")) {
		e.preventDefault();
		navigate(e.target.attributes.href.value);
	}
});

navigate("/");
