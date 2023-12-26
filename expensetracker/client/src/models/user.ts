interface IUserItem {
    username: string,
    password: string,
    fullName: string,
    id: number
}

export type IUserCreateItem = Omit<IUserItem, "id">

export default IUserItem;