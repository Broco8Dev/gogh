function switchPage(pageUrl, clickedImage) {
    // Get all elements with the class "selected-navbar-image"
    var selectedNavbarImages = document.querySelectorAll('.selected-navbar-image');
    var selectedNavbarTitles = document.querySelectorAll('.selected-navbar-title');

    // Remove the "selected-navbar" class from all selected images and titles
    selectedNavbarImages.forEach(function (image) {
        image.classList.remove('selected-navbar-image');
        image.classList.add('navbar-image');
    });

    selectedNavbarTitles.forEach(function (title) {
        title.classList.remove('selected-navbar-title');
        title.classList.add('navbar-title');
    });

    // Add the "selected-navbar" class to the clicked image and title
    clickedImage.classList.add('selected-navbar-image');
    clickedImage.classList.remove('navbar-image');

    var title = clickedImage.nextElementSibling; // Get the next sibling, which is the title
    title.classList.add('selected-navbar-title');
    title.classList.remove('navbar-title');

    // Apply the fade-in animation class
    setTimeout(function () {
        clickedImage.classList.add('selected-navbar-image');
        title.classList.add('selected-navbar-title');
    }, 10); // Delay added to ensure the class is applied after the removal of other classes

    // Get the iframe element
    var iframe = document.getElementById('myIFrame');

    // Set the source of the iframe to the specified page URL
    iframe.src = pageUrl;
}

const featuredImages = [
  "https://cdn.discordapp.com/attachments/1204937681008857108/1205400281383305257/IMG_6853.png?ex=65d83b7e&is=65c5c67e&hm=024e0c3ec45411bd8d2e8446cc191d27f8ef7073ce1761a3c73c3dbff2c3367a&",
  "https://cdn.discordapp.com/attachments/1204937681008857108/1205400160536891392/IMG_6859.jpg?ex=65d83b61&is=65c5c661&hm=9daa5345056adb87d54769be921fde02611a1ccd71081761cf77aadf441ba21d&",
  "https://cdn.discordapp.com/attachments/1204937681008857108/1205399267808641104/IMG_6856.png?ex=65d83a8c&is=65c5c58c&hm=a26f2500ae6c382ed116363ae5159dc7b403f3f82fbd4934aa8c6f2fae44955f&",
  "https://cdn.discordapp.com/attachments/1204937681008857108/1205401417225867314/IMG_6862.png?ex=65d83c8d&is=65c5c78d&hm=a3b7fe4ebac200e941e458f62dc336737de2888665ff0fad1e4cefc59e979738&",
  "https://cdn.discordapp.com/attachments/1204937681008857108/1205402665962569778/IMG_6865.png?ex=65d83db6&is=65c5c8b6&hm=de41ea09bcd1ea0b947f16e788eb403d5d8e62a48cffdda588d4a0174015bda3&"
];


const featuredContainer = document.getElementById("featuredContainer");

featuredImages.forEach(imageLink => {
  const imgElement = document.createElement("img");
  imgElement.classList.add("featured-item");
  imgElement.src = imageLink;
  featuredContainer.appendChild(imgElement);
});


function navigateToUrl(url) {
    window.open(url);
}

const featuredItems = document.querySelectorAll('.featured-item');

featuredItems.forEach(item => {
  item.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });
});


       let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
const swipeContainer = document.getElementById('featuredContainer');
const itemWidth = 260; // Adjust this value based on your .featured-item width

swipeContainer.addEventListener('mousedown', startDrag);
swipeContainer.addEventListener('mousemove', drag);
swipeContainer.addEventListener('mouseup', endDrag);
swipeContainer.addEventListener('mouseleave', endDrag);

swipeContainer.addEventListener('touchstart', startDrag, { passive: true });
swipeContainer.addEventListener('touchmove', drag, { passive: true });
swipeContainer.addEventListener('touchend', endDrag);

function startDrag(e) {
  isDragging = true;
  startPosition = getPositionX(e);
}


let lastTime = null;
let velocity =  0;
let acceleration =  0;


function drag(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    const difference = currentPosition - startPosition;
    currentTranslate += difference;

    const currentTime = Date.now();
    if (lastTime !== null) {
      const deltaTime = currentTime - lastTime;
      acceleration = (currentPosition - startPosition) / deltaTime;
      velocity += acceleration * deltaTime;
    }
    lastTime = currentTime;

    const maxTranslate =  0;
    const minTranslate = -(swipeContainer.scrollWidth - swipeContainer.clientWidth);

    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate;
      velocity = Math.max(velocity,  0); 
    } else if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate;
      velocity = Math.min(velocity,  0); 
    }

    updateTransform();
    startPosition = currentPosition;
  }
}

function endDrag() {
  isDragging = false;
  requestAnimationFrame(animate);
}

function animate() {
  if (!isDragging && Math.abs(velocity) >  0.1) {
    velocity *=  0.95; 

    currentTranslate += velocity / 8;

    const maxTranslate =  0;
    const minTranslate = -(swipeContainer.scrollWidth - swipeContainer.clientWidth);

    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate;
      velocity =  0;
    } else if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate;
      velocity =  0;
    }

    updateTransform();
    requestAnimationFrame(animate);
  }
}


function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function updateTransform() {
  swipeContainer.style.transform = `translateX(${currentTranslate}px)`;
}

