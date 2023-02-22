var Webflow = Webflow || [];
Webflow.push(function () {



/*-------------------------------------------------------*/
/* SPLIT TEXT CODE                                       */
/*-------------------------------------------------------*/

let splitTypeReady = setInterval(function () {

  if (window.SplitType && window.gsap && window.ScrollTrigger) {

  // if (typeof SplitType != 'undefined' && typeof gsap != 'undefined' && typeof ScrollTrigger == 'function') {

    clearInterval(splitTypeReady);
    gsap.registerPlugin(ScrollTrigger);

    typeSplit = [];

    // Split the text up
    function runSplit() {
      typeSplit[0] = new SplitType('#split-text', {
        types: "lines, words"
      });
      createAnimation();
    }
    runSplit();

    // Update on window resize
    let windowWidth = $(window).innerWidth();
    window.addEventListener("resize", function () {
      if (windowWidth !== $(window).innerWidth()) {
        windowWidth = $(window).innerWidth();
        typeSplit.forEach((item, i) => {
          item.revert();
        });
        runSplit();
      }
    });



    function createAnimation() {
      $(".line").each(function (index) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this), // trigger element - viewport
            start: "top 65%",
            end: "bottom 65%",
            scrub: 1
          }
        });
        tl.to($(this), {
          backgroundPosition: "0% 50%",
          duration: 1
        });
      });
    }
  }
}, 50);

/*-------------------------------------------------------*/
/* SPLIT TEXT CODE                                       */
/*-------------------------------------------------------*/










/*-------------------------------------------------------*/
/* GLOBAL VARIABLES                                      */
/*-------------------------------------------------------*/

  let answers = []; // array storing user's answers
  const slides = document.querySelectorAll('.quiz-slide'); // all slides

  slides.forEach((slide, i) => {
    slide.classList.remove('is-active');
    if (i != 0) slide.style.display = 'none';
  });

/*-------------------------------------------------------*/
/* GLOBAL VARIABLES                                      */
/*-------------------------------------------------------*/


