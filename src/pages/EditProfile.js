import React, { useState, useEffect } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useHistory } from 'react-router-dom'
import { useForm, useFieldArray } from "react-hook-form";
import ProfileForm from '../components/frontend/forms/ProfileForm'
import {db} from '../services/firebase'
import UpdateUserSkills from "../components/backend/UpdateUserSkills";

//That's the way uhhu uhhu i like it...

const EditProfile =  props => {
  const user = useUser()
  const history = useHistory()
  const skills = props.location.skills
  const {register, control, handleSubmit} = useForm({
    defaultValues: {
      skills:skills
    }
  });
  const { fields, append, remove} = useFieldArray(
    {
      control,
      id: "id",
      name: "skills"
    }
  );

  const onSubmit = (data) => {
    // NOT YET
    db
      .collection("users").doc(user.uid)
      .update(data)

    UpdateUserSkills(user.uid, skills, data.skills)

    history.push(`/users/${user.uid}`)
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileForm user={user} register={register} fields={fields} append={append} remove={remove} skills={skills} />
    </form>
  );
}

export default EditProfile