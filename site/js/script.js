const categories = ['Vêtements','Accessoires','Chaussures']

// Generate sample products: 10 per category
const products = []
categories.forEach((cat,ci)=>{
  for(let i=1;i<=10;i++){
    products.push({
      id:`${ci+1}-${i}`,
      category:cat,
      title:`${cat} ${i}`,
      price: (10 + Math.round(Math.random()*90)) + (Math.random()<0.5?0.99:0),
      desc:`Description pour ${cat} ${i}. Élégant et confortable.`,
      image:`https://picsum.photos/seed/${encodeURIComponent(cat+i)}/400/300`
    })
  }
})

// State
const state = { products, cart: {} }

// Elements
const categoriesEl = document.getElementById('categories')
const searchInput = document.getElementById('search-input')
const productsEl = document.getElementById('products')
const cartButton = document.getElementById('cart-button')
const cartCount = document.getElementById('cart-count')
const cartPanel = document.getElementById('cart')
const closeCart = document.getElementById('close-cart')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')

const modal = document.getElementById('product-modal')
const modalImage = document.getElementById('modal-image')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalPrice = document.getElementById('modal-price')
const modalAdd = document.getElementById('modal-add')
const closeModal = document.getElementById('close-modal')
const paymentModal = document.getElementById('payment-modal')
const closePayment = document.getElementById('close-payment')
const paymentForm = document.getElementById('payment-form')
const paymentAmount = document.getElementById('payment-amount')
const paymentStatus = document.getElementById('payment-status')
const buyerName = document.getElementById('buyer-name')
const cardNumber = document.getElementById('card-number')
const expiry = document.getElementById('expiry')
const cvc = document.getElementById('cvc')
const checkoutButton = document.getElementById('checkout')

let activeCategory = categories[0]
let searchQuery = ''
let activeProduct = null

function renderCategories(){
  categoriesEl.innerHTML = ''
  categories.forEach(cat=>{
    const btn = document.createElement('button')
    btn.textContent = cat
    btn.className = cat===activeCategory? 'active':''
    btn.onclick = ()=>{ activeCategory = cat; renderCategories(); renderProducts() }
    categoriesEl.appendChild(btn)
  })
}

function renderProducts(){
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const list = state.products.filter(p=>{
    const matchesCategory = p.category===activeCategory
    const matchesSearch = normalizedQuery === '' || p.title.toLowerCase().includes(normalizedQuery) || p.desc.toLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesSearch
  })
  productsEl.innerHTML = ''
  if(list.length === 0){
    productsEl.innerHTML = '<div class="empty-results">Aucun produit ne correspond à votre recherche.</div>'
    return
  }
  list.forEach(p=>{
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <div class="desc">${p.desc}</div>
      <div class="price">${p.price.toFixed(2)} €</div>
      <div class="actions">
        <button class="btn" data-id="${p.id}">Ajouter</button>
        <button class="btn ghost" data-id="${p.id}">Voir</button>
      </div>
    `
    productsEl.appendChild(card)
  })
}

function setActiveCategoryCards(){
  document.querySelectorAll('.category-card').forEach(card=>{
    card.classList.toggle('active', card.dataset.cat === activeCategory)
  })
}

function openModal(product){
  activeProduct = product
  modalImage.src = product.image
  modalTitle.textContent = product.title
  modalDesc.textContent = product.desc
  modalPrice.textContent = product.price.toFixed(2) + ' €'
  modal.setAttribute('aria-hidden','false')
}

function closeModalFn(){ modal.setAttribute('aria-hidden','true') }

function scrollToSection(target){
  const section = document.getElementById(target)
  if(section){ section.scrollIntoView({behavior:'smooth',block:'start'}) }
}

function updateCartUI(){
  const items = Object.values(state.cart)
  const total = items.reduce((s,i)=>s + i.qty * i.price,0)
  cartItems.innerHTML = ''
  if(items.length === 0){
    cartItems.innerHTML = '<li class="empty-cart">Votre panier est vide.</li>'
  } else {
    items.forEach(it=>{
      const li = document.createElement('li')
      li.innerHTML = `
        <span>${it.title} x${it.qty}</span>
        <div>
          <strong>${(it.price*it.qty).toFixed(2)} €</strong>
          <button class="cart-item-remove" data-id="${it.id}">Supprimer</button>
        </div>
      `
      cartItems.appendChild(li)
    })
  }
  cartTotal.textContent = total.toFixed(2)
  const count = items.reduce((s,i)=>s+i.qty,0)
  cartCount.textContent = count
}

function removeFromCart(id){
  if(!state.cart[id]) return
  state.cart[id].qty--
  if(state.cart[id].qty <= 0){ delete state.cart[id] }
  updateCartUI()
}

function addToCart(product){
  if(!state.cart[product.id]) state.cart[product.id] = { ...product, qty:0 }
  state.cart[product.id].qty++
  updateCartUI()
  cartPanel.setAttribute('aria-hidden','false')
}

// Delegation for dynamic buttons and highlights
document.body.addEventListener('click', e=>{
  const highlight = e.target.closest('.category-card')
  if(highlight && highlight.dataset.cat){
    activeCategory = highlight.dataset.cat
    renderCategories()
    renderProducts()
    setActiveCategoryCards()
    scrollToSection('products-section')
    return
  }

  const removeBtn = e.target.closest('.cart-item-remove')
  if(removeBtn && removeBtn.dataset.id){
    removeFromCart(removeBtn.dataset.id)
    return
  }

  const add = e.target.closest('.btn')
  if(add && add.dataset.id){
    const id = add.dataset.id
    const p = state.products.find(x=>x.id===id)
    if(add.classList.contains('ghost')){ openModal(p) } else { addToCart(p) }
    return
  }
})

searchInput?.addEventListener('input', e=>{
  searchQuery = e.target.value
  renderProducts()
})

const shopNow = document.getElementById('shop-now')
const seeCategories = document.getElementById('see-categories')

shopNow?.addEventListener('click', ()=>{ scrollToSection('products-section') })
seeCategories?.addEventListener('click', ()=>{ scrollToSection('category-highlights') })

cartButton.addEventListener('click', ()=>{ cartPanel.setAttribute('aria-hidden','false') })
closeCart.addEventListener('click', ()=>{ cartPanel.setAttribute('aria-hidden','true') })
closeModal.addEventListener('click', closeModalFn)
modalAdd.addEventListener('click', ()=>{ if(activeProduct){ addToCart(activeProduct); closeModalFn() } })
checkoutButton?.addEventListener('click', openPaymentModal)
closePayment.addEventListener('click', closePaymentModal)
paymentForm?.addEventListener('submit', handlePaymentSubmit)
function openPaymentModal(){
  paymentStatus.textContent = ''
  paymentAmount.textContent = cartTotal.textContent + ' €'
  paymentModal.setAttribute('aria-hidden','false')
}
function closePaymentModal(){
  paymentModal.setAttribute('aria-hidden','true')
  paymentForm.reset()
}
function handlePaymentSubmit(e){
  e.preventDefault()
  if(Object.keys(state.cart).length === 0){
    paymentStatus.textContent = 'Votre panier est vide.'
    return
  }
  paymentStatus.textContent = 'Traitement du paiement...'
  setTimeout(()=>{
    const client = buyerName.value || 'Client'
    paymentStatus.textContent = `Merci ${client}, votre commande est confirmée !`
    state.cart = {}
    updateCartUI()
    setTimeout(closePaymentModal, 2200)
  }, 1200)
}

// Init
renderCategories()
renderProducts()
setActiveCategoryCards()
updateCartUI()
