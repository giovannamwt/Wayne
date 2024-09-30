import sqlite3

# Conectando ao banco de dados (será criado se não existir)
conn = sqlite3.connect('produtos.db')
cursor = conn.cursor()

# Criando a tabela de produtos
cursor.execute('''
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    status TEXT NOT NULL
)
''')

print("Tabela criada com sucesso!")

# Fechando a conexão
conn.close()
