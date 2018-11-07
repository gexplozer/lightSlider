function GafSlider(options) { // основное приложение
	let current = translate = timer = 0, // базовые переменные
			targetBox = qS(options.target).parentNode,
			nodes = {
				controls: (options.dots) ? qS(".controls", targetBox) : null, //кнопки контроля
				sliderDiv: qS(options.target), //родительский блок слайдера
				sliderInner: qS(".sliderInner", targetBox), // внутренний длинный блок
				slides: qSA(".slide", targetBox) // коллекция слайдов
			},
			sliderWidth = nodes.sliderDiv.clientWidth,
			slideWidth = nodes.slides[0].clientWidth, // приравниваем ширину слайда к ширине главного блока
			count = nodes.slides.length; // количество слайдов
			itemsPerSlide = (parseInt (sliderWidth/slideWidth, 10)) - 1;

	//Аппендим элемменты навигации прямо из скрипта без вёрстки
	if (options.dots) for (let i = 0; i < count; ++i) {
		let newEl = document.createElement('span');
		newEl.innerHTML = '<i class="fas fa-circle"></i>';
		newEl.addEventListener("mouseover", function () {
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
		if (options.dots) selectDot();
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
		if (options.speed) {
			clearTimeout(timer);
			timer = setTimeout(moveForward, options.speed);
		}
		changeSlide();
	}

	// крутим слайдер назад
	function moveBack() {
		if (current >= 1) { current-- }
		else if (current <= 0) { current = count - itemsPerSlide };
		restartSlider();
	}

	// крутим слайдер вперёд
	function moveForward() {
		if (current >= count - itemsPerSlide - 1) { current = 0 }
		else if (current < count - 1) { current++ };
		restartSlider();
	}

	// кнопки прокрутки влево и вправо
	qS(".left", targetBox).addEventListener("click", moveBack);
	qS(".right", targetBox).addEventListener("click", moveForward);

	// добавляем свайп влево и вправо для телефона
	nodes.sliderDiv.addEventListener('swiperight', moveBack);
	nodes.sliderDiv.addEventListener('swipeleft', moveForward);

	if (options.speed) {
		// пауза при наведении курсора
		nodes.sliderDiv.addEventListener("mouseover", () => {clearTimeout(timer)});
		nodes.sliderDiv.addEventListener("mouseout", restartSlider);
		// автозапуск слайдера
		moveForward();
	}
}