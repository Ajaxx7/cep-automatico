'use strict';

const pesquisarCep = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json`; 
    const response = await fetch(url);
    const data = await response.json();

    return data;
}



const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

const limparFormulario = async () => {
        document.querySelector('#endereco').value = '';
        document.querySelector('#bairro').value = '';
        document.querySelector('#cidade').value = '';
        document.querySelector('#estado').value = '';
};


const preencherFormulario = async (evento) => {
    const cep = evento.target.value;
    limparFormulario

    if(cepValido(cep)){

        const infoCep = await pesquisarCep(cep);

        if(infoCep.erro){
            document.querySelector('#endereco').value = 'CEP Não Encontrado';
            document.querySelector('#bairro').value = 'CEP Não Encontrado';
            document.querySelector('#cidade').value = 'CEP Não Encontrado';
            document.querySelector('#estado').value = 'CEP Não Encontrado';
        }
        else{
            document.querySelector('#endereco').value = infoCep.logradouro;
            document.querySelector('#bairro').value = infoCep.bairro;
            document.querySelector('#cidade').value = infoCep.localidade;
            document.querySelector('#estado').value = infoCep.uf;
        }
    }
    else{
        document.querySelector('#endereco').value = 'Cep Incorreto'
        document.querySelector('#bairro').value = 'CEP Incorreto';
        document.querySelector('#cidade').value = 'CEP Incorreto';
        document.querySelector('#estado').value = 'CEP Incorreto';
    }
};

document.querySelector('#cep').addEventListener('focusout', preencherFormulario);
