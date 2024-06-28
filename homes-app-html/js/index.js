let imoveis = buscarTodososimoveis()
if (window.localStorage.getItem("lista") == null) {
    // Salva a lista original no local storage
    window.localStorage.setItem("lista", JSON.stringify(imoveis))
}
else {
    // Recupera a lista com os itens que foram marcados como favoritos
    imoveis = JSON.parse(window.localStorage.getItem("lista"))
}
function criarImovelHTML(imovel) {
    const section = document.createElement("section")
    section.setAttribute("class", "listing")

    const img = document.createElement("img")
    img.setAttribute("class", "listing-photo")
    img.setAttribute("src",imovel.url_foto)
    section.appendChild(img)

    const h2 = document.createElement("h2")
    h2.setAttribute("class","listing-heading")
    h2.textContent = imovel.nome
    section.appendChild(h2)
    
    const p = document.createElement("p")
    p.setAttribute("class","listing-location")
    p.textContent = `${imovel.cidade}, ${imovel.estado}`
    section.appendChild(p)

    const a = document.createElement("a")
    a.textContent = "Veja mais"
    const url = `detalhes.html?imovelId=${imovel.id}`
    a.setAttribute("href",url)

    section.appendChild(a)

    const favId = `fav-${imovel.id}`
    const favorito = document.createElement("img")
    favorito.setAttribute("id", favId)

    if(imovel.favorito == true) {
        favorito.setAttribute("src", "img/favorito.png")
    }
    else if(imovel.favorito == false) {
        favorito.setAttribute("src", "img/desfavorito.png")
    }
    favorito.setAttribute("class", "favorito")
    favorito.setAttribute("onclick", `favoritar(${JSON.stringify(imovel)})`)
    section.appendChild(favorito)

    const sectionResults = document.getElementById("lista-imoveis")
    sectionResults.appendChild(section)
}
function Removeracentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function Filtrar() {
    const pesquisas = document.getElementById("pesquisa").value
    listarImoveiscomfiltro(pesquisas)
}

function favoritar(imovel) {
    const favId = `fav-${imovel.id}`
    const fav = document.getElementById(favId)
    const posicaoLista = imovel.id - 1
    if (fav.getAttribute("src") == "img/favorito.png") {
        fav.setAttribute("src","img/desfavorito.png")
        imoveis[posicaoLista].favorito = false
    } else{
        fav.setAttribute("src","img/favorito.png")
        imoveis[posicaoLista].favorito = true
    }   
    window.localStorage.setItem("lista", JSON.stringify(imoveis))
}

function mostrarFavoritos() {
    limparListaImoveis()
    for (let i=0; i<imoveis.length; i++) {
        const imovel = imoveis[i]
        if (imovel.favorito == true) {
            criarImovelHTML(imovel)
        }
    }
}

function FiltrarcomEnter(ev) {
    if (ev.keyCode == 13) {
        ev.preventDefault()
        Filtrar()
    }
}
function listarImoveiscomfiltro(texto) {
    limparListaImoveis()
    if(texto == "") {
        mostrartodososimoveis()
    }
    else{
        for (let i = 0; i < imoveis.length; i++) { 
            const imovel = imoveis[i]
            const textoM = Removeracentos(texto.toUpperCase())
            const cidadeImovelM = Removeracentos(imovel.cidade.toUpperCase())
            const estadoImovelM = Removeracentos(imovel.estado.toUpperCase())
            if (cidadeImovelM.search(textoM) == 0 || estadoImovelM.search(textoM) == 0) {
                //aparecer na página
                criarImovelHTML(imovel)
            }
        } 
    }

}
function mostrartodososimoveis() {
    limparListaImoveis()
    for(let i = 0; i < imoveis.length; i++) {
        const imovel = imoveis[i]
        criarImovelHTML(imovel)
    }
}
function limparListaImoveis() {
    const sectionResults = document.getElementById("lista-imoveis")
    while (sectionResults.lastElementChild) {
        sectionResults.removeChild(sectionResults.lastElementChild)
    }
}
function Return(num) {
    if (num === 1) {
        window.location.reload()
    }
}

mostrartodososimoveis()



var check_apartamento = document.getElementById('Apartamento');
var check_casa = document.getElementById('Casa');

check_apartamento.onchange = function() {
    limparListaImoveis();
    if (check_apartamento.checked) {
        for (let i = 0; i < imoveis.length; i++) {
            const imovel = imoveis[i];
            const tipo = imovel.ca_apt;
            if (tipo == "apartamento") {
                criarImovelHTML(imovel);
            }
        }
    }
    if (check_casa.checked) {
        for (let i = 0; i < imoveis.length; i++) {
            const imovel = imoveis[i];
            const tipo = imovel.ca_apt;
            if (tipo == "casa") {
                criarImovelHTML(imovel);
            }
        }
    }
    if (!check_apartamento.checked && !check_casa.checked) {
        mostrartodososimoveis();
    }
}

check_casa.onchange = function() {
    limparListaImoveis();
    if (check_casa.checked) {
        for (let i = 0; i < imoveis.length; i++) {
            const imovel = imoveis[i];
            const tipo = imovel.ca_apt;
            if (tipo == "casa") {
                criarImovelHTML(imovel, false);
            }
        }
    }
    if (check_apartamento.checked) {
        for (let i = 0; i < imoveis.length; i++) {
            const imovel = imoveis[i];
            const tipo = imovel.ca_apt;
            if (tipo == "apartamento") {
                criarImovelHTML(imovel, false);
            }
        }
    }
    if (!check_apartamento.checked && !check_casa.checked) {
        mostrartodososimoveis();
    }
}
