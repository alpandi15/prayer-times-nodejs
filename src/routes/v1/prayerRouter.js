import express from 'express'
import { getPrayer, getHijriCalendar } from 'controllers/prayer/prayerController'

const router = express.Router()

router.get('/get-prayers', getPrayer)
router.get('/hijri-calendar', getHijriCalendar)

export default router
