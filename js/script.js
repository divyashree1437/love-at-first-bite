
"use strict";

/* =========================================
   LOVE AT FIRST BITE - FOOD DATA
========================================= */

const FOODS = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 199,
        rating: 4.5,
        description: "Classic pizza with cheese and fresh tomato.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Cheese Burst Pizza",
        category: "Pizza",
        price: 249,
        rating: 4.8,
        description: "Golden melted cheese in every bite.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
    },
    

{
    id: 3,
    name: "Crispy Chicken Burger",
    category: "Burger",
    price: 180,
    rating: 4.9,
    description: "Crispy fried chicken with fresh lettuce and creamy garlic mayonnaise.",
    image: "https://www.recipetineats.com/tachyon/2023/09/Crispy-fried-chicken-burgers_5.jpg"
},


    
{
    id: 4,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 220,
    rating: 4.9,
    description: "Awadhi chicken biryani with fragrant rice, aromatic spices, and tender chicken.",
    image: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-biryani-awadhi-01-600x600.jpg"
},

    
    {
        id: 6,
        name: "Veg Biryani",
        category: "Biryani",
        price: 160,
        rating: 4.4,
        description: "Fragrant rice with vegetables and spices.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Chicken Noodles",
        category: "Noodles",
        price: 180,
        rating: 4.5,
        description: "Stir-fried noodles with chicken and vegetables.",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Veg Noodles",
        category: "Noodles",
        price: 130,
        rating: 4.2,
        description: "Tasty noodles tossed with fresh vegetables.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Grilled Chicken",
        category: "Chicken",
        price: 280,
        rating: 4.7,
        description: "Grilled chicken seasoned with herbs and spices.",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Chicken Wings",
        category: "Chicken",
        price: 210,
        rating: 4.6,
        description: "Flavourful chicken wings with a tasty glaze.",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "Fruit Salad",
        category: "Healthy Food",
        price: 100,
        rating: 4.4,
        description: "A refreshing mix of seasonal fruits.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "Vegetable Salad",
        category: "Healthy Food",
        price: 120,
        rating: 4.3,
        description: "Fresh greens and colourful vegetables.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 13,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 140,
        rating: 4.8,
        description: "Rich chocolate cake for sweet cravings.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 14,
        name: "Ice Cream",
        category: "Dessert",
        price: 80,
        rating: 4.5,
        description: "A cool and creamy sweet treat.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
    },
    
{
    id: 15,
    name: "Fresh Lime Juice",
    category: "Drinks",
    price: 50,
    rating: 4.2,
    description: "Fresh lime juice served chilled.",
    image: "https://thisbagogirl.com/wp-content/uploads/2025/06/Swank-Caribbean-Lime-Juice.jpg"
},
    {
        id: 16,
        name: "Chocolate Milkshake",
        category: "Drinks",
        price: 120,
        rating: 4.7,
        description: "Creamy chocolate milkshake for any time.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80"
    }
];

/* =========================================
   COMMON HELPERS
========================================= */

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

const money = value =>
    "₹" + Number(value || 0).toFixed(2);

function read(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch {
        return fallback;
    }
}

function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function getCart() {
    const cart = read("cart", []);
    return Array.isArray(cart) ? cart : [];
}

function saveCart(cart) {
    write("cart", cart);
    updateCartCount();
}

function updateCartCount() {
    const count = getCart().reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    $$("#cartCount, .cart-count").forEach(element => {
        element.textContent = count;
    });
}

/* =========================================
   ADD FOOD TO CART
========================================= */

