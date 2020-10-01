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
    const hijri = momentHijri()

    const startWeek = momentHijri(hijri).startOf('imonth').week();
    const endWeek = momentHijri(hijri).endOf('imonth').week();
    let calendar = []
    for(var week = startWeek; week<endWeek;week++){
      calendar.push({
        week:week,
        days:Array(7).fill(0).map((n, i) => momentHijri().week(week).startOf('iweek').clone().add(n + i, 'day').format('dddd, iDD/iMM/iYYYY'))
      })
    }

    return res.send({
        current: hijri.format('dddd, iDD/iMMMM/iYYYY'),
        startWeek,
        endWeek,
        calendar
    })
}


export const getMasehiCalendar = (req, res) => {
    momentHijri.locale('id')
    const masehi = momentHijri()

    const startWeek = momentHijri().startOf('month').week();
    const endWeek = momentHijri().endOf('month').week();
    let calendar = []
    for(var week = startWeek; week<endWeek;week++){
      calendar.push({
        week:week,
        days:Array(7).fill(0).map((n, i) => momentHijri().week(week).startOf('week').clone().add(n + i, 'day').format('dddd, DD/MM/YYYY'))
      })
    }

    return res.send({
        current: masehi.format('dddd, DD/MM/YYYY'),
        calendar
    })
}
