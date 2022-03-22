//importando as bibliotecas
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';

//Definição de porta
const port = 3333

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    //implementar código aqui
    var resposta;

    const urlparse = url.parse(request.url ? request.url : '', true);

    //Receber informaçoes do usuario
    const params = parse(urlparse.search ? urlparse.search : '');

    //Criar um usuario - Atualizar um usuario
    if(urlparse.pathname == '/criar-atualizar-usuario'){
        //salvar as informaçoes
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function(err: any) {
            if (err) throw err;
            console.log('Saved!');

            resposta = 'Usuario criado/atualizado com sucesso.';

            response.statusCode = 200;
            response.setHeader ('Content-type', 'text/plain');
            response.end(resposta);
        });
    }
});

//Execução
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


