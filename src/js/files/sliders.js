/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Lazy, Autoplay } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.swiper')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.swiper', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,

			// touchRatio: 0,
			// simulateTouch: false,
			loop: true,
			// preloadImages: false,
			// lazy: true,


			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},


			// Пагинация

			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты

			// breakpoints: {
			// 320: {
			// 	slidesPerView: 1,
			// 	spaceBetween: 0,
			// 	autoHeight: true,
			// },
			// 768: {
			// 	slidesPerView: 2,
			// 	spaceBetween: 20,
			// },
			// 992: {
			// 	slidesPerView: 3,
			// 	spaceBetween: 20,
			// },
			// 1268: {
			// 	slidesPerView: 4,
			// 	spaceBetween: 30,
			// },
			// },

			// События
			on: {

			}
		});
	}

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	// initSlidersScroll();
});

// =============================================
// catalog swiper
//BildSlider

// let sliders = document.querySelectorAll('._swiper');
// if (sliders) {
// 	for (let index = 0; index < sliders.length; index++) {
// 		let slider = sliders[index];
// 		if (!slider.classList.contains('swiper-bild')) {
// 			let slider_items = slider.children;
// 			if (slider_items) {
// 				for (let index = 0; index < slider_items.length; index++) {
// 					let el = slider_items[index];
// 					el.classList.add('swiper-slide');
// 				}
// 			}
// 			let slider_content = slider.innerHTML;
// 			let slider_wrapper = document.createElement('div');
// 			slider_wrapper.classList.add('swiper-wrapper');
// 			slider_wrapper.innerHTML = slider_content;
// 			slider.innerHTML = '';
// 			slider.appendChild(slider_wrapper);
// 			slider.classList.add('swiper-bild');

// 			if (slider.classList.contains('_swiper_scroll')) {
// 				let sliderScroll = document.createElement('div');
// 				sliderScroll.classList.add('swiper-scrollbar');
// 				slider.appendChild(sliderScroll);
// 			}
// 		}
// 		if (slider.classList.contains('_gallery')) {
// 			//slider.data('lightGallery').destroy(true);
// 		}
// 	}
// 	sliders_bild_callback();
// }
// function sliders_bild_callback(params) { }


// if (document.querySelector('.slider-tips__body')) {
// 	new Swiper('.slider-tips__body', {
// 		observer: true,
// 		observeParents: true,
// 		slidesPerView: 3,
// 		spaceBetween: 32,
// 		speed: 800,
// 		loop: true,
// 		watchOverflow: true,
// 		// Dotts
// 		// pagination: {
// 		// 	el: '.slider-tips__dotts',
// 		// 	clickable: true,
// 		// },
// 		// Arrows
// 		// navigation: {
// 		// 	nextEl: '.slider-tips .slider-arrow_next',
// 		// 	prevEl: '.slider-tips .slider-arrow_prev',
// 		// },
// 		breakpoints: {
// 			// when window width is >= 320px
// 			// 320: {
// 			// 	slidesPerView: 1.1,
// 			// 	spaceBetween: 15
// 			// },
// 			// when window width is >= 768px
// 			// 768: {
// 			// 	slidesPerView: 2,
// 			// 	spaceBetween: 20
// 			// },
// 			// when window width is >= 992px
// 			// 992: {
// 			// 	slidesPerView: 3,
// 			// 	spaceBetween: 32
// 			// }
// 		}
// 	})
// }
// if (screen.width < 768) {
// 	console.log('Less than 960');
console.log(screen.width);

let innerWidth = window.innerWidth;
window.addEventListener('resize', () => {
	innerWidth = window.innerWidth;

});

if (innerWidth <= 767.98) {
	console.log(innerWidth);
	let sliders = document.querySelectorAll('._swiper');
	if (sliders) {
		for (let index = 0; index < sliders.length; index++) {
			let slider = sliders[index];
			if (!slider.classList.contains('swiper-bild')) {
				let slider_items = slider.children;
				if (slider_items) {
					for (let index = 0; index < slider_items.length; index++) {
						let el = slider_items[index];
						el.classList.add('swiper-slide');
					}
				}
				let slider_content = slider.innerHTML;
				let slider_wrapper = document.createElement('div');
				slider_wrapper.classList.add('swiper-wrapper');
				slider_wrapper.innerHTML = slider_content;
				slider.innerHTML = '';
				slider.appendChild(slider_wrapper);
				slider.classList.add('swiper-bild');

				if (slider.classList.contains('_swiper_scroll')) {
					let sliderScroll = document.createElement('div');
					sliderScroll.classList.add('swiper-scrollbar');
					slider.appendChild(sliderScroll);
				}
			}
			if (slider.classList.contains('_gallery')) {
				//slider.data('lightGallery').destroy(true);
			}
		}
		sliders_bild_callback();
	}
	function sliders_bild_callback(params) { }


	if (document.querySelector('.slider-catalog__items_slider ')) {
		new Swiper('.slider-catalog__items_slider ', {
			observer: true,
			observeParents: true,
			slidesPerView: 1.4,
			spaceBetween: 32,
			speed: 800,
			loop: true,
			watchOverflow: true,
			// Dotts
			// pagination: {
			// 	el: '.slider-tips__dotts',
			// 	clickable: true,
			// },
			// Arrows
			// navigation: {
			// 	nextEl: '.slider-tips .slider-arrow_next',
			// 	prevEl: '.slider-tips .slider-arrow_prev',
			// },
			breakpoints: {
				// when window width is >= 320px
				// 320: {
				// 	slidesPerView: 1.4,
				// 	spaceBetween: 15
				// },
				// when window width is >= 768px
				600: {
					slidesPerView: 1.5,
					spaceBetween: 20
				},
				// when window width is >= 992px
				// 992: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 32
				// }
			}
		})
	}
}
