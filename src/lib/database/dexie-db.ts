
import Dexie, { type Table } from 'dexie'
import { z } from "zod"

export const teamSchema = z.object( {
    name: z.string( { required_error: "Bitte einen Namen angeben" } )
        .min( 1, { message: "Name muss mindestens 1 Buchstaben haben" } )
        .max( 32, { message: "Name kann nur 32 Zeichen lang sein" } )
        .trim(),
    shortName: z.string( { required_error: "Bitte einen Namenskürzel angeben" } )
        .min( 1, { message: "Namenskürzel muss mindestens 1 Buchstaben haben" } )
        .max( 5, { message: "Namenskürzel kann nur 5 Zeichen lang sein" } )
        .trim(),
    logo: z.instanceof( Blob, { message: "Bitte ein Logo hochladen" } )
        .superRefine( ( val, ctx ) =>
        {
            if( val )
            {
                if( val.size > 1024 * 1024 * 5 * 8 ) // 5MB
                {
                    ctx.addIssue( {
                        code: z.ZodIssueCode.custom,
                        message: "Logo muss kleiner als 5MB sein",
                    } )
                }
                else if( !val.type.startsWith( "image" ) )
                {
                    ctx.addIssue( {
                        code: z.ZodIssueCode.custom,
                        message: "Das scheint kein Bild zu sein?",
                    } )
                }
            }
        } )
    ,
} )

export type TeamSchema = z.infer<typeof teamSchema>

export interface TeamModel extends TeamSchema, Model { }



export interface Model
{
    id?: number
}

export class Database extends Dexie
{
    teams!: Table<TeamModel>

    constructor ()
    {
        super( 'test_db1' )

        this.version( 1 ).stores( {
            teams: '++id, name' // Primary key and indexed props
        } )
    }
}

export const db = new Database()

export async function createEntry( model: Model, schema, db: Table<Model> )
{
    const validationResult = await schema.safeParse( model )

    if( !validationResult.success )
    {
        const errors = validationResult.error.flatten().fieldErrors

        console.error( "Errors: " + JSON.stringify( errors ) )

        return {
            success: false,
            model: model,
            errors: errors,
        }
    }

    try
    {
        const id = await db.add( model )

        console.info( `Entry successfully added. Got ID #${ id }` )
    } catch( dbError )
    {
        console.error( `Failed to add entry: ${ dbError }` )

        return {
            success: false,
            model: model,
            errors: [ dbError ],
        }
    }

    return {
        success: true,
        model: model,
        errors: null,
    }
}