import React, { Fragment,useState,useEffect } from 'react';

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("")

    async function getName() {
        try {
            const response = await fetch('http://localhost:27017/dashboard', {
                method: 'GET',
                headers: { token: localStorage.token}
            })
            const parseRes = await response.json()
            let resultName = parseRes?.name
            let result = resultName.charAt(0).toUpperCase() + resultName.slice(1);
            setName(result)
        } catch (error) {
            console.error(error.message)
        }
    }
    const logout = (e) => {
        try {
            e.preventDefault()
            localStorage.removeItem('token');
            setAuth(false);
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        getName();
    }, [])
    

  return (
    <Fragment>
      <h1>Dashboard, {name}</h1>
      <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
    </Fragment>
  )
}

export default Dashboard

