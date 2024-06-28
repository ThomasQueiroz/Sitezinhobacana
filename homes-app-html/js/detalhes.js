function buscarimovel() {
    const urlPagina = window.location.href
    const id = urlPagina.split("=")[1]
    const imvdetalhe = buscarimovelpeloid(id)
    atualizarImovel(imvdetalhe)
}
function atualizarImovel(imovel) {
    const imgImv = document.getElementById("img")
    imgImv.setAttribute("src", imovel.url_foto)

    const imvText = document.getElementById("casa")
    imvText.textContent = imovel.nome

    const imvcidest = document.getElementById("cidadeestado")
    imvcidest.textContent = `${imovel.cidade}, ${imovel.estado}`

    const adicionais = imovel.adicionais
    const ul = document.getElementById("lista-adicionais")
    if(adicionais.length == 0) {  
        const li = document.createElement("li")
        li.textContent = "Sem adicionais para o imóvel"
        ul.appendChild(li)
    }
    else{
        for(let i = 0; i < adicionais.length; i++) {
            const adicional = adicionais[i]
            const chave = adicional.chave
            const valor = adicional.valor
    
            const li = document.createElement("li")
            li.textContent = `${chave}: ${valor}`
            ul.appendChild(li)
        }
    }
    }