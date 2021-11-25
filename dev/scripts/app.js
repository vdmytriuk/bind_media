

var Site = {
    isVisited: 1,
    onload: document.addEventListener('DOMContentLoaded', function() { Site.init(); }),
    init: function() {
        this.headerBurger();
        this.headerScroll();
        this.headerDropdown();
        this.clientsScroll();
        this.initLibs();
        this.customSelect();
        this.customSelectForm();
        this.formTabs();
        this.modal();
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

    headerDropdown: ()=> {
        if($(window).width() < 789) {
            $('.menu-item-has-child').click(function() {
                $(this).toggleClass('active')
            })
        }
    },

    clientsScroll: ()=> {
        if($(window).width() < 789) {
            $('.our-clients__blocks').animate({scrollLeft: 1400}, 20000);
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
    },

    customSelectForm: ()=> {
        document.querySelectorAll('.modal-tabs__select').forEach(setupSelector);
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
                    dropDown.className = "modal-tabs__select-options";

                    [...select.children].forEach(option => {
                        const dropDownOption = document.createElement('li');
                        dropDownOption.className = 'text2'
                        dropDownOption.textContent = option.textContent;


                        dropDownOption.addEventListener('mousedown', (e) => {
                            e.stopPropagation();
                            select.value = option.value;
                            selector.value = option.value;
                            select.style.color = "#303E55"
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
    },

    formTabs: ()=> {
        const typeButtons = document.querySelectorAll('.modal-tabs__type-bar button')
        const nextButtons = document.querySelectorAll('.modal-tabs__button')
        const modalSteps = document.querySelectorAll('.modal-tabs__inner')

        let counter = 0;

        nextButtons.forEach((item, index) => {
            item.addEventListener('click', (e)=> {
                if(counter < 2) {
                    e.preventDefault();
                    typeButtons.forEach(btn => {
                        btn.classList.remove('active')
                    })
                    typeButtons[index + 1].classList.add('active')
                    modalSteps.forEach(step => {
                        step.classList.remove('active')
                    })
                    modalSteps[index + 1].classList.add('active')
                    counter++;
                } else {

                }
            })
        })

    },

    modal: ()=> {
        const modalTrigger = document.querySelectorAll('.rounded-button')
        const modalLayout = document.querySelector('.modal')
        const modalClose = document.querySelector('.modal__close')
        modalTrigger.forEach(item => {
            item.addEventListener('click', ()=> {
                modalLayout.classList.add('active')
                document.querySelector('body').style.overflow = 'hidden'
            })
        })
        modalLayout.addEventListener('click', ()=> {
            modalLayout.classList.remove('active')
            document.querySelector('body').style.overflow = 'visible'
        })
        modalClose.addEventListener('click', ()=> {
            modalLayout.classList.remove('active')
            document.querySelector('body').style.overflow = 'visible'
        })
    }
};