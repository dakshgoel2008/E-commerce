## Why not using

`document.addEventListener('DOMContentLoaded', function () {
// Select all elements with the class 'product-card'
let cart = document.querySelectorAll('.product-card')
// console.log(carts);
// Iterate over each 'product-card' element
// Find the corresponding quantity element
console.log(cart)
let quantity = cart.querySelector('.quantity-value')
let value = +quantity.innerText

    // Add event listener to the cart element
    cart.addEventListener('click', (ev) => {
        ev.preventDefault()
        let item = ev.target

        if (item.classList.contains('increase')) {
        } else if (item.classList.contains('decrease')) {
        }
    })

})
`
1. console.log(cart) will return nodeList which can`t be used with querySelector
2. So we have to use cart.forEach and then we will be able to do the required.