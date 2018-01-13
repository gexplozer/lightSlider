function lightSlider(interVar) {
	// shortcut для document.querySelector (типа замена джиквери и всё такое)))
	var qS = function(el) {return document.querySelector(el);};
	var qSA = function(el) {return document.querySelectorAll(el);};

	// задаём дефолтные значения для счётчиков, отступов и т.п.
	var show = 1;
	var translate = 0;

	// находим в ДОМ нужные элементы
	var controls = qS(".controls"); //кнопки контроля
	var sliderDiv = qS(".mySlider"); //родительский блок слайдера
	var slideInner = qS(".slideInner"); 
	var myNodeList = qSA(".slide");	

	
	// пишем параметры в переменные
	var slWidth = myNodeList[0].clientWidth;
	var listLength = myNodeList.length;

	// автостарт функции слайдера с интервалом
	interval = setInterval(mySlider, interVar);

	//Аппендим элемменты навигации прямо из скрипта без вёрстки
	for (var i = 0; i < listLength; ++i) {
		var newLi = document.createElement('span');
  		newLi.innerHTML = '<i class="fas fa-circle"></i>';
  		newLi.addEventListener("click", function(){
  			data = this.dataset;
		    show = data.number;
		    restartSlider();
		});
		newLi.setAttribute("DATA-NUMBER", i);
  		controls.appendChild(newLi);
	};
	//находим все кнопочки контроля
	conChilds = controls.children;

	// функция слайдера
	function mySlider() {		
		if ( document.hasFocus() && sliderDiv.classList.contains("fadeEffect")) {
			if (show>=listLength) {show = 0}; // если текущий слайд последний, обнуляем счётчик
			if (show<0) {show = listLength}; // если счётчик слайдов отрицательный, чиним эту фигню

			if (show<listLength) { //реагируем, только если счётчик слайдов имеет адекватное число
				for (var i = 0; i < listLength; ++i) {
				  var element = myNodeList[i]; //
				  var child = conChilds[i];
				  element.style.position = "absolute";
				  element.style.opacity = "0";
				  child.style.color = "#999";
				};
				myNodeList[show].style.position = "relative";
				myNodeList[show].style.opacity = "1";
				conChilds[show].style.color = "#333";
				show++;
			};
        };

        if ( document.hasFocus() && sliderDiv.classList.contains("slideEffect")) {
			if (show>=listLength) {show = 0};

			translate = -1 * slWidth * show + "px";
			slideInner.style.transform = "translateX("+translate+")";
			firstClone = myNodeList[0].cloneNode(true);
			for (var i = 0; i < listLength; ++i) {
				  var child = conChilds[i];
				  child.style.color = "#999";
				};
			conChilds[show].style.color = "#333";
			show++;
        };
	};

	function restartSlider() {
		mySlider();
		clearInterval(interval);
		interval = setInterval(mySlider, interVar);
	}
	

		//прокрутка кнопками вправо и влево
	qS(".left").addEventListener("click", function(){
		show-=2;
		if (show<0) {show = listLength-1};
		restartSlider();
	});
	qS(".right").addEventListener("click", function(){
		if (show>=listLength) {show = 0};
		restartSlider();
	});

	//прикручиваем свайпы влево и вправо
	var hammertime = new Hammer(sliderDiv);
	hammertime.on('swiperight', function(ev) {
		show-=2;
		if (show<0) {show = 0};
		restartSlider();
	});

	hammertime.on('swipeleft', function(ev) {
		if (show==listLength) {return false};
		restartSlider();
	});
};

lightSlider(2000);