const eventService = require('../services/eventService');

const eventController = {
    create: async (req, res) => {
        try {
          let status = 200;
          let message = 'OK';
          let data = {};
    
          const {data: eventCreated, error} = await eventService.create(req.body)
          console.log("🚀 ~ file: eventController.js ~ line 10 ~ create: ~ error", typeof error)
        //   if (error !== null) {
        //     status = 500,
        //     message = error
        //   }
    
          res.send({
            status,
            message,
            data: eventCreated || data
          })

        } catch (error) {
          console.log("🚀 ~ file: eventController.js ~ line 23 ~ create: ~ error", error)
          res.send({ status: 500, message: 'failed', data: error })
        }
      },
    
    get: async (req, res) => {
        try {
            let status = 200;
            let message = 'OK';
            let data = {};

            let event = await eventService.get();
            
            res.send({
              status,
              message,
              data: event
            })
  
          } catch (error) {
            console.log("🚀 ~ file: eventController.js ~ line 43 ~ create: ~ error", error)
            res.send({ status: 500, message: 'failed', data: error })
          }
  
    },

}

module.exports = eventController;