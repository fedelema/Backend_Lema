import express from "npm:express";
import * as colors from "https://deno.land/std@0.170.0/fmt/colors.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let arrayColores: string[] = [];

app.get("/", (_: any, res: any) => {
    let htmlLista = '';
    arrayColores.forEach(c => 
        htmlLista += `<li><p style="color:${c}"> ${c} </p></li>`
    );

    let html = `
    <!DOCTYPE html>
    <html>
    <head><title>Desafio 47</title><head>
    <body>
        <form action="/" method="POST">
            <h1>Ingrese un color (en inglés)</h1>
            <input type="text" name="color" id="color">
            <button type="submit" href="/">Enviar</button>
        </form>
        <ul style="background-color:black">`;
    html += htmlLista;
    html += `
        </ul>
    </body>
    </html>
    `
    
    res.send(html);
});

app.post("/", async (_: Request, res: any) => {
    const colorNuevo = await _.body.color;
    arrayColores.push(colorNuevo);
    console.log(arrayColores);
    res.redirect('/');
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Puerto " + PORT)
})

// deno run --allow-net --allow-env --allow-read d47.ts