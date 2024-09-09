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

async function main() {
    const response = await fetch(`http://indonesian-quotes-api.vercel.app/api/quotes/random`)

    if (!response.ok) {
        console.error(response)
    }

    const quotes = await response.json()

    const id = formatValue(quotes.data.id)
    const quote = formatValue(quotes.data.quote)
    const source = formatValue(quotes.data.source)
    const description = formatValue(quotes.data.description)
    const category = formatValue(quotes.data.category)

    document.querySelector('#id').innerText = id
    document.querySelector('#quote').innerText = quote
    document.querySelector('#source').innerText = source
    document.querySelector('#description').innerText = description
    document.querySelector('#category').innerText = category
}

main()