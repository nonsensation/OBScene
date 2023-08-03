import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'

export const scoreHome = localStore( 'score_home', 0 )
export const scoreGuest = localStore( 'score_guest', 0 )


export const logoHome = localStore( 'logo_home' , '' )