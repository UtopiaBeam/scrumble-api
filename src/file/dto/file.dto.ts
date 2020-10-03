import { Field, ObjectType } from '@nestjs/graphql';

export class FileDTO {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

@ObjectType()
export class FileUrlDTO {
    @Field()
    contentType: string;

    @Field()
    signedUrl: string;
}
