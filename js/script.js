const bar = document.getElementById('bar');
const closeIcon = document.getElementById('close');
const nav = document.querySelector('ul#navbar');

if(bar) {
   bar.addEventListener('click', function () {
    nav.classList.add('active');
   })
}

if(closeIcon) {
    closeIcon.addEventListener('click', function () {
        nav.classList.remove('active');
    })
}



// HERO SECTION
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const heading = document.getElementById('hero-heading');
    const subtext = document.getElementById('hero-subtext');

    const slideData = [
      { heading: 'Find Your Next Apartment', subtext: 'Simple, secure, and verified rentals across the city.'},
      { heading: 'Live Where You Love', subtext: 'Choose from top-rated neighborhoods and hosts.'},
      { heading: 'Move In With Confidence', subtext: 'All listings reviewed for quality and safety.'}
    ];

    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 3000);

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
      });

      heading.textContent = slideData[index].heading;
      subtext.textContent = slideData[index].subtext;
      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function goToSlide(index) {
      clearInterval(slideInterval);
      showSlide(index);
      slideInterval = setInterval(nextSlide, 6000);
    }

    showSlide(currentSlide);


    
  // SEARCH AND SORT
  function filterAndSortListings() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const sortValue = document.getElementById("sortSelect").value;
  const productsContainer = document.querySelector(".pro-container");
  const products = Array.from(productsContainer.getElementsByClassName("pro"));

  products.forEach((product) => {
    const title = product.querySelector("h5").textContent.toLowerCase();
    const location = product.querySelector("h5").textContent.toLowerCase();
    product.style.display = (title.includes(searchValue) || location.includes(searchValue)) ? "block" : "none";
  });

  let visibleProducts = products.filter(p => p.style.display !== "none");

  // Sorting logic
  visibleProducts.sort((a, b) => {
    const priceA = extractPrice(a.querySelector("h4").textContent);
    const priceB = extractPrice(b.querySelector("h4").textContent);
    const locationA = a.querySelector("h5").textContent;
    const locationB = b.querySelector("h5").textContent;

    switch (sortValue) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "location-asc":
        return locationA.localeCompare(locationB);
      case "location-desc":
        return locationB.localeCompare(locationA);
      default:
        return 0;
    }
  });

  // Append sorted elements
  visibleProducts.forEach((product) => {
    productsContainer.appendChild(product);
  });
}

function extractPrice(text) {
  const match = text.replace(/₦|,/g, "").match(/\d+/g);
  return match ? parseInt(match.join("")) : 0;
}
