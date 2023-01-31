export interface ClientInterface {
    id: string,
    name: string,
    email: string,
    phone: string,
    gender: String,
    picture: string,
    street: string,
    country: string,
    age: string
}
enum Status {
    notStarted,
    inProgress,
    completed
}

export interface ProjectInterface {
    id: string,
    description : string,
    name: string,
    status: Status
    client : ClientInterface
}

export interface ProjectI {
    name: string,
    description: string,
    client?: string | undefined,
    status?: string
}