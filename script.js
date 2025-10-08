// 2025年現代化互動功能

// DOM元素
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// 導航欄切換功能
function toggleNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// 關閉導航菜單
function closeNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// 導航欄事件監聽器
if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
}

// 點擊導航連結時關閉菜單
navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
});

// 菜單標籤切換功能
function switchTab(event) {
    const targetTab = event.target.getAttribute('data-tab');
    
    // 移除所有活動狀態
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // 添加活動狀態到點擊的標籤和對應內容
    event.target.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
}

// 標籤按鈕事件監聽器
tabBtns.forEach(btn => {
    btn.addEventListener('click', switchTab);
});

// 平滑滾動到指定區域
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // 考慮固定導航欄高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 導航連結點擊事件
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        smoothScrollTo(targetId);
    });
});

// 英雄區域按鈕點擊事件
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    
    heroButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.textContent.includes('訂購')) {
                smoothScrollTo('#contact');
            } else if (btn.textContent.includes('菜單')) {
                smoothScrollTo('#menu');
            }
        });
    });
});

// 滾動動畫觀察器
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll('.feature-card, .menu-item, .about-text, .contact-item');
    animatedElements.forEach(el => observer.observe(el));
}

// 導航欄滾動效果
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 表單處理
function handleFormSubmission() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 獲取表單數據
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // 簡單驗證
            if (!name || !email || !message) {
                showNotification('請填寫所有欄位', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('請輸入有效的電子郵件地址', 'error');
                return;
            }
            
            // 模擬表單提交
            showNotification('訊息已發送！我們會盡快回覆您。', 'success');
            contactForm.reset();
        });
    }
}

// 電子郵件驗證
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知系統
function showNotification(message, type = 'info') {
    // 移除現有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 創建新通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加樣式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // 顯示動畫
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動隱藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// 懶加載圖片
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 性能優化：防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 響應式圖片處理
function handleResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

// 鍵盤導航支援
function handleKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC鍵關閉導航菜單
        if (e.key === 'Escape') {
            closeNav();
        }
        
        // Tab鍵導航支援
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // 移除鍵盤導航樣式
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// 觸摸設備支援
function handleTouchDevices() {
    // 添加觸摸類別
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // 觸摸反饋
    const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .tab-btn, .menu-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.classList.remove('touch-active');
            }, 150);
        });
    });
}

// 主題切換功能（可選）
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', '切換主題');
    
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: var(--shadow-md);
        transition: var(--transition-normal);
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
}

// 照片輪播功能
function initPhotoCarousel() {
    const carousel = document.querySelector('.photo-carousel');
    if (!carousel) {
        console.log('輪播容器未找到');
        return;
    }

    const slides = carousel.querySelectorAll('.slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const carouselInfo = carousel.querySelector('.carousel-info');
    
    console.log('找到輪播元素:', {
        slides: slides.length,
        indicators: indicators.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        carouselInfo: !!carouselInfo
    });
    
    let currentSlide = 0;
    let autoPlayInterval;
    const slideCount = slides.length;
    
    // 輪播資訊內容
    const slideInfo = [
        { title: '店內環境', description: '溫馨舒適的用餐空間' },
        { title: '製作過程', description: '精心製作每一份鬆餅' },
        { title: '美食展示', description: '色香味俱全的美味鬆餅' }
    ];

    // 更新輪播顯示
    function updateCarousel(slideIndex) {
        const slidesContainer = carousel.querySelector('.carousel-slides');
        
        console.log('更新輪播到第', slideIndex + 1, '張');
        
        // 移除所有活動狀態
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 添加活動狀態
        slides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');
        
        // 使用transform移動到對應位置
        const translateX = -slideIndex * (100 / slideCount);
        slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        console.log('移動位置:', translateX + '%');
        
        // 更新資訊
        if (carouselInfo) {
            carouselInfo.querySelector('h4').textContent = slideInfo[slideIndex].title;
            carouselInfo.querySelector('p').textContent = slideInfo[slideIndex].description;
        }
    }

    // 下一張
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel(currentSlide);
    }

    // 上一張
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel(currentSlide);
    }

    // 跳轉到指定張數
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel(currentSlide);
    }

    // 自動播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // 4秒切換
    }

    // 停止自動播放
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // 事件監聽器
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // 重新開始自動播放
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // 重新開始自動播放
        });
    }

    // 指示器點擊事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay(); // 重新開始自動播放
        });
    });

    // 滑鼠懸停暫停自動播放
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // 觸控支援
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // 滑動閾值
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向左滑動，顯示下一張
                nextSlide();
            } else {
                // 向右滑動，顯示上一張
                prevSlide();
            }
        }
    }

    // 鍵盤導航
    document.addEventListener('keydown', (e) => {
        if (carousel.matches(':hover')) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            }
        }
    });

    // 初始化顯示第一張照片
    updateCarousel(currentSlide);
    
    // 開始自動播放
    startAutoPlay();
}

// 圖片放大功能
function initImageModal() {
    const mapImage = document.getElementById('map-image');
    const menuPhoto = document.querySelector('.menu-photo'); // 菜單照片
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalCaption = document.querySelector('.modal-caption');

    if (!modal || !modalImage || !modalClose || !modalCaption) {
        console.log('圖片放大功能元素未找到');
        return;
    }

    // 打開模態框的通用函數
    function openModal(imageSrc, imageAlt, title, description) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modalCaption.querySelector('h4').textContent = title;
        modalCaption.querySelector('p').textContent = description;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    }

    // 點擊地圖圖片打開模態框
    if (mapImage) {
        mapImage.addEventListener('click', () => {
            openModal(
                mapImage.src,
                mapImage.alt,
                '📍 So Big 鬆餅詳細位置指引',
                '桃園市中壢區新中北路360號 (活動中心地下一樓)'
            );
        });
    }

    // 點擊菜單照片或容器打開模態框
    const menuPhotoContainer = document.querySelector('.menu-photo-container');
    
    if (menuPhoto) {
        const openMenuModal = () => {
            openModal(
                menuPhoto.src,
                menuPhoto.alt,
                '🍴 So Big 鬆餅完整菜單',
                '查看詳細菜單內容與價格'
            );
        };
        
        menuPhoto.addEventListener('click', openMenuModal);
        
        // 也讓容器可點擊
        if (menuPhotoContainer) {
            menuPhotoContainer.addEventListener('click', openMenuModal);
        }
    }

    // 關閉模態框
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // 恢復背景滾動
    }

    // 點擊關閉按鈕
    modalClose.addEventListener('click', closeModal);

    // 點擊模態框背景關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC鍵關閉
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    console.log('圖片放大功能已初始化');
}

// 初始化所有功能
function init() {
    // 基本功能
    handleNavbarScroll();
    handleFormSubmission();
    handleKeyboardNavigation();
    handleTouchDevices();
    handleResponsiveImages();
    
    // 滾動動畫
    createScrollObserver();
    
    // 輪播功能
    initPhotoCarousel();
    
    // 圖片放大功能
    initImageModal();
    
    // 可選功能
    // createThemeToggle();
    
    // 性能優化
    lazyLoadImages();
    
    console.log('So Big 鬆餅網站已載入完成！');
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', init);

// 窗口大小改變時重新計算
window.addEventListener('resize', debounce(() => {
    // 重新計算響應式元素
    handleResponsiveImages();
}, 250));

// 錯誤處理
window.addEventListener('error', (e) => {
    console.error('網站錯誤:', e.error);
    showNotification('發生錯誤，請重新載入頁面', 'error');
});

// 服務工作者註冊（PWA支援）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW 註冊成功:', registration);
            })
            .catch(registrationError => {
                console.log('SW 註冊失敗:', registrationError);
            });
    });
}
