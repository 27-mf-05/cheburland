export const API_BASE_URL = 'http://localhost:3000/api/v2'
export const OAUTH_REDIRECT_URL = 'http://cheburland.ya-praktikum.tech'
export const OAUTH_BASE_URL = 'https://oauth.yandex.ru/authorize'

export const RESOURCES_URL = `${API_BASE_URL}/resources`

export const USER_PATH = 'user'
export const USER_SEARCH_PATH = `${USER_PATH}/search`
export const USER_PASSWORD_PATH = `${USER_PATH}/password`

export const USER_PROFILE_PATH = `${USER_PATH}/profile`
export const USER_AVATAR_PATH = `${USER_PROFILE_PATH}/avatar`

export const AUTH_PATH = 'auth'
export const AUTH_SIGNIN_PATH = `${AUTH_PATH}/signin`
export const AUTH_SIGNUP_PATH = `${AUTH_PATH}/signup`
export const AUTH_USER_PATH = `${AUTH_PATH}/user`
export const AUTH_LOGOUT_PATH = `${AUTH_PATH}/logout`

export const OAUTH_PATH = 'oauth'
export const OAUTH_SERVICE_ID_PATH = `${OAUTH_PATH}/yandex/service-id`
export const OAUTH_SIGNIN_PATH = `${OAUTH_PATH}/yandex`

export const LEADERBOARD_PATH = 'leaderboard'
export const LEADERBOARD_ALL_PATH = `${LEADERBOARD_PATH}/all`
