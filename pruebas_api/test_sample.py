# Para correr y crear el archivo html: pytest --html=report.html --self-contained-html

import pytest
import requests

url1 = "https://pokeapi.co/api/v2"
response1 = requests.get(url1)
url2 = "https://swapi.info"
response2 = requests.get(url2)

def test_validar_status():
    r = requests.get(f'{url1}/pokemon/pikachu')
    assert r.status_code == 200

def test_validacion_campos():
    r = requests.get(f'{url1}/pokemon/pikachu')
    json = r.json()
    assert json['name'] == "pikachu"

def test_validacion_datos():
    r = requests.get(f'{url1}/pokemon/pikachu')
    json = r.json()
    assert json['height'] > 0
    assert json['weight'] > 0

def test_casos_negativos():
    r = requests.get(f'{url1}/pokemon/belen')
    assert r.status_code == 404

def test_integracion():
    r1 = requests.get(f'{url1}/type/dragon')
    json1 = r1.json()
    alturas = []
    for pokemon in json1['pokemon'][:20]:
        url_poke = pokemon['pokemon']['url']
        r_poke = requests.get(url_poke)
        poke = r_poke.json()
        alturas.append(poke['height'])
    promedio_poke = sum(alturas) / len(alturas) 

    r2 = requests.get(f'{url2}/api/species/3')
    json2 = r2.json()
    promedio_star = float(json2['average_height'])

    assert promedio_poke < promedio_star

def test_entradas_dinamicas():
    r = requests.get(f'{url1}/type/fire')
    json = r.json()
    for pokemon in json['pokemon'][:5]:
        assert 'name' in pokemon['pokemon']
        assert 'url' in pokemon['pokemon']
