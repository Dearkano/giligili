import { Try, Success, Failure } from './fp/Try'
import { FetchError, encodeParams, GET, POST } from './fetch'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './storage'
import { navigate } from './history';

export async function getAccessToken(){
  return getLocalStorage('access_token')
}

export async function logIn(username:string, password:string){
  const data = await POST(`login`,{params:{username,password}})
  setLocalStorage('access_token','login')
  return data
}
export async function logOut(){
  const data = await GET('logout')
  removeLocalStorage('access_token')
  navigate('/')
  return data
}
export function isLogIn() {
  return !!getLocalStorage('access_token')
}
