import express from 'express'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()

authRouter.post('/signin', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(() => {
          res.status(201).json({
            message: 'User created successfully'
          })
        })
        .catch(err => {
          console.error(err)
          res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        error: err
      })
    })
})

authRouter.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(result => {
          if (!result) {
            return res.status(401).json({
              message: 'Auth failed'
            })
          }
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          )
          res.status(200).json({
            message: 'Auth successful',
            token
          })
        })
        .catch(err => {
          console.error(err)
          res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        error: err
      })
    })
})

export { authRouter }
