const express=require('express')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()
//const dotenv =require('dotenv')
const multer = require('multer');
//dotenv.config()
const app=express()
app.use(express.json());
//新增用户
app.post("/user", (req, res) => {
  //获取post传递的数据
  let obj = req.body;
  async function insert() {
    const user = await prisma.user.create({
      data:obj,
    })
    res.send({code:200, msg: 'insert success'})
  }
  insert().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
})

//查询用户
app.post("/userquery", (req, res) => {
  const { email, password } = req.body
  async function query() {
    const  user= await prisma.user.findFirst({
      where:{
        email:email,
        password:password
     }
    });
    if(user!==null){
      res.send({code:200,data:user})
    }else{
      res.send({code:404})
    }
    
  }
  
  query().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  
})


//添加酒
app.post("/goods/add",(req,res)=>{
  //获取post传递的数据
  let obj = req.body;
  obj.countInStock=+obj.countInStock;
  async function insert() {
    const goods = await prisma.goods.create({
      data:obj,
    })
    res.send({code:200, msg: 'insert success'})
  }
  
  insert().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
})
//删除酒
app.delete('/goods/:id',(req,res)=>{
  //获取路由传参的数据
  let obj=req.params;
  async function del() {
    const goods = await prisma.goods.delete({
      where:{
        id:+obj.id
     }
    });
    res.send({code:200,msg:'delete success'})
  }
  del().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
})
//修改酒
app.put("/goods", (req, res) => {
  let obj = req.body;
  async function update() {
    const goods = await prisma.goods.update({
      where:{
        id:+obj.id
    },
    data:obj
    })
    res.send({code:200, msg: 'update success'})
  }
  
  update().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
})
//上传图片
app.use(express.static(__dirname+'/upload'));
const storage = multer.diskStorage({
  destination(req,res,cb){
    cb(null,'upload/');
  },
  filename(req,file,cb){
    const filenameArr = file.originalname.split('.');
    cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
});
const upload = multer({storage});

app.post('/upload/img',upload.single('file'),(req,res)=>{
  res.send({code:200,filename:req.file.filename});
});

app.get('/upload/:url', function (req, res) {
  res.sendFile( __dirname + "/upload/" +req.params.url);
});


//获取所有商品
app.get('/api/products',(req,res)=>{
async function query() {
  const goods = await prisma.goods.findMany()
  res.send(goods)
}

query().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

})



//添加商品到购物车
app.post('/api/carts',(req,res)=>{
    let obj = req.body;
    async function insert() {
      const cartlist = await prisma.cartlist.create({
        data: {
          name:obj.name,
          price:obj.price,
          num:obj.num,
          u_email:obj.u_email,
          goods_id:obj.goods_id+''
        },
      })
      res.send({code:200, msg: 'insert success'})
    }
    
    insert().then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })

});

//根据用户名获取购物车信息
app.get('/api/carts/:u_email',(req,res)=>{

  async function query() {
    const cartlist = await prisma.cartlist.findMany({
      where:{
        u_email:req.params.u_email
     }
    });
    res.send(cartlist)
  }
  
  query().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

})

//获取单个商品
app.get('/api/products/:id',(req,res)=>{
  async function query() {
    const goods = await prisma.goods.findUnique({
      where:{
        id:+req.params.id
     }
    });
    res.send(goods)
  }
  
  query().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
})

//删除购物车商品
app.delete('/api/carts/:id',(req,res)=>{
         //获取路由传参的数据
  let obj=req.params;

  async function del() {
    const cartlist = await prisma.cartlist.delete({
      where:{
        id:+obj.id
     }
    });
    res.send({code:200,msg:'delete success'})
  }
  del().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
})

//添加订单
app.post("/api/orders/add",(req,res)=>{
  //获取post传递的数据
  let obj = req.body;
  async function insert() {
    const orders = await prisma.orders.create({
      data: obj,
    })
    res.send({code:200, msg: 'insert success'})
  }
  
  insert().then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
})

const PORT=5000;
app.listen(PORT,console.log(`服务器在${PORT}端口号运行`))