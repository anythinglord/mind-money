import { config } from '../config'

const url = config.API_URL

export const getUsers = async () => {
    return fetch(`${url}/users/`)
        .then(async (res) => await res.json())
}