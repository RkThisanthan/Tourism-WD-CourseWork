let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list =  document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click' , ()=>{
  body.classList.add('active');
})

closeShopping.addEventListener('click' , ()=>{
  body.classList.remove('active');
})
  
let products = [
  {
      id:1,
       image:"c4.jpg",
       name:'Shoes',
       price:'12000'

  },
  {
      id:2,
      image:"c5.jpg",
      name:'Shoes',
      price:'12500'

  },
  {
      id:3,
      image:"c7.jpg",
      name:'Bottle',
      price:'2000'

  },
  {
      id:4,
      image:"c8.jpg",
      name:'Rain coat',
      price:'3500'

  },
  {
      id:5,
      image:"c11.jpg",
      name:'Mattress',
      price:'12000'


  },
  {
      id:6,
      image:"c3.jpg",
      name:'Traveling Bag',
      price:'8000'
  },
  {
      id:7,
      name:"Leather Bag",
      image:'c2.jpg',
      price:'10000'

  },
  {
      id:8,
      image:"c10.jpg",
      name:'Tent',
      price:'17500'
  },
  {
      id:9,
      image:'c12.jpg',
      name:'Pillow',
      price:'1750'
  },
  {
      id:10,
      image:"c13.jpg",
      name:'Charcoal',
      price:'2750'
  },
  {
      id:11,
      image:"c14.jpg",
      name:'Travelling_Table',
      price:'4000'
  },
  {
      id:12,
      image:"c15.jpg",
      name:'Travelling Chair',
      price:'3500'
  },
  {
      id:13,
      image:"c16.jpg",
      name:'Masks',
      price:'2500'
  },
  {
      id:14,
      image:"c19.jpg",
      name:'Elephant',
      price:'1500'
  },
  {
      id:15,
      image:"c18.jpg",
      name:'Wood Toy',
      price:'2750'
  }
  
];


let listCards = [];
  function initApp() {
    products.forEach((value, key) => {
      let newDiv = document.createElement('div');
      newDiv.classList.add('item');
      newDiv.innerHTML = `
        <img src="image/${value.image}" />
        <div class="titel">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCart(${key})">Add To Cart</button>
      `;
      list.appendChild(newDiv);
    });
  }

  initApp();

  function addToCart(key) {
    if (listCards[key] == null) {
      listCards[key] = products[key];
      listCards[key].quantity = 1;
      listCards[key].price = parseInt(listCards[key].price);
    }
    reloadCard();
  }
  function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    
    listCards.forEach((value, key) => {
      if (value != null) {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
  
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
          <div><img src="image/${value.image}"/></div>
          <div>${value.name}</div>
          <div>${value.price.toLocaleString()}</div>
          <div>${value.quantity}</div>
          <div>
            <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
          </div>
        `;
        listCard.appendChild(newDiv);
      }
    });
  
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
  }
  
 
  function changeQuantity(key, quantity) {
    if (quantity == 0) {
      delete listCards[key];
    } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
  }

