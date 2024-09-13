function formatValue(value) {
    if (typeof value === 'string') {
        return `"${value}"`
    } else if (value === null) {
        return 'null'
    } else if (typeof value === 'number') {
        return value
    } else {
        return value
    }
}

async function getQuote() {
    const response = await fetch(`/api/quotes/random`)

    if (!response.ok) {
        console.error(response)
    }

    const quotes = await response.json()

    return quotes
}

document.addEventListener('DOMContentLoaded', async () => {
    const quotes = await getQuote()

    const {_id, quote, source, description, category} = quotes.data

    document.querySelector('#id').innerText = formatValue(_id)
    document.querySelector('#quote').innerText = formatValue(quote)
    document.querySelector('#source').innerText = formatValue(source)
    document.querySelector('#description').innerText = formatValue(description)
    document.querySelector('#category').innerText = formatValue(category)
})