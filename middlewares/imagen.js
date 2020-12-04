const multer  =require("multer")
const path=require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
      cb(null, path.join(__dirname, "..")+"/img")
    },
    filename: function (req, file, cb) {
        const arr=file.originalname.split(".")
        const extName=arr[arr.length-1]
        
        cb(null, req.params.id + "."+extName)
        
      
    }
  })
   
  var upload = multer({ storage })
  module.exports=upload