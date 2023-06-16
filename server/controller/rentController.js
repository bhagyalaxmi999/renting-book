const Rent = require('../model/rentModel')
const User = require('../model/userModel')
const Book = require('../model/bookModel')

const rentController = {
    getAll: async (req,res) => {
        try {
            const data = await Rent.find({})
            res.status(200).json({ length: data.length, rents: data})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSingle: async (req,res) => {
        try {
            let id = req.params.id 
            const data = await Rent.findById({ _id: id })
                if(!data)
                    return res.status(404).json({ msg: `Rent id not found`})

            res.status(200).json({ rent: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    create: async (req,res) => {
        try {
            let extRent = await Rent.findOne({ bookId: req.body.bookId } && { userId: req.body.userId })
                if(extRent)
                    return res.status(400).json({ msg: `Already you have rented a book..`})

                // read book info
                    const book = await Book.findById({ _id: req.body.bookId })
                         if(!book) 
                            return res.status(404).json({ msg: `Book details not found`})
                // read user info
                    const user = await User.findById({ _id: req.body.userId })
                        if(!user)
                            return res.status(404).json({ msg: `User details not found`})

                    let newRent = {
                            ...req.body,
                            book,
                            user
                    }

            const data =  await Rent.create(newRent)
            
                return res.status(200).json({ msg: `Rent details added successfully`, rent: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req,res) => {
        try {
           let id = req.params.id 
            
           let extRent = await Rent.findById({ _id: id })
                if(!extRent) 
                    return res.status(404).json({ msg: `Requested Rent id not found`})

                if(extRent.bookId === req.body.bookId && extRent.userId === req.body.userId)
                    return res.status(400).json({ msg: `Already you have rented a book..`})

               
                await Rent.findByIdAndUpdate({ _id: id }, {
                    amount: req.body.amount,
                    returnDate: req.body.returnDate,
                    paymentStatus: req.body.paymentStatus
                })
                    return res.status(200).json({ msg: `Rent details Updated Successfully`})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try {
            let id = req.params.id 
            
           let extRent = await Rent.findById({ _id: id })
                if(!extRent) 
                    return res.status(404).json({ msg: `Requested Rent id not found`})
            
                await Rent.findByIdAndDelete({ _id: id })
                    return res.status(200).json({ msg: `Rent details deleted Successfully.`})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = rentController