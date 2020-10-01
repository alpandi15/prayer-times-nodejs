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
import momentHijri from 'moment-hijri'

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

export const getHijriCalendar = (req, res) => {
    momentHijri.locale('id')
    const nowDate = momentHijri().format('YYYY/MM/DD')
    const hijri = momentHijri(nowDate, 'YYYY/MM/DD').format('dddd, iDD/iMMMM/iYYYY')
    return res.send({
        hijri
    })
}
