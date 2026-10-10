


// btn see more and see less
let hiddenElement = document.querySelectorAll(".hidden-li");
let btnSeeMore = document.querySelector(".btn-see");

let show = false;
if(btnSeeMore){
btnSeeMore.addEventListener("click", function () {
  if (show === false) {
    hiddenElement.forEach(function (element) {
      element.style.display = "block";
    });
    btnSeeMore.textContent = "See Less";
    show = true ;
  }
  else{
     hiddenElement.forEach(function (element) {
      element.style.display = "none";
    });
    btnSeeMore.textContent = "See More";
    show = false ;
  }
});
}

// tooltip vendor-single

let tooltip = document.querySelectorAll('[title]');
tooltip.forEach(function(element){
  new bootstrap.Tooltip(element) ;
}) ;

// Modal quick view
let mainImg = document.querySelector('#mainImg');
let thumbnailImg = document.querySelector('#thumbnailImg');

if(mainImg && thumbnailImg){
let smallImg = thumbnailImg.querySelectorAll('img');

smallImg.forEach(function(img){
  img.addEventListener('click' , function(){
    mainImg.src = img.src ;
    img.scrollIntoView({
      behavior: "smooth",
      inline: "start"
    });
  })
});

mainImg.addEventListener('mousemove' , function(event){
  let x = event.offsetX;
  let y = event.offsetY;

  let width = mainImg.offsetWidth;
  let height = mainImg.offsetHeight;
  
  let percentX = (x / width) * 100;
  let percentY = (y / height) * 100; 

  mainImg.style.transformOrigin = `${percentX}% ${percentY}%` ;
  mainImg.style.transform = 'scale(3)';

});

mainImg.addEventListener('mouseleave' , function(){
  mainImg.style.transform = 'scale(1)';
});

};

let TextImg = document.querySelector('.text-img-modal');
let ImgModal = document.querySelectorAll('.img-modal');
let TextStyle = document.querySelector('.text-style');
let BtnModal = document.querySelectorAll('.btn-modal');
let TextSize = document.querySelector('.text-size');
let BtnSizeModal = document.querySelectorAll('.btn-size');

if(TextImg){
ImgModal.forEach(function(img){
  img.addEventListener('click' , function(){
    TextImg.textContent = img.dataset.color;
  });
});
}

if(TextStyle){
BtnModal.forEach(function(btn){
  btn.addEventListener('click' , function(){
    TextStyle.textContent = btn.dataset.style;
  });
});
}

if(TextSize){
BtnSizeModal.forEach(function(btn){
  btn.addEventListener('click' , function(){
    TextSize.textContent = btn.dataset.size;
  });
});
}

//Quantity
let BtnPlus = document.querySelector('.btn-plus');
let BtnMinus = document.querySelector('.btn-minus');
let TextQuantity = document.querySelector('.text-quantity');

if(BtnPlus && BtnMinus && TextQuantity){
BtnPlus.addEventListener('click' , function(){
  let quantity = Number(TextQuantity.textContent);
  quantity += 1 ; 
  TextQuantity.textContent = quantity ;
});

BtnMinus.addEventListener('click' , function(){
  let quantity = Number(TextQuantity.textContent);
  quantity -= 1 ; 
  TextQuantity.textContent = quantity ;
});
}



//shop-grid Range

let MinRange = document.querySelector('#minrange');
let MaxRange = document.querySelector('#maxrange');
let MaxPrice = document.querySelector('#maxprice');
let MinPrice = document.querySelector('#minprice');
let Progress = document.querySelector('.range-progress');


