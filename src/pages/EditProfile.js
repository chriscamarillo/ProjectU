import React, { useState, useEffect } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useHistory } from 'react-router-dom'
import { useForm, useFieldArray } from "react-hook-form";
import ProfileForm from '../components/frontend/forms/ProfileForm'
import { UpdateUserSkills, GetUserSkills } from "../components/backend/UpdateUserSkills";

//That's the way uhhu uhhu i like it...

const EditProfile =  () => {
  const user = useUser()
  const history = useHistory()
  let skills = [{skill:"false", id:"async"}]
  skills = GetUserSkills(user.uid)
  console.log(skills)
  //let sheit = skills[0]
  const {register, control, handleSubmit, reset} = useForm({
    defaultValues: {
      poop: [{ skill: "Bill", id: "Lua" },
      { skill: "caca", id: "pipi" },
      { skill: "poo", id: "ca" }, GetUserSkills(user.uid)]
    }
  });
  const { fields, append, remove} = useFieldArray(
    {
      control,
      name: "poop",
    }
  );

  console.log(fields)

  const onSubmit = (data) => {
    // NOT YET
    // db
    //   .collection("users").doc(user.uid)
    //   .update(data)
    let sk = data.skills.map((s, i) => (s.skill))
    UpdateUserSkills(user.uid, sk)

    history.push(`/users/${user.uid}`)
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileForm user={user} register={register} fields={fields} append={append} remove={remove} skills={skills} />
    </form>
  );
}

  
export default EditProfile