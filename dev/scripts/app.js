

var Site = {
    isVisited: 1,
    onload: document.addEventListener('DOMContentLoaded', function() { Site.init(); }),
    init: function() {
        this.headerBurger();
        this.headerScroll();
        this.initLibs();
        this.customSelect();
    },

    headerBurger: ()=> {
        let burger = document.querySelector('.header__burger-lines');
        let offCanvas = document.querySelector('.header__content');
        burger.addEventListener('click', ()=>{
            if (burger.classList.contains('active')) {
                burger.classList.remove('active');
            }
            else {
                burger.classList.add('active');
            }
            if (offCanvas.classList.contains('active')) {
                offCanvas.classList.remove('active');
            }
            else {
                offCanvas.classList.add('active');
            }
        });
    },

    headerScroll: ()=> {
        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.querySelector(".header").classList.add("header_scrolled");
            } else {
                document.querySelector("header").classList.remove("header_scrolled");
            }
        }
    },

    initLibs: ()=> {
        $('.reviews__slider').slick({
            arrows: true,
            prevArrow: $('.reviews__button_prev'),
            nextArrow: $('.reviews__button_next'),
            infinite: false
        });
        AOS.init();
    },

    customSelect: ()=> {
        document.querySelectorAll('.custom-select').forEach(setupSelector);
        let counter = 0;
        function setupSelector(selector) {
            selector.addEventListener('change', e => {
                console.log('changed', e.target.value)
            })

            selector.addEventListener('mousedown', e => {
                if(window.innerWidth >= 1 && counter === 0) {
                    e.preventDefault();
                    counter++;
                    const select = selector.children[0];
                    const dropDown = document.createElement('ul');
                    dropDown.className = "selector-options";

                    [...select.children].forEach(option => {
                        const dropDownOption = document.createElement('li');
                        dropDownOption.className = 'text2'
                        dropDownOption.textContent = option.textContent;


                        dropDownOption.addEventListener('mousedown', (e) => {
                            e.stopPropagation();
                            select.value = option.value;
                            selector.value = option.value;
                            select.style.background = option.getAttribute('data-background')
                            select.style.color = option.getAttribute('data-color')
                            select.dispatchEvent(new Event('change'));
                            selector.dispatchEvent(new Event('change'));
                            selector.classList.remove('active')
                            dropDown.remove();
                            counter--;
                        });
                        selector.classList.add('active')
                        dropDown.appendChild(dropDownOption);
                    });

                    selector.appendChild(dropDown);
                    document.addEventListener('click', (e) => {
                        if(!selector.contains(e.target)) {
                            dropDown.remove();
                            selector.classList.remove('active');
                            counter = 0;
                        }
                    });
                } else {
                    e.preventDefault();
                }
            });
        }
    }
};