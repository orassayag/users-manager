import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  object,
  string,
  number,
} from 'yup';
import UserHelpers from '../models/user.helpers';
import userModel from '../models/user.model';

const columns = [
  { id: 'thumbnail', label: 'Thumbnail' },
  { id: 'firstName', label: 'Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'country', label: 'Country' },
  { id: 'phone', label: 'Phone number' },
  { id: 'email', label: 'Email' },
];

const userSchema = object().shape({
  gender: string().required('Gender is required'),
  title: string().required('Title is required'),
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  age: number().typeError('Invalid age').required('Age is required'),
  address: string().required('Address is required'),
  email: string().email('Invalid email address').required('Email is required'),
  phone: string().required('Phone is required'),
});

const validateForm = async (values) => {
  const validationErrors = {};
  try {
    await userSchema.validate(values, { abortEarly: false });
  } catch (err) {
    err.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });
  }
  return {
    isValid: !Object.keys(validationErrors).length,
    validationErrors,
  };
};

const PAGE_SIZE = 10;
const baseUrl = 'http://localhost:8081/api/users';

const useHandlers = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [formData, setFormData] = useState(userModel);
  const [orderBy, setOrderBy] = useState('firstName');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState({});

  // Load a bulk of users form the server.
  const loadUsers = async (size) => {
    const response = await axios.get(`${baseUrl}?pageNumber=${page}&pageSize=${size}&sortBy=firstName&sortOrder=asc`);
    return response.data.map((user) => UserHelpers.setUser(user));
  };

  // Load a random user from the server.
  const loadRandomUser = async () => {
    const response = await axios.get(`${baseUrl}/create-random`);
    return UserHelpers.setUser(response.data);
  };

  // Fetch the users once the page loaded.
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await loadUsers(100);
      setData(users);
    };
    fetchUsers();
  }, []);

  // Reset the form in the dialog.
  const resetForm = () => {
    setFormData(userModel);
    setErrors({});
  };

  // Sort the users data.
  const sortTable = (array, comparator) => {
    const sortArray = array.map((el, index) => [el, index]);
    sortArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (!order) {
        return a[1] - b[1];
      }
      return order;
    });
    return sortArray.map((el) => el[0]);
  };

  // The comparer of the sort.
  const compareOrder = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  // Define what kind of sort to perform depending on the desired field to sort.
  const comparatorFormat = (order, orderBy) => (order === 'desc'
    ? (a, b) => compareOrder(a, b, orderBy)
    : (a, b) => -compareOrder(a, b, orderBy));

  // The sorted users to display.
  const filteredData = searchValue ? data
    .filter((user) => user.firstName.toLowerCase().includes(searchValue)
      || user.lastName.toLowerCase().includes(searchValue)) : data;
  const sortedData = sortTable(filteredData, comparatorFormat(order, orderBy))
    .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const modeDisplay = formData.mode ? formData.mode[0].toUpperCase() + formData.mode.slice(1).toLowerCase() : '';

  // Handle the sorting of the data to display once the user clicks on one of the headers.
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle the click on the row / Add random user button click.
  const handleClickForm = async (row) => {
    let rowData = row;
    if (rowData) {
      rowData.mode = 'update';
    } else {
      rowData = await loadRandomUser();
      rowData.mode = 'add';
    }
    setSelectedRow(rowData);
    setFormData(rowData);
    setOpenModal(true);
  };

  // Handle the cancel click on the dialog.
  const handleCancelClick = () => {
    setOpenModal(false);
    setTimeout(() => {
      setSelectedRow(null);
      resetForm();
    }, 500);
  };

  // Handle the add / update click on the dialog.
  const handleSubmitForm = async () => {
    const { isValid, validationErrors } = await validateForm(formData);
    if (isValid) {
      try {
        const updatedUser = UserHelpers.clearUser(formData);
        if (formData.mode === 'add') {
          const user = await axios.post(baseUrl, updatedUser);
          setData([...data, { ...formData, id: user.data.id }]);
        } else {
          await axios.put(`${baseUrl}/${selectedRow.id}`, updatedUser);
          const updatedData = data.map((d) => (d.id === selectedRow.id ? formData : d));
          setData(updatedData);
        }
      } catch (e) {
        console.log(e);
      }
      handleCancelClick();
    }
    setErrors(validationErrors);
  };

  // Handle the delete click on the dialog.
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${baseUrl}/${selectedRow.id}`);
      setData(data.filter((d) => d.id !== selectedRow.id));
      handleCancelClick();
    } catch (e) {
      console.log(e);
    }
  };

  // Handle any change in the form on the dialog.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the search.
  const handleSearch = (e) => {
    if (e.target.value) {
      setPage(0);
    }
    setSearchValue(e.target.value.toLowerCase());
  };

  // Handle the pager number click.
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  return {
    PAGE_SIZE,
    columns,
    openModal,
    selectedRow,
    formData,
    orderBy,
    order,
    page,
    errors,
    filteredData,
    sortedData,
    modeDisplay,
    handleRequestSort,
    handleClickForm,
    handleCancelClick,
    handleSubmitForm,
    handleDeleteClick,
    handleChange,
    handleSearch,
    handlePageChange,
  };
};

export default useHandlers;
