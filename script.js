const movies = [
    {
      id: "inception",
      title: "Inception",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      price: 39.99,
      rating: 4.8,
      year: 2010,
      genre: "Sci-Fi",
      category: "popular",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      director: "Christopher Nolan"
    },
    {
      id: "tenet",
      title: "Tenet",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
      price: 49.99,
      rating: 4.5,
      year: 2020,
      genre: "Action",
      category: "new",
      description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      director: "Christopher Nolan"
    },
    {
      id: "scream",
      title: "Scream",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_.jpg",
      price: 29.99,
      rating: 4.2,
      year: 1996,
      genre: "Horror",
      category: "classic",
      description: "A year after the murder of her mother, a teenage girl is terrorized by a new killer, who targets the girl and her friends by using horror films as part of a deadly game.",
      director: "Wes Craven"
    },
    {
      id: "wedding-ringer",
      title: "The Wedding Ringer",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMzM2Mzg0ODUyMF5BMl5BanBnXkFtZTgwOTYzMDM0MzE@._V1_.jpg",
      price: 34.99,
      rating: 3.9,
      year: 2015,
      genre: "Comedy",
      category: "popular",
      description: "Two weeks shy of his wedding, a socially awkward guy enters into a charade by hiring the owner of a company that provides best men for grooms in need.",
      director: "Jeremy Garelick"
    },
    {
      id: "rush-hour",
      title: "Rush Hour",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BYWM2NDZmYmYtNzlmZC00M2MyLWJmOGUtMjhiYmQ2OGU1YTE1L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      price: 29.99,
      rating: 4.4,
      year: 1998,
      genre: "Action/Comedy",
      category: "classic",
      description: "A loyal and dedicated Hong Kong Inspector teams up with a reckless and loudmouthed L.A.P.D. detective to rescue the Chinese Consul's kidnapped daughter, while trying to arrest a dangerous crime lord along the way.",
      director: "Brett Ratner"
    },
    {
      id: "pulp-fiction",
      title: "Pulp Fiction",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      price: 39.99,
      rating: 4.9,
      year: 1994,
      genre: "Crime/Drama",
      category: "classic",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      director: "Quentin Tarantino"
    }
  ];
  
  
  document.addEventListener('DOMContentLoaded', function() {
    
    const browseBtn = document.getElementById('browse-btn');
    const learnBtn = document.getElementById('learn-btn');
    const header = document.querySelector('header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const movieGrid = document.getElementById('movie-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const registerForm = document.getElementById('register-form');
    const modal = document.getElementById('movie-modal');
    const closeModal = document.getElementById('close-modal');
    const modalBody = document.getElementById('modal-body');
    const toastContainer = document.getElementById('toast-container');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Variables
    let currentSlide = 0;
    let moviesPerView = getMoviesPerView();
    let currentCategory = 'all';
    let cart = [];
    let slideInterval;
    
    // Initialize the application
    initApp();
    
    // Function to initialize the application
    function initApp() {
      renderMovies();
      startSlideshow();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeyDown);
      
      // If there's cart data in local storage, load it
      const savedCart = localStorage.getItem('zeeMoviesCart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
      }
    }
    
    // Function to render movies
    function renderMovies(category = currentCategory) {
      movieGrid.innerHTML = '';
      
      const filteredMovies = category === 'all' 
        ? movies 
        : movies.filter(movie => movie.category === category);
      
      filteredMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieGrid.appendChild(movieCard);
      });
    }
    
    // Function to create movie card
    function createMovieCard(movie) {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.dataset.id = movie.id;
      
      card.innerHTML = `
        <div class="movie-image">
          <img src="${movie.imageUrl}" alt="${movie.title}" loading="lazy">
          <div class="movie-overlay">
            <button class="play-btn">
              <i class="fas fa-play"></i>
            </button>
          </div>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-meta">
            <span>${movie.year}</span>
            <div class="rating">
              <i class="fas fa-star"></i>
              <span>${movie.rating}</span>
            </div>
            <span>${movie.genre}</span>
          </div>
          <div class="movie-price">
            <span class="price">R ${movie.price.toFixed(2)}</span>
            <button class="rent-btn" data-id="${movie.id}">
              <i class="fas fa-shopping-cart"></i>
              <span>Rent Now</span>
            </button>
          </div>
        </div>
      `;
      
      
      const rentBtn = card.querySelector('.rent-btn');
      rentBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(movie.id);
      });
      
      const playBtn = card.querySelector('.play-btn');
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        previewMovie(movie.id);
      });
      
      
      playBtn.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        showToast('Fun fact!', `Did you know? ${movie.title} was one of the most popular rentals last month!`, 'info');
      });
      
      
      card.addEventListener('click', () => {
        showMovieDetails(movie.id);
      });
      
      return card;
    }
    
    // Function to add to cart
    function addToCart(movieId) {
      const rentBtn = document.querySelector(`.rent-btn[data-id="${movieId}"]`);
      
    
      rentBtn.classList.add('adding');
      rentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Adding...</span>';
      
      
      setTimeout(() => {
        const movieExists = cart.find(item => item.id === movieId);
        
        if (movieExists) {
          movieExists.quantity += 1;
        } else {
          const movie = movies.find(movie => movie.id === movieId);
          if (movie) {
            cart.push({
              id: movie.id,
              title: movie.title,
              price: movie.price,
              quantity: 1,
              imageUrl: movie.imageUrl
            });
          }
        }
        
        // Save cart to local storage
        localStorage.setItem('zeeMoviesCart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Reset button
        rentBtn.classList.remove('adding');
        rentBtn.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Rent Now</span>';
        
        // Show toast notification
        const movie = movies.find(movie => movie.id === movieId);
        showToast('Added to cart', `${movie.title} has been added to your cart.`, 'success');
      }, 600);
    }
    
    // Function to update cart count
    function updateCartCount() {
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalQuantity;
      
      // Add animation effect
      cartCount.classList.add('pulse');
      setTimeout(() => {
        cartCount.classList.remove('pulse');
      }, 500);
    }
    
    // Function to show movie details
    function showMovieDetails(movieId) {
      const movie = movies.find(movie => movie.id === movieId);
      if (!movie) return;
      
      modalBody.innerHTML = `
        <div class="flex-modal">
          <div class="modal-image">
            <img src="${movie.imageUrl}" alt="${movie.title}">
          </div>
          <div class="modal-details">
            <h2>${movie.title} (${movie.year})</h2>
            <div class="movie-meta">
              <div class="rating">
                <i class="fas fa-star"></i>
                <span>${movie.rating}</span>
              </div>
              <span>${movie.genre}</span>
            </div>
            <p class="movie-description">${movie.description}</p>
            <p class="movie-director"><strong>Director:</strong> ${movie.director}</p>
            <div class="movie-price">
              <span class="price">R ${movie.price.toFixed(2)}</span>
              <button class="btn primary" onclick="addToCart('${movie.id}')">
                <i class="fas fa-shopping-cart"></i>
                Rent Now
              </button>
            </div>
          </div>
        </div>
      `;
      
      // Add CSS for the modal flex layout
      const style = document.createElement('style');
      style.textContent = `
        .flex-modal {
          display: flex;
          gap: 30px;
        }
        .modal-image {
          flex: 0 0 40%;
        }
        .modal-image img {
          width: 100%;
          border-radius: var(--radius);
        }
        .modal-details {
          flex: 1;
        }
        .movie-description {
          margin: 20px 0;
          line-height: 1.6;
        }
        .movie-director {
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .flex-modal {
            flex-direction: column;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Show modal
      modal.classList.add('active');
    }
    
    // Function to preview movie
    function previewMovie(movieId) {
      const movie = movies.find(movie => movie.id === movieId);
      if (!movie) return;
      
      showToast('Preview started', `Now playing ${movie.title}`, 'info');
    }
    
    // Function to show toast notification
    function showToast(title, message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      let icon;
      switch (type) {
        case 'success':
          icon = 'fa-check-circle';
          break;
        case 'error':
          icon = 'fa-exclamation-circle';
          break;
        case 'info':
        default:
          icon = 'fa-info-circle';
      }
      
      toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="toast-message">
          <strong>${title}</strong>
          <p>${message}</p>
        </div>
      `;
      
      toastContainer.appendChild(toast);
      
      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
    
    // Function to handle scroll event
    function handleScroll() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Function to handle resize event
    function handleResize() {
      moviesPerView = getMoviesPerView();
    }
    

    function getMoviesPerView() {
      if (window.innerWidth < 480) return 1;
      if (window.innerWidth < 768) return 2;
      return 3;
    }
    
    
    function startSlideshow() {
      // Clear any existing interval
      if (slideInterval) clearInterval(slideInterval);
      
      
      slideInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    // Function to go to next slide
    function nextSlide() {
      const filteredMovies = currentCategory === 'all' 
        ? movies 
        : movies.filter(movie => movie.category === currentCategory);
        
      const totalSlides = Math.ceil(filteredMovies.length / moviesPerView);
      
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlidePosition();
    }
    
    // Function to go to previous slide
    function prevSlide() {
      const filteredMovies = currentCategory === 'all' 
        ? movies 
        : movies.filter(movie => movie.category === currentCategory);
        
      const totalSlides = Math.ceil(filteredMovies.length / moviesPerView);
      
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlidePosition();
    }
    
    // This a function to update slide position
    function updateSlidePosition() {
      const cards = movieGrid.querySelectorAll('.movie-card');
      const cardWidth = cards[0]?.offsetWidth || 250;
      const gap = 30; // Same as in CSS
      
      movieGrid.style.transition = 'transform 0.3s ease';
      movieGrid.style.transform = `translateX(-${currentSlide * (cardWidth + gap) * moviesPerView}px)`;
    }
    
    
    function handleKeyDown(e) {
      // 'Z' key for special discount code
      if (e.key.toLowerCase() === 'z') {
        showToast('🎉 Special Discount!', 'Use code ZEE50 for 50% off your first rental!', 'info');
      }
      
      // 'P' key to preview selected movie
      if (e.key.toLowerCase() === 'p') {
        // Find any movie that might be hovered
        const hoveredMovie = document.querySelector('.movie-card:hover');
        if (hoveredMovie) {
          const movieId = hoveredMovie.dataset.id;
          previewMovie(movieId);
        }
      }
      
      
      if (e.key.toLowerCase() === 'f' && e.altKey) {
        autofillForm();
        e.preventDefault();
      }
    }
    

    function autofillForm() {
      const fullnameInput = document.getElementById('fullname');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirm-password');
      
      if (fullnameInput && emailInput && passwordInput && confirmPasswordInput) {
        fullnameInput.value = 'John Moviegoer';
        emailInput.value = 'john@example.com';
        passwordInput.value = 'Password123!';
        confirmPasswordInput.value = 'Password123!';
        
        // Trigger input event for password validation
        const event = new Event('input', { bubbles: true });
        passwordInput.dispatchEvent(event);
        
        showToast('Form Autofilled', 'Form has been filled with sample data!', 'info');
      }
    }
    
    // Event Listeners
    
    // Browse button
    browseBtn.addEventListener('click', () => {
      document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Learn more button
    learnBtn.addEventListener('click', () => {
      showToast('Learn More', 'Discover our premium movie rental service with new titles added weekly!', 'info');
    });
    
    // Tab buttons
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        // Update active tab
        tabBtns.forEach(tab => tab.classList.remove('active'));
        btn.classList.add('active');
        
        // Update current category and render movies
        currentCategory = category;
        currentSlide = 0;
        renderMovies(category);
        startSlideshow();
      });
    });
    
    // Previous slide button
    prevBtn.addEventListener('click', () => {
      prevSlide();
      // Restart the slideshow timer
      startSlideshow();
    });
    
    // Next slide button
    nextBtn.addEventListener('click', () => {
      nextSlide();
      // Restart the slideshow timer
      startSlideshow();
    });
    
    // Cart button
    cartBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        let totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        showToast('Shopping Cart', `You have ${cart.length} movie(s) in your cart. Total: R ${totalAmount.toFixed(2)}`, 'info');
      } else {
        showToast('Shopping Cart', 'Your cart is empty.', 'info');
      }
    });
    
    
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
    
    
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      hamburger.classList.toggle('active');
    });
    
    // Form validation
    if (registerForm) {
      const fullnameInput = document.getElementById('fullname');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirm-password');
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const passwordError = document.getElementById('password-error');
      const confirmPasswordError = document.getElementById('confirm-password-error');
      const passwordStrengthBar = document.querySelector('.strength-bar');
      const passwordStrengthText = document.querySelector('.strength-text');
      
      // Validate name
      fullnameInput.addEventListener('input', () => {
        if (fullnameInput.value.trim().length < 3) {
          nameError.textContent = 'Name must be at least 3 characters long';
          fullnameInput.style.borderColor = '#ff4d4d';
        } else {
          nameError.textContent = '';
          fullnameInput.style.borderColor = '#4caf50';
        }
      });
      
      // Validate email
      emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          emailError.textContent = 'Please enter a valid email address';
          emailInput.style.borderColor = '#ff4d4d';
        } else {
          emailError.textContent = '';
          emailInput.style.borderColor = '#4caf50';
        }
      });
      
      // Validate password and show strength
      passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        
        let strength = 0;
        let feedback = '';
        
        if (password.length < 8) {
          feedback = 'Password must be at least 8 characters long';
        } else {
          strength += 1;
        }
        
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^A-Za-z0-9]/)) strength += 1;
        
        // Update password strength indicator
        passwordStrengthBar.className = 'strength-bar';
        if (strength === 0) {
          passwordStrengthText.textContent = 'Password strength: Too weak';
        } else if (strength === 1) {
          passwordStrengthBar.classList.add('weak');
          passwordStrengthText.textContent = 'Password strength: Weak';
        } else if (strength === 2 || strength === 3) {
          passwordStrengthBar.classList.add('medium');
          passwordStrengthText.textContent = 'Password strength: Medium';
        } else {
          passwordStrengthBar.classList.add('strong');
          passwordStrengthText.textContent = 'Password strength: Strong';
        }
        
        // Show error if password is too weak
        if (strength < 1) {
          passwordError.textContent = feedback;
          passwordInput.style.borderColor = '#ff4d4d';
        } else {
          passwordError.textContent = '';
          passwordInput.style.borderColor = strength === 4 ? '#4caf50' : '#ffb84d';
        }
        
        // Check password match if confirm password has value
        if (confirmPasswordInput.value) {
          if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordInput.style.borderColor = '#ff4d4d';
          } else {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.style.borderColor = '#4caf50';
          }
        }
      });
      
      // Validate confirm password
      confirmPasswordInput.addEventListener('input', () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
          confirmPasswordError.textContent = 'Passwords do not match';
          confirmPasswordInput.style.borderColor = '#ff4d4d';
        } else {
          confirmPasswordError.textContent = '';
          confirmPasswordInput.style.borderColor = '#4caf50';
        }
      });
      
      // Form submission
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Name validation
        if (fullnameInput.value.trim().length < 3) {
          nameError.textContent = 'Name must be at least 3 characters long';
          fullnameInput.style.borderColor = '#ff4d4d';
          isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          emailError.textContent = 'Please enter a valid email address';
          emailInput.style.borderColor = '#ff4d4d';
          isValid = false;
        }
        
        // Password validation
        if (passwordInput.value.length < 8) {
          passwordError.textContent = 'Password must be at least 8 characters long';
          passwordInput.style.borderColor = '#ff4d4d';
          isValid = false;
        }
        
        // Confirm password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
          confirmPasswordError.textContent = 'Passwords do not match';
          confirmPasswordInput.style.borderColor = '#ff4d4d';
          isValid = false;
        }
        
        if (isValid) {
          // Show success message
          showToast('Registration Successful', 'Your account has been created successfully!', 'success');
          
          
          registerForm.reset();
          
          
          [fullnameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.style.borderColor = '';
          });
          
          
          passwordStrengthBar.className = 'strength-bar';
          passwordStrengthText.textContent = 'Password strength';
        }
      });
    }
    
    // This is some additional CSS for mobile nav, I tried adding some bonus functions
    const style = document.createElement('style');
    style.textContent = `
      .nav-links.show {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background-color: rgba(15, 23, 42, 0.95);
        padding: 20px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        z-index: 99;
      }
      
      .nav-links.show li {
        margin: 10px 0;
      }
      
      .hamburger.active .line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .hamburger.active .line:nth-child(2) {
        opacity: 0;
      }
      
      .hamburger.active .line:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    `;
    document.head.appendChild(style);
    
    // Make movie cards accessible through tab navigation
    const makeMovieCardsAccessible = () => {
      const cards = document.querySelectorAll('.movie-card');
      cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${card.querySelector('.movie-title').textContent}`);
        
        // Handle keyboard navigation
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const movieId = card.dataset.id;
            showMovieDetails(movieId);
          }
        });
      });
    };
    
    
    const originalRenderMovies = renderMovies;
    renderMovies = function(category = currentCategory) {
      originalRenderMovies(category);
      makeMovieCardsAccessible();
    };
    
    // Initial call to render movies
    renderMovies();
  });
    
   
    