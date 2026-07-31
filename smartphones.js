const API_URL = 'products.json';

async function fetchSmartphones() {
    const container = document.getElementById('smartphones-container');
    
    if (!container) return;

    container.innerHTML = `
        <div class="col-12 text-center text-white py-5">
            <div class="spinner-border text-accent" role="status"></div>
            <p class="mt-2">جاري تحميل الموبايلات...</p>
        </div>
    `;

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`خطأ في الشبكة: ${response.status}`);
        }

        const allProducts = await response.json();
        
        // فلترة المنتجات لعرض الهواتف الذكية فقط
        const phones = allProducts.filter(product => product.category === 'smartphone');

        container.innerHTML = ''; 

        if (Array.isArray(phones) && phones.length > 0) {
            phones.forEach(phone => {
                const phoneCard = `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card product-card h-100 border-0">
                            ${phone.isNew ? '<span class="badge bg-danger position-absolute top-0 end-0 m-3 fs-6">جديد</span>' : ''}
                            <img src="${phone.image || 'img/default.png'}" class="card-img-top p-3 product-img" alt="${phone.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold text-white">${phone.name}</h5>
                                <p class="card-text text-white small mb-3">${phone.description || ''}</p>
                                <div class="mt-auto">
                                    <div class="mb-3"><span class="fs-4 fw-bold text-accent">${Number(phone.price).toLocaleString()} ج.م</span></div>
                                    <a href="https://wa.me/201551714391?text=${encodeURIComponent('أهلاً دماغ.تك، عايز أستفسر عن ' + phone.name)}" target="_blank" class="btn btn-whatsapp w-100 py-2">
                                        <i class="fab fa-whatsapp ms-1"></i> اطلب عبر الواتساب
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += phoneCard;
            });
        } else {
            container.innerHTML = `<div class="col-12 text-center text-white-50 my-5"><h4>لا توجد هواتف متوفرة حالياً في هذا القسم.</h4></div>`;
        }
    } catch (error) {
        console.error('حدث خطأ أثناء تحميل الهواتف:', error);
        container.innerHTML = `<div class="col-12 text-center text-danger my-5"><h4>حدث خطأ أثناء تحميل المنتجات.</h4></div>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchSmartphones);