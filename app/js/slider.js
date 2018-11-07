function GafSlider(options) { // основное приложение
// CONSTRUCTOR
	this.current = this.translate = this.timer = 0; // базовые переменные
	this.targetBox = qS(options.target).parentNode;
	this.nodes = {
		controls: (options.dots) ? qS(".controls", this.targetBox) : null, //кнопки контроля
		sliderDiv: qS(options.target), //родительский блок слайдера
		sliderInner: qS(".sliderInner", this.targetBox), // внутренний длинный блок
		slides: qSA(".slide", this.targetBox) // коллекция слайдов
		};
	this.speed = options.speed;		
	this.dots = options.dots;

	this.getDimensions = () => {
		this.sliderWidth = this.nodes.sliderDiv.clientWidth;
		this.slideWidth = this.nodes.slides[0].clientWidth; // ищем ширину слайда
		this.count = this.nodes.slides.length; // количество слайдов
		this.itemsPerSlide = (this.sliderWidth / this.slideWidth);
		this.itemsPerSlide = Math.round(this.itemsPerSlide) - 1;
	}
	this.getDimensions();

	// замена слайда
	this.changeSlide = () => {
		this.translate = -1 * this.slideWidth * this.current;
		this.nodes.sliderInner.style.transform = `translateX(${this.translate}px)`;
		if (this.dots) this.selectDot();
	}

	// обновляем точки
	this.selectDot = () => {
		[].forEach.call(this.nodes.controls.children, el => {
			el.style.color = "#999";
		});
		this.nodes.controls.children[this.current].style.color = "#333";
	}

	// новый цикл приложения
	this.restartSlider = (e) => {
		if (this.speed) {
			clearTimeout(this.timer);
			this.timer = setTimeout(this.moveForward, this.speed);
		}
		if (e && e.relatedTarget.dataset.number) this.current = e.relatedTarget.dataset.number;
		this.changeSlide();
	}

	// крутим слайдер назад
	this.moveBack = () => {
		if (this.current >= 1) { this.current-- }
		else if (this.current <= 0) { this.current = this.count - this.itemsPerSlide - 1 };
		this.restartSlider();
	}

	// крутим слайдер вперёд
	this.moveForward = (evt) => {
		console.log(evt);
		if (this.current >= this.count - this.itemsPerSlide - 1) { this.current = 0 }
		else if (this.current < this.count - 1) { this.current++ };
		this.restartSlider();
	}

	// Тело функции
	(() => {
		//Аппендим элемменты навигации прямо из скрипта без вёрстки
		if (this.dots) for (let i = 0; i < this.count - this.itemsPerSlide; ++i) {
			let newEl = document.createElement('span');
			newEl.innerHTML = '<i class="fas fa-circle"></i>';
			newEl.addEventListener("mouseover", this.restartSlider);
			newEl.setAttribute("data-number", i);
			this.nodes.controls.appendChild(newEl);
		};// кнопки прокрутки влево и вправо

		qS(".left", this.targetBox).addEventListener("click", this.moveBack);
		qS(".right", this.targetBox).addEventListener("click", this.moveForward);

		// добавляем свайп влево и вправо для телефона
		this.nodes.sliderDiv.addEventListener('swiperight', this.moveBack);
		this.nodes.sliderDiv.addEventListener('swipeleft', this.moveForward);
		// пересчёт переменных после ресайза окна
		window.addEventListener("resize", this.getDimensions);

		if (this.speed) {
			// пауза при наведении курсора
			this.nodes.sliderDiv.addEventListener("mouseover", () => { clearTimeout(this.timer) });
			this.nodes.sliderDiv.addEventListener("mouseout", this.restartSlider);
			// автозапуск слайдера
			this.moveForward();
		}
	})();
}