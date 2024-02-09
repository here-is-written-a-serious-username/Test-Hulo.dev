import Player from '@vimeo/player';
import MicroModal from 'micromodal';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';

const SLIDE_SPEED = 400;

// слайдер головного екрану
const sliderMainElm = document.querySelector('#main-slider');
const sliderMain = new Splide(sliderMainElm, {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    focus: 0,
    drag: 'free',
    speed: SLIDE_SPEED,
    gap: '2rem',
    padding: '1.8rem',
    autoplay: true,
    interval: 6000,
    pauseOnHover: true,
    pauseOnFocus: true,
    keyboard: true,
}).mount();


// слайдер модального вікна
const sliderModalElm = document.querySelector('#modal-slider');
const sliderModal = new Splide(sliderModalElm, {
    type: 'fade',
    rewind: true,
    speed: SLIDE_SPEED,
    drag: 'free',
    keyboard: true,
}).mount();


// слухачі для фіксації індексу відкритого слайду-відео
let iframe = document.querySelectorAll('.vimeo-player');
let slideIndex = null;
let player = null;

const modalButtons = document.querySelectorAll('.gallery-btn');
modalButtons.forEach(modalButton => {
    modalButton.addEventListener('click', (event) => {
        event.preventDefault()
        slideIndex = modalButton.dataset.index;
        console.log(`Відкритий слайд-відео під індексом № ${slideIndex}`)

        player = new Player(iframe[Number(slideIndex)]);
    });
});


// модальне вікно
MicroModal.init({
    onShow: () => {
        sliderModal.options = {
            speed: 0
        };
        sliderModal.go(Number(slideIndex));
        sliderModal.options = {
            speed: SLIDE_SPEED
        };
        player.play();
    },
    onClose: () => {
        player.pause();
    },
});