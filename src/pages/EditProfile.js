import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { db } from '../services/firebase'

import ProfileForm from '../components/frontend/forms/ProfileForm'

//That's the way uhhu uhhu i like it...

const EditProfile = () => {
  const user = useUser()
  const history = useHistory()
  const {register, handleSubmit} = useForm()
  const onSubmit = (data) => {
    db
      .collection("users").doc(user.uid)
      .update(data)
    history.push(`/users/${user.uid}`)
  }

  return(
    <ProfileForm user={user} register={register} handleSubmit={handleSubmit(onSubmit)} />
  );
}

  
export default EditProfile