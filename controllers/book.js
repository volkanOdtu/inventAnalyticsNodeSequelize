const Book = require('../models/Book');

module.exports = {
    create:async(req,res)=>{
        const {name} = req.body;
        
        await Book.create({name}).then(res.json('Book is added successfully')).catch(err => res.send("error:" + err)) ;        
    },
    findAll: async(req ,res) =>{

        await Book.findAll()
                .then(books => res.json(books))
                .catch(err => res.send("error:" + err));
            
    }  ,    
    getBook: async(req ,res) =>{

        const id = req.param.id;
        const book = await Book.findOne({where:{id: req.params.id }})
                        .then(book => {
                                        if(book)
                                            res.json(book);
                                        else
                                            res.json('book can not be found in the system');
                                      })
                            .catch(err => res.send("error:" + err));        
    }
}