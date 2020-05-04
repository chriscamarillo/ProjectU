import React from 'react'
import '../../../styles/EditProfile.css'
import { useForm } from "react-hook-form";
import { db } from '../../../services/firebase'
import { AddNotification } from '../../backend/Notify'

const ThreadForm = (props) =>{
    const pid = props.pid
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = (data) => {
        const {title, description} = data
        console.log(`posted ${title}:${description} to`, pid)

        // add new thread
        db
            .collection(`projects/${pid}/threads`)
            .add({title, description})

        // notify all the members
        db
            .collection(`projects/${pid}/members`)
            .get()
            .then((members) => {
                members.forEach((member) => {
                    AddNotification(member.id, `New thread update on a project you are a member of!`, 
                        `/projects/${pid}`)
                });
            })
        reset()
    }
    console.log(errors);

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Add/Remove Thread</h2>
            <input type="text" placeholder="Title" name="title" ref={register({required: true})} />
            <input type="text" placeholder="More Details" name="description" ref={register({required: true})} />

            <input type="submit" />
        </form>
    )
}

export default ThreadForm

