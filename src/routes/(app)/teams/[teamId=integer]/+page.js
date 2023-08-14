import { db } from "$lib/database/dexie-db"


export async function load( { params } )
{
    const teamId = Number( params.teamId )
    const team = await db.teams.get( { id: teamId } )

    return {
        team
    }
}