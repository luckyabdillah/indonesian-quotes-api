const fs = require('fs')
const path = require('path')
const getRandom = require("../helpers/getRandom")
const { validationResult } = require('express-validator')
// const badwords = require("indonesian-badwords")

const dir = '/tmp'
const data = path.join(dir, 'quotes.json')

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}

if (!fs.existsSync(data)) {
    fs.writeFileSync(data, '[]', 'utf-8')
}

const loadQuotes = () => {
    const file = fs.readFileSync(data, 'utf-8')
    const quotes = JSON.parse(file)
    return quotes
}

const saveQuotes = (quotes) => {
    fs.writeFileSync(file, JSON.stringify(quotes, null, 2), 'utf-8')
}

module.exports.index = (req, res) => {
    const quotes = loadQuotes()

    const category = req.query.category
    
    if (category) {
        const filteredQuotes = quotes.filter((quote) => quote.category == category)

        if (filteredQuotes.length <= 0) {
            return res.status(404).json({
                status: 404,
                endpoint: req.originalUrl,
                method: req.method,
                data: 'Not found',
            })
        }

        return res.status(200).json({
            status: 200,
            endpoint: req.originalUrl,
            method: req.method,
            data: filteredQuotes,
        })
    }

    res.status(200).json({
        status: 200,
        endpoint: req.originalUrl,
        method: req.method,
        total_quotes: quotes.length,
        data: quotes
    })
}

module.exports.store = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            endpoint: req.originalUrl,
            message: "Validation failed",
            errors: errors.array() 
        })
    }

    const request = req.body
    // for (const key in request) {
    //     const currentKey = request[key] ?? ''
    //     const sanitized = currentKey.replace(/(\w)\1{2,}/g, '$1')
    
    //     // Pisahkan string menjadi kata-kata individu
    //     const words = sanitized.split(/\s+/)
    
    //     // Periksa setiap kata secara terpisah
    //     for (const word of words) {
    //         // Periksa apakah setiap kata termasuk kata kasar
    //         if (badwords.flag(word) && word != 'masuk') {
    //             return res.status(400).json({
    //                 status: 400,
    //                 endpoint: req.originalUrl,
    //                 message: "Input should not contain any badwords",
    //                 badwords: [word]
    //             })
    //         }
    //     }
    // }

    const quotes = loadQuotes()
    const lastId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) : 0

    const newQuote = {
        id: lastId + 1,
        quote: request.quote,
        source: request.source,
        description: request.description ?? null,
        category: request.category ?? null
    }

    quotes.push(newQuote)
    saveQuotes(quotes)

    return res.status(201).json({
        status: 201,
        message: 'Quote successfully added',
        data: newQuote
    })
}

module.exports.random = (req, res) => {
    const quotes = loadQuotes()

    const category = req.query.category
    
    if (category) {
        const filteredQuotes = quotes.filter((quote) => quote.category == category)

        if (filteredQuotes.length <= 0) {
            return res.status(404).json({
                status: 404,
                endpoint: req.originalUrl,
                method: req.method,
                data: 'Not found',
            })
        }

        return res.status(200).json({
            status: 200,
            endpoint: req.originalUrl,
            method: req.method,
            data: filteredQuotes[getRandom(filteredQuotes.length)],
        })
    }

    res.status(200).json({
        status: 200,
        endpoint: req.originalUrl,
        method: req.method,
        data: quotes[getRandom(quotes.length)]
    })
}

module.exports.show = (req, res) => {
    const quotes = loadQuotes()
    const quote = quotes.find((quote) => quote.id == req.params.id)
    if (!quote) {
        return res.status(404).json({
            status: 404,
            endpoint: req.originalUrl,
            method: req.method,
            data: 'Not found'
        })
    }

    res.status(200).json({
        status: 200,
        endpoint: req.originalUrl,
        method: req.method,
        data: quote
    })
}

module.exports.destroy = (req, res) => {
    const quotes = loadQuotes()
    if (quotes) {
        const quote = quotes.find((quote) => quote.id == req.params.id)
        if (!quote) {
            return res.status(404).json({
                status: 404,
                endpoint: req.originalUrl,
                method: req.method,
                data: 'Not found'
            })
        }
        const filteredQuotes = quotes.filter((item) => item.id !== quote.id)
        saveQuotes(filteredQuotes)
        
        return res.status(200).json({
            status: 200,
            message: 'Quote successfully removed'
        })
    }
}

module.exports.update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            endpoint: req.originalUrl,
            message: "Validation failed",
            errors: errors.array() 
        })
    }

    const quotes = loadQuotes()
    const quote = quotes.find((quote) => quote.id == req.params.id)
    if (!quote) {
        return res.status(404).json({
            status: 404,
            endpoint: req.originalUrl,
            method: req.method,
            data: 'Not found'
        })
    }

    let request = req.body
    newQuote = {
        id: quote.id,
        quote: request.quote ?? quote.quote,
        source: request.source ?? quote.source,
        description: request.description ?? null,
        category: request.category ?? null
    }

    const filteredQuotes = quotes.filter((quote) => quote.id != newQuote.id )
    filteredQuotes.push(newQuote)
    saveQuotes(filteredQuotes)

    return res.status(200).json({
        status: 200,
        message: 'Quote successfully updated',
        data: newQuote
    })
}

module.exports.categories = (req, res) => {
    const quotes = loadQuotes()
    const categories = []

    quotes.forEach(quote => {
        const category = quote.category
        if (category && !categories.includes(category)) {
            categories.push(category)
        }
    })

    res.status(200).json({
        status: 200,
        endpoint: req.originalUrl,
        method: req.method,
        data: categories
    })
}