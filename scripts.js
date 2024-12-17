// Smooth Scroll to Sections
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animations
const scrollElements = document.querySelectorAll('.scroll-reveal');

const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight;
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Get product from URL (for Order page)
const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get('product'); // This will give us 'cake' if clicked on cake

if (product) {
    switch (product) {
        case 'cake':
            productName.textContent = "Cake";
            productDescription.textContent = "Please confirm the details of your order for a delicious cake!";
            break;
        case 'bread':
            productName.textContent = "Bread";
            productDescription.textContent = "Please confirm the details of your order for freshly baked bread!";
            break;
        case 'cookies':
            productName.textContent = "Cookies";
            productDescription.textContent = "Please confirm the details of your order for homemade cookies!";
            break;
        case 'pastries':
            productName.textContent = "Pastries";
            productDescription.textContent = "Please confirm the details of your order for delightful pastries!";
            break;
        case 'nimcos':
            productName.textContent = "Nimcos";
            productDescription.textContent = "Please confirm the details of your order for crispy nimcos!";
            break;
        default:
            productName.textContent = "Product Not Found";
            productDescription.textContent = "Sorry, this product has been sold out. We apologize for the inconvenience.";
    }
}

// Form Validation for Order Confirmation Page
const form = document.getElementById('order-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const quantity = document.getElementById('quantity');

    let valid = true;

    if (!name.value.trim()) {
        name.classList.add('error');
        valid = false;
    } else {
        name.classList.remove('error');
    }

    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
        email.classList.add('error');
        valid = false;
    } else {
        email.classList.remove('error');
    }

    if (!quantity.value || quantity.value < 1) {
        quantity.classList.add('error');
        valid = false;
    } else {
        quantity.classList.remove('error');
    }

    if (valid) {
        alert(`Order confirmed for ${quantity.value} Cake(s)!`);
        form.reset();
    } else {
        alert('Please fill out all fields correctly.');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || ''; // Default to empty string if no search query

    // Sample data: List of products (you can replace this with your actual product data)
    const products = [
        { name: 'Cake', description: 'Delicious cakes', image: 'cake.jpg' },
        { name: 'Bread', description: 'Freshly baked bread', image: 'bread.jpg' },
        { name: 'Cookies', description: 'Homemade cookies', image: 'cookies.jpg' },
        { name: 'Pastries', description: 'Fresh pastries', image: 'pastries.jpg' },
        { name: 'Nimcos', description: 'Crispy nimcos', image: 'nimcos.jpg' },
    ];

    // Function to display products based on the search query
    function displayProducts(filteredProducts) {
        const productList = document.querySelector('.product-list');
        productList.innerHTML = ''; // Clear previous products

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <a href="order.html?product=${product.name.toLowerCase()}">
                        <img src="img/${product.image}" alt="${product.name}" width="400px" height="204px">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </a>
                `;
                productList.appendChild(productItem);
            });
        } else {
            productList.innerHTML = '<p>No products found for your search.</p>';
        }
    }

    // Live Search Suggestions
    const searchInput = document.getElementById('search');
    const suggestionsBox = document.createElement('div');
    suggestionsBox.classList.add('suggestions-box');
    searchInput.parentNode.appendChild(suggestionsBox);

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );

        suggestionsBox.innerHTML = ''; // Clear suggestions
        if (query) {
            filteredProducts.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = product.name;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = product.name;
                    suggestionsBox.innerHTML = ''; // Clear suggestions after selecting one
                    displayProducts([product]); // Show the selected product
                });
                suggestionsBox.appendChild(suggestionItem);
            });
        }
    });

    // If a search query is present, filter products based on the query
    if (searchQuery) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Display filtered products
        displayProducts(filteredProducts);
    } else {
        // If no search query, display all products
        displayProducts(products);
    }
});
