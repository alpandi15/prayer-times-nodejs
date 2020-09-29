import prayers from './v1/prayerRouter'

const routes = (app) => {
  app.use(prayers)
}

export default routes
