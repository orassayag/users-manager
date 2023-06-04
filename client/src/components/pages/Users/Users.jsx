import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Pagination,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';
import UTextField from '../../common/UTextField/UTextField';
import USelect from '../../common/USelect/USelect';
import UserHelpers from '../../../models/user.helpers';
import useUsersHandlers from '../../../hooks/useUsersHandlers.hook';
import styles from './Users.module.scss';

const UsersContainer = styled(TableContainer)`
&& {
  background-color: #ffffff;
  .MuiTableCell-head, .MuiTableSortLabel-root {
    background-color: #000000;
    color: #ffffff;
  }
  .Mui-active .MuiTableSortLabel-icon {
    color: #ffffff;
  }
  .MuiTableRow-root:hover {
    background: #dedede;
}
}`;

const UsersPagination = styled(Pagination)`
&& {
  margin-top: 10px;
}`;

export default function Users() {
  const {
    PAGE_SIZE,
    columns,
    openModal,
    selectedRow,
    searchValue,
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
  } = useUsersHandlers();

  return (
    <>
      <div className={styles.button_container}>
        <Button
          className={styles.add_button}
          variant="contained"
          onClick={() => handleClickForm(null)}
        >
          Add Random User
        </Button>
        <UTextField
          name="search"
          label="Search"
          type="text"
          className={styles.search_box}
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <UsersContainer
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.id === 'thumbnail') {
                  return (
                    <TableCell
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((user) => (
              <TableRow
                className={styles.row}
                key={user.id}
                onClick={() => handleClickForm(user)}
              >
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Avatar alt={UserHelpers.getUserFullName(user)} src={user.thumbnail} />
                  </Stack>
                </TableCell>
                <TableCell>{UserHelpers.getUserFullName(user)}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </UsersContainer>
      <UsersPagination
        count={Math.ceil(filteredData.length / PAGE_SIZE) - 1}
        page={page}
        onChange={handlePageChange}
      />
      <Dialog
        open={openModal}
        onClose={handleCancelClick}
      >
        <DialogContent>
          <div className={styles.dialog_container}>
            <DialogTitle>{`${modeDisplay} ${UserHelpers.getUserFullName(formData)}`}</DialogTitle>
            <DialogContentText>Please review the details below:</DialogContentText>
            <div className={styles.picture_container}>
              <Avatar
                alt={UserHelpers.getUserFullName(formData)}
                src={formData.picture}
                sx={{ width: 200, height: 200 }}
              />
            </div>
          </div>
          <USelect
            label="Gender"
            name="gender"
            value={formData.gender}
            options={[{ key: 'Male', value: 'male' }, { key: 'Female', value: 'female' }]}
            onChange={handleChange}
          />
          <UTextField
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            error={errors.title}
            onChange={handleChange}
          />
          <UTextField
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={formData.firstName}
            error={errors.firstName}
            onChange={handleChange}
          />
          <UTextField
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={formData.lastName}
            error={errors.lastName}
            onChange={handleChange}
          />
          <UTextField
            name="age"
            label="Age"
            type="number"
            fullWidth
            value={formData.age}
            error={errors.age}
            onChange={handleChange}
          />
          <UTextField
            name="address"
            label="Address"
            type="string"
            fullWidth
            value={formData.address}
            error={errors.address}
            onChange={handleChange}
          />
          <UTextField
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
          />
          <UTextField
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={formData.phone}
            error={errors.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          {selectedRow?.mode === 'update'
            && (
              <Button
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            )}
          <Button
            onClick={handleSubmitForm}
          >
            {modeDisplay}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
