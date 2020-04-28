import React, { useState } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useHistory } from 'react-router-dom'
import { useForm, useFieldArray } from "react-hook-form";
import ProfileForm from '../components/frontend/forms/ProfileForm'

//That's the way uhhu uhhu i like it...

const EditProfile = () => {
  const user = useUser()
  const history = useHistory()
  const {register, control, handleSubmit} = useForm()
  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "skills"
    }
  );

  console.log()
  const onSubmit = (data) => {
    // NOT YET
    // db
    //   .collection("users").doc(user.uid)
    //   .update(data)
    console.log(data)
    history.push(`/users/${user.uid}`)
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileForm user={user} register={register} fields={fields} append={append} remove={remove} />
      <input type="submit" />
    </form>
  );
}

  
export default EditProfile