const CART_KEY = 'nadia-studio-cart'
const FREE_SHIPPING_LIMIT = 75

const categories = ['Tous', 'Vetements', 'Accessoires', 'Chaussures']

const products = [
  {
    id: 'robe-midi-sienna',
    category: 'Vetements',
    title: 'Robe midi Sienna',
    price: 42,
    desc: 'Coupe fluide, tissu leger et details soignes pour les journees chargees.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'chemise-lina',
    category: 'Vetements',
    title: 'Chemise Lina',
    price: 31,
    desc: 'Une chemise douce et facile a associer avec un jean ou une jupe taillee.',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'veste-courte-ivana',
    category: 'Vetements',
    title: 'Veste courte Ivana',
    price: 59,
    desc: 'Structure nette, longueur moderne et finition sobre pour completer un look.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'jupe-portefeuille-aria',
    category: 'Vetements',
    title: 'Jupe portefeuille Aria',
    price: 36,
    desc: 'Une piece elegante avec taille ajustable et mouvement naturel.',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sac-nomade',
    category: 'Accessoires',
    title: 'Sac Nomade',
    price: 48,
    desc: 'Format quotidien, poche interieure et anse confortable.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'ceinture-mina',
    category: 'Accessoires',
    title: 'Ceinture Mina',
    price: 19,
    desc: 'Boucle discrete et cuir texture pour structurer les silhouettes.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'lunettes-sola',
    category: 'Accessoires',
    title: 'Lunettes Sola',
    price: 27,
    desc: 'Monture legere, ligne douce et protection ideale au quotidien.',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'foulard-kivu',
    category: 'Accessoires',
    title: 'Foulard Kivu',
    price: 22,
    desc: 'Touche coloree et tissu doux pour relever une tenue simple.',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'baskets-nova',
    category: 'Chaussures',
    title: 'Baskets Nova',
    price: 64,
    desc: 'Semelle confortable et ligne minimaliste pour marcher toute la journee.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sandales-maya',
    category: 'Chaussures',
    title: 'Sandales Maya',
    price: 39,
    desc: 'Bride fine, maintien agreable et style facile pour les beaux jours.',
    image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'mocassins-eden',
    category: 'Chaussures',
    title: 'Mocassins Eden',
    price: 57,
    desc: 'Une paire chic, souple et adaptee aux tenues de travail.',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'bottines-rio',
    category: 'Chaussures',
    title: 'Bottines Rio',
    price: 72,
    desc: 'Talon stable, ligne elegante et finition mate pour la mi-saison.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80'
  }
]

const state = {
  activeCategory: 'Tous',
  searchQuery: '',
  activeProduct: null,
  cart: loadCart()
}

const categoriesEl = document.getElementById('categories')
const searchInput = document.getElementById('search-input')
const productsEl = document.getElementById('products')
const productsCount = document.getElementById('products-count')
const cartButton = document.getElementById('cart-button')
const cartCount = document.getElementById('cart-count')
const cartPanel = document.getElementById('cart')
const cartBackdrop = document.getElementById('cart-backdrop')
const closeCart = document.getElementById('close-cart')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const freeShipping = document.getElementById('free-shipping')
const clearCartButton = document.getElementById('clear-cart')
const checkoutButton = document.getElementById('checkout')

const productModal = document.getElementById('product-modal')
const modalImage = document.getElementById('modal-image')
const modalCategory = document.getElementById('modal-category')
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

function formatPrice(amount) {
  return `${amount.toFixed(2)} EUR`
}

function loadCart() {
  try {
    const rawCart = localStorage.getItem(CART_KEY)
    return rawCart ? JSON.parse(rawCart) : {}
  } catch (error) {
    return {}
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
}

function getCartItems() {
  return Object.values(state.cart)
}

function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.price * item.qty, 0)
}

function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + item.qty, 0)
}

function getFilteredProducts() {
  const query = state.searchQuery.trim().toLowerCase()
  return products.filter((product) => {
    const matchesCategory = state.activeCategory === 'Tous' || product.category === state.activeCategory
    const matchesQuery =
      query === '' ||
      product.title.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)

    return matchesCategory && matchesQuery
  })
}

function renderCategories() {
  if (!categoriesEl) return
  categoriesEl.innerHTML = ''

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = category
    button.className = category === state.activeCategory ? 'active' : ''
    button.setAttribute('role', 'listitem')
    button.addEventListener('click', () => {
      state.activeCategory = category
      renderCategories()
      renderProducts()
    })
    categoriesEl.appendChild(button)
  })
}

