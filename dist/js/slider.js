if (qS(".mySlider")) document.addEventListener("DOMContentLoaded", startSlider(1000));

function startSlider(intervalTime) { // основное приложение
	let current = translate = timer = 0, // базовые переменные
			nodes = {
				controls: qS(".controls"), //кнопки контроля
				sliderDiv: qS(".mySlider"), //родительский блок слайдера
				sliderInner: qS(".sliderInner"), // внутренний длинный блок
				slides: qSA(".slide") // коллекция слайдов
			},
			slideWidth = nodes.sliderDiv.clientWidth, // приравниваем ширину слайда к ширине главного блока
			count = nodes.slides.length; // количество слайдов

	//Аппендим элемменты навигации прямо из скрипта без вёрстки
	for (let i = 0; i < count; ++i) {
		let newEl = document.createElement('span');
		newEl.innerHTML = '<i class="fas fa-circle"></i>';
		newEl.addEventListener("click", function () {
			current = this.dataset.number;
			restartSlider();
		});
		newEl.setAttribute("data-number", i);
		nodes.controls.appendChild(newEl);
	};

	// замена слайда
	function changeSlide() {
		translate = -1 * slideWidth * current;
		nodes.sliderInner.style.transform = `translateX(${translate}px)`;
		selectDot();
	}

	// обновляем точки
	function selectDot () {
		[].forEach.call(nodes.controls.children, el => {
			el.style.color = "#999";
		});
		nodes.controls.children[current].style.color = "#333";
	}

	// новый цикл приложения
	function restartSlider() {
		clearTimeout(timer);
		changeSlide();
		timer = setTimeout(moveForward, intervalTime);
	}

	// крутим слайдер назад
	function moveBack() {
		if (current >= 1) { current-- }
		else if (current <= 0) { current = count - 1 };
		restartSlider();
	}

	// крутим слайдер вперёд
	function moveForward() {
		if (current >= count - 1) { current = 0 }
		else if (current < count - 1) { current++ };
		restartSlider();
	}

	// кнопки прокрутки влево и вправо
	qS(".left").addEventListener("click", moveBack);
	qS(".right").addEventListener("click", moveForward);

	// добавляем свайп влево и вправо для телефона
	nodes.sliderDiv.addEventListener('swiperight', moveBack);
	nodes.sliderDiv.addEventListener('swipeleft', moveForward);

	// пауза при наведении курсора
	nodes.sliderInner.addEventListener("mouseover", () => {clearTimeout(timer)});
	nodes.sliderInner.addEventListener("mouseout", restartSlider);
	moveForward(); // первый запуск слайдера
}