require('../utils/db')

const { validationResult } = require('express-validator')
const Quote = require('../model/quote')
// const badwords = require("indonesian-badwords")

module.exports.index = async (req, res) => {
    const quotes = await Quote.find()

    const category = req.query.category
    
    if (category) {
        const filteredQuotes = quotes.filter((quote) => quote.category == category)

        if (filteredQuotes.length <= 0) {
            return res.status(404).json({
                status: 404,
                endpoint: req.originalUrl,
                method: req.method,
                message: "Not found",
            })
        }

        return res.status(200).json({
            status: 200,
            endpoint: req.originalUrl,
            method: req.method,
            total_quotes: filteredQuotes.length,
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

module.exports.store = async (req, res) => {
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

    try {
        const newQuote = await Quote.create({
            quote: request.quote,
            source: request.source,
            description: request.description,
            category: request.category ? request.category.toLowerCase() : null,
        })

        return res.status(201).json({
            status: 201,
            message: "Quote successfully added",
            data: newQuote
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            endpoint: req.originalUrl,
            message: "Bad Request",
            errors: error
        })
    }
}

module.exports.random = async (req, res) => {
    const category = req.query.category
    
    if (category) {
        const filteredQuotes = await Quote.aggregate([
            {
                $match: {
                    category: category,
                } 
            },
            {
                $sample: {
                    size: 1,
                }
            }
        ])

        const quotes = filteredQuotes

        if (quotes.length <= 0) {
            return res.status(404).json({
                status: 404,
                endpoint: req.originalUrl,
                method: req.method,
                message: "Not found",
            })
        }

        return res.status(200).json({
            status: 200,
            endpoint: req.originalUrl,
            method: req.method,
            data: quotes[0],
        })
    }

    const quotes = await Quote.aggregate([
        {
            $sample: {
                size: 1,
            }
        }
    ])

    res.status(200).json({
        status: 200,
        endpoint: req.originalUrl,
        method: req.method,
        data: quotes[0]
    })
}

module.exports.show = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id)
        if (!quote) {
            return res.status(404).json({
                status: 404,
                endpoint: req.originalUrl,
                method: req.method,
                message: "Not found"
            })
        }
        return res.status(200).json({
            status: 200,
            endpoint: req.originalUrl,
            method: req.method,
            data: quote
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            endpoint: req.originalUrl,
            method: req.method,
            message: "Bad Request",
            errors: error
        })
    }

}

module.exports.destroy = async (req, res) => {
    try {
        const quote = await Quote.deleteOne({_id : req.params.id})
        return res.status(200).json({
            status: 200,
            message: "Quote successfully removed",
            data: quote
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            endpoint: req.originalUrl,
            method: req.method,
            message: "Bad Request",
            errors: error
        })
    }
}

module.exports.update = async (req, res) => {
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
    try {
        const updatedQuote = await Quote.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    quote: request.quote,
                    source: request.source,
                    description: request.description,
                    category: request.category ? request.category.toLowerCase() : null,
                }
            }
        )

        return res.status(200).json({
            status: 200,
            message: "Quote successfully updated",
            data: updatedQuote
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            endpoint: req.originalUrl,
            method: req.method,
            message: "Bad Request",
            errors: error
        })
    }
}

module.exports.categories = async (req, res) => {
    const categories = await Quote.distinct('category')

    res.status(200).json({
        status: 200,
        endpoint: req.originalUrl,
        method: req.method,
        data: categories
    })
}