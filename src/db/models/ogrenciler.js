import { Schema, model } from 'mongoose';

const ogrenciSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Ogrenciler = model('ogrenciler', ogrenciSchema, 'ogrenciler');

export default Ogrenciler;
