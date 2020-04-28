import React, { useState } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { db } from '../services/firebase'
import ProfileForm from '../components/frontend/forms/ProfileForm'
import SkillsForm from '../components/frontend/forms/SkillsForm'

//That's the way uhhu uhhu i like it...

const EditProfile = () => {
  const user = useUser()
  const history = useHistory()
  const [skills, setSkills] = useState(['some', 'stuff', 'from', 'db'])
  const {register, handleSubmit} = useForm()

  const onSubmit = (data) => {
    // db
    //   .collection("users").doc(user.uid)
    //   .update(data)
    console.log(data, ' ', skills)
    history.push(`/users/${user.uid}`)
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileForm user={user} register={register}  />
      <SkillsForm user={user} skills={skills} 
        setSkills={setSkills} />
      <input type="submit" />
    </form>
  );
}

  
export default EditProfile