function stackedCards(objId, isInitialRound) {

		const stackedOptions = 'Bottom'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
		const rotate = false; //Activate the elements' rotation for each move on stacked cards.
		let items = 2; //Number of visible elements when the stacked options are bottom or top.
		const elementsMargin = 0; //Define the distance of each element when the stacked options are bottom or top.
		const useOverlays = false; //Enable or disable the overlays for swipe elements.
		let maxElements; //Total of stacked cards on DOM.
		let currentPosition = 0; //Keep the position of active stacked card.
		const velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
		let topObj; //Keep the swipe top properties.
		let rightObj; //Keep the swipe right properties.
		let leftObj; //Keep the swipe left properties.
		let listElNodesObj; //Keep the list of nodes from stacked cards.
		let listElNodesWidth; //Keep the stacked cards width.
		let currentElementObj; //Keep the stacked card element to swipe.
    let progressElement;
		let stackedCardsObj;
		let isFirstTime = true;
		let elementHeight;
		let obj;
		let elTrans;


		obj = objId; // document.getElementById('stacked-cards-block');
		stackedCardsObj = obj.querySelector('.stacked-cards-container');
		listElNodesObj = stackedCardsObj.children;
    progressElement = obj.parentNode.querySelector('.progresbar_active');
    progressElement.style.width = '0px';

    const questions = listElNodesObj;
    const questionsLenght = questions.length;


		topObj = obj.querySelector('.stackedcards-overlay.top');
		rightObj = obj.querySelector('.stackedcards-overlay.right');
		leftObj = obj.querySelector('.stackedcards-overlay.left');

		countElements();
		currentElement();
		listElNodesWidth = stackedCardsObj.offsetWidth;
		currentElementObj = listElNodesObj[0];
		updateUi();

		//Prepare elements on DOM
		addMargin = elementsMargin * (items -1) + 'px';

		if(stackedOptions === "Top"){

			for(i = items; i < maxElements; i++){
				listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
			}

			elTrans = elementsMargin * (items - 1);

			stackedCardsObj.style.marginBottom = addMargin;

		} else if(stackedOptions === "Bottom"){

			for(i = items; i < maxElements; i++){
				listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');
			}

			elTrans = 0;

			stackedCardsObj.style.marginBottom = addMargin;

		} else if (stackedOptions === "None"){

			for(i = items; i < maxElements; i++){
				listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
			}

			elTrans = 0;

		}

		for(i = items; i < maxElements; i++){
			listElNodesObj[i].style.zIndex = 0;
			listElNodesObj[i].style.opacity = 0;
			listElNodesObj[i].style.webkitTransform ='scale(' + (1 - (items * 0.04)) +') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
			listElNodesObj[i].style.transform ='scale(' + (1 - (items * 0.04)) +') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
		}

		if(listElNodesObj[currentPosition]){
			listElNodesObj[currentPosition].classList.add('stackedcards-active');
		}

		if(useOverlays){
			leftObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
			leftObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';

			rightObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
			rightObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';

			topObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
			topObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';

		} else {
			// leftObj.className = '';
			// rightObj.className = '';
			// topObj.className = '';
      //
			// leftObj.classList.add('stackedcards-overlay-hidden');
			// rightObj.classList.add('stackedcards-overlay-hidden');
			// topObj.classList.add('stackedcards-overlay-hidden');
		}

		//Remove class init
		setTimeout(function() {
			obj.classList.remove('init');
		},150);


		function backToMiddle() {

			removeNoTransition();
			transformUi(0, 0, 1, currentElementObj);

			if(useOverlays){
				transformUi(0, 0, 0, leftObj);
				transformUi(0, 0, 0, rightObj);
				transformUi(0, 0, 0, topObj);
			}

			setZindex(5);

			if(!(currentPosition >= maxElements)){
				//roll back the opacity of second element
				if((currentPosition + 1) < maxElements){
					listElNodesObj[currentPosition + 1].style.opacity = '.8';
				}
			}
		};

		// Usable functions
		function countElements() {
			maxElements = listElNodesObj.length;
			if(items > maxElements){
				items = maxElements;
			}
		};

		//Keep the active card.
		function currentElement() {
		  currentElementObj = listElNodesObj[currentPosition];
		};

		//Functions to swipe left elements on logic external action.
		function onActionLeft() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays) {
					leftObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
					leftObj.style.zIndex = '8';
					transformUi(0, 0, 1, leftObj);

				}

				setTimeout(function() {
					onSwipeLeft();
					resetOverlayLeft();
				},300);
			}
		};

		//Functions to swipe right elements on logic external action.
		function onActionRight() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays) {
					rightObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
					rightObj.style.zIndex = '8';
					transformUi(0, 0, 1, rightObj);
				}

				setTimeout(function(){
					onSwipeRight();
					resetOverlayRight();
				},300);
			}
		};

		//Functions to swipe top elements on logic external action.
		function onActionTop() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays) {
					leftObj.classList.remove('no-transition');
					rightObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
					topObj.style.zIndex = '8';
					transformUi(0, 0, 1, topObj);
				}

				setTimeout(function(){
					onSwipeTop();
					resetOverlays();
				}, 0); //wait animations end
			}
		};

		//Swipe active card to left.
		function onSwipeLeft() {
			removeNoTransition();
			transformUi(-1000, 0, 0, currentElementObj);
			if(useOverlays){
				transformUi(-1000, 0, 0, leftObj); //Move leftOverlay
				transformUi(-1000, 0, 0, topObj); //Move topOverlay
				resetOverlayLeft();
			}
			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			setActiveHidden();
		};

		//Swipe active card to right.
		function onSwipeRight() {
			removeNoTransition();
			transformUi(1000, 0, 0, currentElementObj);
			if(useOverlays){
				transformUi(1000, 0, 0, rightObj); //Move rightOverlay
				transformUi(1000, 0, 0, topObj); //Move topOverlay
				resetOverlayRight();
			}

			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			setActiveHidden();
		};

		//Swipe active card to top.
		function onSwipeTop() {
			removeNoTransition();
			transformUi(0, -1000, 0, currentElementObj);
			if(useOverlays){
				transformUi(0, -1000, 0, leftObj); //Move leftOverlay
				transformUi(0, -1000, 0, rightObj); //Move rightOverlay
				transformUi(0, -1000, 0, topObj); //Move topOverlay
				resetOverlays();
			}

			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			setActiveHidden();
		};

		//Remove transitions from all elements to be moved in each swipe movement to improve perfomance of stacked cards.
		function removeNoTransition() {
			if(listElNodesObj[currentPosition]){

				if(useOverlays) {
					leftObj.classList.remove('no-transition');
					rightObj.classList.remove('no-transition');
					topObj.classList.remove('no-transition');
				}

				listElNodesObj[currentPosition].classList.remove('no-transition');
				listElNodesObj[currentPosition].style.zIndex = 6;
			}

		};

		//Move the overlay left to initial position.
		function resetOverlayLeft() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays){
					setTimeout(function(){

						if(stackedOptions === "Top"){

							elTrans = elementsMargin * (items - 1);

						} else if(stackedOptions === "Bottom" || stackedOptions === "None"){

							elTrans = 0;

						}

						if(!isFirstTime){

							leftObj.classList.add('no-transition');
							topObj.classList.add('no-transition');

						}

						requestAnimationFrame(function(){

							leftObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.opacity = '0';

							topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							topObj.style.opacity = '0';

						});

					},300);

					isFirstTime = false;
				}
			}
	   };

		//Move the overlay right to initial position.
		function resetOverlayRight() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays){
					setTimeout(function(){

						if(stackedOptions === "Top"){+2

							elTrans = elementsMargin * (items - 1);

						} else if(stackedOptions === "Bottom" || stackedOptions === "None"){

							elTrans = 0;

						}

						if(!isFirstTime){

							rightObj.classList.add('no-transition');
							topObj.classList.add('no-transition');

						}

						requestAnimationFrame(function(){

							rightObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.opacity = '0';

							topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							topObj.style.opacity = '0';

						});

					},300);

					isFirstTime = false;
				}
			}
	   };

		//Move the overlays to initial position.
		function resetOverlays() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays){

					setTimeout(function(){
						if(stackedOptions === "Top"){

							elTrans = elementsMargin * (items - 1);

						} else if(stackedOptions === "Bottom" || stackedOptions === "None"){

							elTrans = 0;

						}

						if(!isFirstTime){

							leftObj.classList.add('no-transition');
							rightObj.classList.add('no-transition');
							topObj.classList.add('no-transition');

						}

						requestAnimationFrame(function(){

							leftObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.opacity = '0';

							rightObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.opacity = '0';

							topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							topObj.style.opacity = '0';

						});

					},300);	// wait for animations time

					isFirstTime = false;
				}
			}
	   };

		function setActiveHidden() {
			if(!(currentPosition >= maxElements)){
				listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
				listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
				listElNodesObj[currentPosition].classList.add('stackedcards-active');
			}
		};

		//Set the new z-index for specific card.
		function setZindex(zIndex) {
			if(listElNodesObj[currentPosition]){
				listElNodesObj[currentPosition].style.zIndex = zIndex;
			}
		};

    // Remove element from the DOM after swipe. To use this method you need to call this function in onSwipeLeft, onSwipeRight and onSwipeTop and put the method just above the variable 'currentPosition = currentPosition + 1'.
    //On the actions onSwipeLeft, onSwipeRight and onSwipeTop you need to remove the currentPosition variable (currentPosition = currentPosition + 1) and the function setActiveHidden

		function removeElement() {
      currentElementObj.remove();
      if(!(currentPosition >= maxElements)){
				listElNodesObj[currentPosition].classList.add('stackedcards-active');
			}
		};

		//Add translate X and Y to active card for each frame.
		function transformUi(moveX,moveY,opacity,elementObj) {
			requestAnimationFrame(function(){
				var element = elementObj;

				// Function to generate rotate value
				function RotateRegulator(value) {
				   if(value/10 > 15) {
					   return 15;
				   }
				   else if(value/10 < -15) {
					   return -15;
				   }
				   return value/10;
				}

				if(rotate){
					rotateElement = RotateRegulator(moveX);
				} else {
					rotateElement = 0;
				}

				if(stackedOptions === "Top"){
					elTrans = elementsMargin * (items - 1);
					if(element){
						element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.opacity = opacity;
					}
				} else if(stackedOptions === "Bottom" || stackedOptions === "None"){

					if(element){
						element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.opacity = opacity;
					}

				}
			});
		};

		//Action to update all elements on the DOM for each stacked card.
		function updateUi() {
			requestAnimationFrame(function(){
				elTrans = 0;
        elRotate = -13;
				var elZindex = 5;
				var elScale = 1;
				var elOpac = 1;
				var elTransTop = items;
				var elTransInc = elementsMargin;

				for(i = currentPosition; i < (currentPosition + items); i++){
					if(listElNodesObj[i]){
						if(stackedOptions === "Top"){

							listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');

							if(useOverlays){
								leftObj.classList.add('stackedcards-origin-top');
								rightObj.classList.add('stackedcards-origin-top');
								topObj.classList.add('stackedcards-origin-top');
							}

							elTrans = elTransInc * elTransTop;
							elTransTop--;

						} else if(stackedOptions === "Bottom"){
							listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');

							if(useOverlays){
								leftObj.classList.add('stackedcards-origin-bottom');
								rightObj.classList.add('stackedcards-origin-bottom');
								topObj.classList.add('stackedcards-origin-bottom');
							}

              elRotate = elRotate + 13;
							elTrans = elTrans + elTransInc;

						} else if (stackedOptions === "None"){

							listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
							elTrans = elTrans + elTransInc;

						}

            // listElNodesObj[i].style.transform ='scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
						// listElNodesObj[i].style.webkitTransform ='scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';


						listElNodesObj[i].style.transform ='rotate(' + elRotate + 'deg) scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
						listElNodesObj[i].style.webkitTransform ='rotate(' + elRotate + 'deg) scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
						listElNodesObj[i].style.opacity = elOpac;
						listElNodesObj[i].style.zIndex = elZindex;
            listElNodesObj[i].querySelector('.card-item_grain').style.transform ='rotate(' + (-elRotate) + 'deg) scale(1) translateX(0) translateY(0) translateZ(0)';
            listElNodesObj[i].querySelector('.card-item_grain').style.webkitTransform ='rotate(' + (-elRotate) + 'deg) scale(1) translateX(0) translateY(0) translateZ(0)';

            if (i == currentPosition) {
              listElNodesObj[i].querySelector('.card-item_grain').style.opacity = 0;
              listElNodesObj[i].querySelector('.card-item_grain').style.transform ='rotate(' + (elRotate) + 'deg) scale(1) translateX(0) translateY(0) translateZ(0)';
              listElNodesObj[i].querySelector('.card-item_grain').style.webkitTransform ='rotate(' + (elRotate) + 'deg) scale(1) translateX(0) translateY(0) translateZ(0)';
            }

						elScale = elScale// - 0.04;
						// elOpac = elOpac - (1 / items);
						elZindex -= 2;
					}
				}

			});

		};

		//Touch events block
		var element = obj;
		var startTime;
		var startX;
		var startY;
		var translateX;
		var translateY;
		var currentX;
		var currentY;
		var touchingElement = false;
		var timeTaken;
		var topOpacity;
		var rightOpacity;
		var leftOpacity;

		function setOverlayOpacity() {

			topOpacity = (((translateY + (elementHeight) / 2) / 100) * -1);
			rightOpacity = translateX / 100;
			leftOpacity = ((translateX / 100) * -1);


			if(topOpacity > 1) {
				topOpacity = 1;
			}

			if(rightOpacity > 1) {
				rightOpacity = 1;
			}

			if(leftOpacity > 1) {
				leftOpacity = 1;
			}
		}
		function gestureStart(evt) {
			startTime = new Date().getTime();

			startX = evt.changedTouches[0].clientX;
			startY = evt.changedTouches[0].clientY;

			currentX = startX;
			currentY = startY;

			setOverlayOpacity();

			touchingElement = true;
			if(!(currentPosition >= maxElements)){
				if(listElNodesObj[currentPosition]){
					listElNodesObj[currentPosition].classList.add('no-transition');
					setZindex(6);

					if(useOverlays){
						leftObj.classList.add('no-transition');
						rightObj.classList.add('no-transition');
						topObj.classList.add('no-transition');
					}

					if((currentPosition + 1) < maxElements){
						listElNodesObj[currentPosition + 1].style.opacity = '1';
					}

					elementHeight = listElNodesObj[currentPosition].offsetHeight / 3;
				}

			}

		};
		function gestureMove(evt) {
			currentX = evt.changedTouches[0].pageX;
			currentY = evt.changedTouches[0].pageY;

			translateX = currentX - startX;
			translateY = currentY - startY;

			setOverlayOpacity();

			if(!(currentPosition >= maxElements)){
				evt.preventDefault();
				transformUi(translateX, translateY, 1, currentElementObj);

				if(useOverlays){
					transformUi(translateX, translateY, topOpacity, topObj);

					if(translateX < 0){
						transformUi(translateX, translateY, leftOpacity, leftObj);
						transformUi(0, 0, 0, rightObj);

					} else if(translateX > 0){
						transformUi(translateX, translateY, rightOpacity, rightObj);
						transformUi(0, 0, 0, leftObj);
					}

					if(useOverlays){
						leftObj.style.zIndex = 8;
						rightObj.style.zIndex = 8;
						topObj.style.zIndex = 7;
					}

				}

			}

		};
		function gestureEnd(evt) {

			if(!touchingElement){
				return;
			}

			translateX = currentX - startX;
			translateY = currentY - startY;

			timeTaken = new Date().getTime() - startTime;

			touchingElement = false;

			if(!(currentPosition >= maxElements)){
				if(translateY < (elementHeight * -1) && translateX > ((listElNodesWidth / 2) * -1) && translateX < (listElNodesWidth / 2)){  //is Top?

					if(translateY < (elementHeight * -1) || (Math.abs(translateY) / timeTaken > velocity)){ // Did It Move To Top?
						onSwipeTop();
					} else {
						backToMiddle();
					}

				} else {

					if(translateX < 0){
						if(translateX < ((listElNodesWidth / 2) * -1) || (Math.abs(translateX) / timeTaken > velocity)){ // Did It Move To Left?
							onSwipeLeft();
						} else {
							backToMiddle();
						}
					} else if(translateX > 0) {

						if (translateX > (listElNodesWidth / 2) && (Math.abs(translateX) / timeTaken > velocity)){ // Did It Move To Right?
							onSwipeRight();
						} else {
							backToMiddle();
						}

					}
				}
			}
		};

		// element.addEventListener('touchstart', gestureStart, false);
		// element.addEventListener('touchmove', gestureMove, false);
		// element.addEventListener('touchend', gestureEnd, false);

    // let buttonSubmit = document.querySelectorAll('.card-item_button');
    // buttonSubmit.forEach((item, i) => {
    //   item.addEventListener('click', onActionTop, false);
    // });


		//Add listeners to call global action for swipe cards
		// var buttonLeft = document.querySelector('.left-action');
		// var buttonTop = document.querySelector('.top-action');
		// var buttonRight = document.querySelector('.right-action');
    //
		// buttonLeft.addEventListener('click', onActionLeft, false);
		// buttonTop.addEventListener('click', onActionTop, false);
		// buttonRight.addEventListener('click', onActionRight, false);


    let quizTimer;
    let qountdown;

    function invocation() {
      let x = 5;
      document.querySelector('.question_countdown').innerHTML = x;

      qountdown = setInterval(function() {
        x--;
        document.querySelector('.question_countdown').innerHTML = x;

      }, 1000);

      quizTimer = setInterval(function () {
        clearInterval(qountdown)
        moveNextItem();
      }, 5000);
    }


    // setup all questions...
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {

      questions[questionIndex].querySelector('[quiz-element="active-question-index"]').innerHTML = questionIndex + 1;
      questions[questionIndex].querySelector('[quiz-element="total-question-index"]').innerHTML = questions.length;

      if (isInitialRound) {
        answers.push({
          question: questions[questionIndex].querySelector('[quiz-element="question"]').innerHTML,
          answerFast: undefined,
          answerSlow: undefined
        })
      }

      questions[questionIndex].querySelectorAll('.card-item_button').forEach((button, i) => {
        button.addEventListener('click', function(){
          moveNextItem(button.getAttribute('aria-roledescription'));
        }, false);
      });

    }


    document.addEventListener('keydown', onKeydown);

    function onKeydown() {
      switch (event.keyCode) {
        case 37:
          console.log('left arrow')
          console.log(questions[currentPosition])
          moveNextItem(
            questions[currentPosition].querySelectorAll('.card-item_button')[0].getAttribute('aria-roledescription')
          );
          break;
        case 39:
          console.log('right arrow')
          moveNextItem(
            questions[currentPosition].querySelectorAll('.card-item_button')[1].getAttribute('aria-roledescription')
          );
          break;
        default:
      }
    }



    function moveNextItem(questionValue) {

      onActionTop();
      clearTimeout(quizTimer)
      clearTimeout(qountdown)

      $(progressElement).stop(true, false);
      $(progressElement).animate({
        width: (currentPosition + 1) / maxElements * 100 + '%',
      }, 500);



      if (isInitialRound) {
        answers[currentPosition].answerFast = questionValue || undefined;

        sendGA('event', 'question_answer', {
          'uuid': uuid4,
          'question': answers[currentPosition].question,
          'question_index': currentPosition,
          'question_total': maxElements,
          'answer': questionValue || null,
          'round': 1,
          'ul': document.documentElement.lang
        });

      } else {
        answers[currentPosition].answerSlow = questionValue || undefined;

        sendGA('event', 'question_answer', {
          'uuid': uuid4,
          'question': answers[currentPosition].question,
          'question_index': currentPosition,
          'question_total': maxElements,
          'answer': questionValue || null,
          'round': 2,
          'ul': document.documentElement.lang
        });

      }

      console.log(answers[currentPosition])

      if (currentPosition === maxElements - 1){

        document.removeEventListener('keydown', onKeydown, false); // remove addEventListener

        if (isInitialRound) {
          sendGA('event', 'round_complete', {
            'uuid': uuid4,
            'round': 1,
            'ul': document.documentElement.lang
          });
          setTimeout(function () { // wait 3000ms and animate to next slide
            animateSlide($(slides[3]), $(slides[4])) // animate to boom slide
            setTimeout(function () { // wait 3000ms and animate to next slide
              animateSlide($(slides[4]), $(slides[5]))
            }, 3000);
          }, 200);

        } else {
          sendGA('event', 'round_complete', {
            'uuid': uuid4,
            'round': 2,
            'ul': document.documentElement.lang
          });
          setTimeout(function () { // wait 3000ms and animate to next slide
            animateSlide($(slides[6]), $(slides[7])) // animate to boom slide
            setTimeout(function () { // wait 3000ms and animate to next slide
              animateSlide($(slides[7]), $(slides[8]))
              console.log(answers);
            }, 2000);
          }, 200);
        }

      } else {
        if(isInitialRound) invocation();
      }
    }

    if(isInitialRound) invocation(); // first question
}



