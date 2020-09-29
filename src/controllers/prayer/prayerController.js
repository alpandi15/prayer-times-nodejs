import {
    PrayerTimes,
    Coordinates,
    CalculationMethod,
    Madhab
} from 'adhan'
import moment from 'moment'

export const getPrayer = (req, res) => {
    var date = new Date()
    const coordinates=  new Coordinates(3.591354, 98.785335)
    const params = CalculationMethod.MuslimWorldLeague()
    params.madhab = Madhab.Hanafi

    const prayerTimes = new PrayerTimes(coordinates, date, params)
    console.log(prayerTimes)
    var fajrTime = moment(prayerTimes.fajr).format('YYYY/MM/DD H:mm');

    console.log('CURRENT ', prayerTimes.currentPrayer())
    console.log('NEXT ', prayerTimes.nextPrayer())
    console.log('NEXT Prayer ', prayerTimes.timeForPrayer())
    return res.send(prayerTimes)
}

