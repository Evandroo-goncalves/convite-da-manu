document.addEventListener('DOMContentLoaded', function() {
    console.log('🎁 Lista de presentes carregada!');
    console.log('👗 Roupas: ' + document.querySelectorAll('.categoria:first-child .lista-itens li').length + ' itens');
    console.log('👟 Sapatos: ' + document.querySelectorAll('.categoria:nth-child(2) .lista-itens li').length + ' itens');
    console.log('🧸 Brinquedos: ' + document.querySelectorAll('.categoria:last-child .lista-itens li').length + ' itens');
    console.log('🎀 Obrigado por fazer parte do dia da Manuela!');
});