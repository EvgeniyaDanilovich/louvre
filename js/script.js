window.onload = function () {
  createBeforeAfterSlider();
  randomImgGallery(); // showImgByScroll();

  setPopup(); //bookingTicket();

  videoPlayer();
  setMenu();
};

let items = document.querySelectorAll('.carousel__item');
let currentItem = 0;
let isEnabled = true;
let numItem = document.querySelector('.controls__num.first');

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
  numItem.textContent = `0${currentItem + 1}`;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.controls__arrow.left').addEventListener('click', function () {
  if (isEnabled) {
    previousItem(currentItem);
    changeColorDot(currentItem);
  }
});
document.querySelector('.controls__arrow.right').addEventListener('click', function () {
  if (isEnabled) {
    nextItem(currentItem);
    changeColorDot(currentItem);
  }
}); // Переключение слайда по буллетам

let dotAll = document.querySelectorAll('.controls__dot');
dotAll.forEach((dot, i) => {
  dot.addEventListener('click', function () {
    items.forEach(img => {
      img.classList.remove('active');
    });
    items[i].classList.add('active');
    changeCurrentItem(i);
    changeColorDot(i);
  });
});

const changeColorDot = i => {
  dotAll.forEach(el => {
    el.classList.remove('active');
  });
  dotAll[i].classList.add('active');
}; // Cвайп движением мыши


const swipedetect = el => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;
  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;
  surface.addEventListener('mousedown', function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });
  surface.addEventListener('mouseup', function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  }); // Свайп на тачпадах

  surface.addEventListener('touchstart', function (e) {
    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });
  surface.addEventListener('touchmove', function (e) {
    e.preventDefault();
  });
  surface.addEventListener('touchend', function (e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  });
};

let el = document.querySelector('.carousel__container');
swipedetect(el);
;

const createBeforeAfterSlider = () => {
  const sectionCompare = document.querySelector('.compare-img');
  const slider = document.querySelector('.compare-img__wrapper');
  const before = document.querySelector('.compare-img__image.before');
  const beforeImg = before.querySelector('img');
  const slice = document.querySelector('.compare-img__slice');
  let isActive = false;
  let width = slider.offsetWidth;
  beforeImg.style.width = `${width}px`; // Delete select

  sectionCompare.addEventListener('selectstart', e => {
    e.preventDefault();
  });

  const beforeAfterSlider = x => {
    let shift = Math.max(0, Math.min(x, width));
    before.style.width = `${shift}px`;
    slice.style.left = `${shift}px`;
  };

  const pauseEvents = e => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  sectionCompare.addEventListener('mousedown', () => {
    isActive = true;
  });
  sectionCompare.addEventListener('mouseup', () => {
    isActive = false;
  });
  sectionCompare.addEventListener('mouseleave', () => {
    isActive = false;
  });
  sectionCompare.addEventListener('mousemove', e => {
    if (!isActive) return;
    let x = e.pageX;
    x = x - slider.getBoundingClientRect().left;
    beforeAfterSlider(x);
    pauseEvents(e);
  }); // Compare for phons

  sectionCompare.addEventListener('touchstart', () => {
    isActive = true;
  });
  sectionCompare.addEventListener('touchend', () => {
    isActive = false;
  });
  sectionCompare.addEventListener('touchcancel', () => {
    isActive = false;
  });
  sectionCompare.addEventListener('touchmove', e => {
    if (!isActive) return;
    let x;
    let i;

    for (i = 0; i < e.changedTouches.length; i++) {
      x = e.changedTouches[i].pageX;
    }

    x = x - slider.getBoundingClientRect().left;
    beforeAfterSlider(x);
    pauseEvents(e);
  });
};

