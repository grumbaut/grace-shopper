const router = require('express').Router();
const db = require('../db');

router.get('/api/sessions/:token', (req, res, next)=> {
    try {
        const id = jwt.decode(req.params.token, 'foo').id;
        User.findById(id)
            .then( user => {
                if(user){
                    return res.send(user)
                }
                const error = { status: 401 }
                throw error
                })
    }
    catch(ex){
        throw ex
    }
})  

router.post('/api/sessions', (req, res, next) => {
    User.findOne ({ where: req.body })
      .then(user => {
        if(user){
           const token = jwt.encode( { id: user.id }, 'foo')
           return res.send(token)
           }
        const error = { status: 401}
        throw error;
        })
      .catch(next)
}) 

module.exports = router;