export class Visitor {
	protected id: number;
	protected name: string;
	protected cpf: string;
	protected gender: string;
	protected age: number;
	protected profession: string;
	protected city: string;
	protected state: string;
	protected createdAt: string;

	constructor(
		id: number,
		name: string,
		cpf: string,
		gender: string,
		age: number,
		city: string,
		state: string,
		createdAt: string,
		profession: string
	) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.gender = gender;
		this.age = age;
		this.city = city;
		this.state = state;
		this.createdAt = createdAt;
		this.profession = profession;
	}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}

	public getCpf(): string {
		return this.cpf;
	}

	public setCpf(cpf: string): void {
		this.cpf = cpf;
	}

	public getGender(): string {
		return this.gender;
	}

	public setGender(gender: string): void {
		this.gender = gender;
	}

	public getAge(): number {
		return this.age;
	}

	public setAge(age: number): void {
		this.age = age;
	}

	public getProfession(): string {
		return this.profession;
	}

	public setProfession(profession: string): void {
		this.profession = profession;
	}

	public getCity(): string {
		return this.city;
	}

	public setCity(city: string): void {
		this.city = city;
	}

	public getState(): string {
		return this.state;
	}

	public setState(state: string): void {
		this.state = state;
	}

	public getCreatedAt(): string {
		return this.createdAt;
	}

	public setCreatedAt(createdAt: string): void {
		this.createdAt = createdAt;
	}
}
