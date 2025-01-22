"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize_1 = __importDefault(require("capitalize"));
console.log(capitalize_1.default.words('olá mundo do TS!'));
let p;
p = { nome: "asdad" };
const p2 = {
    nome: "pessad",
    asd() {
        return 12;
    },
};
p = p2;
function cadastrarPessoa(p) {
    console.log('cadastrando pessoa:', p.nome);
}
