import { ClientInterface } from "../assets/interfaces"
import ClientCard from "./ClientCard"
import ClientRow from "./ClientRow"

export default function Display({ type, data, keyword, sortStyle }: { data: any, type: string, keyword: string, sortStyle: string }) {
    return (<>
        {
            data.clients.
                filter((client: ClientInterface) => {
                    if (keyword.trim()) {
                        if (client.name.toLowerCase().includes(keyword.toLowerCase())) {
                            return client
                        }
                        else {
                            return null
                        }
                    } else {
                        return client
                    }

                })
                .sort((a: ClientInterface, b: ClientInterface) => {
                    switch (sortStyle) {
                        case "a-z": return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                            break;
                        case "z-a": return (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0);
                            break;
                        case "age": return parseInt(b.age) - parseInt(a.age);
                            break;
                    }
                })
                .map((client: ClientInterface) => (
                    type === "list" ? <ClientRow client={client} /> : <ClientCard client={client} />
                ))
        }
    </>)
}