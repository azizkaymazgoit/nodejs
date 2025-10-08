import Joi from 'joi';

export const ogenciEkleSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(6).max(16).required().messages({
    'number.min': "Yaş 6'dan küçük olamaz",
    'number.max': "Yaş 16'dan büyük olamaz",
    'number.integer': 'Yaş tam sayı olmak zorunda',
    'number.base': 'Yaş sayı olmak zorunda',
    'any.required': 'Yaş girmek zorundasınız',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'male, female veya other değerleri olmak zorunda',
  }),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean().required(),
  parentId: Joi.string().required(),
});

export const ogrenciGuncelleSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  age: Joi.number().integer().min(6).max(16).messages({
    'number.min': "Yaş 6'dan küçük olamaz",
    'number.max': "Yaş 16'dan büyük olamaz",
    'number.integer': 'Yaş tam sayı olmak zorunda',
    'number.base': 'Yaş sayı olmak zorunda',
    'any.required': 'Yaş girmek zorundasınız',
  }),
  gender: Joi.string().valid('male', 'female', 'other').messages({
    'any.only': 'male, female veya other değerleri olmak zorunda',
  }),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});

/* const ogrenciData = {
  name: 'Aziz',
  age: 13,
  gender: 'insan',
  avgMark: 4,
  onDuty: true,
};

const veriDogrula = ogenciEkleSchema.validate(ogrenciData, {
  abortEarly: false,
});

console.log('error::::: ', veriDogrula.error);
console.log('value::::: ', veriDogrula.value);
console.log('warning::::: ', veriDogrula.warning); */
