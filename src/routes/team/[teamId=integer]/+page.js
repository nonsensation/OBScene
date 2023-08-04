// TODO: load from indexedDB
export async function load( { params } )
{
    return {
        team: {
            Id: params.teamId
        }
    }
}