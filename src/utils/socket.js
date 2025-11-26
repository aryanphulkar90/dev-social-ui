import io from "socket.io-client"
import { baseURL } from "./constansts"

export const createSocketConnection = () => {
    return io(baseURL)
}