document.querySelector('[quiz-action="initialize"]').addEventListener('click', function(){
  animateSlide($(slides[0]), $(slides[1]))
});




// start round one of the quiz
document.querySelector('[quiz-action="start"]').addEventListener('click', function(){

  sendGA('event', 'round_start', {
    'uuid': uuid4,
    'round': 1,
    'ul': document.documentElement.lang
  });

  animateSlide($(slides[1]), $(slides[2]))

  // countdown
  let counter = 5;
  const countdown = setInterval(function () {

  $('[quiz-item="countdown"]:eq('+(5-counter)+')').addClass('grow');
  $('[quiz-item="countdown"]:eq('+(6-counter)+')').removeClass('shrink');

  $('.timer_illustration').css("transform", "rotate("+(30-(6-counter)*6)+"deg)" )


  counter--;


    if (counter === 0) {
      // counter = "Go!";
      clearInterval(countdown)

      setTimeout(function () {
        animateSlide($(slides[2]), $(slides[3]))
      }, 1000);

    }

    // $('[quiz-item="countdown"]:first-child').text(counter);
  }, 1000);

  setTimeout(function () {
      stackedCards(document.getElementById('stacked-cards-block'), true);
  }, counter * 1000);


});


$('[quiz-action="start-2"]').click(function(){

  sendGA('event', 'round_start', {
    'uuid': uuid4,
    'round': 2,
    'ul': document.documentElement.lang
  });

  stackedCards(document.getElementById('stacked-cards-block-2'), false);
  setTimeout(function () {
      animateSlide($(slides[5]), $(slides[6]))
  }, 100);

});



