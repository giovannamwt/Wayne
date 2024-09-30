from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Ativa CORS para todas as rotas

# Função para conectar ao banco de dados
def conectar_bd():
    conn = sqlite3.connect('produtos.db')
    conn.row_factory = sqlite3.Row  # Isso faz com que os resultados sejam acessados como dicionários
    return conn


# Rota para obter todos os produtos
@app.route('/produtos', methods=['GET'])
def get_produtos():
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM produtos")
    #produtos = cursor.fetchall()
    produtos = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(produtos)

# Rota para adicionar um novo produto
@app.route('/produtos', methods=['POST'])
def add_produto():
    novo_produto = request.get_json()
    nome = novo_produto['nome']
    status = novo_produto['status']
    
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO produtos (nome, status) VALUES (?, ?)", (nome, status))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Produto adicionado com sucesso!"}), 200

# Rota para atualizar um produto
@app.route('/produtos/<int:id>', methods=['PUT'])
def update_produto(id):
    dados_produto = request.get_json()
    nome = dados_produto['nome']
    status = dados_produto['status']
    
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute("UPDATE produtos SET nome = ?, status = ? WHERE id = ?", (nome, status, id))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Produto atualizado com sucesso!"})

# Rota para deletar um produto
@app.route('/produtos/<int:id>', methods=['DELETE'])
def delete_produto(id):
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM produtos WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Produto deletado com sucesso!"})

if __name__ == '__main__':
    app.run(debug=True)
