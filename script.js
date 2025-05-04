// 페이지가 로드되면 실행
document.addEventListener('DOMContentLoaded', () => {
    // 알림바 닫기 기능
    const closeButtons = document.querySelectorAll('.close-notification');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notificationBar = this.closest('.notification-bar');
            notificationBar.style.display = 'none';
        });
    });

    // 헤더 스크롤 이벤트
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        const sideMenu = document.querySelector('.side-menu');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (window.innerWidth > 768) {
                sideMenu.classList.add('scrolled');
            }
        } else {
            header.classList.remove('scrolled');
            sideMenu.classList.remove('scrolled');
        }
    });

    // 이미지 호버 효과
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.item-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.item-overlay');
            if (overlay) {
                overlay.style.opacity = '0.8';
            }
        });
    });

    // 이미지 lazy 로딩
    const lazyLoadImages = () => {
        const imageElements = document.querySelectorAll('.item-image');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.style.backgroundImage = `url('${src}')`;
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            imageElements.forEach(img => {
                imageObserver.observe(img);
            });
        }
    };

    // 스크롤 애니메이션
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.grid-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // 사이드바 활성 메뉴 표시
    const highlightActiveMenu = () => {
        const navLinks = document.querySelectorAll('.main-nav a');
        const currentUrl = window.location.hash || '#';
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentUrl) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    
    // 이미지 클릭 이벤트
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.querySelector('.item-category')?.textContent.toLowerCase() || '';
            const linkUrl = category.includes('promotion') ? '#promotion' : 
                           category.includes('editorial') ? '#editorial' : 
                           category.includes('studios') ? '#studios' : '#';
            
            window.location.href = linkUrl;
        });
    });
    
    // 모바일 메뉴 토글
    const setupMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const sideMenu = document.querySelector('.side-menu');
            
            if (sideMenu && !document.querySelector('.mobile-menu-toggle')) {
                const mobileMenuButton = document.createElement('button');
                mobileMenuButton.className = 'mobile-menu-toggle';
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
                
                sideMenu.prepend(mobileMenuButton);
                
                mobileMenuButton.addEventListener('click', () => {
                    sideMenu.classList.toggle('expanded');
                    
                    if (sideMenu.classList.contains('expanded')) {
                        mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            }
        } else {
            const mobileButton = document.querySelector('.mobile-menu-toggle');
            if (mobileButton) {
                mobileButton.remove();
            }
            
            const sideMenu = document.querySelector('.side-menu');
            if (sideMenu) {
                sideMenu.classList.remove('expanded');
            }
        }
    };
    
    // 검색 기능
    const setupSearch = () => {
        const searchIcon = document.querySelector('.search-icon');
        if (searchIcon) {
            searchIcon.addEventListener('click', function(e) {
                e.preventDefault();
                
                const searchOverlay = document.createElement('div');
                searchOverlay.className = 'search-overlay';
                
                const searchContainer = document.createElement('div');
                searchContainer.className = 'search-container';
                
                const searchForm = document.createElement('form');
                searchForm.innerHTML = `
                    <input type="text" placeholder="검색어를 입력하세요">
                    <button type="submit"><i class="fas fa-search"></i></button>
                    <button type="button" class="close-search"><i class="fas fa-times"></i></button>
                `;
                
                searchContainer.appendChild(searchForm);
                searchOverlay.appendChild(searchContainer);
                document.body.appendChild(searchOverlay);
                
                searchForm.querySelector('input').focus();
                
                searchForm.querySelector('.close-search').addEventListener('click', () => {
                    document.body.removeChild(searchOverlay);
                });
                
                searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const searchInput = searchForm.querySelector('input').value;
                    if (searchInput.trim() !== '') {
                        // 실제 검색 기능 구현 (현재는 콘솔 로그만)
                        console.log('검색:', searchInput);
                        document.body.removeChild(searchOverlay);
                    }
                });
            });
        }
    };
    
    // 초기화 함수 호출
    lazyLoadImages();
    animateOnScroll();
    highlightActiveMenu();
    setupMobileMenu();
    setupSearch();
    
    // 이벤트 리스너
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('hashchange', highlightActiveMenu);
    window.addEventListener('resize', setupMobileMenu);

    // 히어로 슬라이더 기능
    const slides = [
        {
            title: '최고의 기어와 함께하는 당신의 라이프스타일',
            description: '프리미엄 품질의 제품을 합리적인 가격으로 만나보세요',
            imageUrl: 'https://source.unsplash.com/random/1200x600/?gear'
        },
        {
            title: '새로운 컬렉션 출시',
            description: '독특한 디자인과 뛰어난 품질의 신제품을 지금 확인하세요',
            imageUrl: 'https://source.unsplash.com/random/1200x600/?fashion'
        },
        {
            title: '한정판 특별 오퍼',
            description: '특별한 가격으로 만나볼 수 있는 한정 수량 제품',
            imageUrl: 'https://source.unsplash.com/random/1200x600/?sale'
        }
    ];

    let currentSlide = 0;
    const heroSlider = document.querySelector('.hero-slider');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    // 초기 슬라이드 생성
    createSlide(slides[0], true);

    // 다음 슬라이드로 이동
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    // 이전 슬라이드로 이동
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    // 슬라이드 업데이트
    function updateSlide() {
        const newSlide = createSlide(slides[currentSlide], false);
        heroSlider.appendChild(newSlide);
        
        setTimeout(() => {
            newSlide.classList.add('active');
            
            // 이전 슬라이드 제거
            const oldSlides = document.querySelectorAll('.hero-slide:not(.active)');
            oldSlides.forEach(slide => {
                slide.classList.add('fade-out');
                setTimeout(() => {
                    slide.remove();
                }, 500);
            });
        }, 50);
    }

    // 슬라이드 요소 생성
    function createSlide(slideData, isActive) {
        const slide = document.createElement('div');
        slide.className = isActive ? 'hero-slide active' : 'hero-slide';
        
        const content = document.createElement('div');
        content.className = 'hero-content';
        
        const heading = document.createElement('h2');
        heading.textContent = slideData.title;
        
        const para = document.createElement('p');
        para.textContent = slideData.description;
        
        const button = document.createElement('a');
        button.href = '#shop-now';
        button.className = 'btn btn-primary';
        button.textContent = '쇼핑하기';
        
        content.appendChild(heading);
        content.appendChild(para);
        content.appendChild(button);
        
        const image = document.createElement('div');
        image.className = 'hero-image';
        image.style.backgroundImage = `url('${slideData.imageUrl}')`;
        
        slide.appendChild(content);
        slide.appendChild(image);
        
        return slide;
    }

    // 버튼 이벤트 리스너
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // 자동 슬라이드 변경
    setInterval(nextSlide, 5000);

    // 장바구니 기능
    const addToCartButtons = document.querySelectorAll('.btn-secondary');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            count++;
            cartCount.textContent = count;
            
            // 장바구니 추가 애니메이션
            this.classList.add('added');
            this.textContent = '장바구니에 추가됨';
            
            setTimeout(() => {
                this.classList.remove('added');
                this.textContent = '장바구니에 추가';
            }, 2000);
        });
    });

    // 네비게이션 링크 스크롤 이벤트
    const navLinks = document.querySelectorAll('.main-nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 연락처 폼 제출 처리
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 폼 유효성 검사
            if (!name || !email || !message) {
                alert('모든 필드를 채워주세요.');
                return;
            }
            
            // 실제로는 서버에 데이터를 보내야 하지만, 지금은 간단히 알림으로 표시
            alert(`${name}님, 메시지가 성공적으로 전송되었습니다!`);
            
            // 폼 초기화
            contactForm.reset();
        });
    }
}); 