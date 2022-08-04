import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import './App.css';
import { CREATE_USER } from './mutation/user';

const App = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, {pollInterval: 500});
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  });
  const [newUser] = useMutation(CREATE_USER);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age
        }
      }
    }).then(({data}) => {
      setUsername('');
      setAge('');
    })
  }

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  }
  
  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <form>
        <input value={username} onClick={e => setUsername(e.target.value)} type='text' />
        <input value={age} onClick={e => setAge(e.target.value)} type='number' />
        <div className='btns'>
          <button onClick={addUser}>Создать</button>
          <button onClick={getAll}>Получить</button>
        </div>
      </form>
      <div>
        {users.map((user) => {
          <div className='user'>
            {user.id} {user.username} {user.age}
          </div>;
        })}
      </div>
    </div>
  );
};

export default App;