function renderProducts() {
  if (!productsEl) return
  const list = getFilteredProducts()
  productsEl.innerHTML = ''

  if (productsCount) {
    productsCount.textContent = `${list.length} article${list.length > 1 ? 's' : ''}`
  }

  if (list.length === 0) {
    productsEl.innerHTML = '<div class="empty-results">Aucun produit ne correspond a votre recherche.</div>'
    return
  }

  list.forEach((product) => {
    const card = document.createElement('article')
    card.className = 'card'
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <div class="product-meta">
        <span class="badge">${product.category}</span>
        <strong class="price">${formatPrice(product.price)}</strong>
      </div>
      <h3>${product.title}</h3>
      <p class="desc">${product.desc}</p>
      <div class="actions">
        <button class="btn" type="button" data-action="add" data-id="${product.id}">Ajouter</button>
        <button class="btn ghost" type="button" data-action="view" data-id="${product.id}">Voir</button>
      </div>
    `
    productsEl.appendChild(card)
  })
}

function setCartOpen(isOpen) {
  if (!cartPanel) return
  cartPanel.setAttribute('aria-hidden', String(!isOpen))
  cartButton?.setAttribute('aria-expanded', String(isOpen))
  if (cartBackdrop) cartBackdrop.hidden = !isOpen
}

function addToCart(product, qty = 1) {
  if (!state.cart[product.id]) {
    state.cart[product.id] = { ...product, qty: 0 }
  }
  state.cart[product.id].qty += qty
  saveCart()
  renderCart()
  setCartOpen(true)
}

function updateQuantity(id, change) {
  const item = state.cart[id]
  if (!item) return

  item.qty += change
  if (item.qty <= 0) {
    delete state.cart[id]
  }
  saveCart()
  renderCart()
}

function removeItem(id) {
  delete state.cart[id]
  saveCart()
  renderCart()
}

function clearCart() {
  state.cart = {}
  saveCart()
  renderCart()
}

function renderCart() {
  if (!cartItems || !cartTotal || !cartCount) return
  const items = getCartItems()
  const total = getCartTotal()
  const count = getCartCount()

  cartItems.innerHTML = ''
  cartCount.textContent = count
  cartTotal.textContent = total.toFixed(2)
  checkoutButton.disabled = count === 0
  clearCartButton.disabled = count === 0

  if (freeShipping) {
    if (count === 0) {
      freeShipping.textContent = 'Ajoutez un article pour commencer votre commande.'
    } else if (total >= FREE_SHIPPING_LIMIT) {
      freeShipping.textContent = 'Livraison offerte debloquee.'
    } else {
      freeShipping.textContent = `Encore ${(FREE_SHIPPING_LIMIT - total).toFixed(2)} EUR pour la livraison offerte.`
    }
  }

  if (items.length === 0) {
    cartItems.innerHTML = '<li class="empty-cart">Votre panier est vide.</li>'
    return
  }

  items.forEach((item) => {
    const li = document.createElement('li')
    li.className = 'cart-item'
    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-info">
        <div class="cart-item-title">
          <strong>${item.title}</strong>
          <strong>${formatPrice(item.price * item.qty)}</strong>
        </div>
        <div class="qty-row">
          <div class="qty-controls" aria-label="Quantite">
            <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Retirer une unite">-</button>
            <span>${item.qty}</span>
            <button type="button" data-action="increase" data-id="${item.id}" aria-label="Ajouter une unite">+</button>
          </div>
          <button class="remove-item" type="button" data-action="remove" data-id="${item.id}">Retirer</button>
        </div>
      </div>
    `
    cartItems.appendChild(li)
  })
}

function openProductModal(product) {
  if (!productModal) return
  state.activeProduct = product
  modalImage.src = product.image
  modalImage.alt = product.title
  modalCategory.textContent = product.category
  modalTitle.textContent = product.title
  modalDesc.textContent = product.desc
  modalPrice.textContent = formatPrice(product.price)
  productModal.setAttribute('aria-hidden', 'false')
}

function closeProductModal() {
  productModal?.setAttribute('aria-hidden', 'true')
}

function openPaymentModal() {
  if (getCartCount() === 0) return
  paymentStatus.textContent = ''
  paymentAmount.textContent = formatPrice(getCartTotal())
  paymentModal.setAttribute('aria-hidden', 'false')
}

function closePaymentModal() {
  paymentModal?.setAttribute('aria-hidden', 'true')
  paymentForm?.reset()
}

function handlePaymentSubmit(event) {
  event.preventDefault()
  if (getCartCount() === 0) {
    paymentStatus.textContent = 'Votre panier est vide.'
    return
  }

  paymentStatus.textContent = 'Traitement de la commande...'
  window.setTimeout(() => {
    const client = buyerName.value.trim() || 'client'
    paymentStatus.textContent = `Merci ${client}, votre commande est confirmee.`
    clearCart()
    window.setTimeout(() => {
      closePaymentModal()
      setCartOpen(false)
    }, 1400)
  }, 900)
}

function onlyDigits(value) {
  return value.replace(/\D/g, '')
}

function formatCardNumber(value) {
  return onlyDigits(value).slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = onlyDigits(value).slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

document.body.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]')
  if (!button) return

  const { action, id } = button.dataset
  const product = products.find((item) => item.id === id)

  if (action === 'add' && product) addToCart(product)
  if (action === 'view' && product) openProductModal(product)
  if (action === 'increase') updateQuantity(id, 1)
  if (action === 'decrease') updateQuantity(id, -1)
  if (action === 'remove') removeItem(id)
})

searchInput?.addEventListener('input', (event) => {
  state.searchQuery = event.target.value
  renderProducts()
})

cartButton?.addEventListener('click', () => setCartOpen(true))
closeCart?.addEventListener('click', () => setCartOpen(false))
cartBackdrop?.addEventListener('click', () => setCartOpen(false))
clearCartButton?.addEventListener('click', clearCart)
checkoutButton?.addEventListener('click', openPaymentModal)
closeModal?.addEventListener('click', closeProductModal)
modalAdd?.addEventListener('click', () => {
  if (state.activeProduct) {
    addToCart(state.activeProduct)
    closeProductModal()
  }
})

closePayment?.addEventListener('click', closePaymentModal)
paymentForm?.addEventListener('submit', handlePaymentSubmit)

cardNumber?.addEventListener('input', (event) => {
  event.target.value = formatCardNumber(event.target.value)
})

expiry?.addEventListener('input', (event) => {
  event.target.value = formatExpiry(event.target.value)
})

cvc?.addEventListener('input', (event) => {
  event.target.value = onlyDigits(event.target.value).slice(0, 4)
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  setCartOpen(false)
  closeProductModal()
  closePaymentModal()
})

renderCategories()
renderProducts()
renderCart()
