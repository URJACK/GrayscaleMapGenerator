const express = require('express')
const router = express.Router()

//middleware
router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

router.get('/', (req, res) => {
    res.render('main', { title: 'Hey' })
})

module.exports = router