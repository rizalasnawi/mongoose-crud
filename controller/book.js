const Book = require('../model/book');

class BookController {

    static read (req, res) {
        let where = {}

        if(req.query.q) {
            where = { $or: [
                { title: { $regex: '.*' + req.query.q + '.*', $options : 'i' }},
                { author: { $regex: '.*' + req.query.q + '.*', $options : 'i' }}
            ]}
        }

        Book.find(where)
        .then((books) => {
            res.status(200).json(books)
        })
        .catch((err) => {
            res.status(500).json({err : err})
        })
    }

    static readOne (req, res) {
        Book.findById(req.params.id)
        .then((books) => {
            if(!books){
               res.status(404).send({message : 'Book not found' + req.params.id});
            }
            res.send(books);

        })
        .catch((err) => {
            if(err.kind == 'ObjectId') {
               res.status(404).send({message : 'Book not found' + req.params.id});
            }
            res.status(500).send({message : `Error while trying retrieving data`});
        })
    }

    static create (req, res) {
        Book.create({
            isbn : req.body.isbn,
            title : req.body.title,
            author : req.body.author,
            category : req.body.category,
            stock : req.body.stock
        })
        .then((books) => {
            res.status(200).json(books)
        })
        .catch((err) => {
            res.status(500).json({err:err})
        })
    }

    static update(req, res) {
        Book.replaceOne({_id : req.params.id},
            {
                isbn : req.body.isbn,
                title : req.body.title,
                author : req.body.author,
                category : req.body.category,
                stock : req.body.stock 
            })
        .then((books) => {
            res.status(200).json(books)
        })
        .catch((err) => {
            res.status(500).json({err:err})
        })
    }

    static edit (req, res) {
        Book.findByIdAndUpdate(req.params.id, {
            $set : {
                isbn : req.body.isbn,
                title : req.body.title,
                author : req.body.author,
                category : req.body.category,
                stock : req.body.stock 
            }
        }, {multi:true,new:true})
        .then((books) => {
            if(!books){
               res.status(404).send({message : `Data not found`});  
            }
            res.status(200).json(books);
        })
        .catch((err) => {
            res.status(500).json({message : err});
        })
    }

    static delete (req, res) {
        Book.findByIdAndRemove(req.params.id)
        .then((books) => {
            if(!books){
              res.status(404).json({message : `Id not found`});
            }
            res.send(`Deleted succesfully`);
        })
        .catch((err) => {
            res.status(500).json({err : err})
        })
    }
}

module.exports = BookController