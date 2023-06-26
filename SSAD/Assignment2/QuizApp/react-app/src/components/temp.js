                    <form onSubmit={this.LoginSubmit} className="col-sm-6">
						<div className="form-group">
							<label>Email</label>
							<input type="email" className="form-control" value={this.state.loginData.Email} onChange={this.loginEmail}/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" value={this.state.loginData.Password} onChange={this.loginPassword}/>
						</div>
							<button type="submit" className="btn btn-default">Submit</button>
					</form>
            


                    <form onSubmit={this.RegisterSubmit} className="col-sm-6">
						<div className="form-group">
							<label>Name</label>
							<input type="text" className="form-control" value={this.state.registerData.Name} onChange={this.RegisterName}/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="email" className="form-control" value={this.state.registerData.Email} onChange={this.RegisterEmail}/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" value={this.state.registerData.Password} onChange={this.RegisterPassword}/>
						</div>
							<button type="submit" className="btn btn-default">Submit</button>
					</form>