import express from "express"
import { dbConnection } from "./db/dbConnection.js"
import { userRoutes } from "./src/modules/user/user.routes.js"
import { productRoutes } from "./src/modules/products/products.routes.js"
import { orderRoutes } from "./src/modules/order/order.routes.js"
import { cartRoutes } from "./src/modules/cart/cart.routes.js"



const app = express()

dbConnection

app.use(userRoutes)
app.use(productRoutes)
app.use(orderRoutes)
app.use(cartRoutes)


 app.get("/",(req,res)=>{ 
    res.json({message:"Done"})
 })
app.listen(3000, ()=>{
    console.log("server running"); 
})