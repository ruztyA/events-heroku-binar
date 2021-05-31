const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../database/config')

const authService = {
  findByUsername: async (username) => {
    return await userModel.findOne({where: {username: username}})  
  },

  create: async (userDetails) => {
    try {
      const saltRounds = 10
      const salt = await bcrypt.genSaltSync(saltRounds)

      const hashedPassword = await bcrypt.hashSync(userDetails.password, salt)

      const isUserExist = await authService.findByUsername({where: {username: userDetails.username}})
      
      let error = null;
      let result = {};
      
      if(!isUserExist) {
        result = await userModel.create({
        username: userDetails.username,
        password: hashedPassword
        })
      } else {
          error = 'user already exist'
      }

      return {
        data: result,
        error
      };

    } catch (error) {
      console.log(error)
      return error
    }
  },

  login: async(userDetails) => {
    try {
        let error = null;
        let result = {};

        const isUserExist = await authService.findByUsername(userDetails.username)
        if(!isUserExist) {
            error = 'user not registered'
            return {
                data: {},
                error
            }
        } 

        const isSamePassword = await bcrypt.compareSync(userDetails.password, isUserExist.dataValues.password)
        // console.table({
        //     input: userDetails.password,
        //     hash: isUserExist.dataValues.password,
        //     isSamePassword
        // })

        if(!isSamePassword) {
            error = 'incorrect password'
            return {
                data: {},
                error
            }
        } 
        
        result = await jwt.sign(isUserExist.dataValues, 'secret_key');
        
        return {
            data: result,
            error
        };

    } catch (error) {
        console.log(error)
        return error
    }
  }
}


module.exports = authService;
