// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
// =================================================================================
// =================================================================================
// =================================================================================
// =================================================================================
//! 1. phone mask - маска для формы согласно дизайну макета ======================
window.onload = function () {
	window.addEventListener("DOMContentLoaded", function () {
		[].forEach.call(document.querySelectorAll('.phone'), function (input) {
			var keyCode;
			function mask(event) {
				event.keyCode && (keyCode = event.keyCode);
				var pos = this.selectionStart;
				if (pos < 3) event.preventDefault();
				var matrix = "+3 (___) ___ ____",
					i = 0,
					def = matrix.replace(/\D/g, ""),
					val = this.value.replace(/\D/g, ""),
					new_value = matrix.replace(/[_\d]/g, function (a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
					});
				i = new_value.indexOf("_");
				if (i != -1) {
					i < 5 && (i = 3);
					new_value = new_value.slice(0, i)
				}
				var reg = matrix.substr(0, this.value.length).replace(/_+/g,
					function (a) {
						return "\\d{1," + a.length + "}"
					}).replace(/[+()]/g, "\\$&");
				reg = new RegExp("^" + reg + "$");
				if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
				if (event.type == "blur" && this.value.length < 5) this.value = ""
			}

			input.addEventListener("input", mask, false);
			input.addEventListener("focus", mask, false);
			input.addEventListener("blur", mask, false);
			input.addEventListener("keydown", mask, false)

		});

	});
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// init Map - координаты можно узнать на сайте https://snipp.ru/tools/address-coord

	let myMap = document.querySelector('#map');
	if (myMap) {
		console.log(myMap);

		var map = L.map('map', {
			scrollWheelZoom: false
		}).setView([46.469794, 30.732835], 15);

		//  osm Layer
		var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		});
		osm.addTo(map);


		// ===================== Watercolor Map ====================
		var watercolor = L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}", {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			subdomains: "abcd",
			minZoom: 1,
			maxZoom: 16,
			ext: "jpg",
		});
		//   watercolor.addTo(map);


		// ========================== GoogleStreet ===========
		var googleStreets = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
			maxZoom: 20,
			subdomains: ["mt0", "mt1", "mt2", "mt3"],
		});
		googleStreets.addTo(map);

		//   ====================== Satellite ================
		var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
			maxZoom: 20,
			subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
		});
		// googleSat.addTo(map);


		// =========================
		//  Marker =================
		var myIcon = L.icon({
			iconUrl: "img/map/punkt.svg",
			iconSize: [40, 55],
		});
		var singleMarker = L.marker([46.469794, 30.732835], { icon: myIcon });
		var popup = singleMarker.bindPopup('Наши кексы').openPopup();
		popup.addTo(map);
		//   L.marker([54.59, 73.22]).addTo(map);


		//  Layer Controller ===================
		var baseMaps = {
			// "OSM": osm,
			'Google Street': googleStreets,
			"Google Satellite": googleSat,
			// "Google Street": googleStreets,
			//  "Water color map": watercolor,
		};

		var overlayMaps = {
			// 	// "Marker": singleMarker,
		}

		L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);


		//==============================================
		// ! 2-b  for change Map position - этот кусочек кода для сдвига карты вправо на 140рх
		//========================================================================================================================================================
		// let changeMapPositions = document.querySelector('.leaflet-pane.leaflet-map-pane');
		// console.log(changeMapPositions);
		// changeMapPositions.style.transform = "translate3d(140px,0px,0px)";
		// let mediaQueryPoint = window.matchMedia('(max-width: 1500px)');
		// function changeMapPosition(e) {
		//     if (e.matches) {
		//         changeMapPositions.style.transform = "translate3d(0px,0px,0px)";
		//     } else {
		//         changeMapPositions.style.transform = "translate3d(140px,0px,0px)";
		//     }
		// }
		// mediaQueryPoint.addEventListener('change', changeMapPosition);
		//=================================================================================================
	}
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// header

	const headerElement = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		} else {
			headerElement.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);

	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// Counter in catalog 
	// https://www.youtube.com/watch?v=pIgyoL5FjgI

	// Добавляем прослушку на всем окне
	window.addEventListener("click", function (event) {

		// Объявляем переменную для счетчика
		let counter


		// Проверяем клик строго по кнопкам + либо -
		if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
			// Находим оберту счетчика
			const hoverDescrCounter = event.target.closest('.hover-descr__counter')

			// Находим div с числом счетчика
			counter = hoverDescrCounter.querySelector('[data-counter]')
		}


		// Проверяем является ли элемент по которому был совершен клик кнопкой плюс
		if (event.target.dataset.action === 'plus') {
			counter.innerText = ++counter.innerText
		}

		// Проверяем является ли элемент по которому был совершен клик кнопкой минус
		if (event.target.dataset.action === 'minus') {

			// Перевіряємо що б лічильник був більше 1
			if (parseInt(counter.innerText) > 1) {
				// Изменяем текст в счетчике уменьшая его на 1
				counter.innerText = --counter.innerText
			}

		}
		// -------------------------------------------------------------------
		// Видалити товар у кошику
		if (event.target.dataset.action === 'remove') {

			// Перевірка на товар який знаходиться в кошику
			if (event.target.closest('.card-buy__wrapper')) {
				event.target.closest('.product-info').remove()
			}
		}
		// -------------------------------------------------------------------
		// Закрити кошик
		// if (event.target.dataset.action === 'close') {

		// 	// Перевірка на товар який знаходиться в кошику
		// 	if (event.target.closest('.card-buy')) {
		// 		event.target.closest('.card-buy').remove()
		// 	}
		// }
	})

	// -----------------------------------------------------------------------------------------------
	// -----------------------------------------------------------------------------------------------
	// -----------------------------------------------------------------------------------------------
	// Корзина
	// cart

	// Div всередині кошика, в який ми додаємо товари
	const cardBuyWrapper = document.querySelector('.card-buy__wrapper');

	// Відстежуємо клік на сторінці
	window.addEventListener("click", function (event) {

		// Перевіряємо що  клік був зроблений по кнопці "Добавити в кошик"
		if (event.target.hasAttribute('data-cart')) {

			// Знаходимо карточку з товаром, всередині якого був зроблен клік
			const card = event.target.closest('.card')

			// Збираємо данні с цього товара та записуємо їх в єдиний об'єкт productInfo
			const productInfo = {
				id: card.dataset.id,
				imgSrc: card.querySelector('.card__photo').getAttribute('src'),
				title: card.querySelector('.card__about').innerText,
				price: card.querySelector('.card__price').innerText,
				counter: card.querySelector('[data-counter]').innerText,

			}

			// Перевіряти чи є вже такий товар у кошику
			const itemInCart = cardBuyWrapper.querySelector(`[data-id="${productInfo.id}"]`);
			console.log(itemInCart)

			// Якщо товар є у кошику
			if (itemInCart) {
				const counterElement = itemInCart.querySelector('[data-counter]');
				counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
			}
			else {
				// якщо товара нема в кушику

				// Зібранні данні підставимо у шаблон для товара у кошику
				const cartItemHTML = `
				    <div class="card-buy__product product-info" data-id="${productInfo.id}">
							<div class="product-info__image">
								<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
							</div>
							<div class="product-info__item">
								<div class="product-info__wrapper">
									<h4 class="product-info__name">${productInfo.title}</h4>
									<div class="product-info__sum">
										<span class="product-info__count" data-counter="">${productInfo.counter}</span>
										<span>x</span>
										<span class="product-info__price"><span></span>${productInfo.price}</span>
										<span class="product-info__steady">=</span>
										<div class="product-info__total"><span>$</span> 38</div>
									</div>
								</div>
								<div class="product-info__remove -icon-remove-cart" data-action="remove"></div>
							</div>
						</div>
			`

				// Відобразимо товар у кошику
				cardBuyWrapper.insertAdjacentHTML('afterbegin', cartItemHTML)
			}
			// Скидуємо лічильник доданного товару на "1"
			card.querySelector('[data-counter]').innerText = 1

			// ------------------------------------------------------------------------------------
			// ------------------------------------------------------------------------------------
			// -------------------------------------------------------------------
			// addToCart

			function addToCart(productButton, productInfo) {
				if (!productButton.classList.contains('_hold')) {
					productButton.classList.add('_hold')
					productButton.classList.add('_fly')


					const cart = document.querySelector('.buy-header__icon')
					const product = document.querySelector(`[data-id="${productInfo.id}"]`)
					const productImage = document.querySelector('.card__photo')

					console.log(productImage);

					console.log(product);

					const productImageFly = productImage.cloneNode(true)

					const productImageFlyWidth = productImage.offsetWidth;
					const productImageFlyHeight = productImage.offsetHeight;
					const productImageFlyTop = productImage.getBoundingClientRect().top;
					const productImageFlyLeft = productImage.getBoundingClientRect().left;

					productImageFly.setAttribute('class', '_flyImage _ibg');
					productImageFly.style.cssText =
						`
			left: ${productImageFlyLeft}px;
			top: ${productImageFlyTop}px;
			width: ${productImageFlyWidth}px;
			height: ${productImageFlyHeight}px;
			`;

					document.body.append(productImageFly);

					const cartFlyLeft = cart.getBoundingClientRect().left;
					const cartFlyTop = cart.getBoundingClientRect().top;

					productImageFly.style.cssText =
						`
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity:0;
			`;

					productImageFly.addEventListener('transitionend', function () {
						if (productButton.classList.contains('_fly')) {
							productImageFly.remove();
							updateCart(productButton, productInfo.id);
							productButton.classList.remove('_fly');
						}
					});
				}
			}
			// --------------------------------------------------------------
		}
	})
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// Добавляємо к активної сторінці клас _active для посилань меню
	let link = document.getElementsByClassName('menu__link')

	// призначаємо змінну для класа посилань меню
	let url = document.location.href

	// призначаємо змінну для активної (відкритої) сторінки
	for (let i = 0; i < link.length; i++) {
		if (url == link[i].href) {
			link[i].classList.add('_active')
		}
	}
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
	// ==================================================================================
}