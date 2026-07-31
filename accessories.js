// رابط ملف JSON الذي يحتوي على جميع المنتجات
const API_URL = 'products.json';

async function fetchAccessories() {
    const container = document.getElementById('accessories-container');
    if (!container) return;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('فشل جلب البيانات من الملف');
        }
        
        const allProducts = await response.json();
        
        // فلترة المنتجات لعرض الإكسسوارات فقط
        const items = allProducts.filter(product => product.category === 'accessory');

        if (Array.isArray(items) && items.length > 0) {
            let cardsHtml = '';

            items.forEach(item => {
                const itemImg = item.image || 'img/default.png';

                cardsHtml += `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card product-card h-100 border-0">
                            <img src="${itemImg}" onerror="this.src='img/default.png';" class="card-img-top p-3 product-img" alt="${item.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold text-white">${item.name}</h5>
                                <p class="card-text text-white small mb-3">${item.description || ''}</p>
                                <div class="mt-auto">
                                    <div class="mb-3"><span class="fs-4 fw-bold text-accent">${Number(item.price).toLocaleString()} ج.م</span></div>
                                    <a href="https://wa.me/201551714391?text=${encodeURIComponent('أهلاً دماغ.تك، عايز أستفسر عن ' + item.name)}" target="_blank" class="btn btn-whatsapp w-100 py-2">
                                        <i class="fab fa-whatsapp ms-1"></i> اطلب عبر الواتساب
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = cardsHtml;
        } else {
            container.innerHTML = `<div class="col-12 text-center text-white-50 my-5"><h4>لا توجد إكسسوارات متوفرة حالياً في هذا القسم.</h4></div>`;
        }
    } catch (error) {
        console.error('حدث خطأ أثناء تحميل الإكسسوارات:', error);
        container.innerHTML = `<div class="col-12 text-center text-danger my-5"><h4>حدث خطأ أثناء تحميل المنتجات.</h4></div>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchAccessories);