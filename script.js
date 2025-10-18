// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect and back to top button
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(55, 65, 81, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.2)';
        backToTop.classList.add('show');
    } else {
        header.style.background = 'rgba(55, 65, 81, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        backToTop.classList.remove('show');
    }
});

// Formspree Integration
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            submitButton.disabled = true;
            
            // Set reply-to field dynamically
            const emailField = contactForm.querySelector('input[name="email"]');
            const replyToField = contactForm.querySelector('input[name="_replyto"]');
            if (emailField && replyToField) {
                replyToField.value = emailField.value;
            }
            
            // Submit form
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showSuccessMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                showErrorMessage('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Handle callback form submission
    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = callbackForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            submitButton.disabled = true;
            
            // Set reply-to field dynamically
            const emailField = callbackForm.querySelector('input[name="email"]');
            const replyToField = callbackForm.querySelector('input[name="_replyto"]');
            if (emailField && replyToField && emailField.value) {
                replyToField.value = emailField.value;
            }
            
            // Submit form
            fetch(callbackForm.action, {
                method: 'POST',
                body: new FormData(callbackForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showSuccessMessage('Geri arama talebiniz alındı! 15 dakika içinde sizi arayacağız.');
                    callbackForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                showErrorMessage('Talep gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Check for success parameters in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showSuccessMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    }
    if (urlParams.get('callback') === 'true') {
        showSuccessMessage('Geri arama talebiniz alındı! 15 dakika içinde sizi arayacağız.');
    }
});

// Success message function
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'form-notification success';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Error message function
function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'form-notification error';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 7 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 7000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Modal functionality
const applianceModal = document.getElementById('applianceModal');
const serviceModal = document.getElementById('serviceModal');
const closeModal = document.querySelector('.close');

function openApplianceModal(applianceType) {
    const applianceData = getApplianceData(applianceType);
    populateApplianceModal(applianceData);
    applianceModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeApplianceModal() {
    applianceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openServiceModal(serviceType) {
    const serviceData = getServiceData(serviceType);
    populateServiceModal(serviceData);
    serviceModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === applianceModal) {
        closeApplianceModal();
    }
    if (e.target === serviceModal) {
        closeServiceModal();
    }
});

closeModal.addEventListener('click', () => {
    closeApplianceModal();
    closeServiceModal();
});

// Phone call function
function callPhone() {
    window.location.href = 'tel:+902125550123';
}

// Appliance data
function getApplianceData(type) {
    const data = {
        'washing-machine': {
            icon: 'fas fa-tshirt',
            title: 'Çamaşır Makinesi',
            description: 'Tüm marka çamaşır makineleri için profesyonel teknik servis hizmeti. Arıza tespiti, tamir ve bakım işlemleri.',
            gallery: [
                { icon: 'fas fa-tools', text: 'Arıza Tespiti' },
                { icon: 'fas fa-cogs', text: 'Motor Tamiri' },
                { icon: 'fas fa-wrench', text: 'Kapak Tamiri' },
                { icon: 'fas fa-bolt', text: 'Elektronik Kart' }
            ],
            specs: [
                { label: 'Servis Süresi', value: '1-2 Gün' },
                { label: 'Garanti', value: '6 Ay' },
                { label: 'Evde Servis', value: 'Var' },
                { label: 'Yedek Parça', value: 'Orijinal' }
            ],
            services: [
                'Arıza tespiti ve teşhis',
                'Motor ve pompa tamiri',
                'Elektronik kart değişimi',
                'Kapak ve menteşe tamiri',
                'Su girişi ve çıkışı tamiri',
                'Programlama ve ayar'
            ],
            brands: ['Arçelik', 'Beko', 'Bosch', 'Siemens', 'Samsung', 'LG', 'Vestel', 'Profilo']
        },
        'dishwasher': {
            icon: 'fas fa-utensils',
            title: 'Bulaşık Makinesi',
            description: 'Bulaşık makineleri için uzman teknik servis. Su sızıntısı, yıkama problemleri ve elektronik arızalar.',
            gallery: [
                { icon: 'fas fa-tools', text: 'Arıza Tespiti' },
                { icon: 'fas fa-shower', text: 'Su Sistemi' },
                { icon: 'fas fa-cogs', text: 'Motor Tamiri' },
                { icon: 'fas fa-thermometer-half', text: 'Isıtıcı' }
            ],
            specs: [
                { label: 'Servis Süresi', value: '1-2 Gün' },
                { label: 'Garanti', value: '6 Ay' },
                { label: 'Evde Servis', value: 'Var' },
                { label: 'Yedek Parça', value: 'Orijinal' }
            ],
            services: [
                'Su sızıntısı tamiri',
                'Yıkama performansı artırma',
                'Elektronik kart değişimi',
                'Su girişi ve çıkışı tamiri',
                'Isıtıcı eleman değişimi',
                'Programlama ve ayar'
            ],
            brands: ['Arçelik', 'Beko', 'Bosch', 'Siemens', 'Samsung', 'LG', 'Vestel', 'Profilo']
        },
        'refrigerator': {
            icon: 'fas fa-snowflake',
            title: 'Buzdolabı',
            description: 'Buzdolabı soğutma sistemleri, kompresör ve elektronik arızalar için profesyonel servis.',
            gallery: [
                { icon: 'fas fa-tools', text: 'Arıza Tespiti' },
                { icon: 'fas fa-thermometer-half', text: 'Soğutma' },
                { icon: 'fas fa-cogs', text: 'Kompresör' },
                { icon: 'fas fa-bolt', text: 'Elektronik' }
            ],
            specs: [
                { label: 'Servis Süresi', value: '1-3 Gün' },
                { label: 'Garanti', value: '6 Ay' },
                { label: 'Evde Servis', value: 'Var' },
                { label: 'Yedek Parça', value: 'Orijinal' }
            ],
            services: [
                'Soğutma sistemi tamiri',
                'Kompresör değişimi',
                'Elektronik kart tamiri',
                'Kapı contası değişimi',
                'Termostat ayarı',
                'Gaz dolumu ve temizlik'
            ],
            brands: ['Arçelik', 'Beko', 'Bosch', 'Siemens', 'Samsung', 'LG', 'Vestel', 'Profilo']
        },
        'oven': {
            icon: 'fas fa-fire',
            title: 'Fırın & Ocak',
            description: 'Fırın ve ocak sistemleri için uzman teknik servis. Isıtma problemleri ve elektronik arızalar.',
            gallery: [
                { icon: 'fas fa-tools', text: 'Arıza Tespiti' },
                { icon: 'fas fa-fire', text: 'Isıtma' },
                { icon: 'fas fa-cogs', text: 'Motor' },
                { icon: 'fas fa-bolt', text: 'Elektronik' }
            ],
            specs: [
                { label: 'Servis Süresi', value: '1-2 Gün' },
                { label: 'Garanti', value: '6 Ay' },
                { label: 'Evde Servis', value: 'Var' },
                { label: 'Yedek Parça', value: 'Orijinal' }
            ],
            services: [
                'Isıtma sistemi tamiri',
                'Elektronik kart değişimi',
                'Termostat ayarı',
                'Fan motoru tamiri',
                'Kapı contası değişimi',
                'Programlama ve ayar'
            ],
            brands: ['Arçelik', 'Beko', 'Bosch', 'Siemens', 'Samsung', 'LG', 'Vestel', 'Profilo']
        },
        'air-conditioner': {
            icon: 'fas fa-wind',
            title: 'Klima',
            description: 'Klima sistemleri için profesyonel servis. Soğutma, ısıtma ve hava kalitesi problemleri.',
            gallery: [
                { icon: 'fas fa-tools', text: 'Arıza Tespiti' },
                { icon: 'fas fa-thermometer-half', text: 'Soğutma' },
                { icon: 'fas fa-cogs', text: 'Kompresör' },
                { icon: 'fas fa-wind', text: 'Fan Motoru' }
            ],
            specs: [
                { label: 'Servis Süresi', value: '1-2 Gün' },
                { label: 'Garanti', value: '6 Ay' },
                { label: 'Evde Servis', value: 'Var' },
                { label: 'Yedek Parça', value: 'Orijinal' }
            ],
            services: [
                'Soğutma sistemi tamiri',
                'Kompresör değişimi',
                'Fan motoru tamiri',
                'Elektronik kart değişimi',
                'Gaz dolumu ve temizlik',
                'Filtre değişimi ve bakım'
            ],
            brands: ['Arçelik', 'Beko', 'Bosch', 'Siemens', 'Samsung', 'LG', 'Vestel', 'Profilo']
        },
        'dryer': {
            icon: 'fas fa-tint',
            title: 'Çamaşır Kurutma Makinesi',
            description: 'Çamaşır kurutma makineleri için uzman teknik servis. Kurutma performansı ve elektronik arızalar.',
            gallery: [
                { icon: 'fas fa-tools', text: 'Arıza Tespiti' },
                { icon: 'fas fa-thermometer-half', text: 'Isıtma' },
                { icon: 'fas fa-cogs', text: 'Motor' },
                { icon: 'fas fa-wind', text: 'Fan Sistemi' }
            ],
            specs: [
                { label: 'Servis Süresi', value: '1-2 Gün' },
                { label: 'Garanti', value: '6 Ay' },
                { label: 'Evde Servis', value: 'Var' },
                { label: 'Yedek Parça', value: 'Orijinal' }
            ],
            services: [
                'Kurutma sistemi tamiri',
                'Isıtıcı eleman değişimi',
                'Fan motoru tamiri',
                'Elektronik kart değişimi',
                'Kondens sistemi tamiri',
                'Programlama ve ayar'
            ],
            brands: ['Arçelik', 'Beko', 'Bosch', 'Siemens', 'Samsung', 'LG', 'Vestel', 'Profilo']
        }
    };
    
    return data[type] || data['washing-machine'];
}

// Service data
function getServiceData(type) {
    const data = {
        'diagnosis': {
            icon: 'fas fa-tools',
            title: 'Arıza Tespiti',
            description: 'Uzman teknisyenlerimizle hızlı ve doğru arıza tespiti. Modern test cihazları ile kesin teşhis.',
            process: [
                {
                    step: 1,
                    title: 'İlk İnceleme',
                    description: 'Beyaz eşyanızın genel durumu ve belirtileri incelenir'
                },
                {
                    step: 2,
                    title: 'Test Cihazları',
                    description: 'Profesyonel test cihazları ile detaylı analiz yapılır'
                },
                {
                    step: 3,
                    title: 'Arıza Tespiti',
                    description: 'Sorunun kaynağı ve çözüm yöntemi belirlenir'
                },
                {
                    step: 4,
                    title: 'Rapor Hazırlama',
                    description: 'Detaylı arıza raporu ve maliyet tahmini sunulur'
                }
            ],
            features: [
                'Modern test cihazları',
                'Uzman teknisyen deneyimi',
                'Hızlı tespit süreci',
                'Detaylı arıza raporu',
                'Maliyet tahmini',
                'Çözüm önerileri'
            ],
            gallery: [
                { icon: 'fas fa-search', text: 'İnceleme' },
                { icon: 'fas fa-tools', text: 'Test Cihazları' },
                { icon: 'fas fa-clipboard-check', text: 'Rapor' },
                { icon: 'fas fa-chart-line', text: 'Analiz' }
            ]
        },
        'repair': {
            icon: 'fas fa-cogs',
            title: 'Tamir ve Bakım',
            description: 'Orijinal yedek parçalarla kaliteli tamir hizmeti. Uzman teknisyenlerimizle profesyonel çözüm.',
            process: [
                {
                    step: 1,
                    title: 'Parça Temini',
                    description: 'Orijinal yedek parçalar temin edilir'
                },
                {
                    step: 2,
                    title: 'Tamir İşlemi',
                    description: 'Uzman teknisyenlerimiz tarafından tamir yapılır'
                },
                {
                    step: 3,
                    title: 'Test ve Kalite',
                    description: 'Tamir sonrası kapsamlı test yapılır'
                },
                {
                    step: 4,
                    title: 'Garanti',
                    description: '6 ay garanti ile hizmet sunulur'
                }
            ],
            features: [
                'Orijinal yedek parçalar',
                'Uzman teknisyen hizmeti',
                'Kaliteli işçilik',
                '6 ay garanti',
                'Test ve kalite kontrolü',
                'Bakım önerileri'
            ],
            gallery: [
                { icon: 'fas fa-cogs', text: 'Tamir' },
                { icon: 'fas fa-wrench', text: 'Bakım' },
                { icon: 'fas fa-shield-alt', text: 'Garanti' },
                { icon: 'fas fa-check-circle', text: 'Kalite' }
            ]
        },
        'home-service': {
            icon: 'fas fa-truck',
            title: 'Evde Servis',
            description: 'Kapınıza kadar gelen profesyonel servis hizmeti. Evinizde konforlu çözüm.',
            process: [
                {
                    step: 1,
                    title: 'Randevu Alımı',
                    description: 'Size uygun tarih ve saat belirlenir'
                },
                {
                    step: 2,
                    title: 'Teknisyen Gönderimi',
                    description: 'Uzman teknisyen adresinize yönlendirilir'
                },
                {
                    step: 3,
                    title: 'Evde Servis',
                    description: 'Evinizde profesyonel hizmet sunulur'
                },
                {
                    step: 4,
                    title: 'Takip ve Destek',
                    description: 'Sürekli destek ve takip hizmeti'
                }
            ],
            features: [
                'Evde servis hizmeti',
                'Randevu sistemi',
                'Uzman teknisyen',
                'Hızlı müdahale',
                'Takip sistemi',
                '7/24 destek'
            ],
            gallery: [
                { icon: 'fas fa-home', text: 'Evde Servis' },
                { icon: 'fas fa-calendar', text: 'Randevu' },
                { icon: 'fas fa-truck', text: 'Nakliye' },
                { icon: 'fas fa-headset', text: 'Destek' }
            ]
        },
        'warranty': {
            icon: 'fas fa-shield-alt',
            title: 'Garanti',
            description: 'Tüm tamir işlemlerimiz garanti kapsamındadır. Güvenilir ve kaliteli hizmet.',
            process: [
                {
                    step: 1,
                    title: 'Garanti Kapsamı',
                    description: '6 ay kapsamlı garanti hizmeti'
                },
                {
                    step: 2,
                    title: 'Takip Sistemi',
                    description: 'Garanti süresince takip ve kontrol'
                },
                {
                    step: 3,
                    title: 'Ücretsiz Servis',
                    description: 'Garanti kapsamında ücretsiz hizmet'
                },
                {
                    step: 4,
                    title: 'Müşteri Memnuniyeti',
                    description: 'Müşteri memnuniyeti odaklı hizmet'
                }
            ],
            features: [
                '6 ay garanti',
                'Ücretsiz servis',
                'Takip sistemi',
                'Müşteri memnuniyeti',
                'Kalite garantisi',
                'Hızlı müdahale'
            ],
            gallery: [
                { icon: 'fas fa-shield-alt', text: 'Garanti' },
                { icon: 'fas fa-handshake', text: 'Güven' },
                { icon: 'fas fa-star', text: 'Kalite' },
                { icon: 'fas fa-heart', text: 'Memnuniyet' }
            ]
        }
    };
    
    return data[type] || data['diagnosis'];
}

function populateServiceModal(data) {
    document.getElementById('serviceIcon').className = data.icon;
    document.getElementById('serviceTitle').textContent = data.title;
    document.getElementById('serviceDescription').textContent = data.description;
    
    // Populate process
    const process = document.getElementById('serviceProcess');
    process.innerHTML = '';
    data.process.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'process-step';
        stepElement.innerHTML = `
            <div class="process-step-number">${step.step}</div>
            <div class="process-step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        `;
        process.appendChild(stepElement);
    });
    
    // Populate features
    const features = document.getElementById('serviceFeatures');
    features.innerHTML = '';
    data.features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-item';
        featureElement.innerHTML = `<i class="fas fa-check"></i><span>${feature}</span>`;
        features.appendChild(featureElement);
    });
}

