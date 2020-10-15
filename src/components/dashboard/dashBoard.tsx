import React, {useState} from 'react';
import GravityDashBoard  from './gravityDashboard'
import HospitalDashBoard  from './hospitalDashboard'

// INTERFACE
interface State {
  roleName: string | null
}

const DashBoard = () => {
  let [values, setValues] = useState<State>({
    roleName: localStorage.getItem('user_type')
  });

  let dashboarName: any = null
  if(values.roleName === 'GA'){
    dashboarName = <GravityDashBoard/>
  } else if(values.roleName === 'OA'){
    dashboarName = <HospitalDashBoard/>
  }

  return (
    <div>
      Dashboard
      {dashboarName}
    </div>
  )
  
}

export default DashBoard;