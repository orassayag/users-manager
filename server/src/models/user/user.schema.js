import CustomError from '../../custom/error.custom.js';

// Simulate schema from the database.

const DataTypes = {
  INTEGER: 'INTEGER',
  STRING: 'STRING',
};

export default class UserSchema {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  static user = {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
      fieldPath: 'id.value',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title',
      fieldPath: 'name.title',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'firstName',
      fieldPath: 'name.first',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'lastName',
      fieldPath: 'name.last',
    },
    streetName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'streetName',
      fieldPath: 'location.street.name',
    },
    streetNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'streetNumber',
      fieldPath: 'location.street.number',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'city',
      fieldPath: 'location.city',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'state',
      fieldPath: 'location.state',
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'country',
      fieldPath: 'location.country',
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'age',
      fieldPath: 'dob.age',
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'gender',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'phone',
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'picture',
      fieldPath: 'picture.large',
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'thumbnail',
      fieldPath: 'picture.thumbnail',
    },
  };

  static userFields = Object.values(this.user)
    .map(({ field, fieldPath }) => ({ field, fieldPath }));

  static userFieldsValidation = Object.keys(this.user);

}
