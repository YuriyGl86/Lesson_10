class Shop{

    constructor(container){
        this.container = container
        this.cart = container.querySelector('.cart__products')

        this.activateControls()
        this.loadSaved()
        this.checkVisibility()

    }

    activateControls(){
        this.quantityInc()
        this.quantityDec()
        this.addButtons()

    }

    quantityInc(){
        const incButtons = Array.from(this.container.querySelectorAll('.product__quantity-control_inc'))
        incButtons.forEach(inc => inc.addEventListener('click', event => {
            event.target.closest('.product__quantity-controls').querySelector('.product__quantity-value').innerText++
        }))
    }

    quantityDec(){
        const decButtons = Array.from(this.container.querySelectorAll('.product__quantity-control_dec'))
        decButtons.forEach(inc => inc.addEventListener('click', event => {
            const quantity = event.target.closest('.product__quantity-controls').querySelector('.product__quantity-value')
            if(quantity.innerText > 1)quantity.innerText--
        }))
    }

    addButtons(){
        const addButtons = Array.from(this.container.querySelectorAll('.product__add'))
        addButtons.forEach(add => add.addEventListener('click', this.addToCart.bind(this)))
        
    }

    addToCart(event){
        const product = event.target.closest('.product')
        const quantity = product.querySelector('.product__quantity-value').innerText
        const productId = product.dataset.id
        const img = product.querySelector('img').src

        let productAvailable = this.checkAvailability(productId)
        if(productAvailable){
            let currentQuantity = productAvailable.querySelector('.cart__product-count')
            currentQuantity.innerText = +currentQuantity.innerText + Number(quantity)
            this.transition(product, productAvailable)
        } else {
            productAvailable = this.createNewCartItem(productId, quantity, img)
        }
        
        product.querySelector('.product__quantity-value').innerText = 1
        this.checkVisibility()
        this.saveToStorage(productAvailable, productId, img )
    }

    createNewCartItem(productId, quantity, img){
        let temp = document.createElement('div')
        const innerHtml = `
        <div class="cart__product" data-id=${productId}>
            <img class="cart__product-image" src=${img}>
            <div class="cart__product-count">${quantity}</div>
            <div class="delete">&times;</div>
        </div>
        `
        temp.innerHTML = innerHtml.trim()
        const newItem = temp.firstChild
        newItem.querySelector('.delete').addEventListener('click', this.removeItem.bind(this))

        this.cart.appendChild(newItem)
        return newItem
    }

    checkAvailability(id){
        const goods = Array.from(this.cart.querySelectorAll('.cart__product'))
        const targetGood = goods.find(good => good.dataset.id == id)
        return targetGood
    }

    removeItem(event){
        event.target.closest('.cart__product').remove()
        this.checkVisibility()
        this.removeFromStorage( event.target.closest('.cart__product'))
    }

    checkVisibility(){
        const itemCount = Array.from(this.cart.querySelectorAll('.cart__product')).length
        if(itemCount){document.querySelector('.cart').style.display = 'block'}
        else {document.querySelector('.cart').style.display = 'none'}
    }

    transition(product, productAvailable){
        const steps = 10
        const {x:startX, y:startY} = product.querySelector('img').getBoundingClientRect()
        const {x:endX, y:endY} = productAvailable.querySelector('img').getBoundingClientRect()
        const deltaX = (endX - startX) / steps
        const deltaY = (endY - startY)/ steps

        const imgCopy = product.querySelector('img').cloneNode(true)
        product.querySelector('img').insertAdjacentElement('afterend', imgCopy)
        imgCopy.style.position = "absolute"
        imgCopy.style.left = +startX + 'px'
        imgCopy.style.top = +startY + 'px'

        this.counter = steps
        this.interval = setInterval(()=>{this.move(imgCopy, deltaX,deltaY)}, 30)       
        
    }

   move(imgCopy, deltaX, deltaY){
    if(this.counter > 1){
        imgCopy.style.left = imgCopy.getBoundingClientRect().left + deltaX + 'px'
        imgCopy.style.top = imgCopy.getBoundingClientRect().top + deltaY + 'px'
    } else {
        clearInterval(this.interval)
        imgCopy.remove()
    }
    this.counter--
   }

   saveToStorage(product, id, img){
        const savedCart = JSON.parse(localStorage.getItem('cart')) || {}
        let quantity = product.querySelector('.cart__product-count').innerText
        savedCart[id] = [id, quantity, img]
        localStorage.setItem('cart', JSON.stringify(savedCart))
   }

   removeFromStorage(product){
    const id = product.dataset.id
    const savedCart = JSON.parse(localStorage.getItem('cart'))
    delete savedCart[id]
    localStorage.setItem('cart', JSON.stringify(savedCart))
   }

   loadSaved(){
    const savedCart = JSON.parse(localStorage.getItem('cart'))
    console.log(savedCart)
    for(let key in savedCart){
        this.createNewCartItem(...savedCart[key])
    }
   }

   
}




new Shop(document.querySelector('body'))