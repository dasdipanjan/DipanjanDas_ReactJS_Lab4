import axios from "axios";
import { IUserCreateItem } from "../models/user";

const getAllUserItems = async () => {

    const response = await axios.get("http://localhost:4001/users")

    return response.data;
}

export { getAllUserItems }