import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'

export const scoreboard = localStore( 'scoreboard', {
    "HOME" : {
        score: 0,
        name: "Wildfire Tigers",
        shortName: "WFT",
        textColor: "black",
        scoreColor: "black",
        primaryColor: "white",
        secondaryColor: "orangered",
        background: "",
    },
    "GUEST" : {
        score: 0,
        name: "Stealth Strikers",
        shortName: "SSs",
        textColor: "white",
        scoreColor: "white",
        primaryColor: "teal",
        secondaryColor: "darkmagenta",
        background: "",
    }
} )
