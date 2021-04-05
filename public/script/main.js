// importer les json avec methode fetch

fetch("data.json")
.then (response => response.json()
.then (data => {
    console.log(data)
}));

