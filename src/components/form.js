import React, { Component } from "react";
import "./form.css";

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foto: "#",
			cedula: "",
			nombres: "",
			apellidos: "",
			sexo: "",
		};
	}

	Api = async () => {
		let res = await fetch(
			`https://api.adamix.net/apec/cedula/${this.state.cedula}`
		);
		//let res = await fetch("https://api.adamix.net/apec/cedula/40246366013");
		let data = await res.json();

		console.log(data.Cedula);
		console.log(data.foto);
		this.setState({
			foto: data.foto,
			cedula: data.Cedula,
			nombres: data.Nombres,
			apellidos: data.Apellido1 + " " + data.Apellido2,
			sexo: data.IdSexo,
		});
	};

	handleName = (event) => {
		this.setState({ cedula: event.target.value });
	};

	handleSudmit = (event) => {
		var jeje = this.state.cedula;
		console.log(jeje);
		this.Api();
		this.setState({
			cedula: "",
		});
		event.preventDefault();
	};

	render() {
		return (
			<div>
				{/* Formulario para buscar persona */}
				<form class="row g-3" onSubmit={this.handleSudmit}>
					<div class="col-auto">
						<input
							type="text"
							class="form-control"
							id="inputPassword2"
							placeholder="Cedula"
							value={this.state.cedula}
							onChange={this.handleName}
						/>
					</div>
					<div class="col-auto">
						<button type="submit" class="btn btn-primary mb-3">
							Confirmar Identidad
						</button>
					</div>
				</form>
				{/* tarjeta con datos */}
				<div style={{ width: 250 }} className="card text-center">
					<img src={this.state.foto} alt="" />
					<div class="card-body">
						<h6 class="card-text">
							{this.state.nombres + " " + this.state.apellidos}
						</h6>
					</div>
				</div>
			</div>
		);
	}
}

export default Form;
