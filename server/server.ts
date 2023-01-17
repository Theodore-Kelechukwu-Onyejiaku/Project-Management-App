import http from "http";
import app from "./app";

const PORT = process.env.PORT || 5000;
app.set("port", PORT);

http.createServer(app).listen(PORT, ()=>{
    console.log("server running on PORT ", PORT)
})