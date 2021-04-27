let arr = [
    { name: 'sushi', price: 0, rating: 0 },
    { name: 'taco', price: 0, rating: 3 },
    { name: 'fish', price: 1, rating: 2 },
    { name: 'chicken', price: 1, rating: 1 },
    { name: 'beef', price: 2, rating: 3 },
    { name: 'burger', price: 3, rating: 4 },
    { name: 'noodle', price: 3, rating: 5 },
    { name: 'ramen', price: 4, rating: 4 },
    { name: 'bread', price: 4, rating: 2 },
]


// make a function that if rating/ price click sort the arr accordingly

let filter = (price = null, rating = null) => {
    price
    let copyArr = [...arr]
    if (price !== null) {
        copyArr = copyArr.filter(item => item.price === price)
    }
    if (rating !== null) {
        copyArr = copyArr.filter(item => item.rating === rating)
    }
    return copyArr
}

let result = filter(null, 3)
result