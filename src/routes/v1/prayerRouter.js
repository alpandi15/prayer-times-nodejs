import express from 'express'
import { getPrayer, getHijriCalendar, getMasehiCalendar } from 'controllers/prayer/prayerController'

const router = express.Router()

router.get('/get-prayers', getPrayer)
router.get('/hijri-calendar', getHijriCalendar)
router.get('/masehi-calendar', getMasehiCalendar)

export default router
