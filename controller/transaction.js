const Transaction = require('../model/transaction');

class TransactionController {

    static read (req, res) {

        let where = {}
        if(req.query.book){
           where = {booklist : req.query.book}
        }

        Transaction.find(where)
        .populate('member')
        .populate('booklist')
        .then((transactions) => {
            res.status(200).json(transactions)
        })
        .catch((err) => {
            res.status(500).json({err : err})
        })
    }

    static readOne (req, res) {
        Transaction.findById(req.params.id)
        .populate('member')
        .populate('booklist')
        .then((transactions) => {
            if(!transactions){
               res.status(404).send({message : 'Transaction not found' + req.params.id});
            }
            res.send(transactions);

        })
        .catch((err) => {
            if(err.kind == 'ObjectId') {
               res.status(404).send({message : 'Transaction not found' + req.params.id});
            }
            res.status(500).send({message : `Error while trying retrieving data`});
        })
    }

    static create (req, res) {
        Transaction.create({
            member : req.body.member,
            in_data : req.body.in_data,
            out_date : req.body.out_date,
            due_date : req.body.due_date,
            fine : req.body.fine,
            booklist : req.body.booklist
        })
        .then((transactions) => {
            res.status(200).json(transactions)
        })
        .catch((err) => {
            res.status(500).json({err:err})
        })
    }

    static update (req, res) {
        Transaction.replaceOne({_id : req.params.id},
            {
                member : req.body.member,
                in_data : req.body.in_data,
                out_date : req.body.out_date,
                due_date : req.body.due_date,
                fine : req.body.fine,
                booklist : req.body.booklist 
            })
        .then(() => {
            res.status(200).json(transactions)
        })
        .catch((err) => {
            res.status(500).json({err : err})
        })

    }

    static edit (req, res) {
        Transaction.findByIdAndUpdate(req.params.id, {
            $set : {
                member : req.body.member,
                in_data : req.body.in_data,
                out_date : req.body.out_date,
                due_date : req.body.due_date,
                fine : req.body.fine,
                booklist : req.body.booklist 
            }
        }, {multi:true,new:true})
        .then((transactions) => {
            if(transactions){
               res.status(200).json(transactions)
            } else {
                res.status(404).json({message : `Data not found`});
            }
        })
        .catch((err) => {
            res.status(500).json({message : err})
        })
    }

    static delete (req, res) {
        Transaction.findByIdAndRemove(req.params.id)
        .then((transactions) => {
            if(!transactions){
              res.status(404).json({message : `Id not found`});
            }
            res.send(`Deleted succesfully`);
        })
        .catch((err) => {
            res.status(500).json({err : err})
        })
    }

    static findByIdAndUpdate (req,res) {
        Transaction.findByIdAndUpdate()
    }
}

module.exports = TransactionController