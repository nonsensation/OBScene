
import { Dexie } from 'dexie'
import { IDBExportImport } from 'indexeddb-export-import'


const db = new Dexie( 'MyDB' )

db.version( 1 ).stores( {
    things: 'id++, thing_name, thing_description',
} )

db.open().then( function ()
{
    const idbDatabase = db.backendDB()

    IDBExportImport.exportToJsonString( idbDatabase, function ( err, jsonString )
    {
        if( err )
        {
            console.error( err )
        }
        else
        {
            console.log( 'Exported as JSON: ' + jsonString )

            IDBExportImport.clearDatabase( idbDatabase, function ( err )
            {
                if( !err )
                {
                    IDBExportImport.importFromJsonString( idbDatabase, jsonString, function ( err )
                    {
                        if( !err )
                        {
                            console.log( 'Imported data successfully' )
                        }
                    } )
                }
            } )
        }
    } )
} ).catch( function ( e )
{
    console.error( 'Could not connect. ' + e )
} )