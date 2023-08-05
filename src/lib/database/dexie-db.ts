
import Dexie, { type Table } from 'dexie'

export interface Team
{
    id?: number
    name: string
    logo: Blob
}

export class TeamTable extends Dexie
{
    teams!: Table<Team>

    constructor ()
    {
        super( 'test_db1' )

        this.version( 1 ).stores( {
            teams: '++id, name' // Primary key and indexed props
        } )
    }
}

export function arrayBufferToBlob( buffer, type )
{
    return new Blob( [ buffer ], { type: type } )
}

export function blobToArrayBuffer( blob )
{
    return new Promise( ( resolve, reject ) =>
    {
        const reader = new FileReader()
        reader.addEventListener( 'loadend', () =>
        {
            resolve( reader.result )
        } )
        reader.addEventListener( 'error', reject )
        reader.readAsArrayBuffer( blob )
    } )
}

export const db = new TeamTable()
