import React, {useState} from 'react'
import '../../../styles/EditSkills.css'
import SkillsList from '../SkillsList';

const SkillsForm = props => {
    
	const removeSkills = indexToRemove => {
        props.setSkills([...props.skills.filter((_, index) => index !== indexToRemove)]);
    };
    
	const addSkills = event => {
		if (event.target.value !== "") {
            event.preventDefault()
            // do a push
			props.setSkills([...props.skills, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="skills-input">
			<ul id="skills">
				{props.skills.map((skill, index) => (
					<li key={index} className="skill">
						<span className='skill-title'>{skill}</span>
						<span className='skill-close-icon'
							onClick={() => removeSkills(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addSkills(event) : null}
				placeholder="Press enter to add skills"
			/>
		</div>
	);
};

export default SkillsForm