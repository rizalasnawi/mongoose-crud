const Member = require('../model/member');

class MemberController {

    static read (req, res) {
        Member.find({})
        .then((members) => {
            res.status(200).json(members)
        })
        .catch((err) => {
            res.status(500).json({err : err})
        })
    }

    static readOne (req, res) {
        Member.findById(req.params.id)
        .then((members) => {
            if(!members){
               res.status(404).send({message : `Member not found`});
            }
            res.send(members)
        })
        .catch((err) => {
            if(err.kind == 'ObjectId'){
              res.status(404).send({message : `Member not found`});
            }
            res.status(500).send({message : `Error while retrievieng new data`});
        })
    }

    static create (req, res) {
        Member.create({
            name : req.body.name,
            address : req.body.address,
            zipcode : req.body.zipcode,
            email : req.body.email,
            phone : req.body.phone
        })
        .then((members) => {
            res.status(200).json(members)
        })
        .catch((err) => {
            res.status(500).json({err:err})
        })
    }

    static update (req, res) {
        Member.replaceOne({id : req.params.id}, 
        {
            name : req.body.name,
            address : req.body.address,
            zipcode : req.body.zipcode,
            email : req.body.email,
            phone : req.body.phone
        })
        .then((members) => {
            res.status(200).json(members);

        })
        .catch((err) => {
            res.status(500).json({err : err});
        })

    }

    static edit (req, res) {
        Member.findByIdAndUpdate(req.params.id, {
            $set : {
                name : req.body.name,
                address : req.body.address,
                zipcode : req.body.zipcode,
                email : req.body.email,
                phone : req.body.phone 
            }
        }, {multi:true,new:true})
        .then((members) => {
            if(!members){
               res.status(404).json({message : `Data not found`});
            } 
            res.status(200).json(members);
        })
        .catch((err) => {
            res.status(500).json({message : err});
        })
    }

    static delete (req, res) {
        Member.findByIdAndRemove(req.params.id)
        .then((members) => {
            if(!members){
              res.status(404).json({message : `Id not found`});
            }
            res.send(`Deleted succesfully`);
        })
        .catch((err) => {
            res.status(500).json({err : err})
        })
    }
    
}

module.exports = MemberController