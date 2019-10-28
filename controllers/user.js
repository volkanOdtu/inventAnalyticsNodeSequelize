const User = require('../models/User');
const UserBook = require("../models/UserBook");
const Book = require('../models/Book');
   

module.exports = {
    create:async(req,res)=>{
        const {name} = req.body;
        
        await User.create({name}).then(res.json('User is added successfully')).catch(err => res.send("error:" + err)) ;
   
    },
    findAll: async(req ,res) =>{

        const users = await User.findAll()
                                .then(users => res.json(users))
                                .catch(err => res.send("error:" + err));
            
    }  ,    
    getUser: async(req ,res) =>{

        const id = req.param.id;
        const user = await User.findOne({where:{id: req.params.id }})
                        .then(user => {
                                        if(user)
                                            res.json(user);
                                        else
                                            res.json('user can not be found in the system');
                                      })
                            .catch(err => res.send("error:" + err));        
    },
    borrow: async(req ,res) =>{
        const userId = req.params.userId;
        const bookId = req.params.bookId;

        const user = await User.findOne({where:{id: userId }}).catch(err => console.log(err));
         

        if(user)
        {                                            
            //If the book is borrowed by a user ,it cant be borrowed until returned
            //and we update book status, set it to U ,meaning that book is at a User
            const book = await Book.findOne({where:{id: bookId }})
                        
            if(book)
            {
                if( book.status == 'U')
                {
                    const userHasTheBook = await UserHasTheBook( userId , bookId );
                    if(! userHasTheBook  )
                        res.json('Sorry ,book is being used by another user ,so can not be borrowed');                                                                
                    else
                        res.json('This user already has the book.');
                    }
                else
                {
                    //first we add it to userBook table 
                    await UserBook.create({"userId": userId ,"bookId": bookId })
                                    .catch(err => { console.log(err) ; res.send("error: book can not be borrowed by user." + err) ; }) ;
                    //Then update book status
                    await Book.update ({status:'U'}, {where:{id: bookId }})
                                    .then(() => {
                                        res.json('book status is updated ,now it is used by user');
                                        })
                                    .catch(err => {res.send("error:" + err); });                                            
                }
            }                                                                
            else
            {
                res.json('book can not be found in the system');
            }
                                                                                         
        }                                            
        else
            res.json('user can not be found in the system');                            
                                    
    },
    returnbook: async(req ,res) =>{
        const userId = req.params.userId;
        const bookId = req.params.bookId;

        //Only the user who has the book can return it
        const user = await User.findOne({where:{id: userId }} ).catch(err => console.log(err));;
                        
        if(user)
        {
            //Now lets check  whether this user has the book or not
            Book.hasMany(UserBook ) ; 
            UserBook.belongsTo(Book ); 
                                            
            const userWithBook = await UserBook.findOne({ include:[ {model:Book  }], where:{userId: userId ,bookId :bookId } }).catch(err => console.log(err));;
                                                                                              
            if(userWithBook == null)
            {
                res.json('This user does not have the book ,so only user who has the book can return it');                                                                                                                                   
            }
            else
            {            
                //We set books status "L" ,meaning that it is in the library
                await Book.update ({status:'L'}, {where:{id: userWithBook.bookId }})
                            .then(() => {
                                    res.json('book status is updated ,now it is in the library');
                                    })
                                    .catch(err => {res.send("error:" + err) ;});
            }
                                                                   
        }                                            
        else
            res.json('user can not be found in the system');                    
    }
    
}


async function UserHasTheBook(userId ,bookId )  {

        const user = await User.findOne({where:{id: userId }} );
        
        //Now lets check  whether this user has the book or not
        Book.hasMany(UserBook ) ; 
        UserBook.belongsTo(Book ); 
                                            
        const userWithBook = await UserBook.findOne({ include:[ {model:Book  }], where:{userId: userId ,bookId :bookId } }).catch(err => console.log(err));;
        
        
        if(userWithBook == null || userWithBook =='undefined' ||  userWithBook.length == 0)
        {
            return false;
        }                                                                                                                      
        else
        {
            return true;
        }
        
}