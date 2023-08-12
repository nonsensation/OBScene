import { writable, readable, get } from 'svelte/store'
import { sessionStore, localStore } from './PersistantStore'

export const scoreboard = localStore( 'scoreboard', {
    home : {
        score: 0,
        teamId: 0,
        name: "Wildfire Tigers",
        shortName: "WFT",
        textColor: "black",
        scoreColor: "black",
        primaryColor: "white",
        secondaryColor: "orangered",
        background: "",
    },
    guest : {
        score: 0,
        teamId: 1,
        name: "Stealth Strikers",
        shortName: "STS",
        textColor: "white",
        scoreColor: "white",
        primaryColor: "teal",
        secondaryColor: "darkmagenta",
        background: "",
    },
    period: "1. Drittel",
    special: "",
    time: {
        min: 13,
        sec: 37,
    }
} )