const randomImgGallery = () => {
  let pictureInnerContainer = document.querySelector('.picture-inner-container');
  const img1 = document.createElement('img');
  img1.classList.add('picture-inner-container__img');
  img1.src = `img/galery/galery1.jpg`;
  img1.alt = `gallery1`;
  const img2 = document.createElement('img');
  img2.classList.add('picture-inner-container__img');
  img2.src = `img/galery/galery2.jpg`;
  img2.alt = `gallery2`;
  const img3 = document.createElement('img');
  img3.classList.add('picture-inner-container__img');
  img3.src = `img/galery/galery3.jpg`;
  img3.alt = `gallery3`;
  const img4 = document.createElement('img');
  img4.classList.add('picture-inner-container__img');
  img4.src = `img/galery/galery4.jpg`;
  img4.alt = `gallery4`;
  const img5 = document.createElement('img');
  img5.classList.add('picture-inner-container__img');
  img5.src = `img/galery/galery5.jpg`;
  img5.alt = `gallery5`;
  const img6 = document.createElement('img');
  img6.classList.add('picture-inner-container__img');
  img6.src = `img/galery/galery6.jpg`;
  img6.alt = `gallery6`;
  const img7 = document.createElement('img');
  img7.classList.add('picture-inner-container__img');
  img7.src = `img/galery/galery7.jpg`;
  img7.alt = `gallery7`;
  const img8 = document.createElement('img');
  img8.classList.add('picture-inner-container__img');
  img8.src = `img/galery/galery8.jpg`;
  img8.alt = `gallery8`;
  const img9 = document.createElement('img');
  img9.classList.add('picture-inner-container__img');
  img9.src = `img/galery/galery9.jpg`;
  img9.alt = `gallery9`;
  const img10 = document.createElement('img');
  img10.classList.add('picture-inner-container__img');
  img10.src = `img/galery/galery10.jpg`;
  img10.alt = `gallery10`;
  const img11 = document.createElement('img');
  img11.classList.add('picture-inner-container__img');
  img11.src = `img/galery/galery11.jpg`;
  img11.alt = `gallery11`;
  const img12 = document.createElement('img');
  img12.classList.add('picture-inner-container__img');
  img12.src = `img/galery/galery12.jpg`;
  img12.alt = `gallery12`;
  const img13 = document.createElement('img');
  img13.classList.add('picture-inner-container__img');
  img13.src = `img/galery/galery13.jpg`;
  img13.alt = `gallery13`;
  const img14 = document.createElement('img');
  img14.classList.add('picture-inner-container__img');
  img14.src = `img/galery/galery14.jpg`;
  img14.alt = `gallery14`;
  const img15 = document.createElement('img');
  img15.classList.add('picture-inner-container__img');
  img15.src = `img/galery/galery15.jpg`;
  img15.alt = `gallery15`;
  let arrImg = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffle(arrImg);
  arrImg.map(item => {
    pictureInnerContainer.append(item);
  });
};

const bookingTicket = () => {
  let valueBasic = document.querySelector('.add-ticket__value.basic');
  let valueSenior = document.querySelector('.add-ticket__value.senior');
  let itemAdd = document.querySelectorAll('.add-ticket__item');
  let numTicketsB = document.querySelector('.middle-overview__number.basic');
  let numTicketsS = document.querySelector('.middle-overview__number.senior');
  let priceBasic = document.querySelector('.middle-overview__price.basic');
  let priceSenior = document.querySelector('.middle-overview__price.senior');
  let totalPrice = document.querySelector('.middle-overview__money');
  let announcePriceB = document.querySelector('.add-ticket__text.basic.span');
  let announcePriceS = document.querySelector('.add-ticket__text.senior.span');
  let typeExhibition = document.querySelector('.top-overview__item.type-icon');
  let select = document.querySelector('.form__field.select');
  select.addEventListener('click', () => {
    let arr = select.value.split('');
    let cor = arr[0].toUpperCase() + arr.slice(1);
    let exhibition = typeExhibition.textContent = cor.replace(/,/g, ''); // console.log(select.value)
  });
  let sumBasic;
  let sumSenior;

  const setTotalPrice = () => {
    totalSum = sumBasic + sumSenior;
    totalPrice.textContent = `${totalSum} €`;
  };

  const calcSum = () => {
    if (select.value === 'permanent exhibition') {
      console.log(numTicketsS.textContent); // announcePriceB.textContent = '20';
      // announcePriceS.textContent = '10';

      sumBasic = numTicketsB.textContent * 20;
      sumSenior = numTicketsS.textContent * 10;
    }

    if (select.value === 'temporary exhibition') {
      // announcePriceB.textContent = '25';
      // announcePriceS.textContent = '12';
      sumBasic = numTicketsB.textContent * 25;
      sumSenior = numTicketsS.textContent * 12;
    }

    if (select.value === 'combined admission') {
      sumBasic = numTicketsB.textContent * 40;
      sumSenior = numTicketsS.textContent * 20;
    }

    priceBasic.textContent = sumBasic;
    priceSenior.textContent = sumSenior;
    setTotalPrice();
  };

  itemAdd.forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.classList.contains('minus-basic')) {
        if (valueBasic.textContent >= 1) {
          valueBasic.textContent--;
          numTicketsB.textContent = valueBasic.textContent;
          calcSum();
        }
      }

      if (e.target.classList.contains('plus-basic')) {
        if (valueBasic.textContent <= 19) {
          valueBasic.textContent++;
          numTicketsB.textContent = valueBasic.textContent;
          calcSum();
        }
      }

      if (e.target.classList.contains('minus-senior')) {
        if (valueSenior.textContent >= 1) {
          valueSenior.textContent--;
          numTicketsS.textContent = valueSenior.textContent;
          calcSum();
        }
      }

      if (e.target.classList.contains('plus-senior')) {
        if (valueSenior.textContent <= 19) {
          valueSenior.textContent++;
          numTicketsS.textContent = valueSenior.textContent;
          calcSum();
        }
      }
    });
  });
};