function populateApplianceModal(data) {
    document.getElementById('applianceIcon').className = data.icon;
    document.getElementById('applianceTitle').textContent = data.title;
    document.getElementById('applianceDescription').textContent = data.description;
    
    // Populate gallery
    const gallery = document.getElementById('applianceGallery');
    gallery.innerHTML = '';
    data.gallery.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<i class="${item.icon}"></i><span>${item.text}</span>`;
        gallery.appendChild(galleryItem);
    });
    
    // Populate specs
    const specs = document.getElementById('applianceSpecs');
    specs.innerHTML = '';
    data.specs.forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-label">${spec.label}</span>
            <span class="spec-value">${spec.value}</span>
        `;
        specs.appendChild(specItem);
    });
    
    // Populate services
    const services = document.getElementById('applianceServices');
    services.innerHTML = '';
    data.services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `<i class="fas fa-check"></i><span>${service}</span>`;
        services.appendChild(serviceItem);
    });
    
    // Populate brands
    const brands = document.getElementById('applianceBrands');
    brands.innerHTML = '';
    data.brands.forEach(brand => {
        const brandItem = document.createElement('div');
        brandItem.className = 'brand-item';
        brandItem.textContent = brand;
        brands.appendChild(brandItem);
    });
}

// Scroll to services function
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

// Scroll to callback section function
function scrollToCallback() {
    document.querySelector('.callback-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .appliance-category, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Set minimum date for appointment form
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
});

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        } else if (value.length <= 8) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
        } else {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
        }
    }
    input.value = value;
}

// Apply phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
    
    // Add special styling for callback form
    const callbackPhone = document.getElementById('callbackPhone');
    if (callbackPhone) {
        callbackPhone.addEventListener('focus', () => {
            callbackPhone.style.borderColor = '#10b981';
            callbackPhone.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        });
    }
});

// Loading animation for buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';
    button.disabled = true;
    
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
    
    return isValid;
}

// Apply enhanced validation to forms
[contactForm, appointmentForm, callbackForm].forEach(form => {
    if (form) {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                showNotification('Lütfen tüm gerekli alanları doldurun.', 'error');
            }
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Service cards hover effect
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Appliance category hover effect
document.addEventListener('DOMContentLoaded', () => {
    const applianceCategories = document.querySelectorAll('.appliance-category');
    
    applianceCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const icon = category.querySelector('.category-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        category.addEventListener('mouseleave', () => {
            const icon = category.querySelector('.category-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
    `;
    
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(100px)';
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
