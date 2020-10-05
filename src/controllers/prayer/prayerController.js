import {
    PrayerTimes,
    Coordinates,
    CalculationMethod,
    Madhab,
    SunnahTimes,
    Qibla
} from 'adhan'
import momentHijri from 'moment-hijri'
momentHijri.locale('id')

export const getPrayer = (req, res) => {
    var date = new Date('2020/10/31')
    const coordinates=  new Coordinates(3.591422, 98.785269)
    const params = CalculationMethod.MuslimWorldLeague()
    params.madhab = Madhab.Shafi
    params.adjustments.fajr = -5
    params.adjustments.sunrise = -2
    params.adjustments.dhuhr = 2
    params.adjustments.asr = 3
    params.adjustments.maghrib = 3
    params.adjustments.isha = 6

    const prayerTimes = new PrayerTimes(coordinates, date, params)
    const sunnahTimes = new SunnahTimes(prayerTimes)
    prayerTimes.date = {
        hijri: momentHijri(prayerTimes.date).format('iDD/iMMMM/iYYYY'),
        masehi: momentHijri(prayerTimes.date).format('DD/MMMM/YYYY')
    }

    prayerTimes.imsak = momentHijri(prayerTimes.fajr).subtract('minutes', 10).format('HH:mm')
    prayerTimes.fajr = momentHijri(prayerTimes.fajr).format('HH:mm')
    prayerTimes.sunrise = momentHijri(prayerTimes.sunrise).format('HH:mm')
    prayerTimes.dhuhr = momentHijri(prayerTimes.dhuhr).format('HH:mm')
    prayerTimes.asr = momentHijri(prayerTimes.asr).format('HH:mm')
    prayerTimes.maghrib = momentHijri(prayerTimes.maghrib).format('HH:mm')
    prayerTimes.isha = momentHijri(prayerTimes.isha).format('HH:mm')

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
        month: hijri.startOf("imonth").format('iMMMM'),
        calendar
    })
}


export const getMasehiCalendar = (req, res) => {
    momentHijri.locale('id')
    const masehi = momentHijri()

    const startWeek = momentHijri(masehi).startOf('month').week();
    const endWeek = momentHijri(masehi).endOf('month').week();
    let calendar = []
    for(var week = startWeek; week<endWeek;week++){
      calendar.push({
        week:week,
        days:Array(7).fill(0).map((n, i) => momentHijri().week(week).startOf('week').clone().add(n + i, 'day').format('dddd, DD/MM/YYYY'))
      })
    }

    return res.send({
        current: masehi.format('dddd, DD/MM/YYYY'),
        month: masehi.startOf("month").format('MMMM'),
        calendar
    })
}