if(MinRange && MaxRange && MaxPrice && MinPrice && Progress){
MinRange.addEventListener("input" , function(){
 if(Number(MinRange.value) > Number(MaxRange.value)){
  MinRange.value = MaxRange.value ;
 };
 MinPrice.textContent = MinRange.value ;
});

MaxRange.addEventListener("input" , function(){
 if(Number(MaxRange.value) < Number(MinRange.value)){
  MaxRange.value = MinRange.value
 };
 MaxPrice.textContent = MaxRange.value;
});


function updateProgress() {
    let min = Number(MinRange.value);
    let max = Number(MaxRange.value);

    let MinPercent = (min / Number(MaxRange.max)) * 100 ;
    let MaxPercent = (max / Number(MaxRange.max)) * 100 ;
    
    Progress.style.left = MinPercent + "%" ;
    Progress.style.width = (MaxPercent - MinPercent) + "%";
}

MinRange.addEventListener("input", updateProgress);
MaxRange.addEventListener("input", updateProgress);

updateProgress();
}


// shop grid 2
let Slide = document.querySelector('.slide');
let RightSlide = document.querySelector('.right-slide');

let position = 0;
 
if(Slide && RightSlide){
RightSlide.addEventListener('click' , function(){
  if(window.innerWidth >= 1200){
    position++ ;
    if(position > 1){
      position = 0;
    }
    Slide.style.transform = `translateX(-${position * 33.33}%)` ;
  }
  else if(window.innerWidth >= 768){
    position++ ;
  if(position > 2){
    position = 0 ;
  }
  Slide.style.transform = `translateX(-${position * 50}%)`
}
else{
  position++ ;
  if(position > 3){
    position = 0 ;
  }
  Slide.style.transform = `translateX(-${position *100}%)`;
}
});
}

// Add to Cart

let cart = [];

if (localStorage.getItem("cart")){
  cart = JSON.parse(localStorage.getItem("cart"));
}
// Cart Count
function updateCartCount(){
  let CartCount = document.querySelector('.cart-count');
  if (CartCount) {
    CartCount.textContent = cart.length;
  }
}

updateCartCount();

// Add To Cart 

let AddBtns = document.querySelectorAll('.add-to-card');

AddBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    let Card = btn.closest('.card');
    if(Card){
    let Id = Card.dataset.id;
    let ProductImg = Card.querySelector('.card-img');
    if (ProductImg) {
      localStorage.setItem(`product-img-${Id}`, ProductImg.src);
    }
    cart.push(Id);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
   }
  });
});
// Cart Page 
let CartProducts = document.querySelector('#cart-products');
let CartCard = document.querySelector('.cart-card');

if (CartProducts && CartCard) {
  let ProductIds = [...new Set(cart)];

  ProductIds.forEach(function(Id) {
  let NewCard = CartCard.cloneNode(true);
  NewCard.classList.remove('d-none');
  NewCard.dataset.id = Id;
  // Quantity
  let TextNumber = NewCard.querySelector('.text-number');
  let Quantity = cart.filter(function(item) {
      return item === Id;
  }).length;
  if(TextNumber){
  TextNumber.textContent = Quantity;
  }
  // Image
  let CartImg = NewCard.querySelector('.cart-img');
  let ProductImg = localStorage.getItem(`product-img-${Id}`);
  if (CartImg && ProductImg) {
    CartImg.src = ProductImg;
}
// Delete
let DeleteBtn = NewCard.querySelector('.delete-btn');
if (DeleteBtn) {
 DeleteBtn.addEventListener('click', function() {
   cart = cart.filter(function(item) {
       return item !== Id;
   });
   localStorage.setItem("cart", JSON.stringify(cart));
   NewCard.remove();
   updateCartCount();
   updateTotal();
 });
}
CartProducts.append(NewCard);
});
}


// Total 
function updateTotal() {
    let TotalElement = document.querySelector('.cart-total');
    if (!TotalElement) {
        return;
    }
    let Price = 2856.3;
    let Total = cart.length * Price;
    TotalElement.textContent = `$${Total.toFixed(2)}` ;
}
updateTotal();

//Loading...

let loader = document.createElement("div");

loader.className = "loader";

loader.innerHTML = `
  <div class="loader-content">
    <img src="./logo.svg" class="loader-logo" alt="Logo">
    <div class="spinner-border text-blue-300"></div>
  </div>`
;

document.body.prepend(loader);

window.addEventListener("load", function () {
  setTimeout(function () {
    loader.style.display = "none";
  },3000);
});