function addToCart(id) {
    const food = FOODS.find(item => item.id === Number(id));

    if (!food) return;

    const cart = getCart();
    const existing = cart.find(item => Number(item.id) === food.id);

    if (existing) {
        existing.quantity = Number(existing.quantity || 0) + 1;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    saveCart(cart);

    const message = $("#globalMessage");

    if (message) {
        message.textContent = food.name + " added to your cart.";
        message.hidden = false;
    } else {
        alert(food.name + " added to your cart!");
    }
}

/* =========================================
   DISPLAY FOOD CARDS WITH IMAGES
========================================= */

function renderFoods(list) {
    const container = $("#foodContainer");

    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <h3>No dishes found</h3>
                <p>Try another category or search.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(food => `
        <article class="food-card">
            <div class="food-image">
                <img
                    src="${escapeHTML(food.image)}"
                    alt="${escapeHTML(food.name)}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/600x400/fff0e8/e95735?text=Food+Image';"
                >
                <span class="food-tag">
                    ${escapeHTML(food.category)}
                </span>
            </div>

            <div class="food-details">
                <h3>${escapeHTML(food.name)}</h3>

                <p class="food-description">
                    ${escapeHTML(food.description)}
                </p>

                <div class="food-rating">
                    ⭐ ${food.rating}
                </div>

                <div class="food-bottom">
                    <span class="food-price">
                        ${money(food.price)}
                    </span>

                    <button
                        class="add-cart-btn"
                        type="button"
                        data-add="${food.id}">
                        <i class="fa-solid fa-cart-plus"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

/* =========================================
   MENU SEARCH AND CATEGORIES
========================================= */

let currentCategory = "All";

function filterFoods() {
    const search = ($("#foodSearch")?.value || "")
        .trim()
        .toLowerCase();

    const filtered = FOODS.filter(food => {
        const categoryMatches =
            currentCategory === "All" ||
            food.category === currentCategory;

        const searchMatches =
            food.name.toLowerCase().includes(search) ||
            food.category.toLowerCase().includes(search);

        return categoryMatches && searchMatches;
    });

    const count = $("#foodCount");

    if (count) {
        count.textContent = filtered.length + " dishes";
    }

    renderFoods(filtered);
}

function initMenu() {
    if (!$("#foodContainer") || !$("#foodSearch")) return;

    $$(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            currentCategory = button.dataset.category || "All";

            $$(".category-btn").forEach(item => {
                item.classList.toggle("active", item === button);
            });

            filterFoods();
        });
    });

    $("#foodSearch").addEventListener("input", filterFoods);

    $("#searchForm")?.addEventListener("submit", event => {
        event.preventDefault();
        filterFoods();
    });

    $("#foodContainer").addEventListener("click", event => {
        const button = event.target.closest("[data-add]");

        if (button) {
            addToCart(button.dataset.add);
        }
    });

    filterFoods();
}

/* =========================================
   SHOPPING CART PAGE
========================================= */

function renderCart() {
    const container = $("#cartItems");

    if (!container) return;

    const cart = getCart();

    const subtotal = cart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );

    const delivery = cart.length ? 40 : 0;

    if (!cart.length) {
        container.innerHTML = `
            <div class="empty-message">
                <h2>Your cart is empty 🛒</h2>
                <p>Add your favourite food to get started.</p>
                <br>
                <a class="btn" href="menu.html">Explore Menu</a>
            </div>
        `;
    } else {
        container.innerHTML = cart.map((item, index) => `
            <article class="cart-item">
                <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                    onerror="this.onerror=null;this.src='https://placehold.co/200x200?text=Food';"
                >

                <div>
                    <h3>${escapeHTML(item.name)}</h3>
                    <p class="muted">${money(item.price)} each</p>

                    <div class="quantity-controls">
                        <button data-qty="${index}" data-change="-1">−</button>
                        <strong>${Number(item.quantity)}</strong>
                        <button data-qty="${index}" data-change="1">+</button>
                    </div>
                </div>

                <button class="remove-btn" data-remove="${index}">
                    Remove
                </button>
            </article>
        `).join("");
    }

    if ($("#cartSubtotal")) {
        $("#cartSubtotal").textContent = money(subtotal);
    }

    if ($("#deliveryFee")) {
        $("#deliveryFee").textContent = money(delivery);
    }

    if ($("#cartTotal")) {
        $("#cartTotal").textContent = money(subtotal + delivery);
    }

    const checkoutButton = $("#checkoutBtn");

    if (checkoutButton) {
        checkoutButton.style.pointerEvents = cart.length ? "auto" : "none";
        checkoutButton.style.opacity = cart.length ? "1" : "0.5";
    }

    container.onclick = event => {
        const quantityButton = event.target.closest("[data-qty]");
        const removeButton = event.target.closest("[data-remove]");

        if (quantityButton) {
            const index = Number(quantityButton.dataset.qty);
            const updatedCart = getCart();

            if (!updatedCart[index]) return;

            updatedCart[index].quantity += Number(
                quantityButton.dataset.change
            );

            if (updatedCart[index].quantity <= 0) {
                updatedCart.splice(index, 1);
            }

            saveCart(updatedCart);
            renderCart();
        }

        if (removeButton) {
            const updatedCart = getCart();
            updatedCart.splice(Number(removeButton.dataset.remove), 1);
            saveCart(updatedCart);
            renderCart();
        }
    };
}

/* =========================================
   CHECKOUT PAGE
========================================= */

function renderCheckout() {
    const container = $("#checkoutItems");

    if (!container) return;

    const cart = getCart();

    const subtotal = cart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );

    const delivery = cart.length ? 40 : 0;

    container.innerHTML = cart.length
        ? cart.map(item => `
            <div class="summary-row">
                <span>${escapeHTML(item.name)} × ${Number(item.quantity)}</span>
                <strong>${money(item.price * item.quantity)}</strong>
            </div>
        `).join("")
        : "<p>Your cart is empty. Please add items first.</p>";

    if ($("#checkoutSubtotal")) {
        $("#checkoutSubtotal").textContent = money(subtotal);
    }

    if ($("#checkoutDelivery")) {
        $("#checkoutDelivery").textContent = money(delivery);
    }

    if ($("#checkoutTotal")) {
        $("#checkoutTotal").textContent = money(subtotal + delivery);
    }
}

function initCheckout() {
    const form = $("#checkoutForm");

    if (!form) return;

    renderCheckout();

    form.addEventListener("submit", event => {
        event.preventDefault();

        const cart = getCart();

        if (!cart.length) {
            alert("Your cart is empty.");
            return;
        }

        const name = $("#customerName").value.trim();
        const phone = $("#customerPhone").value.trim();
        const address = $("#customerAddress").value.trim();
        const instructions = $("#instructions")?.value.trim() || "";
        const payment =
            $('input[name="payment"]:checked')?.value || "Cash on Delivery";

        if (!name || !phone || !address) {
            alert("Please fill in your name, phone number and address.");
            return;
        }

        const subtotal = cart.reduce(
            (sum, item) => sum + Number(item.price) * Number(item.quantity),
            0
        );

        const order = {
            orderNumber: "LFB" + Date.now().toString().slice(-8),
            customer: name,
            phone,
            address,
            instructions,
            payment,
            items: cart,
            subtotal,
            delivery: 40,
            total: subtotal + 40,
            status: "Order Placed",
            date: new Date().toLocaleString()
        };

        write("lastOrder", order);
        saveCart([]);

        location.href =
            "tracking.html?order=" + encodeURIComponent(order.orderNumber);
    });
}

/* =========================================
   DEMO LOGIN AND REGISTRATION
========================================= */

function initLogin() {
    const loginForm = $("#loginForm");
    const registerForm = $("#registerForm");

    if (!loginForm && !registerForm) return;

    const message = $("#loginMessage");

    function showMessage(text) {
        if (message) message.textContent = text;
    }

    function showForm(type) {
        if (loginForm) loginForm.hidden = type !== "login";
        if (registerForm) registerForm.hidden = type !== "register";

        $("#showLogin")?.classList.toggle("active", type === "login");
        $("#showRegister")?.classList.toggle("active", type === "register");

        showMessage("");
    }

    $("#showLogin")?.addEventListener("click", () => showForm("login"));
    $("#showRegister")?.addEventListener("click", () => showForm("register"));

    registerForm?.addEventListener("submit", event => {
        event.preventDefault();

        const name = $("#registerName").value.trim();
        const email = $("#registerEmail").value.trim().toLowerCase();
        const password = $("#registerPassword").value;

        if (!name || !email || !password) {
            showMessage("Please complete all fields.");
            return;
        }

        write("demoAccount", { name, email, password });

        showForm("login");
        showMessage("Account created. Please log in.");
    });

    loginForm?.addEventListener("submit", event => {
        event.preventDefault();

        const email = $("#loginEmail").value.trim().toLowerCase();
        const password = $("#loginPassword").value;
        const account = read("demoAccount", null);

        if (
            account &&
            account.email === email &&
            account.password === password
        ) {
            write("demoSession", {
                name: account.name,
                email: account.email
            });

            showMessage("Login successful! Welcome, " + account.name + ".");

            setTimeout(() => {
                location.href = "index.html";
            }, 700);
        } else {
            showMessage("Please register first or check your login details.");
        }
    });

    showForm("login");
}

/* =========================================
   DEMO ORDER TRACKING
========================================= */

function displayTracking(order) {
    const result = $("#trackingResult");

    if (!result) return;

    result.hidden = false;

    if ($("#trackingOrderNumber")) {
        $("#trackingOrderNumber").textContent = order.orderNumber;
    }

    if ($("#trackingCustomer")) {
        $("#trackingCustomer").textContent = order.customer;
    }

    if ($("#trackingAmount")) {
        $("#trackingAmount").textContent = money(order.total);
    }

    if ($("#trackingStatus")) {
        $("#trackingStatus").textContent = order.status || "Order Placed";
    }

    $$(".progress-step").forEach((step, index) => {
        step.classList.toggle("completed", index === 0);
        step.classList.toggle("active", index === 0);
    });
}

function initTracking() {
    const form = $("#trackingForm");

    if (!form) return;

    const order = read("lastOrder", null);
    const orderNumber = new URLSearchParams(location.search).get("order");

    if (order && orderNumber === order.orderNumber) {
        displayTracking(order);
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const enteredNumber = $("#orderNumber").value.trim();
        const savedOrder = read("lastOrder", null);

        if (savedOrder && enteredNumber === savedOrder.orderNumber) {
            $("#trackingMessage").textContent = "";
            displayTracking(savedOrder);
        } else {
            $("#trackingMessage").textContent =
                "Order not found. Check the order number on this browser.";
        }
    });
}

/* =========================================
   HOME PAGE FEATURED FOOD
========================================= */

function initHome() {
    const homeGrid = $("#foodContainer");

    // The menu page also uses foodContainer, so don't override it.
    if (!homeGrid || $("#foodSearch")) return;

    renderFoods(FOODS.slice(0, 4));

    homeGrid.addEventListener("click", event => {
        const button = event.target.closest("[data-add]");

        if (button) {
            addToCart(button.dataset.add);
        }
    });
}

/* =========================================
   START WEBSITE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    initMenu();
    renderCart();
    initCheckout();
    initLogin();
    initTracking();
    initHome();
});
