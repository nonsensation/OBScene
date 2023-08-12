import { z } from "zod"

export const TeamSchema = z.object( {
    Name: z.string( { required_error: "Bitte einen Namen angeben" } )
        .min( 1, { message: "Name muss mindestens 1 Buchstaben haben" } )
        .max( 32, { message: "Name kann nur 32 Zeichen lang sein" } )
        .trim(),
    ShortName: z.string( { required_error: "Bitte einen Namenskürzel angeben" } )
        .min( 1, { message: "Namenskürzel muss mindestens 1 Buchstaben haben" } )
        .max( 5, { message: "Namenskürzel kann nur 5 Zeichen lang sein" } )
        .trim(),
    Logo: z.instanceof( Blob )
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
