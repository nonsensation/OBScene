import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'

const team = {
    score: 0,
    name: 'FC Team Banana',
    shortName: 'TEAM',
    primaryColor: 'white',
    secondaryColor: 'red',
    textColor: 'black',
    scoreColor: 'black',
}

export const teamHome = localStore( 'team_home', team )
export const teamGuest = localStore( 'team_guest', team )