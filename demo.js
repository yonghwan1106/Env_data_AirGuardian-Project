document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환 기능 구현
    const tabs = document.querySelectorAll('.demo-tab');
    const contents = document.querySelectorAll('.demo-content');
    const visuals = document.querySelectorAll('.demo-visual');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 활성 탭 변경
            tabs.forEach(t => t.classList.remove('active', 'text-blue-600', 'border-b-2', 'border-blue-500'));
            tabs.forEach(t => t.classList.add('text-gray-600'));
            this.classList.add('active', 'text-blue-600', 'border-b-2', 'border-blue-500');
            this.classList.remove('text-gray-600');
            
            // 탭 ID 얻기 (data-tab 속성)
            const tabId = this.getAttribute('data-tab');
            
            // 모든 콘텐츠 영역 숨기기
            contents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            // 선택된 콘텐츠 영역 표시
            const selectedContent = document.getElementById(`${tabId}-content`);
            if (selectedContent) {
                selectedContent.classList.remove('hidden');
                selectedContent.classList.add('active');
            }
            
            // 모든 시각화 영역 숨기기
            visuals.forEach(visual => {
                visual.classList.add('hidden');
                visual.classList.remove('active');
            });
            
            // 선택된 시각화 영역 표시
            const selectedVisual = document.getElementById(`${tabId}-visual`);
            if (selectedVisual) {
                selectedVisual.classList.remove('hidden');
                selectedVisual.classList.add('active');
            }
            
            // 선택된 탭에 따라 차트 렌더링
            if (tabId === 'health') {
                renderHealthCharts();
            }
        });
    });
    
    // 건강 대시보드 차트 렌더링 함수
    function renderHealthCharts() {
        // 대기질 노출과 증상 그래프
        const exposureSymptomCtx = document.getElementById('exposureSymptomChart');
        if (exposureSymptomCtx && !exposureSymptomCtx.chart) {
            exposureSymptomCtx.chart = new Chart(exposureSymptomCtx, {
                type: 'line',
                data: {
                    labels: ['5/10', '5/11', '5/12', '5/13', '5/14', '5/15', '5/16'],
                    datasets: [
                        {
                            label: '대기질 지수',
                            data: [45, 65, 35, 50, 40, 60, 70],
                            borderColor: '#4CAAEE',
                            backgroundColor: 'rgba(76, 170, 238, 0.1)',
                            tension: 0.3,
                            borderWidth: 2,
                            pointBackgroundColor: '#4CAAEE',
                            pointRadius: 4
                        },
                        {
                            label: '증상 심각도',
                            data: [20, 30, 65, 45, 60, 30, 55],
                            borderColor: '#FF6B6B',
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            tension: 0.3,
                            borderWidth: 2,
                            pointBackgroundColor: '#FF6B6B',
                            pointRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 25
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    }
                }
            });
        }
        
        // 대기오염 노출 통계 도넛 차트
        const exposureCtx = document.getElementById('exposureChart');
        if (exposureCtx && !exposureCtx.chart) {
            exposureCtx.chart = new Chart(exposureCtx, {
                type: 'doughnut',
                data: {
                    labels: ['좋음', '보통', '나쁨'],
                    datasets: [{
                        data: [20, 48, 32],
                        backgroundColor: [
                            '#4CB944', // 녹색 (좋음)
                            '#FFD166', // 노랑 (보통)
                            '#FF6B6B'  // 빨강 (나쁨)
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.raw + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    // 위험도 게이지 애니메이션 효과
    function animateGauges() {
        const gauges = document.querySelectorAll('circle[stroke-dasharray]');
        gauges.forEach(gauge => {
            const originalDasharray = gauge.getAttribute('stroke-dasharray');
            gauge.setAttribute('stroke-dasharray', '0 339');
            
            setTimeout(() => {
                gauge.setAttribute('stroke-dasharray', originalDasharray);
                gauge.style.transition = 'stroke-dasharray 1.5s ease-out';
            }, 300);
        });
    }
    
    // 페이지 로드 시 첫 번째 탭(홈) 활성화 및 애니메이션 실행
    if (tabs.length > 0) {
        tabs[0].click();
        animateGauges();
    }
});
