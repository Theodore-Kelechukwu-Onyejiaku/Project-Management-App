"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
app_1.default.set("port", PORT);
http_1.default.createServer(app_1.default).listen(PORT, () => {
    console.log("server running on PORT ", PORT);
});
