import mongoose from 'mongoose'

export const mongoConfig = () => {
  mongoose.connect(process.env.MONGODB, {
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
