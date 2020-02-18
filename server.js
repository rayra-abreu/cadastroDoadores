//CONFIGURANDO O SERVIDOR
const express=require('express')
const server=express()

//CONFIGURA O SERVIDOR PARA APRESENTAR ARQUIVOS ESTÁTICOS
server.use(express.static('public'))

//HABILITAR BODY DO FORMULÁRIO
server.use(express.urlencoded({extended: true}))

//CONFIGURA CONEXÃO COM O BANCO DE DADOS
const Pool=require('pg').Pool
const db=new Pool({
    user:'postgres',
    password:'0000',
    host:'localhost',
    port:'5432',
    database:'doe'
})

//CONFIGURA A TEMPLATE ENGINE
const nunjucks=require('nunjucks')
nunjucks.configure('./', {
    express:server,
    noCache: true,
})

//LISTA DE DOADORES
const donors=[
    {
        name:"Diego Fernandes",
        blood:"AB+"
    },
    {
        name:"Alice Sampaio",
        blood:"B+"
    },
    {
        name:"Rafael Marques",
        blood:"A+"
    },
    {
        name:"Sabrina Brito",
        blood:"O+"
    },
]

//CONFIGURA A APRESENTAÇÃO DA PÁGINA
server.get('/', function(req, res){
    /*db.query('SELECT * FROM donors', function(err, result){
        const donors=result.rows
        if (err) return res.send('Erro no banco de dados !')    
    })*/return res.render('index.html', {donors})
})

server.post('/', function(req, res){
    const name=req.body.name
    const email=req.body.email
    const blood=req.body.blood

    if(name=='' || email=='' || blood==''){
        return alert('Todos os campos são obrigatórios !')
    }
    donors.push({
        name: name,
        blood: blood
    })

    //COLOCO VALORES DENTRO DO BANCO DE DADOS
    const query=`INSERT INTO donors ("name", "email", "blood")
                VALUES ($1,$2,$3)`
    
    const values=[name, email, blood]
    db.query(query,values, function(err){
        if(err) return res. send('Erro no banco de dados !')
    return res.redirect('/')
    })
})

server.listen(3000, function(){
    console.log('Iniciei')
})
