const express = require('express');
var router = express.Router();
const XeMay = require('../models/XeMay');
const Uploads = require('../config/common/uploads');


router.get('/List', async (req, res) => {
    try {
        const data = await XeMay.find();
        res.json({
            "status": 200,
            "messenger": "Danh sách Category",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
});


//Map nãy dành cho add nhiều ảnh 
// Còn add 1 ảnh ko có map dùng cái này 

router.post('/add',Uploads.single('hinh_anh'), async (req,res) => {
    try{
        const data = req.body;
        const {file} = req;
        const newUser = new XeMay({
            ten_xe: data.ten_xe,
            mau_sac: data.mau_sac,
            gia_ban: data.gia_ban,
            mo_ta: data.mo_ta,
            hinh_anh: `${req.protocol}://${req.get("host")}/images/${file.filename}`
        });
        const result = await newUser.save();
        if(result){
            res.json({
                "status": 200,
                "msg":"Thêm thành công !!",
                "data": result
            });
        }else{
            res.json({
                "status":400,
                "msg":"Thêm không thành công !!",
                "data": []
            });
        }
    }catch(error){
        console.log(error);
    }
});

router.get('/search', async (req, res) => {
    try {
        const key = req.query.key
        const data = await XeMay.find({ ten_xe: { "$regex": key, "$options": "i" } })

        if (data) {
            res.json({
                "status": 200,
                "messenger": "Thành công",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi, không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/update/:id',Uploads.single('hinh_anh'), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body;
        const { files } = req;

        let url1 = `${req.protocol}://${req.get("host")}/images/${files.filename}`;
        const updatefruit = await XeMay.findById(id)
    
    

        let result = null;
        if (updatefruit) {
                updatefruit.ten_xe = data.ten_xe ?? updatefruit.ten_xe,
                updatefruit.mau_sac = data.mau_sac ?? updatefruit.mau_sac,
                updatefruit.gia_ban = data.gia_ban ?? updatefruit.gia_ban,
                updatefruit.mo_ta = data.mo_ta ?? updatefruit.mo_ta,
                updatefruit.hinh_anh = url1,
                result = await updatefruit.save();
        }
        if (result) {
            res.json({
                'status': 200,
                'messenger': 'Cập nhật thành công',
                'data': result
            })
        } else {
            res.json({
                'status': 400,
                'messenger': 'Cập nhật không thành công',
                'data': []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const result = await XeMay.findByIdAndDelete(id);
        if(result){
            res.json({
                "status": 200,
                "msg":"Thêm thành công !!",
                "data": await XeMay.find()
            })
        }else{
            res.json({
                "status":400,
                "msg":"Thêm không thành công !!",
                "data": []
            });
        }
    }catch(error){
        console.log(error);
    }
});




module.exports = router;