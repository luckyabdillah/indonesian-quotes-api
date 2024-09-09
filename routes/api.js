const express = require('express')
const QuoteController = require('../controllers/QuoteController')
const router = express.Router()
const { body } = require('express-validator')

const rules = [
    body('quote').isString().isLength({ min: 10 }).withMessage('Quote harus memiliki minimal 10 karakter string'),
    body('source').isString().isLength({ min: 3 }).withMessage('Source harus memiliki minimal 3 karakter string'),
    body('description').optional().isString().withMessage('Description harus berupa string'),
    body('category')
      .optional()
      .isString().withMessage('Category harus berupa string')
      .matches(/^\w+$/).withMessage('Category harus berupa satu kata tanpa spasi')
      .customSanitizer(value => value.toLowerCase()),
]

router.get('/quotes', QuoteController.index)
router.post('/quotes', rules, QuoteController.store)

router.get('/quotes/random', QuoteController.random)
router.get('/quotes/:id', QuoteController.show)
// router.delete('/quotes/:id', QuoteController.destroy)
// router.put('/quotes/:id', rules, QuoteController.update)

router.get('/categories', QuoteController.categories)

module.exports = router