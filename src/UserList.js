import React, { useState } from 'react';
// import './userlist.css'
import { Table, Button, Dropdown, DropdownButton, Modal, Form } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, nickname: "Ram", age: 35, gender: "Male", phone: "1234567890", email: "ram@gamil.com" },
    { id: 2, nickname: "sita", age: 30, gender: "Female", phone: "9876543210", email: "sita@gamil.com" }
  ]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [newUserData, setNewUserData] = useState({
    nickname: "",
    age: "",
    gender: "",
    phone: "",
    email: ""
  });

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdatedUserData({}); 
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUser(null);
    setUpdatedUserData({});
  };

  const handleDelete = (id) => {
    setSelectedUser(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser));
    setShowDeleteConfirmation(false);
    setSelectedUser(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
    setNewUserData({
      nickname: "",
      age: "",
      gender: "",
      phone: "",
      email: ""
    });
  };

  const handleAddUserSubmit = () => {
    const newUser = {
      id: users.length + 1,
      ...newUserData
    };
    setUsers([...users, newUser]);
    handleCloseAddUserModal();
  };

  const handleUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUserData = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNewUserDataChange = (e) => {
    const { name, value } = e.target;
    setNewUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveUpdate = () => {
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return { ...user, ...updatedUserData };
      }
      return user;
    });
    setUsers(updatedUsers);
    handleCloseUpdateModal();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAddUser}>Add User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>Avatar</th>
            <th>Nickname</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><input type="checkbox" /></td>
              <td>Avatar</td>
              <td>{user.nickname}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Options">
                  <Dropdown.Item onClick={() => handleUpdate(user)}>Update User</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(user.id)}>Delete User</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleUserDetails(user)}>User Details</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control type="text" name="nickname" value={updatedUserData.nickname || ''} onChange={handleUpdateUserData} />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={updatedUserData.age || ''} onChange={handleUpdateUserData} />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" value={updatedUserData.gender || ''} onChange={handleUpdateUserData}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={updatedUserData.phone || ''} onChange={handleUpdateUserData} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={updatedUserData.email || ''} onChange={handleUpdateUserData} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUserDetailsModal} onHide={handleCloseUserDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>Nickname: {selectedUser.nickname}</p>
              <p>Age: {selectedUser.age}</p>
              <p>Gender: {selectedUser.gender}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Email: {selectedUser.email}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddUserModal} onHide={handleCloseAddUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control type="text" name="nickname" value={newUserData.nickname} onChange={handleNewUserDataChange} />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={newUserData.age} onChange={handleNewUserDataChange} />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" value={newUserData.gender} onChange={handleNewUserDataChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={newUserData.phone} onChange={handleNewUserDataChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={newUserData.email} onChange={handleNewUserDataChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddUserModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUserSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
