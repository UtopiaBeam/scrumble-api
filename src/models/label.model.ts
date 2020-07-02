import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Label extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
