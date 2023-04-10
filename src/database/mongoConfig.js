import mongoose from 'mongoose'

export const mongoConfig = () => {
  mongoose.connect('mongodb://mongo:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch(err => {
      console.error(err)
    })
}
