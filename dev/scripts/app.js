

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
        // this.modal();
        this.theme();
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
        const typeButtons = document.querySelectorAll('.modal-tabs__type-bar div')
        const nextButtons = document.querySelectorAll('.modal-tabs__button')
        const modalSteps = document.querySelectorAll('.modal-tabs__inner')


        let counter = 0;

        nextButtons.forEach((item, index) => {
            item.addEventListener('click', (e)=> {

                sessionStorage.access = 'confirm'

                let activeTab = document.querySelector("div.modal-tabs__inner.active")

                let formInput = activeTab.querySelectorAll('.js-input')


                if (formInput) {
                    formInput.forEach(item => {
                        let inputWrapper = item.closest('.modal-tabs__input')
                        if(item.value == '') {
                            inputWrapper.classList.add('incorrect')
                            inputWrapper.querySelector('.modal-tabs__prompt').innerText = 'Input empty'
                            inputWrapper.querySelector('.modal-tabs__prompt').classList.add('active')
                            sessionStorage.access = 'denied'
                        } else {
                            inputWrapper.classList.remove('incorrect')
                            inputWrapper.querySelector('.modal-tabs__prompt').innerText = ''
                            inputWrapper.querySelector('.modal-tabs__prompt').classList.remove('active')
                            sessionStorage.access = 'confirm'
                        }
                    })
                }


                let select = activeTab.querySelector('select')

                if(select) {
                    let selectWrapper = document.querySelector('.modal-tabs__select-wrapper')
                    if (select.value == 1) {
                        selectWrapper.querySelector('.modal-tabs__prompt').innerText = 'Please select'
                        selectWrapper.querySelector('.modal-tabs__prompt').classList.add('active')
                        select.classList.add('incorrect')
                        sessionStorage.access = 'denied'
                    } else {
                        selectWrapper.querySelector('.modal-tabs__prompt').innerText = ''
                        selectWrapper.querySelector('.modal-tabs__prompt').classList.remove('active')
                        select.classList.remove('incorrect')
                    }
                }


                let emailInput = activeTab.querySelector('.js-input-email')

                function validateEmail(email) {
                    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                }

                if (emailInput) {
                    let inputWrapper = emailInput.closest('.modal-tabs__input')
                    if(!validateEmail(emailInput.value)) {
                        inputWrapper.classList.add('incorrect')
                        inputWrapper.querySelector('.modal-tabs__prompt').innerText = 'Type valid email address'
                        sessionStorage.access = 'denied'
                    } else {
                        inputWrapper.classList.remove('incorrect');
                    }
                }

                let phoneInput = activeTab.querySelector('.js-input-phone')

                function validatePhone(phone) {
                    let re = /^[0-9\s]*$/;
                    return re.test(String(phone));
                }

                if (phoneInput) {
                    let inputWrapper = phoneInput.closest('.modal-tabs__input')
                    if(!validatePhone(phoneInput.value)) {
                        inputWrapper.classList.add('incorrect')
                        inputWrapper.querySelector('.modal-tabs__prompt').innerText = 'Type valid phone number'
                        sessionStorage.access = 'denied'
                    } else {

                    }
                }



                if(counter < 2 && sessionStorage.access == 'confirm') {
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
                    sessionStorage.access = 'denied'
                } else {

                }

                if (sessionStorage.access == 'denied' && counter !== 2) {
                    e.preventDefault();
                } else if (sessionStorage.access == 'denied') {
                    e.preventDefault()
                }
            })
        })

    },

    // modal: ()=> {
    //     const modalTrigger = document.querySelectorAll('.js-modal')
    //     const modalLayout = document.querySelector('.modal')
    //     const modalClose = document.querySelector('.modal__close')
    //     modalTrigger.forEach(item => {
    //         item.addEventListener('click', ()=> {
    //             modalLayout.classList.add('active')
    //             document.querySelector('body').style.overflow = 'hidden'
    //         })
    //     })
    //     modalLayout.addEventListener('click', ()=> {
    //         modalLayout.classList.remove('active')
    //         document.querySelector('body').style.overflow = 'visible'
    //     })
    //     modalClose.addEventListener('click', ()=> {
    //         modalLayout.classList.remove('active')
    //         document.querySelector('body').style.overflow = 'visible'
    //     })
    // },

    beforeAfter: ()=> {
        document.getElementById('compare').style.width = document.getElementById('compareSlider').value + "%";
    },

    theme: ()=> {
        const body = document.querySelector('body');
        const root = document.querySelector(':root');

        if (body.classList.contains('tomato')) {
            root.style.setProperty('--blue-gradient', 'linear-gradient(90.63deg, #FF566D 41.32%, #FFC33A 99.54%)');
            root.style.setProperty('--light-blue', '#F84E6C')
        }
    }
};
