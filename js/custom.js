// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 0;

// additional varibles for slides
const totalSlideAmount = 40;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay) {
  const allElements = document.querySelectorAll('[data-number]');

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 2.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    nextArrowDelay = 0;
  },
  2: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--2__main', { opacity: 0, duration: 0.75, delay: 1, x: 90 });
    nextArrowDelay = 2;
  },
  3: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--3__block.first', { opacity: 0, duration: 0.75, delay: 1, scale: 0 });
    gsap.from('.slide--3__block.second', { opacity: 0, duration: 0.75, delay: 1.3, scale: 0 });
    gsap.from('.slide--3__block.third', { opacity: 0, duration: 0.75, delay: 1.6, scale: 0 });
    gsap.from('.slide--3__block .line', { opacity: 0, duration: 0.75, delay: 1.8, width: 0 });
    gsap.from('.slide--3__block .square', { opacity: 0, duration: 0.75, delay: 2.2, scale: 0 });
    nextArrowDelay = 3.2;
  },
  4: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--4__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 60 });
    gsap.from('.slide--4__block.second', { opacity: 0, duration: 0.75, delay: 1.3, x: 60 });
    gsap.from('.slide--4__block.third', { opacity: 0, duration: 0.75, delay: 1.6, x: 60 });
    gsap.from('.slide--4__block.fourth', { opacity: 0, duration: 0.75, delay: 1.9, x: 60 });
    gsap.from('.slide--4__block.fifth', { opacity: 0, duration: 0.75, delay: 2.2, x: 60 });
    nextArrowDelay = 3.2;
  },
  5: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--5__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--5__block-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '-50%' });
    gsap.from('.slide--5__compund', { opacity: 0, duration: 0.75, delay: 1.5, x: '50%' });
    nextArrowDelay = 2.5;
  },
  6: () => {
    gsap.from('.slide--6__block.first', { opacity: 0, duration: 0.75, delay: 1, y: 60 });
    gsap.from('.slide--6__block.second', { opacity: 0, duration: 0.75, delay: 1.3, y: 60 });
    gsap.from('.slide--6__block.third', { opacity: 0, duration: 0.75, delay: 1.6, y: 60 });
    gsap.from('.slide--6__block.fourth', { opacity: 0, duration: 0.75, delay: 1.8, y: 60 });
    gsap.from('.slide--6__block.fifth', { opacity: 0, duration: 0.75, delay: 2, y: 60 });
    gsap.from('.slide--6__block.sixth', { opacity: 0, duration: 0.75, delay: 2.2, y: 60 });
    gsap.from('.slide--6__block.seventh', { opacity: 0, duration: 0.75, delay: 2.4, y: 60 });
    gsap.from('.slide--6__block.eight', { opacity: 0, duration: 0.75, delay: 2.6, y: 60 });
    nextArrowDelay = 3.6;
  },
  7: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--7__block h3', { opacity: 0, duration: 0.75, delay: 1, y: 30 });
    gsap.from('.slide--7__block h4', { opacity: 0, duration: 0.75, delay: 1.2, y: 30 });
    gsap.from('.slide--7__text-block.first', { opacity: 0, duration: 0.75, delay: 1.7, y: 30 });
    gsap.from('.slide--7__text-block.second', { opacity: 0, duration: 0.75, delay: 1.9, y: 30 });
    gsap.from('.slide--7__text-block.third', { opacity: 0, duration: 0.75, delay: 2.1, y: 30 });
    gsap.from('.slide--7__description', { opacity: 0, duration: 0.75, delay: 2.6, x: 60 });
    nextArrowDelay = 3.6;
  },
  8: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--8__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 35, y: 35 });
    gsap.from('.slide--8__block.second', { opacity: 0, duration: 0.75, delay: 1.2, x: 35, y: 35 });
    gsap.from('.slide--8__block.third', { opacity: 0, duration: 0.75, delay: 1.4, x: 35, y: 35 });
    gsap.from('.slide--8__block.fourth', { opacity: 0, duration: 0.75, delay: 1.6, x: 35, y: 35 });
    gsap.from('.slide--8__block.fifth', { opacity: 0, duration: 0.75, delay: 1.8, x: 35, y: 35 });
    gsap.from('.slide--8__block.sixth', { opacity: 0, duration: 0.75, delay: 2, x: 35, y: 35 });
    gsap.from('.slide--8__block.seventh', { opacity: 0, duration: 0.75, delay: 2.2, x: 35, y: 35 });
    gsap.from('.slide--8__block.eight', { opacity: 0, duration: 0.75, delay: 2.4, x: 35, y: 35 });
    gsap.from('.slide--8__block.nineth', { opacity: 0, duration: 0.75, delay: 2.6, x: 35, y: 35 });
    gsap.from('.slide--8__block.tenth', { opacity: 0, duration: 0.75, delay: 2.8, x: 35, y: 35 });
    gsap.from('.slide--8__block.eleventh', { opacity: 0, duration: 0.75, delay: 3, x: 35, y: 35 });
    gsap.from('.slide--8__block.twelve', { opacity: 0, duration: 0.75, delay: 3.2, x: 35, y: 35 });
    nextArrowDelay = 4.2;
  },
  9: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--9__text', { opacity: 0, duration: 0.75, delay: 1, x: 90 });
    nextArrowDelay = 2;
  },
  10: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--10__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 60 });
    gsap.from('.slide--10__block.second', { opacity: 0, duration: 0.75, delay: 1.3, x: 60 });
    gsap.from('.slide--10__block.third', { opacity: 0, duration: 0.75, delay: 1.6, x: 60 });
    gsap.from('.slide--10__block.fourth', { opacity: 0, duration: 0.75, delay: 1.9, x: 60 });
    gsap.from('.slide--10__block.fifth', { opacity: 0, duration: 0.75, delay: 2.2, x: 60 });
    gsap.from('.slide--10__block.sixth', { opacity: 0, duration: 0.75, delay: 2.5, x: 60 });
    gsap.from('.slide--10__block.seventh', { opacity: 0, duration: 0.75, delay: 2.8, x: 60 });
    nextArrowDelay = 3.8;
  },
  11: () => {
    gsap.from('.slide--11__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--11__left-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '-50%' });
    nextArrowDelay = 2.5;
  },
  12: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--12__bottles-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--12__bottles-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    gsap.from('.slide--12__bottles-general.third', { opacity: 0, duration: 0.75, delay: 1.8, y: 100 });
    nextArrowDelay = 2.8;
  },
  13: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--13__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--13__left-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '-50%' });
    gsap.from('.slide--13__icons', { opacity: 0, duration: 0.75, delay: 1.5, x: '50%' });
    nextArrowDelay = 2.5;
  },
  14: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--14__bottle-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--14__bottle-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    nextArrowDelay = 2.8;
  },
  15: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--15__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--15__left-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '-50%' });
    nextArrowDelay = 2.5;
  },
  16: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--16__bottle-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--16__bottle-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    nextArrowDelay = 2.8;
  },
  17: () => {
    gsap.from('.slide--17__bottle-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--17__bottle-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    nextArrowDelay = 2.8;
  },
  18: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--18__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--18__left-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '-50%' });
    nextArrowDelay = 2.5;
  },
  19: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--19__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--19__left-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '-50%' });
    gsap.from('.slide--19__right-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '50%' });
    nextArrowDelay = 2.5;
  },
  20: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--20__bottle-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--20__bottle-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    nextArrowDelay = 2.8;
  },
  21: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--21__left-block', { opacity: 0, duration: 0.75, delay: 1, y: 30 });
    gsap.from('.slide--21__left .line', { opacity: 0, duration: 0.75, delay: 1.2, width: 0 });
    gsap.from('.slide--21__left p.orange', { opacity: 0, duration: 0.75, delay: 1.4, y: 30 });
    gsap.from('.slide--21__icon.first', { opacity: 0, duration: 0.75, delay: 1.9, y: 30 });
    gsap.from('.slide--21__icon.second', { opacity: 0, duration: 0.75, delay: 2.1, y: 30 });
    gsap.from('.slide--21__icon.third', { opacity: 0, duration: 0.75, delay: 2.3, y: 30 });
    gsap.from('.slide--21__icon.fourth', { opacity: 0, duration: 0.75, delay: 2.5, y: 30 });
    nextArrowDelay = 3.5;
  },
  22: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--22__bottle.first', { opacity: 0, duration: 0.75, delay: 1, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.second', { opacity: 0, duration: 0.75, delay: 1.3, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.third', { opacity: 0, duration: 0.75, delay: 1.6, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.fourth', { opacity: 0, duration: 0.75, delay: 1.9, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.fifth', { opacity: 0, duration: 0.75, delay: 2.2, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.sixth', { opacity: 0, duration: 0.75, delay: 2.5, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.seventh', { opacity: 0, duration: 0.75, delay: 2.8, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.eight', { opacity: 0, duration: 0.75, delay: 3.1, x: 35, y: 35 });
    gsap.from('.slide--22__bottle.nineth', { opacity: 0, duration: 0.75, delay: 3.4, x: 35, y: 35 });
    nextArrowDelay = 4.4;
  },
  23: () => {
    $('.arrow--next').removeClass('arrow--white');
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--23__bottle-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--23__bottle-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    nextArrowDelay = 2.8;
  },
  24: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--24__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--24__left-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '-50%' });
    gsap.from('.slide--24__right-content', { opacity: 0, duration: 0.75, delay: 1.5, x: '50%' });
    nextArrowDelay = 2.5;
  },
  25: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--25__bottle.first', { opacity: 0, duration: 0.75, delay: 1, x: 35, y: 35 });
    gsap.from('.slide--25__bottle.second', { opacity: 0, duration: 0.75, delay: 1.3, x: 35, y: 35 });
    gsap.from('.slide--25__bottle.third', { opacity: 0, duration: 0.75, delay: 1.6, x: 35, y: 35 });
    nextArrowDelay = 2.6;
  },
  26: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--26__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--26__left h4', { opacity: 0, duration: 0.75, delay: 1.5, y: 40 });
    gsap.from('.slide--26__block.first', { opacity: 0, duration: 0.75, delay: 2, x: -60 });
    gsap.from('.slide--26__block.second', { opacity: 0, duration: 0.75, delay: 2.2, x: -60 });
    gsap.from('.slide--26__block.third', { opacity: 0, duration: 0.75, delay: 2.4, x: -60 });
    gsap.from('.slide--26__right-content', { opacity: 0, duration: 0.75, delay: 2.9, scale: 0 });
    nextArrowDelay = 3.9;
  },
  27: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--27__bottle-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--27__bottle-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    nextArrowDelay = 2.8;
  },
  28: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--28__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--28__left h4', { opacity: 0, duration: 0.75, delay: 1.5, y: 40 });
    gsap.from('.slide--28__block.first', { opacity: 0, duration: 0.75, delay: 2, x: -60 });
    gsap.from('.slide--28__block.second', { opacity: 0, duration: 0.75, delay: 2.2, x: -60 });
    gsap.from('.slide--28__right ul', { opacity: 0, duration: 0.75, delay: 2.7, scale: 0 });
    nextArrowDelay = 3.7;
  },
  29: () => {
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--29__bottle.first', { opacity: 0, duration: 0.75, delay: 1, x: 35, y: 35 });
    gsap.from('.slide--29__bottle.second', { opacity: 0, duration: 0.75, delay: 1.3, x: 35, y: 35 });
    gsap.from('.slide--29__bottle.third', { opacity: 0, duration: 0.75, delay: 1.6, x: 35, y: 35 });
    nextArrowDelay = 2.6;
  },
  30: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--30__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--30__left h4', { opacity: 0, duration: 0.75, delay: 1.5, y: 40 });
    gsap.from('.slide--30__block.first', { opacity: 0, duration: 0.75, delay: 2, x: -60 });
    gsap.from('.slide--30__block.second', { opacity: 0, duration: 0.75, delay: 2.2, x: -60 });
    gsap.from('.slide--30__left .line', { opacity: 0, duration: 0.75, delay: 2.7, width: 0 });
    gsap.from('.slide--30__left p.blue', { opacity: 0, duration: 0.75, delay: 3.2, width: 0 });
    gsap.from('.slide--30__right-content', { opacity: 0, duration: 0.75, delay: 3.7, scale: 0 });
    nextArrowDelay = 4.7;
  },
  31: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--31__bottle img', { opacity: 0, duration: 0.75, delay: 1, y: '100%' });
    gsap.from('.slide--31__left h2', { opacity: 0, duration: 0.75, delay: 1.5, x: -60 });
    gsap.from('.slide--31__left h3', { opacity: 0, duration: 0.75, delay: 1.8, x: -60 });
    gsap.from('.slide--31__text', { opacity: 0, duration: 0.75, delay: 2.1, x: -60 });
    nextArrowDelay = 3.1;
  },
  32: () => {
    $('.arrow--next').removeClass('arrow--white');
    $('.arrow--prev').removeClass('arrow--white');
    gsap.from('.slide--32__bottle-general.first', { opacity: 0, duration: 0.75, delay: 1, y: 100 });
    gsap.from('.slide--32__bottle-general.second', { opacity: 0, duration: 0.75, delay: 1.4, y: 100 });
    nextArrowDelay = 2.8;
  },
  33: () => {
    $('.arrow--next').addClass('arrow--white');
    $('.arrow--prev').addClass('arrow--white');
    gsap.from('.slide--33__right p span.decorator', { opacity: 0, duration: 0.5, delay: 1, scale: 0 });
    gsap.from('.slide--33__right p span.text', { opacity: 0, duration: 0.75, delay: 1.3, x: 35 });
    nextArrowDelay = 2.3;
  },
  34: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--34__content-title', { opacity: 0, duration: 0.75, delay: 1, x: -60 });
    gsap.from('.slide--34__content .second-animate', { opacity: 0, duration: 0.75, delay: 1.5, y: 60 });
    gsap.from('.slide--34__content .third-animate', { opacity: 0, duration: 0.75, delay: 1.8, y: 60 });
    gsap.from('.slide--34__content .fourth-animate', { opacity: 0, duration: 0.75, delay: 2.1, y: 60 });
    gsap.from('.slide--34__percents', { opacity: 0, duration: 0.75, delay: 2.6, x: 60 });
    nextArrowDelay = 3.6;
  },
  35: () => {
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--35__bottle img', { opacity: 0, duration: 0.75, delay: 1, x: 60 });
    gsap.from('.slide--35__left-content', { opacity: 0, duration: 0.75, delay: 1.5, x: -60 });
    nextArrowDelay = 2.5;
  },
  36: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    gsap.from('.slide--36__content img.formula', { opacity: 0, duration: 0.75, delay: 1, x: -60 });
    gsap.from('.slide--36__content h3', { opacity: 0, duration: 0.75, delay: 1.5, x: -60 });
    gsap.from('.slide--36__content h2', { opacity: 0, duration: 0.75, delay: 1.5, x: -60 });
    gsap.from('.slide--36__text-block .first', { opacity: 0, duration: 0.75, delay: 2, y: 35 });
    gsap.from('.slide--36__text-block .second', { opacity: 0, duration: 0.75, delay: 2.3, y: 35 });
    gsap.from('.slide--36__text-block .third', { opacity: 0, duration: 0.75, delay: 2.6, y: 35 });
    nextArrowDelay = 3.6;
  },
  37: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--37__number-block', { opacity: 0, duration: 0.75, delay: 1, y: 40 });
    gsap.from('.slide--37__content h3', { opacity: 0, duration: 0.75, delay: 1.3, y: 40 });
    gsap.from('.slide--37__content .line', { opacity: 0, duration: 0.75, delay: 1.6, width: 0 });
    gsap.from('.slide--37__content li.first', { opacity: 0, duration: 0.75, delay: 1.9, y: 40 });
    gsap.from('.slide--37__content li.second', { opacity: 0, duration: 0.75, delay: 2.1, y: 40 });
    nextArrowDelay = 3.1;
  },
  38: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    gsap.from('.slide--38__block.first', { opacity: 0, duration: 0.75, delay: 1, y: 35 });
    gsap.from('.slide--38__block.second', { opacity: 0, duration: 0.75, delay: 1.3, y: 35 });
    gsap.from('.slide--38__block.third', { opacity: 0, duration: 0.75, delay: 1.6, y: 35 });
    gsap.from('.slide--38__content-wrapper > h3', { opacity: 0, duration: 0.75, delay: 2.1, y: 35 });
    gsap.from('.slide--38__content .line', { opacity: 0, duration: 0.75, delay: 2.4, y: 35 });
    gsap.from('.slide--38__logos .first', { opacity: 0, duration: 0.75, delay: 2.9, x: -35 });
    gsap.from('.slide--38__logos .second', { opacity: 0, duration: 0.75, delay: 2.9 });
    gsap.from('.slide--38__logos .third', { opacity: 0, duration: 0.75, delay: 2.9, x: 35 });
    nextArrowDelay = 3.9;
  },
  39: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    clearTimeout(lastSlideActionTimeout);
    gsap.from('.slide--39__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 60 });
    gsap.from('.slide--39__block.second', { opacity: 0, duration: 0.75, delay: 1.3, x: 60 });
    gsap.from('.slide--39__block.third', { opacity: 0, duration: 0.75, delay: 1.6, x: 60 });
    gsap.from('.slide--39__block.fourth', { opacity: 0, duration: 0.75, delay: 1.9, x: 60 });
    nextArrowDelay = 2.9;
  },
  40: () => {
    $('.arrow--prev').addClass('arrow--white');
    lastSlideActionTimeout = setTimeout(() => {
      lastSlideAction();
    }, 6 * 1000);
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);

  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  switch (currentSlide) {
    case 0:
      break;
    case 1:
      $(nextSlideButton).removeClass(hiddenArrowClass);
      break;
    case totalSlideAmount:
      $(prevSlideButton).removeClass(hiddenArrowClass);
      break;
    default:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);
  updateNavigationButtons(newSlideNum);
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});