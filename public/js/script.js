//hamburg menu
function toggleMenu() {
  document.querySelector('.header-container').classList.toggle('active');
}

//year auto gen
document.getElementById('year').textContent = new Date().getFullYear();

// Check if it's the homepage
if (window.location.pathname === '/') {
  // JavaScript for slider functionality
  const slides = document.querySelectorAll('.slider');
  const buttons = document.querySelectorAll('#pagination button');
  let currentSlide = 0;

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      slides[currentSlide].classList.remove('active');
      buttons[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      buttons[currentSlide].classList.add('active');
    });
  });
};

// Check if it's the adminpage
if (window.location.pathname.endsWith('admin')) {

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('category-form').addEventListener('change', (event) => {
      toggleForm(event.target.value);
    });
  });

  function toggleForm(category) {
    const perfumeForm = document.getElementById('perfume-form');
    const bagsForm = document.getElementById('bags-form');

    if (category === 'perfume') {
      perfumeForm.style.display = 'flex';
      bagsForm.style.display = 'none';
      category === 'perfume';
    } else if (category === 'bags') {
      perfumeForm.style.display = 'none';
      bagsForm.style.display = 'flex';
      category === 'bags';
    }
  }
}

// Check if it's the shop page
if (window.location.pathname.endsWith('admin')) {
  async function createProduct(productData) {
    const { products } = await connectDB();
    productData.category = productData.category.toLowerCase(); // Normalize category name
    const result = products.insertOne(productData);
    return result;
  }
}


if (window.location.pathname.endsWith('login') || window.location.pathname.endsWith('register')) {
  function toggleForms() {
    const registerForm = document.getElementById('register-form-section');
    const loginForm = document.getElementById('login-form-section');
    if (registerForm.style.display === 'none') {
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
    } else {
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    }
  }

  function signInWithGoogle() {
    // Implement Google sign-in logic here
    console.log('Google sign-in triggered');
  }
}
