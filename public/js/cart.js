document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'product-card'
    let carts = document.querySelectorAll('.product-card')
    // Iterate over each 'product-card' element
    carts.forEach((cart) => {
        // Find the corresponding quantity element
        let quantity = cart.querySelector('.quantity-value')
        let value = +quantity.innerText

        cart.addEventListener('click', (ev) => {
            ev.preventDefault()
            let item = ev.target

            if (item.classList.contains('increase')) {
                item = item.parentElement.parentElement.parentElement
                item = item.lastElementChild // which is a div having attribute as id having id of the product
                // console.log(item);           //item currently stores the div having id of the object being clicked.
                let id = item.getAttribute('id') // this only stores the id of the object being clicked.
                axios
                    .get(`/shop/cart/increase/${id}`)
                    .then(({ data }) => {
                        console.log(data);
                        // data.forEach(c => {
                        //     console.log()    
                        // })
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            } else if (item.classList.contains('decrease')) {
                item = item.parentElement.parentElement.parentElement
                item = item.lastElementChild
                // console.log(item);
                let id = item.getAttribute('id')
                axios
                    .get(`/shop/cart/decrease/${id}`)
                    .then(({ data }) => {
                        console.log(data)
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            }
        })
    })
})

