"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visitor = void 0;
class Visitor {
    constructor(id, name, cpf, gender, age, city, state, profession, createdAt) {
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
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getCpf() {
        return this.cpf;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    getGender() {
        return this.gender;
    }
    setGender(gender) {
        this.gender = gender;
    }
    getAge() {
        return this.age;
    }
    setAge(age) {
        this.age = age;
    }
    getProfession() {
        return this.profession;
    }
    setProfession(profession) {
        this.profession = profession;
    }
    getCity() {
        return this.city;
    }
    setCity(city) {
        this.city = city;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
}
exports.Visitor = Visitor;
