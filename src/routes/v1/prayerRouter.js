import express from 'express'
import { getPrayer} from 'controllers/prayer/prayerController'

const router = express.Router()

router.get('/get-prayers', getPrayer)

export default router
