/*
1 - pedir/recolher valor
2 - separar números
3 - multiplicar cada número regressivamente
4 - somar resultado e calcular o resto da divisão por 11
5 - se o resto for 0 ou 1 o número de controlo seria 0, caso contrário subtrair 11 - nr de controlo
6 - comparar resultado ao número de controlo e classificar
*/

function OnlyNum() {
    let result = document.getElementById("result");
    const nif = document.getElementById('nif');
    nif.value = nif.value.replace(/[^0-9]/g, "");
    
    const nifLimpo = nif.value;

    if (nifLimpo.length > 0) {
      const diff = 9 - nifLimpo.length;
      result.textContent = `Faltam ${diff} Digitos`;
      if (nifLimpo.length === 9) {
        const nifFinal = new ValidaNIF(nifLimpo);
        nifFinal.calcular();
      }
    }
}
  
function ValidaNIF(nifEnviado) {
    Object.defineProperty(this, 'nifFinal', {
        enumerable: true,
        get: function () {
            return nifEnviado;
        }
    })
}

ValidaNIF.prototype.calcular = function (nifLimpo) {
    let result = document.getElementById('result');
    let nifArray = Array.from(nifLimpo);
    const digitoControlo = nifArray.pop();

    let count = nifArray.length+1;
    const sumRegression = nifArray.reduce((acc, val) => {
        acc += count * Number(val);
        count--;
        return acc;
    }, 0);
    
    const digito = sumRegression % 11 < 2 ? 0 : 11 - (sumRegression % 11);
    console.log(sumRegression, digito, Number(digitoControlo));
    if (digito === Number(digitoControlo)) {
      return (result.textContent = "Validado");
    } 
    return (result.textContent = "Não Validado");
    
}
