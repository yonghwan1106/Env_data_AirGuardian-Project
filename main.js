// 숨:맞춤 서비스 메인 자바스크립트 파일

document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuButton = document.querySelector('nav button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu hidden bg-white fixed top-0 left-0 w-full h-screen z-50 p-6';
    mobileMenu.innerHTML = `
        <div class="flex justify-between items-center mb-8">
            <span class="text-2xl font-bold text-blue-500">숨:맞춤</span>
            <button class="focus:outline-none">
                <svg class="h-6 w-6 text-gray-600" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div class="flex flex-col space-y-4">
            <a href="index.html" class="text-xl py-4 border-b border-gray-200">홈</a>
            <a href="about.html" class="text-xl py-4 border-b border-gray-200">소개</a>
            <a href="demo.html" class="text-xl py-4 border-b border-gray-200">서비스 데모</a>
            <a href="data.html" class="text-xl py-4 border-b border-gray-200">데이터 활용</a>
        </div>
    `;
    
    if (mobileMenuButton) {
        document.body.appendChild(mobileMenu);
        
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
        
        mobileMenu.querySelector('button').addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    }

    // GSAP 애니메이션 초기화 (GSAP이 로드된 경우)
    if (typeof gsap !== 'undefined') {
        // ScrollTrigger가 로드된 경우
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // 주요 기능 카드 애니메이션
            gsap.utils.toArray('.card').forEach((card, i) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    delay: i * 0.1
                });
            });
            
            // 섹션 타이틀 애니메이션
            gsap.utils.toArray('section h2').forEach((title) => {
                gsap.from(title, {
                    y: -30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });
            
            // 섹션 디바이더 애니메이션
            gsap.utils.toArray('.section-divider').forEach((divider) => {
                gsap.from(divider, {
                    width: 0,
                    duration: 1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: divider,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
            
            // 카운터 애니메이션
            const counterSection = document.getElementById('counter-section');
            if (counterSection) {
                const counters = document.querySelectorAll('.counter');
                
                ScrollTrigger.create({
                    trigger: counterSection,
                    start: "top 80%",
                    onEnter: () => {
                        counters.forEach(counter => {
                            const targetValue = parseInt(counter.getAttribute('data-count'));
                            const duration = 2;
                            
                            // 값의 크기에 따라 증가 속도 조정
                            let increment;
                            if (targetValue >= 1000000) {
                                increment = 1000000;
                            } else if (targetValue >= 10000) {
                                increment = 10000;
                            } else if (targetValue >= 1000) {
                                increment = 100;
                            } else if (targetValue >= 100) {
                                increment = 1;
                            } else {
                                increment = 1;
                            }
                            
                            let currentValue = 0;
                            const updateCounter = () => {
                                if (currentValue < targetValue) {
                                    currentValue += increment;
                                    if (currentValue > targetValue) {
                                        currentValue = targetValue;
                                    }
                                    
                                    // 표시할 값 포맷팅
                                    let displayValue;
                                    if (targetValue >= 1000000) {
                                        displayValue = Math.floor(currentValue / 1000000) + '억+';
                                    } else if (targetValue >= 10000) {
                                        displayValue = Math.floor(currentValue / 10000) + '만+';
                                    } else {
                                        displayValue = currentValue.toLocaleString();
                                    }
                                    
                                    counter.textContent = displayValue;
                                    requestAnimationFrame(updateCounter);
                                }
                            };
                            
                            updateCounter();
                        });
                    },
                    once: true
                });
            }
        }
    }
    
    // 데모 페이지 탭 기능
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoContents = document.querySelectorAll('.demo-content');
    const demoVisuals = document.querySelectorAll('.demo-visual');
    
    if (demoTabs.length && demoContents.length) {
        demoTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // 활성화된 탭 스타일 제거
                demoTabs.forEach(t => t.classList.remove('active'));
                // 현재 탭 활성화
                tab.classList.add('active');
                
                // 콘텐츠 숨기기
                demoContents.forEach(content => {
                    content.classList.remove('active');
                });
                // 현재 탭에 해당하는 콘텐츠 표시
                if (demoContents[index]) {
                    demoContents[index].classList.add('active');
                }
                
                // 시각 자료 숨기기
                if (demoVisuals.length) {
                    demoVisuals.forEach(visual => {
                        visual.classList.remove('active');
                    });
                    // 현재 탭에 해당하는 시각 자료 표시
                    if (demoVisuals[index]) {
                        demoVisuals[index].classList.add('active');
                    }
                }
            });
        });
    }
    
    // 게이지 차트 애니메이션
    const gaugeCharts = document.querySelectorAll('circle[stroke-dasharray]');
    if (gaugeCharts.length) {
        gaugeCharts.forEach(chart => {
            const originalValue = chart.getAttribute('stroke-dasharray');
            // 초기값을 0으로 설정
            chart.setAttribute('stroke-dasharray', '0 339');
            
            // 애니메이션을 위한 requestAnimationFrame 사용
            // (CSS 애니메이션 대신 JS 애니메이션 사용)
            setTimeout(() => {
                chart.setAttribute('stroke-dasharray', originalValue);
            }, 500);
        });
    }
    
    // 토글 스위치 기능
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    if (toggleSwitches.length) {
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
            });
        });
    }
    
    // 히어로 섹션 애니메이션
    const heroImage = document.querySelector('.float-animation');
    if (heroImage) {
        // float-animation 클래스가 이미 CSS에서 애니메이션을 정의하고 있음
        // 필요한 경우 여기에 추가 컨트롤 로직 구현
    }
    
    // 카운터 값 애니메이션 (홈페이지 앱 미리보기의 위험지수)
    const counterValues = document.querySelectorAll('.counter-value');
    if (counterValues.length) {
        counterValues.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-count'));
            let currentValue = 0;
            const duration = 2000; // 2초 동안 애니메이션
            const interval = 20; // 업데이트 간격 (밀리초)
            const steps = duration / interval;
            const increment = targetValue / steps;
            
            const updateCounter = () => {
                if (currentValue < targetValue) {
                    currentValue += increment;
                    if (currentValue > targetValue) {
                        currentValue = targetValue;
                    }
                    counter.textContent = Math.round(currentValue);
                    counter.classList.add('visible');
                    
                    setTimeout(updateCounter, interval);
                }
            };
            
            // 페이지 로드 후 약간의 지연시간을 두고 애니메이션 시작
            setTimeout(updateCounter, 1000);
        });
    }
    
    // 이미지 지연 로딩
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length) {
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
    
    // 스크롤 애니메이션 (특정 위치에서 요소 강조)
    const animateOnScroll = document.querySelectorAll('.fade-in');
    if (animateOnScroll.length) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        animateOnScroll.forEach(element => {
            scrollObserver.observe(element);
        });
    }
});
