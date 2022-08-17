const generateColor = () => {
    const red = Math.floor(Math.random() * (255-0) + 0);
    const green = Math.floor(Math.random() * (255-0) + 0);
    const blue = Math.floor(Math.random() * (255-0) + 0);
    return rgb = `rgb(${red}, ${green}, ${blue})`;
}

let color = generateColor();
console.log(color);