// ایجاد یک آرایه برای ذخیره محصولات در سبد خرید
let cart = [];

// تابع برای اضافه کردن به سبد خرید
function addToCart(id, name, price, imgSrc) {
    // بررسی اینکه محصول قبلاً در سبد خرید وجود دارد یا خیر
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        // اگر محصول وجود داشت، تعداد آن را افزایش می‌دهیم
        existingProduct.quantity++;
    } else {
        // اگر محصول جدید بود، آن را اضافه می‌کنیم
        const product = {
            id: id,
            name: name,
            price: price,
            imgSrc: imgSrc,
            quantity: 1  // تعداد محصول را 1 تنظیم می‌کنیم
        };
        cart.push(product);
    }

    // ذخیره سبد خرید در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // نمایش اطلاعیه یا انجام هر کار دیگری
    alert(name + " به سبد خرید اضافه شد!");

    // آپدیت کردن تعداد محصولات در سبد خرید در منو
    updateCartCount();
}

// تابع برای نمایش تعداد محصولات در سبد خرید
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);  // محاسبه تعداد کل محصولات
    const cartIcon = document.getElementById('cart-count'); // شناسه‌ای که برای نمایش تعداد سبد خرید دارید
    if (cartIcon) {
        cartIcon.textContent = cartCount;  // نمایش تعداد در آیکون
    }
}

// تابع برای نمایش محصولات در سبد خرید
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cartItemsContainer) {
        if (cart.length > 0) {
            let totalPrice = 0; // برای محاسبه مجموع قیمت
            cartItemsContainer.innerHTML = ''; // خالی کردن محتوای قبلی

            cart.forEach(item => {
                // نمایش محصول در سبد خرید
                const productElement = document.createElement('div');
                productElement.classList.add('cart-item');
                productElement.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}" width="50">
                    <p>${item.name} (${item.quantity})</p> <!-- نمایش تعداد محصول -->
                    <p>${item.price} تومان</p>
                    <button onclick="removeFromCart(${item.id})">حذف</button> <!-- دکمه حذف محصول -->
                `;
                cartItemsContainer.appendChild(productElement);

                // محاسبه مجموع قیمت
                totalPrice += parseInt(item.price.replace(/,/g, '')) * item.quantity; // محاسبه قیمت کل محصول (با توجه به تعداد)
            });

            // نمایش مجموع قیمت
            totalPriceElement.textContent = `مجموع: ${totalPrice.toLocaleString()} تومان`;
        } else {
            cartItemsContainer.innerHTML = '<p>سبد خرید شما خالی است.</p>';
        }
    }
}

// تابع برای حذف محصول از سبد خرید
function removeFromCart(id) {
    // پیدا کردن ایندکس محصول در سبد خرید
    const productIndex = cart.findIndex(item => item.id === id);
    
    if (productIndex > -1) {
        // حذف محصول از سبد خرید
        cart.splice(productIndex, 1);

        // ذخیره سبد خرید در localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // نمایش محصولات به روز شده
        displayCart();

        // آپدیت کردن تعداد محصولات در سبد خرید در منو
        updateCartCount();
    }
}

// بارگذاری سبد خرید از localStorage
window.onload = function() {
    // دریافت سبد خرید از localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // نمایش تعداد محصولات در سبد خرید
    updateCartCount();

    // نمایش محصولات در سبد خرید
    displayCart();
};

// تابع برای نمایش/مخفی کردن منو همبرگر
function toggleMenu() {
    const menu = document.querySelector('.navbar .menu');
    menu.classList.toggle('active');
}

// تابع برای نمایش فرم ورود
document.getElementById('login-btn').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'flex';
});

// تابع برای بستن فرم ورود
function closeLoginForm() {
    document.getElementById('login-form').style.display = 'none';
}

// تابع تغییر حالت فرم به ثبت نام
function switchToSignup() {
    const form = document.querySelector('.login-container form');
    const button = form.querySelector('button[type="submit"]');
    button.textContent = 'ثبت نام';
} 
document.getElementById('customer-form').addEventListener('submit', function(e) {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    // دریافت اطلاعات از فرم
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const postalCode = document.getElementById('postal-code').value;
    const nationalId = document.getElementById('national-id').value;
    const email = document.getElementById('email').value;

    // پردازش اطلاعات (می‌توانید اینجا اطلاعات را به سرور ارسال کنید یا ذخیره کنید)
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Phone: ${phoneNumber}`);
    console.log(`Postal Code: ${postalCode}`);
    console.log(`National ID: ${nationalId}`);
    console.log(`Email: ${email}`);

    // نمایش پیام تایید یا هدایت به صفحه بعد (پرداخت)
    alert('اطلاعات شما با موفقیت ارسال شد!');
    window.location.href = 'payment.html';  // می‌توانید صفحه پرداخت را هدایت کنید
});
// صفحه ورود
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // اینجا باید برای ورود کاربر اعتبارسنجی انجام دهید
    alert(`ورود با ایمیل: ${email} و کلمه عبور: ${password}`);
});

// صفحه ثبت‌نام
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('کلمه عبور و تایید کلمه عبور باید یکسان باشند.');
        return;
    }

    // اینجا باید برای ثبت‌نام کاربر اعتبارسنجی انجام دهید
    alert(`ثبت‌نام با نام: ${name}, ایمیل: ${email} و کلمه عبور: ${password}`);
});
