export class User {
	protected id: number;
	protected name: string;
	protected role: string;
	protected cpf: string;
	protected email: string;
	protected password: string;
	protected createdAt: string;
	constructor(
		id: number,
		name: string,
		role: string,
		cpf: string,
		email: string,
		password: string,
		createdAt: string
	){
		this.id = id;
		this.name = name;
		this.role = role;
		this.cpf = cpf;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt;
	}

	public getId (): number {
		return this.id;
	}

	public setId (id: number):void {
		this.id = id;
	}

	public getName (): string {
		return this.name;
	}

	public setName (name: string): void {
		this.name =name;
	}

	public getRole (): string {
		return this.role;
	}

	public setRole (role: string): void {
		this.role = role;
	}

	public getCpf (): string {
		return this.cpf;
	}

	public setCpf (cpf: string): void { 
		this.cpf = cpf;
	}

	public getEmail (): string {
		return this.email;
	}

	public setEmail (email: string): void {
		this.email = email;
	}

	public getPassword (): string {
		return this.password;
	}

	public setPassword (password: string): void {
		this.password = password;
	}

	public getCreatedAt (): string {
		return this.createdAt;
	}

	public setCreatedAt (createdAt: string): void {
		this.createdAt = createdAt;
	}
}