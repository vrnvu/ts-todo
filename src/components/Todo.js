import React, { useEffect, useRef, useState } from "react";

export default function Todo(props) {
	const { id, name, completed, toggleCompleted, onDelete, onEdit } = props;

	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState('');

	const editFieldRef = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();
		onEdit(id, newName);
		setNewName("");
		setEditing(false);
	}

	const editingTemplate = (
		<form className="stack-small" onSubmit={(e) => handleSubmit(e)}>
			<div className="form-group">
				<label className="todo-label" htmlFor={id}>
					New name for {name}
				</label>
				<input
					id={id}
					className="todo-text"
					type="text"
					onChange={(e) => setNewName(e.target.value)}
					ref={editFieldRef}
				/>
			</div>
			<div className="btn-group">
				<button type="button" className="btn todo-cancel" onClick={() => { setEditing(false); setNewName("") }}>
					Cancel
					<span className="visually-hidden">renaming {name}</span>
				</button>
				<button type="submit" className="btn btn__primary todo-edit" >
					Save
					<span className="visually-hidden">new name for {name}</span>
				</button>
			</div>
		</form>
	);
	const viewTemplate = (
		<div className="stack-small">
			<div className="c-cb">
				<input
					id={id}
					type="checkbox"
					defaultChecked={completed}
					onChange={() => toggleCompleted(id)}
				/>
				<label className="todo-label" htmlFor={id}>
					{name}
				</label>
			</div>
			<div className="btn-group">
				<button
					type="button"
					className="btn"
					onClick={() => setEditing(true)}
				>
					Edit <span className="visually-hidden">{name}</span>
				</button>
				<button
					type="button"
					className="btn btn__danger"
					onClick={() => onDelete(id)}
				>
					Delete <span className="visually-hidden">{name}</span>
				</button>
			</div>
		</div>
	);


	useEffect(() => {
		if (isEditing) {
			editFieldRef.current.focus();
		}
	}, [isEditing]);



	return (
		<li className="todo">
			{isEditing ? editingTemplate : viewTemplate}
		</li >
	)
}