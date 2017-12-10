import React, { Component } from 'react'
import axios from 'axios'

import IconButton from 'material-ui/IconButton'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Icon from '../components/Icon'
import Colors from '../components/Colors'

const style = {
  container: {
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    color: Colors.ink.lighter
  },
  tableContainer: {
    width: '100%',
    maxWidth: 600,
    overflowX: 'scroll'
  }
}

class AdminUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.fetchUsers()
  }

  navigateBack = () => {
    setTimeout(() => {
      this.props.history.push('/admin')
    }, 300)
  }
  
  fetchUsers() {
    axios.get('/api/admin/users')
    .then(response => {
      this.setState({
        ...this.state,
        users: response.data.users
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    return (
      <div style={style.container}>
        <h2 style={style.header}>
          <IconButton onClick={this.navigateBack}>
            <Icon type='Back'/>
          </IconButton>
          Users - Admin
        </h2>
        <div style={style.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell numeric>XP</TableCell>
                <TableCell numeric>Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.users.map(c =>
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell numeric>{c.role}</TableCell>
                    <TableCell numeric>{c.xp}</TableCell>
                    <TableCell numeric>{c.rank}</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

export default AdminUsers
