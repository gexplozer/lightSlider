# (c)2018 
# author: Gafar Dzhemilov
# telegram: @explozer

Getting started:
	include CSS and JS
	<link rel="stylesheet" type="text/css" href="css/slider.css"> //style
	<script defer src="https://use.fontawesome.com/releases/v5.0.4/js/all.js"></script> //font awesome 5 icons
	<script src="js/hammer.min.js"></script> //swipe gestures library
	<script src="js/slider.js"></script> //main js


Make markup. For example (classes are important):
		<div>
			<div class="mySlider slideEffect">
				<span class="left"><i class="fas fa-angle-left"></i></span>
				<div class="slideInner">
					<div class="slide">	
						<img src="img/img01.jpg">
					</div>
					<div class="slide">
						<img src="img/img02.jpg">
					</div>					
					<div class="slide">
						<img src="img/img03.jpg">
					</div>						
					<div class="slide">
						<img src="img/img04.jpg">
					</div>
					<div class="slide">
						<img src="img/img05.jpg">
					</div>
				</div>
				<span class="right"><i class="fas fa-angle-right"></i></span>
			</div>
			<ul class="controls"></ul>
		</div>