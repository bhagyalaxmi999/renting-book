const Book = require('../model/bookModel')

const bookCtrl={

    getAll: async (req, res) => {
        try{
            // res.json({msg: 'get all called'})
             const data = await Book.find({})
            return res.status(200).json({ length: data.length, books: data})
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    getSingle: async (req, res) => {
        try{
            // res.json({msg: 'get single called'})
            let id = req.params.id
            const data = await Book.findById({_id: id })
            return res.status(200).json({ book: data })
           
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },

    create: async (req, res) => {
        try{
            // res.json({msg: ' create called'})
             if(!req.body.isbn)
               return res.status(404).json({ msg: `isbn NUMBER IS REQUIRED `})
             
            let extBook = await Book.findOne({ isbn: res.body.isbn })
               if(extBook)
                  return res.status(400).json({ msg: `ISBN code already allocated..`})
            let newItem = await Book.create(req.body)
             return res.status(200).json({ msg: "New Book added successfully", book: newItem})         
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },

    update: async (req, res) => {
        try{
            // res.json({msg: ' update called'})
            let id = req.params.id
            let extBook  = await Book.findById({ _id: req.params.id })

               if(!extBook)
                   return res.status(404).json({msg: `Requested book id not found..`})

              await Book.findByIdAndUpdate({ _id: id}, req.body) 
              
              return res.status(200).json({ msg: "Book updated successfully"})
              
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },

    delete: async (req, res) => {
        try{
            // res.json({msg: ' delete called'})
            let id = req.params.id
            let extBook = await Book.findById({ _id:req.params.id})
               if(!extBook)
                   return res.status(404).json({msg: `Requested book id not found..`})

              await Book.findByIdAndDelete({ _id: id}) 
              
              return res.status(200).json({ msg: "Book delete successfully"})
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    }
}

module.exports = bookCtrl