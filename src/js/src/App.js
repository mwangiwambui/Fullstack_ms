import { Component } from 'react';
import Container from './container';
import Footer from './Footer';
import './App.css';
import { getAllStudents } from './client';
import AddStudentForm from './forms/AddStudentForm'
import {
  Table,
  Avatar,
  Spin,
  Modal
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const getIndicateIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    students: [],
    isAddStudentModalVisible: false,
    isFetching: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  openisAddStudentModalVisible = () => this.setState({isAddStudentModalVisible: true})

  closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})

  fetchStudents = () => {
    this.setState({
      isFetching: true
    })
    getAllStudents()
      .then(res => res.json()
        .then(students => {
          console.log(students)
          this.setState({
            students,
            isFetching: false
          });
        }));

  }

  render() {

    const { students, isFetching } = this.state;
    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicateIcon()}></Spin>

        </Container>
      )
    }
    if (students && students.length) {

      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.firstName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastname',
          key: 'lastname'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        },
      ];

      return (
        <Container>
          <Table
            dataSource={students}
            columns={columns}
            rowKey='studentId' 
            pagination={false} />
            <Modal
              title = 'Add new student'
              visible = {this.state.isAddStudentModalVisible}
              onOk = {this.closeAddStudentModal}
              onCancel = {this.closeAddStudentModal}
              width = {1000}>
            
                <AddStudentForm></AddStudentForm>
            </Modal>
            <Footer numberOfStudents = {students.length}
            handleAddStudentCLickEvent = {this.openisAddStudentModalVisible}></Footer>
        </Container>
      );
    }
    return <h1>No Students</h1>

  }
}

export default App;
