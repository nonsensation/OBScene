import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'


export const currentTeamId = localStore( 'currentTeamId', 0 )
