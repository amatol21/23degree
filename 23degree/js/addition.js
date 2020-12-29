(function(){

let menu = document.querySelector('.nav-line-menu-item'),
	 menuRect = document.querySelector('.menu-cover-block'),
	 anchors = document.querySelectorAll('a[href*="#"]'),
	 i = 0;

function opened(){
	menu.children[0].style.cssText = 'position: relative; top: 0.8rem; transform: rotate(-45deg); transition: 0.5s';
	menu.children[1].style.cssText = 'transform: rotate(45deg); transition: 0.5s';
	menu.children[2].style.cssText = 'position: relative; display: none; transition: 0.5s';

	menu.children[3].style.display = 'none';

	menuRect.style.top = '0';

	i++;
}


function closed(){
	menu.children[0].style.cssText = 'top: 0; transform: rotate(0deg); transition: 0.5s';
	menu.children[1].style.cssText = 'transform: rotate(0deg); transition: 0.5s';
	menu.children[2].style.cssText = 'top: 0; display: block';

	menu.children[3].style.display = 'block';

	menuRect.style.top = '-150rem';

	i = 0;
}


menu.addEventListener('click', function(){
	event.preventDefault();

	if( i == 0){
		opened();
	}
	else {
		closed();
	}
});


for(let anchor of anchors){
	anchor.addEventListener('click', function(event){
		event.preventDefault();
		document.querySelector(anchor.getAttribute('href')).scrollIntoView({
			behavior: "smooth"
		})
		closed();
	})
}


function calculate() {
	let div1 = document.createElement('div'), 
		 div2 = document.createElement('div'), 
		 p = document.createElement('p'), 
		 calcLine = document.querySelector('.calculate-line-visual-choose'), 
		 buttons = document.querySelector('.calculate-line-visual-choose'),	
		 square = document.querySelector('.calculate-line-visual-scale-range'), 
		 choose = document.getElementsByClassName('calculate-line-numbers-number'), 
		 numberMeters = 0, 
		 sum = 0; 

	choose[0].innerHTML = '0 м<sup>2</sup>';
	choose[1].innerHTML = '0 тг';
	choose[2].innerHTML = '0 тг';


	div1.style.cssText = 
		`width: 50%; 
		padding: 0 3rem 2rem 3rem; 
		border-radius: 0.3rem; 
		background: #f2f8f9; 
		position: absolute`;	

	div2.style.cssText = 
		`width: 2.5rem; 
		height: 2.5rem; 
		background: #f2f8f9; 
		position: relative; 
		margin: 0 auto; 
		transform: rotate(45deg); 
		top: -1.3rem`; 

	p.style.cssText = `margin: 0; 
		color: black; 
		font-size: 1.4rem; 
		text-align: center`;

	div1.prepend(div2);
	div1.append(p);

	
	for(let j = 1; j < 4; j++) {
		buttons.children[j].addEventListener('mouseover', function(){
			let buttonCoord = buttons.children[j].getBoundingClientRect();
			let chooseAreaCoord = calcLine.getBoundingClientRect();

			div1.style.left = (buttonCoord.x - chooseAreaCoord.x + buttonCoord.width / 2 - (chooseAreaCoord.width * 0.5) / 2) + 'px';
			div1.style.top = (buttonCoord.y - chooseAreaCoord.y + buttonCoord.height + 16) + 'px';
			div1.setAttribute('class', 'fade-calc');
			calcLine.append(div1);
			div1.style.opacity = '0.8';

			switch(j) {
				case 1:
					p.textContent = 'План расстановки мебели. Главные рабочие чертежи (план полов, развертки по стенам)';
					break;
				case 2:
					p.textContent = 'План расстановки мебели и 3D визуализация. Все рабочие чертежи (план полов, план потолка, развертки по стенам, план электросетей)';
					break;
				case 3:
					p.textContent = 'Полный план помещения и 3D визуализация. Все чертежи (план полов, план потолка, развертки по стенам, план электросетей) + изготовление моделей в пластике под заказ';
					break;
			}
		})

		buttons.children[j].addEventListener('click', function(){
			event.preventDefault();

			for(let k = 1; k < 4; k++){
				buttons.children[k].style.background = 'transparent';
				buttons.children[k].style.border = '1px solid white';
			}

			buttons.children[j].style.background = '#22a7f0';
			buttons.children[j].style.border = 'none';

		})
	}
	

	for(let j = 1; j < 4; j++) {
		buttons.children[j].addEventListener('mouseleave', function(){
			div1.remove();		
		})
	}


	square.addEventListener('input', function(){
		String(square.value).split('');
		numberMeters = square.value;
		numberMeters = +numberMeters;
		sum = numberMeters * choose[1].textContent.split(' ')[0];
		choose[0].innerHTML = numberMeters.toLocaleString('ru') + ' м<sup>2</sup>';
		choose[2].textContent = sum.toLocaleString('ru') + ' тг';
	})
	

	for(let j = 1; j < 4; j++) {
		buttons.children[j].addEventListener('click', function(){
			switch(j) {
				case 1: 
					choose[1].textContent = 400 + ' тг';
					sum = numberMeters * 400;
					choose[2].textContent = sum.toLocaleString('ru') + ' тг';
					break;
				case 2: 
					choose[1].textContent = 650 + ' тг';
					sum = numberMeters * 650;
					choose[2].textContent = sum.toLocaleString('ru') + ' тг';
					break;
				case 3: 
					choose[1].textContent = 850 + ' тг';
					sum = numberMeters * 850;
					choose[2].textContent = sum.toLocaleString('ru') + ' тг';
					break;
			}
		})
	}

}




function slider(arrClass, leftArrowSlider, rightArrowSlider){
	let k = 0, // переменная-счётчик
		 arr = document.getElementsByClassName(arrClass),	
		 prev = document.getElementById(leftArrowSlider),	
		 next = document.getElementById(rightArrowSlider);	

	for(let elem of arr){
		elem.style.display = 'none';
	};

	arr[k].style.display = 'block';

	prev.addEventListener('click', function(){
		for(let elem of arr){
			elem.style.display = 'none';
		};
		arr[k].setAttribute('class', arrClass);
		if(k == 0){
			k = 6;
		}
		k--;
		arr[k].setAttribute('class', arrClass + ' fade');
		arr[k].style.display = 'block';
	});

	next.addEventListener('click', function(){
		for(let elem of arr){
			elem.style.display = 'none';
		};
		arr[k].setAttribute('class', arrClass);
		if(k == 5){
			k = -1;
		}
		k++;
		arr[k].setAttribute('class', arrClass + ' fade');
		arr[k].style.display = 'block';
	});
}




function portfolioMainPanel(){
	let buttonsArr = document.querySelectorAll('.portfolio-buttons-line-button'), 
		 imgArr = document.querySelectorAll('.portfolio-buttons-line-img'),	
		 sliderArr = document.querySelectorAll('.portfolio-photo-line-slider');	

	buttonsArr[0].style.cssText = 
		`background: #22a7f0; 
		height: 120%; 
		border-bottom-left-radius: 5rem; 
		border-top-left-radius: 5rem; 
		border-bottom-right-radius: 1rem; 
		border-top-right-radius: 1rem; 
		color: white`;

	imgArr[0].style.display = 'none';
	sliderArr[0].style.display = 'block';
	sliderArr[1].style.display = 'none';
	sliderArr[2].style.display = 'none';
	slider('exterior', 'prev-exterior', 'next-exterior');

	for(let i = 0; i < 3; i++){
		buttonsArr[i].addEventListener('click', function(){
			event.preventDefault();
			imgArr[0].style.display = 'inline';
			imgArr[1].style.display = 'inline';
			for(let j = 0; j < 3; j++){
				buttonsArr[j].style.cssText = 
				`background: transparent; 
				height: 100%; 
				border-bottom-left-radius: 0; 
				border-top-left-radius: 0; 
				border-bottom-right-radius: 0; 
				border-top-right-radius: 0; 
				color: #22a7f0`;

				sliderArr[0].style.display = 'none';
				sliderArr[1].style.display = 'none';
				sliderArr[2].style.display = 'none';
			}
			switch (i) {
				case 0:
					buttonsArr[0].style.cssText = 
					`background: #22a7f0; 
					height: 120%; 
					border-bottom-left-radius: 5rem; 
					border-top-left-radius: 5rem; 
					border-bottom-right-radius: 1rem; 
					border-top-right-radius: 1rem; 
					color: white`;
					imgArr[0].style.display = 'none';
					sliderArr[0].style.display = 'block';
					sliderArr[1].style.display = 'none';
					sliderArr[2].style.display = 'none';
					slider('exterior', 'prev-exterior', 'next-exterior');
					break;

				case 1:
					buttonsArr[1].style.cssText = 
					`background: #22a7f0; 
					height: 120%; 
					border-bottom-left-radius: 1rem; 
					border-top-left-radius: 1rem; 
					border-bottom-right-radius: 1rem; 
					border-top-right-radius: 1rem; 
					color: white`;
					imgArr[0].style.display = 'none';
					imgArr[1].style.display = 'none';
					sliderArr[0].style.display = 'none';
					sliderArr[1].style.display = 'block';
					sliderArr[2].style.display = 'none';
					slider('interior', 'prev-interior', 'next-interior');
					break;

				case 2:
					buttonsArr[2].style.cssText = 
					`background: #22a7f0; 
					height: 120%; 
					border-bottom-left-radius: 1rem; 
					border-top-left-radius: 1rem; 
					border-bottom-right-radius: 5rem; 
					border-top-right-radius: 5rem; 
					color: white`;
					imgArr[1].style.display = 'none';
					sliderArr[0].style.display = 'none';
					sliderArr[1].style.display = 'none';
					sliderArr[2].style.display = 'block';
					slider('social', 'prev-social', 'next-social');
					break;
			}
		})
	}
}


function why(){
	let left = document.querySelector('.why-line-left'), 
		 right = document.querySelector('.why-line-right'),	
		 advantageArr = document.getElementsByClassName('why-line-block'),	
		 k = 0;	

	if(document.body.clientWidth < 768){
		for(let i = 0; i < advantageArr.length; i++){
			advantageArr[i].style.display = 'none';
		};

		advantageArr[k].style.display = 'block';

		left.addEventListener('click', function(){
			for(let element of advantageArr){
				element.style.display = 'none';
			}
			if(k == 0) k = 6;
			k--;
			advantageArr[k].style.display = 'block';

		});

		right.addEventListener('click', function(){
			for(let element of advantageArr){
				element.style.display = 'none';
			}
			if(k == 5) k = -1;
			k++;
			advantageArr[k].style.display = 'block';

		})
	}

	else {
		for(let i = 0; i < advantageArr.length; i++){
			advantageArr[i].style.display = 'block';
		};
	}

}




function trust(){
	let imgArr = document.querySelectorAll('.trust-line-slider-img'),
		 square = document.querySelector('.trust-line-slider-range'),
		 k = 5,
		 number;

	if(document.body.clientWidth < 992 && document.body.clientWidth > 767){
		k = 4;
		square.setAttribute('max', 11);
	}
	else if(document.body.clientWidth < 768 && document.body.clientWidth > 575){
		k = 3;
		square.setAttribute('max', 12);
	}
	else if(document.body.clientWidth < 576){
		k = 2;
		square.setAttribute('max', 13);
	}

	for(let i = 0; i < imgArr.length; i++){
		imgArr[i].style.display = 'none';
	}

	for(let i = 0; i < k; i++){
		imgArr[i].style.display = 'inline';
	}

	square.addEventListener('input', function(){
		for(let i = 0; i < imgArr.length; i++){
			imgArr[i].style.display = 'none';
		}

		String(square.value).split('');
		number = +square.value;
		for(let i = number; i < (number + k); i++){
			imgArr[i].style.display = 'inline'; 
		}
	})
}




function modals(){
	let mainSubmit = document.querySelector('#main-submit'),		
		 serviceButton = document.querySelector('#service-button'),		
		 mainInputs = document.querySelectorAll('.main-content-line-form-data-inp'),	
		 fullInputs = document.querySelectorAll('.modal-show-full-input'),	
		 questionsInputs = document.querySelectorAll('.questions-line-form-data'),
		 questionsTextArea = document.querySelector('.questions-line-form-msg'),

		 closeButtons = document.querySelectorAll('.modal-window-content-close'),	
		 dataSubmit = document.querySelector('.modal-window-content-submit'),	
		 calculateSend = document.querySelector('.calculate-line-numbers-submit'),
		 questionsSubmit = document.querySelector('.questions-line-submit'),

		 modals = document.querySelectorAll('.modal'),	
		 fullForm = document.querySelector('.modal-show-full'),	
		 loading = document.querySelector('.modal-show-loading'),	
		 success = document.querySelector('.modal-show-done'),	
		 error = document.querySelector('.modal-show-error'),		
		 params = {		
			name: '',
			email: '',
			phone: '',
			message: '',
			formNumber: 0
		},
		 i = 0,	
		 padding;

	padding = window.innerWidth - document.body.clientWidth;
	padding += 'px';
	
	for(let i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', function(){
			fullForm.style.display = 'none';
			success.style.display = 'none';
			error.style.display = 'none';
			document.body.style.paddingRight = '0';
			document.body.style.overflow = 'visible';
		})
	}
	
	for(let i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(){
			if(event.target == modals[i]){
				fullForm.style.display = 'none';
				success.style.display = 'none';
				error.style.display = 'none';
				document.body.style.paddingRight = '0';
				document.body.style.overflow = 'visible';
			}
		})
	}
	
	mainSubmit.addEventListener('click', function(){
		event.preventDefault();
		params.name = mainInputs[0].value;
		params.email = mainInputs[1].value;
		params.phone = mainInputs[2].value;
		params.message = '';
		params.formNumber = 1;

		requestSending(params);
	});

	dataSubmit.addEventListener('click', function(){
		event.preventDefault();
		params.name = fullInputs[0].value;
		params.email = fullInputs[1].value;
		params.phone = fullInputs[2].value;
		params.message = fullInputs[3].value;;
		params.formNumber = 2;
		requestSending(params);
	});
	
	serviceButton.addEventListener('click', function(){
		event.preventDefault();
		fullForm.style.display = 'flex';
		document.body.style.paddingRight = padding;
		document.body.style.overflow = 'hidden';
	});

	calculateSend.addEventListener('click', function(){
		event.preventDefault();
		fullForm.style.display = 'flex';
		document.body.style.paddingRight = padding;
		document.body.style.overflow = 'hidden'; 
	});

	questionsSubmit.addEventListener('click', function(){
		event.preventDefault();
		params.name = questionsInputs[0].value;
		params.email = questionsInputs[1].value;
		params.phone = questionsInputs[2].value;
		params.message = questionsTextArea.value;;
		params.formNumber = 3;
		requestSending(params);
	});

	
	function requestSending(parameters) {
		
		let requestBody = JSON.stringify(parameters),

			 xhr = new XMLHttpRequest();
		xhr.open('POST', 'server.php', true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(requestBody);
		loading.style.display = 'flex';
		fullForm.style.display = 'none';
		document.body.style.paddingRight = padding;
		document.body.style.overflow = 'hidden';

		xhr.onload = function(){
			loading.style.display = 'none';
			success.style.display = 'flex';

			setTimeout(function(){
				success.style.display = 'none';
				document.body.style.paddingRight = '0';
				document.body.style.overflow = 'visible';
			}, 5000)
		}

		xhr.onerror = function() {
			loading.style.display = 'none';
			error.style.display = 'flex';
			setTimeout(function(){
				error.style.display = 'none';
				document.body.style.paddingRight = '0';
				document.body.style.overflow = 'visible';
			}, 5000);
		};
	}
}


calculate();
portfolioMainPanel();
why();
trust();


modals();


})();















































