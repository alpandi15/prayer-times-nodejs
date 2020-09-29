import {
    PrayerTimes,
    Coordinates,
    CalculationMethod,
    Madhab,
    SunnahTimes,
    Qibla
} from 'adhan'
import { PrayerTimes as PT } from 'prayer-times'
import moment from 'moment'

export const getPrayer = (req, res) => {
    var date = new Date()
    const coordinates=  new Coordinates(3.591422, 98.785269)
    const params = CalculationMethod.MuslimWorldLeague()
    params.madhab = Madhab.Shafi

    const prayerTimes = new PrayerTimes(coordinates, date, params)
    const sunnahTimes = new SunnahTimes(prayerTimes)

    return res.send({
        ...prayerTimes,
        middleOfTheNight: sunnahTimes.middleOfTheNight,
        lastThirdOfTheNight: sunnahTimes.lastThirdOfTheNight,
        current: prayerTimes.currentPrayer(),
        nextPrayer: prayerTimes.nextPrayer(),
        qibla: Qibla(coordinates),
    })
}

export const getPrayer2 = (req, res) => {
    const prayTimes = new PT();
    const data = prayTimes.getTimes(new Date(), [3.591354, 98.785335], +7, 'auto', '24h')
    return res.send('Test')
}
