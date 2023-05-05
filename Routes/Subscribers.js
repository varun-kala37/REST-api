const express=require('express')
const router=express.Router()

const Subscriber = require('../model/subscriber')



// Getting all
router.get('/', async (req, res) => {
    try{
const subscribersss=await Subscriber.find()
res.json(subscribersss)
    }
    catch(err){
res.status(500).json({message:err.message})
    }
  })
  
  // Getting One
  router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
  })
  
  // Creating one
  router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel
    })
    try {
      const newSubscriber = await subscriber.save()
      res.status(201).json(newSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  

  // Deleting One
  router.delete('/:id', getSubscriber, async (req, res) => {
    try {
       const removeit=res.subscriber.id
       await Subscriber.findByIdAndRemove(removeit)

      res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  async function getSubscriber(req, res, next) {
    let subscriber
    try {
      subscriber = await Subscriber.findById(req.params.id)
    
      if (subscriber == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.subscriber = subscriber
    next()
  }
module.exports= router;