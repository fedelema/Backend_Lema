const generateColor = function() : string {
    const red:number = Math.floor(Math.random() * (255-0) + 0);
    const green:number = Math.floor(Math.random() * (255-0) + 0);
    const blue:number = Math.floor(Math.random() * (255-0) + 0);
    return `rgb(${red}, ${green}, ${blue})`;
}

const color:string = generateColor();
console.log(color);

// NO FUNCIONA, REVISAR QUE FALTA INSTALAR