// form submit
document.querySelector('form[data-name="form-submit-result"]').addEventListener('submit', function(){
  // animate to the last slide and perform calculation.
  animateSlide($(slides[8]), $(slides[9]))
  document.querySelector('#answers-text').innerHTML = JSON.stringify(answers);
  console.log(answers);

  typeSplit[1] = new SplitType('#split-text-2', {
    types: "lines, words"
  });
  $(".line").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this), // trigger element - viewport
        start: "top 65%",
        end: "bottom 65%",
        scrub: 1
      }
    });
    tl.to($(this), {
      backgroundPosition: "0% 50%",
      duration: 1
    });
  });
});


// $('.quize-slide_wrap').height($(slides[0]).height());

// $('footer').remove();

function animateSlide(currentSlide, targetSlide) {

  targetSlide.css('position', 'relative');
  currentSlide.css('position', 'absolute');

  currentSlide.hide()
  targetSlide.show().fadeTo(400,1);

}


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function sendGA(event, event_name, event_parameters) {
  console.log(event, event_name, event_parameters)
  gtag(event, event_name, event_parameters);
}

// assign a new uuid to current browser
if (!window.localStorage.getItem('uuid4')) {
  window.localStorage.setItem('uuid4', uuidv4());
}
const uuid4 = window.localStorage.getItem('uuid4');








const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


});
