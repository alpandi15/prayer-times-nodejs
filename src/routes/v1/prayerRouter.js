import express from 'express'
import { getPrayer, getPrayer2 } from 'controllers/prayer/prayerController'

const router = express.Router()

router.get('/get-prayers', getPrayer)
router.get('/get-prayers2', getPrayer2)

export default router
