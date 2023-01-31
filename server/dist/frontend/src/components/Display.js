"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientCard_1 = __importDefault(require("./ClientCard"));
const ClientRow_1 = __importDefault(require("./ClientRow"));
const vsc_1 = require("react-icons/vsc");
function Display({ type, data, keyword, sortStyle }) {
    return (<>
        {data.clients.find((client) => client.name.toLowerCase().includes(keyword.trim().toLowerCase())) ?
            data.clients.
                filter((client) => {
                if (keyword.trim()) {
                    if (client.name.toLowerCase().includes(keyword.toLowerCase())) {
                        return client;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return client;
                }
            })
                .sort((a, b) => {
                switch (sortStyle) {
                    case "a-z": return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                    case "z-a": return (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0);
                    case "age": return parseInt(b.age) - parseInt(a.age);
                    default: return null;
                }
            })
                .map((client, arr) => (type === "list" ? <ClientRow_1.default key={client.id} client={client}/> : <ClientCard_1.default key={client.id} client={client}/>))
            : type === "list" ? <tr className=" h-40">
                <td className="w-full bg-slate-100 border absolute left-0 h-40 text-center flex flex-col justify-center items-center">
                    <vsc_1.VscSearchStop className="text-red-700" size={30}/>
                    <span>No User Found!</span>
                </td>
            </tr> :
                <div className="h-40">
                    <div className="w-full bg-slate-100 border absolute left-0  h-40 text-center flex flex-col justify-center items-center">
                        <vsc_1.VscSearchStop className="text-red-700" size={30}/>
                        <span>No User Found!</span>
                    </div>
                </div>}
    </>);
}
exports.default = Display;