const minus = document.querySelectorAll('.minus');
const plus = document.querySelectorAll('.plus');
minus.forEach(item => {
  item.addEventListener('click', () => {});
});

const videoPlayer = () => {
  const player = document.querySelector('.player');
  const video = document.querySelector('.viewer');
  const bigPlay = document.querySelector('.player__big-play');
  const bigPlayImg = document.querySelector('.player__big-play img');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress__filled');
  const toggleMove = document.querySelector('.toggle-play');
  const toggleMoveImg = document.querySelector('.toggle-play img');
  const range = document.querySelector('.player__slider');
  const rangeButton = document.querySelector('.toggle-sound');
  const rangeImg = document.querySelector('.toggle-sound img');
  const btnFullscreen = document.querySelector('.player__fullscreen');
  console.log(window.screen.width);
  console.log(window.screen.height);

  function togglePlay() {
    video.paused ? video.play() : video.pause();
  }

  function updateButtonMove() {
    if (this.paused) {
      toggleMoveImg.setAttribute('src', 'img/video/play.svg');
      bigPlay.style.display = 'block';
    } else {
      toggleMoveImg.setAttribute('src', 'img/video/pause.svg');
      bigPlay.style.display = 'none';
    }
  }

  function changeSoundIcon() {
    if (video.volume > 0) {
      video.volume = 0;
      range.value = 0;
      rangeImg.setAttribute('src', 'img/video/mute.svg');
    } else {
      video.volume = 0.5;
      range.value = 0.5;
      rangeImg.setAttribute('src', 'img/video/sound.svg');
    }
  } // Не работает


  function changeSoundIconRange() {
    if (range.value = 0) {
      rangeImg.setAttribute('src', 'img/video/mute.svg');
      console.log(1);
    } else {
      range.value = this.value;
      rangeImg.setAttribute('src', 'img/video/volume.svg');
    }
  }

  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function handleProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
  }

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButtonMove);
  video.addEventListener('pause', updateButtonMove);
  video.addEventListener('timeupdate', handleProgress);
  bigPlay.addEventListener('click', togglePlay);
  toggleMove.addEventListener('click', togglePlay);
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
  rangeButton.addEventListener('click', changeSoundIcon); // range.addEventListener('click', changeSoundIconRange);

  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', e => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
  btnFullscreen.addEventListener('click', () => {
    // player.style.position = 'fixid';
    // player.style.width = `100%`;
    // player.style.width = `1000px`;
    console.log(window.screen.width);
  });
}; // =======================================
// Подгрузка фотографий при скроле

/*const showImgByScroll = () => {
	const isVisible = (elem) => {

		let coords = elem.getBoundingClientRect();
		let windowHeight = document.documentElement.clientHeight;

		let topVisible = coords.top > 0 && coords.top < windowHeight;

		return topVisible
	}

	function showVisible() {
		let img = document.querySelectorAll('.picture-inner-container__img');

		if (isVisible(img)) {
			img.map(item => {
				item.classList.add('active')
			})
		}
	}

	window.addEventListener('scroll', showVisible);
	showVisible();
}*/


const setPopup = () => {
  let popup = document.querySelector('.popup');
  let btnClose = document.querySelector('.popup__close');
  let btnOpen = document.querySelector('.amount-tickets__button');
  btnOpen.addEventListener('click', () => {
    popup.classList.add('active');
  });
  btnClose.addEventListener('click', () => {
    popup.classList.remove('active');
  });
}; // Меню бургер


const setMenu = () => {
  const iconMenu = document.querySelector('.header-menu__icon');
  const menuBody = document.querySelector('.header-menu__menu');
  iconMenu.addEventListener('click', function () {
    document.body.classList.toggle('lock');
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
  });
  document.documentElement.addEventListener("click", function (e) {
    if (!e.target.closest('.header-menu')) {
      document.body.classList.remove('lock');
      iconMenu.classList.remove('active');
      menuBody.classList.remove('active');
    }
  }); // Скрол из бургера

  const menuLinkAll = document.querySelectorAll('.header-menu__link');

  for (let current of menuLinkAll) {
    current.addEventListener('click', function () {
      if (iconMenu.classList.contains('active')) {
        document.body.classList.remove('lock');
        iconMenu.classList.remove('active');
        menuBody.classList.remove('active');
      }
    });
  }
};