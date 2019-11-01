export const SET_AUTHEDUSER = 'SET_AUTHEDUSER';

const user = 'testUser'

export default function setAuthedUser() {
    return {
        type: SET_AUTHEDUSER,
        user
    }
}
